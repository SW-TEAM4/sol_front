import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    CandlestickSeries,
    createChart,
    HistogramSeries,
} from 'lightweight-charts';
import { WebSocketContext } from './WebsocketManage';
import { fetchStockData } from '../../api/StockAPI';
import ChartTypeButton from './ChartTypeButton';
import './StockChart.css';

const StockChart = ({ ticker }) => {
    const { kafkaData } = useContext(WebSocketContext) || {}; // 웹소켓으로 부터 받아오는 오늘 데이터
    const [candlestickData, setCandlestickData] = useState([]); // 캔들 구성 데이터
    const [histogramData, setHistogramData] = useState([]); // 히스토그램 구성 데이터
    const [type, setType] = useState('daily'); // 차트 타입 (일간, 주간, 월간, 연간)
    const containerRef = useRef(null);
    const chartRef = useRef(null); // 차트 저장
    const candlestickSeries = useRef(null); // 캔들스틱 시리즈 저장
    const histogramSeries = useRef(null); // 히스토그램 시리즈 저장
    const pageRef = useRef(1); // 페이지 값을 추적하는 ref 추가
    const isFetchingRef = useRef(false); // 중복 fetch 방지
    const intervalRight = { daily: 3, weekly: 3, monthly: 3, yearly: 0 };
    const xLabel = { daily: 60, weekly: 60, monthly: 12, yearly: 5 };
    const intervalBarSpacing = { daily: 3, weekly: 5, monthly: 5, yearly: 5 };
    const formatDateForType = (dateStr, type) => {
        const date = new Date(dateStr); // string → Date 객체 변환

        switch (type) {
            case 'monthly':
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            case 'yearly': // yyyy
                return `${date.getFullYear()}`;

            default:
                return dateStr;
        }
    }; // 카프카로부터 넘어오는 데이터 날짜 타입에 맞게 변환
    const deduplicateAndSort = (data) => {
        const uniqueData = data.filter(
            (item, index, self) =>
                index === self.findIndex((t) => t.time === item.time)
        );

        return uniqueData.sort((a, b) => {
            if (a.page !== b.page) {
                return b.page - a.page;
            } // 페이지 내림차순
            return a.time - b.time; // 시간 오름차순
        });
    }; // 데이터 중복 제거 및 정렬 함수
    const formatPrice = (price) => {
        return price.toLocaleString();
    };
    const handleScroll = useCallback(
        (logicalRange) => {
            if (!logicalRange) {
                return;
            }

            const prevFrom = logicalRange.from;
            const prevTo = logicalRange.to;
            console.log('prevFrom: ', prevFrom, ' prevTo: ', prevTo);

            if (prevFrom < 10 && !isFetchingRef.current) {
                isFetchingRef.current = true; // Fetch 진행 중임을 표시
                const nextPage = pageRef.current + 1;
                console.log(
                    '핸들스크롤에서 셋페이지, prev page: ',
                    pageRef.current,
                    ' nextPage: ',
                    nextPage,
                    ' 타입: ',
                    type
                );
                pageRef.current = nextPage; // useRef로 직접 업데이트 (re-render 발생 안함)
                setTimeout(() => {
                    fetchData(nextPage, type);
                }, 250);
            }
        },
        [type]
    ); // type 변경 시마다 새로 생성 콜백함수, 차트 스크롤 범위 추적 및 특정 조건에서 추가 데이터 호출

    const fetchData = async (page, newType) => {
        // 타입이 다르거나 page가 1이면 추가 데이터 가져오지 않는다
        if (newType !== type || page === 1) {
            console.log(
                '아직 타입과 뉴타입이 다름, type: ',
                type + ' newType: ',
                newType
            );
            return;
        }

        console.log(
            'fetchData 실행 - page: ',
            page + ' type: ',
            type + ' newType: ',
            newType
        );

        try {
            const response = await fetchStockData(ticker, newType, page);
            if (response?.length === 0) {
                console.log('더 이상 데이터 없음');
                isFetchingRef.current = false;
                return;
            }

            const additionalCandleData = response.map((item) => ({
                time: item.date,
                open: item.startPrice,
                high: item.highPrice,
                low: item.lowPrice,
                close: item.endPrice,
                page: page,
            }));
            console.log('fetchData response Candle: ', additionalCandleData);

            const additionalHistogramData = response.map((item) => ({
                time: item.date,
                value: item.volume,
                color: item.startPrice <= item.endPrice ? '#d25357' : '#5d83ee',
                page: page,
            }));

            setCandlestickData((prev) => {
                const updatedData = [...additionalCandleData, ...prev];
                return deduplicateAndSort(updatedData);
            });

            setHistogramData((prev) => {
                const updatedData = [...additionalHistogramData, ...prev];
                return deduplicateAndSort(updatedData);
            });

            // // 로지컬 범위 갱신
            // if (chartRef.current) {
            //     const logicalRange = chartRef.current.timeScale().getVisibleLogicalRange();
            //     console.log('로지컬 범위 - 이전 범위: ', logicalRange);
            //     if (logicalRange) {
            //         const newFrom = logicalRange.from + response.length;
            //         const newTo = logicalRange.to + response.length;
            //         setTimeout(() => {
            //             // chartRef.current.timeScale().setVisibleLogicalRange({ from: newFrom, to: newTo });
            //         }, 150);
            //
            //         console.log('로지컬 범위 갱신! from:', newFrom, 'to:', newTo);
            //     }
            // }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('요청이 취소되었습니다.');
            } else {
                console.error('fetchStockData 오류:', error);
            }
        } finally {
            isFetchingRef.current = false;
        }
    }; // 추가 과거 데이터 호출

    const loadInitialData = async (ticker, type) => {
        try {
            const data = await fetchStockData(ticker, type, 1); // API 호출
            if (data.length === 0) {
                return null; // 데이터가 없으면 null 반환
            }

            const formattedCandleData = data.map((item) => ({
                time: item.date,
                open: item.startPrice,
                high: item.highPrice,
                low: item.lowPrice,
                close: item.endPrice,
                page: pageRef,
            }));
            const formattedHistogramData = data.map((item) => ({
                time: item.date,
                value: item.volume,
                color: item.startPrice <= item.endPrice ? '#d25357' : '#5d83ee', // 상승(빨강) 하락(파랑)
                page: pageRef,
            }));
            console.log('candleData from init api: ', formattedCandleData);
            console.log(
                'histogramData from init api: ',
                formattedHistogramData
            );

            // 데이터 저장
            setCandlestickData(formattedCandleData);
            setHistogramData(formattedHistogramData);

            if (chartRef.current) {
                chartRef.current.remove(); // 기존 차트 초기화
            }

            // 기존 레전드 삭제
            removeExistingLegend();

            // 차트 옵션 설정
            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: { type: 'solid', color: 'white' },
                    panes: {
                        separatorColor: '#131722',
                        separatorHoverColor: 'rgba(255, 0, 0, 0.1)',
                        enableResize: false,
                    },
                },
                height: 400, // 차트 영역 높이
                localization: {
                    locale: 'ko-KR',
                    dateFormat:
                        type === 'monthly'
                            ? 'yyyy-MM'
                            : type === 'yearly'
                              ? 'yyyy'
                              : 'yyyy-MM-dd',
                    priceFormatter: formatPrice,
                },
                timeScale: {
                    // tickMarkFormatter: customFormatter, // x축 레이블을 월별로 설정
                    autoScale: false, // 자동 크기 조정 비활성화
                    barSpacing: intervalBarSpacing[type], // zoom level
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3, // leave space for legend
                        bottom: 0.25,
                    },
                },
                crosshair: {
                    mode: 0, // CrosshairMode.Normal
                },
                panes: [
                    {
                        id: 'mainPane', // 메인 차트 패널
                        height: 0.7, // 전체 차트 영역에서 차지하는 비율 (70%)
                    },
                    {
                        id: 'volumePane', // 볼륨 차트 패널
                    },
                ],
            };
            console.log('차트 생성');
            // 차트 생성
            const chart = createChart(containerRef.current, chartOptions); // 차트 생성
            chartRef.current = chart; // chart를 useRef에 저장

            candlestickSeries.current = chart.addSeries(CandlestickSeries, {
                upColor: '#d25357',
                downColor: '#5d83ee',
                borderVisible: false,
                wickUpColor: '#d25357',
                wickDownColor: '#5d83ee',
            });

            // 레전드 DOM 요소 생성 (하나만 유지)
            let legend = containerRef.current.querySelector('.chart-legend');
            const symbolName = '시가 저가 고가 종가';

            if (!legend) {
                legend = document.createElement('div');
                legend.classList.add('chart-legend');
                containerRef.current.appendChild(legend);
            }

            const legendContent = document.createElement('div');
            legend.appendChild(legendContent);

            // 크로스헤어 이동 시 가격 정보 업데이트
            chart.subscribeCrosshairMove((param) => {
                let price = '';
                let openPrice = '';
                let highPrice = '';
                let lowPrice = '';
                let closePrice = '';
                let volume = '';

                if (param.time) {
                    const candleData = param.seriesData.get(
                        candlestickSeries.current
                    );
                    const histogramData = param.seriesData.get(
                        histogramSeries.current
                    );
                    if (candleData && histogramData) {
                        price = candleData.close.toLocaleString();
                        openPrice = candleData.open.toLocaleString();
                        highPrice = candleData.high.toLocaleString();
                        lowPrice = candleData.low.toLocaleString();
                        closePrice = candleData.close.toLocaleString();
                        volume = formatVolume(histogramData.value);
                    }
                }

                // 레전드 업데이트
                legendContent.innerHTML = `
                PRICE: <strong>${price}</strong> 
                시가: <strong>${openPrice}</strong>
                고가: <strong>${highPrice}</strong>
                저가: <strong>${lowPrice}</strong>
                종가: <strong>${closePrice}</strong><br />
                VOL: <strong>${volume}</strong>
               
            `;
            });

            histogramSeries.current = chart.addSeries(
                HistogramSeries,
                {
                    priceFormat: {
                        type: 'volume',
                    },
                    scaleMargins: { top: 0.7, bottom: 0 }, // 히스토그램 차트를 캔들스틱 아래에 위치시키기 위한 마진 조정
                },
                1
            );

            return {
                candlestickData: formattedCandleData,
                histogramData: formattedHistogramData,
            };
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
            return null; // 에러 발생 시 null 반환
        }
    }; // 티커 혹은 타입 변경으로 초기 데이터 가져옴 (1 page data)
    function formatVolume(value) {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(1) + 'B'; // 10^9 -> B
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + 'M'; // 10^6 -> M
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + 'K'; // 10^3 -> K
        } else {
            return value.toLocaleString(); // 기본 값은 그대로 출력
        }
    }
    function removeExistingLegend() {
        const existingLegend = document.querySelector('.chart-legend');
        if (existingLegend) {
            existingLegend.remove();
        }
    }

    // 최초 마운트 시에만 호출되도록 useEffect로 감싸기
    useEffect(() => {
        console.log('초기 마운트 호출 ticker:', ticker + ' type: ', type);
        ticker = '005930';
        loadInitialData(ticker, type); // 최초 호출
    }, []); // 빈 배열로 지정하여 한 번만 호출되게 설정

    // 차트 데이터 변경 시 차트에 적용
    useEffect(() => {
        if (chartRef.current) {
            console.log('차트 적용 , + 데이터: ', histogramData);
            candlestickSeries.current.setData(candlestickData);
            histogramSeries.current.setData(histogramData);
        }
    }, [candlestickData, histogramData]);

    // 차트 데이터 반영
    useEffect(() => {
        if (candlestickSeries.current && histogramSeries.current) {
            candlestickSeries.current.setData(candlestickData);
            histogramSeries.current.setData(histogramData);
        }
    }, [candlestickData, histogramData]);

    // 웹소켓을 통해 컨슈머로부터 오늘 실시간 정보 계속 받아와 오늘 정보 차트 반영
    useEffect(() => {
        if (!kafkaData || kafkaData?.ticker !== ticker) {
            return; // 현재 티커와 다르면 무시
        }

        const formattedTime = formatDateForType(kafkaData.date, type);
        // 기존 데이터가 있는지 확인
        setCandlestickData((prevData) => {
            const existingCandleIndex = prevData.findIndex(
                (item) => formatDateForType(item.time, type) === formattedTime
            );
            // const existingCandleIndex = prevData.findIndex((item) => item.time === kafkaData.date);

            const openPrice = parseFloat(kafkaData.startPrice); // startPrice를 숫자로 변환
            const highPrice = parseFloat(kafkaData.highPrice); // highPrice를 숫자로 변환
            const lowPrice = parseFloat(kafkaData.lowPrice); // lowPrice를 숫자로 변환
            const closePrice = parseFloat(kafkaData.price); // endPrice를 숫자로 변환

            if (existingCandleIndex !== -1) {
                // 기존 데이터 업데이트
                const updatedData = [...prevData];
                updatedData[existingCandleIndex] = {
                    ...updatedData[existingCandleIndex],
                    high: Math.max(
                        updatedData[existingCandleIndex].high,
                        highPrice
                    ),
                    low: Math.min(
                        updatedData[existingCandleIndex].low,
                        lowPrice
                    ),
                    close: closePrice, // 최신 close 값으로 업데이트
                };
                return updatedData;
            } else {
                // 새로운 데이터 추가
                return [
                    ...prevData,
                    {
                        time:
                            type === 'monthly' ? kafkaData.date : formattedTime,
                        // time: kafkaData.date,
                        open: openPrice,
                        high: highPrice,
                        low: lowPrice,
                        close: closePrice,
                    },
                ];
                console.log('카프카 데이터 기존 차트에 데이터 추가', kafkaData);
            }
        });

        setHistogramData((prevData) => {
            const existingHistogramIndex = prevData.findIndex(
                (item) => formatDateForType(item.time, type) === formattedTime
            );
            // const existingHistogramIndex = prevData.findIndex((item) => item.time === kafkaData.date);

            const openPrice = parseFloat(kafkaData.startPrice); // startPrice를 숫자로 변환
            const highPrice = parseFloat(kafkaData.highPrice); // highPrice를 숫자로 변환
            const lowPrice = parseFloat(kafkaData.lowPrice); // lowPrice를 숫자로 변환
            const closePrice = parseFloat(kafkaData.price); // endPrice를 숫자로 변환
            const volume = parseFloat(kafkaData.volume);

            if (existingHistogramIndex !== -1) {
                // 기존 volume 업데이트 (누적)
                const updatedData = [...prevData];
                updatedData[existingHistogramIndex] = {
                    ...updatedData[existingHistogramIndex],
                    volume: volume,
                };
                return updatedData;
            } else {
                // 새로운 volume 데이터 추가
                return [
                    ...prevData,
                    {
                        time:
                            type === 'monthly' ? kafkaData.date : formattedTime,
                        value: volume,
                        color:
                            kafkaData.startPrice <= kafkaData.price
                                ? '#d25357'
                                : '#5d83ee',
                    },
                ];
            }
        });
    }, [kafkaData, type]);

    // 차트 타입 또는 티커 변경 시 페이지 초기화 및 스크롤 섭스크라이버 초기화
    useEffect(() => {
        const changeChartType = async () => {
            try {
                // 타입이 변경되었을 때만 데이터 로딩
                const newData = await loadInitialData(ticker, type);
                console.log(
                    'newData from useEffect:',
                    newData + ' newType-type: ',
                    type
                );

                if (newData) {
                    // 차트 타입 변경 시 기존 핸들러 구독 해제
                    if (chartRef.current) {
                        console.log('기존 구독 해제');
                        chartRef.current
                            .timeScale()
                            .unsubscribeVisibleLogicalRangeChange(handleScroll);
                    }

                    // 새로운 핸들러로 구독
                    if (chartRef.current) {
                        // 데이터 저장
                        candlestickSeries.current.setData(
                            newData.candlestickData
                        );
                        histogramSeries.current.setData(newData.histogramData);

                        console.log('새로운 핸들러로 구독');
                        chartRef.current
                            .timeScale()
                            .subscribeVisibleLogicalRangeChange(handleScroll);

                        // 새로운 범위 계산
                        const from =
                            newData.histogramData.length +
                            intervalRight[type] -
                            xLabel[type];
                        const to =
                            newData.histogramData.length + intervalRight[type];

                        chartRef.current
                            .timeScale()
                            .setVisibleLogicalRange({ from, to });
                        chartRef.current.timeScale().fitContent();
                        console.log('초기 logical range 설정:', { from, to });
                    }
                }
            } finally {
                console.log('차트 타입 변경 완료 및 페이지 1 초기화');
                pageRef.current = 1; // 페이지 초기화
            }
        };

        console.log('타입변경 감지, type: ', type);
        changeChartType();

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
            if (chartRef.current) {
                console.log('구독 해제');
                chartRef.current
                    .timeScale()
                    .unsubscribeVisibleLogicalRangeChange(handleScroll);
            }
        };
    }, [ticker, type, handleScroll]);

    return (
        <div className="chart-container">
            {/* 차트 타입 버튼 */}
            <ChartTypeButton setType={setType} type={type} />

            {/* 차트 표시 */}
            <div
                ref={containerRef}
                style={{ position: 'relative', width: '100%', height: '100%' }}
            ></div>
        </div>
    );
};

export default StockChart;
