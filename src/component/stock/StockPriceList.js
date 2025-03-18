// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from './WebsocketManage';
import './StockPriceList.css';

const StockPriceList = ({ onStockSelect }) => {
    const { kafkaData, kafkaSecondData } = useContext(WebSocketContext) || {};
    const [stockData, setStockData] = useState([
        // {
        //     ticker: 'MSFT',
        //     name: '마소',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: 'AMZN',
        //     name: '아마존',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: 'TSLA',
        //     name: '테슬라',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: 'PLTR',
        //     name: '팔란티어 테크',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: 'AAPL',
        //     name: '애플',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: 'NVDA',
        //     name: '엔비디아',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: '010950',
        //     name: 's-oil',
        //     price: 10000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: '032640',
        //     name: 'lg-유플러스',
        //     price: 9500,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        // {
        //     ticker: '030000',
        //     name: '제일기획',
        //     price: 9000,
        //     diff: 1000,
        //     diffRate: 1.25,
        //     tradingVolume: 100000,
        //     highPrice: 12000,
        //     lowPrice: 9000,
        // },
        {
            ticker: '005930',
            name: '삼성전자',
            price: 80000,
            diff: 1000,
            diffRate: 1.25,
            tradingVolume: 100000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '000660',
            name: 'SK하이닉스',
            price: 130000,
            diff: -2000,
            diffRate: -1.5,
            tradingVolume: 50000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '207940',
            name: '삼성바이오로직스',
            price: 790000,
            diff: 3000,
            diffRate: 0.38,
            tradingVolume: 12000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '373220',
            name: 'LG에너지솔루션',
            price: 450000,
            diff: -5000,
            diffRate: -1.1,
            tradingVolume: 30000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '051910',
            name: 'LG화학',
            price: 580000,
            diff: 4000,
            diffRate: 0.69,
            tradingVolume: 18000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '005935',
            name: '삼성전자우',
            price: 72000,
            diff: 500,
            diffRate: 0.7,
            tradingVolume: 60000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '035420',
            name: 'NAVER',
            price: 210000,
            diff: 2000,
            diffRate: 0.96,
            tradingVolume: 25000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '006400',
            name: '삼성SDI',
            price: 550000,
            diff: -3000,
            diffRate: -0.54,
            tradingVolume: 14000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '000270',
            name: '기아',
            price: 90000,
            diff: 1500,
            diffRate: 1.69,
            tradingVolume: 80000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '005380',
            name: '현대차',
            price: 200000,
            diff: 1000,
            diffRate: 0.5,
            tradingVolume: 35000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '035720',
            name: '카카오',
            price: 63000,
            diff: -700,
            diffRate: -1.1,
            tradingVolume: 92000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '105560',
            name: 'KB금융',
            price: 65000,
            diff: 800,
            diffRate: 1.25,
            tradingVolume: 41000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '055550',
            name: '신한지주',
            price: 48000,
            diff: 600,
            diffRate: 1.27,
            tradingVolume: 52000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '028260',
            name: '삼성물산',
            price: 115000,
            diff: -1000,
            diffRate: -0.86,
            tradingVolume: 29000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '012330',
            name: '현대모비스',
            price: 210000,
            diff: 2000,
            diffRate: 0.96,
            tradingVolume: 17000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '066570',
            name: 'LG전자',
            price: 120000,
            diff: 500,
            diffRate: 0.42,
            tradingVolume: 47000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '051900',
            name: 'LG생활건강',
            price: 640000,
            diff: -6000,
            diffRate: -0.93,
            tradingVolume: 9000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '017670',
            name: 'SK텔레콤',
            price: 65000,
            diff: 700,
            diffRate: 1.09,
            tradingVolume: 60000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '068270',
            name: '셀트리온',
            price: 180000,
            diff: 1500,
            diffRate: 0.84,
            tradingVolume: 30000,
            highPrice: 12000,
            lowPrice: 9000,
        },
        {
            ticker: '000810',
            name: '삼성화재',
            price: 260000,
            diff: 2000,
            diffRate: 0.78,
            tradingVolume: 12000,
            highPrice: 12000,
            lowPrice: 9000,
        },
    ]);
    const [filteredData, setFilteredData] = useState(stockData);
    const [selectedStock, setSelectedStock] = useState(null);
    const [error, setError] = useState(null); // 오류 상태

    const [filterBy, setFilterBy] = useState(null);

    useEffect(() => {
        if (onStockSelect && selectedStock === null) {
            const defaultStock = stockData.find((stock) => stock.ticker === '005930'); // 삼성전자 ticker
            setSelectedStock(defaultStock);
            onStockSelect(defaultStock); // 기본 주식 선택
        }
    }, [onStockSelect, selectedStock, stockData]);

    // 특정 주식 박스 선택시 해당 티커 선택
    const handleStockClick = (stock) => {
        setSelectedStock(stock);
        if (onStockSelect) {
            onStockSelect(stock);
        }
    };

    const filterData = (key) => {
        let sortedData = [...stockData]; // stockData 복사

        // 필터링 조건에 맞춰 내림차순 정렬
        if (key === 'tradingVolume') {
            sortedData.sort((a, b) => b.tradingVolume - a.tradingVolume); // 거래량 내림차순
        } else if (key === 'price') {
            sortedData.sort((a, b) => b.price - a.price); // 가격 내림차순
        } else if (key === 'diff') {
            sortedData.sort((a, b) => b.diff - a.diff); // 전일대비 내림차순
        } else {
            sortedData = stockData; // 필터 초기화
        }

        setFilteredData(sortedData); // 상태 업데이트
    };

    // 필터 콤보박스에서 선택된 값에 따른 필터링
    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setFilterBy(filterValue);
        filterData(filterValue);
    };

    // 실시간 가격 업데이트 - 첫번째 파이프라인
    useEffect(() => {
        if (!kafkaData?.ticker) {
            return;
        } // kafkaData가 없거나 ticker가 없으면 실행하지 않음
        setStockData((prevData) => {
            return prevData.map((stock) => {
                if (stock.ticker === kafkaData.ticker) {
                    const prevPrice = stock.price;
                    const newPrice = kafkaData.price;
                    const name = stock.name;
                    let highlightColor = '';
                    let highlightAnimation = '';

                    // 가격 상승 시 빨간색, 하락 시 파란색
                    if (newPrice > prevPrice) {
                        highlightColor = 'border-red-500';
                        highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
                    } else if (newPrice < prevPrice) {
                        highlightColor = 'border-blue-500';
                        highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
                    }

                    // 가격 변경 시 애니메이션 리셋을 위해 타이머 설정 (1초 후)
                    setTimeout(() => {
                        setStockData((prevData) =>
                            prevData.map((stock) =>
                                stock.ticker === kafkaData.ticker ? { ...stock, highlightAnimation: '' } : stock
                            )
                        );
                    }, 1000);

                    // 업데이트된 stock 데이터 반환
                    return {
                        ...stock, // 기존 값 유지
                        price: kafkaData.price, // 가격만 업데이트
                        diff: kafkaData.diff, // 가격 차이 업데이트
                        diffRate: kafkaData.diffRate, // 변동률 업데이트
                        highlightColor, // 하이라이트 색상
                        highlightAnimation, // 애니메이션 추가
                    };
                }
                return stock;
            });
        });
    }, [kafkaData]);

    // useEffect(() => {
    //     if (!kafkaData?.ticker) {
    //         return;
    //     }
    //
    //     setStockData((prevData) => {
    //         return prevData.map((stock) => {
    //             if (stock.ticker === kafkaData.ticker) {
    //                 const prevPrice = stock.price;
    //                 const newPrice = kafkaData.price;
    //                 const name = stock.name;
    //                 let highlightColor = '';
    //                 let highlightAnimation = '';
    //
    //                 // 가격 상승 시 빨간색, 하락 시 파란색, 동일할 경우 초록색
    //                 if (newPrice > prevPrice) {
    //                     highlightColor = 'border-red-500';
    //                     highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
    //                 } else if (newPrice < prevPrice) {
    //                     highlightColor = 'border-blue-500';
    //                     highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
    //                 } else if (newPrice === prevPrice) {
    //                     highlightColor = 'border-green-500'; // 가격이 동일할 경우 초록색
    //                     highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
    //                 }
    //
    //                 // 가격 변경 시 애니메이션 리셋을 위해 타이머 설정 (1초 후)
    //                 setTimeout(() => {
    //                     setStockData((prevData) =>
    //                         prevData.map((stock) =>
    //                             stock.ticker === kafkaData.ticker ? { ...stock, highlightAnimation: '' } : stock
    //                         )
    //                     );
    //                 }, 1000);
    //
    //                 // 업데이트된 stock 데이터 반환
    //                 return {
    //                     ...stock, // 기존 값 유지
    //                     price: kafkaData.price, // 가격만 업데이트
    //                     diff: kafkaData.diff, // 가격 차이 업데이트
    //                     diffRate: kafkaData.diffRate, // 변동률 업데이트
    //                     highlightColor, // 하이라이트 색상
    //                     highlightAnimation, // 애니메이션 추가
    //                 };
    //             }
    //             return stock;
    //         });
    //     });
    // }, [kafkaData]);

    // 실시간 가격 업데이트 - 두번쨰 파이프라인
    useEffect(() => {
        if (!kafkaSecondData?.ticker) {
            return;
        }

        setStockData((prevData) => {
            return prevData.map((stock) => {
                if (stock.ticker === kafkaSecondData.ticker) {
                    const prevPrice = stock.price;
                    const newPrice = kafkaSecondData.price;
                    let highlightColor = '';
                    let highlightAnimation = '';

                    if (newPrice > prevPrice) {
                        highlightColor = 'border-red-500';
                        highlightAnimation = 'animate-pulse';
                    } else if (newPrice < prevPrice) {
                        highlightColor = 'border-blue-500';
                        highlightAnimation = 'animate-pulse';
                    }

                    setTimeout(() => {
                        setStockData((prevData) =>
                            prevData.map((stock) =>
                                stock.ticker === kafkaSecondData.ticker ? { ...stock, highlightAnimation: '' } : stock
                            )
                        );
                    }, 1000);

                    return {
                        ...stock,
                        price: kafkaSecondData.price,
                        diff: kafkaSecondData.diff,
                        diffRate: kafkaSecondData.diffRate,
                        highlightColor,
                        highlightAnimation,
                    };
                }
                return stock;
            });
        });
    }, [kafkaSecondData]);

    // useEffect(() => {
    //     if (!kafkaSecondData?.ticker) {
    //         return;
    //     }
    //
    //     setStockData((prevData) => {
    //         return prevData.map((stock) => {
    //             if (stock.ticker === kafkaSecondData.ticker) {
    //                 const prevPrice = stock.price;
    //                 const newPrice = kafkaSecondData.price;
    //                 const name = stock.name;
    //                 let highlightColor = '';
    //                 let highlightAnimation = '';
    //
    //                 // 가격 상승 시 빨간색, 하락 시 파란색, 동일할 경우 초록색
    //                 if (newPrice > prevPrice) {
    //                     highlightColor = 'border-red-500';
    //                     highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
    //                 } else if (newPrice < prevPrice) {
    //                     highlightColor = 'border-blue-500';
    //                     highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
    //                 } else if (newPrice === prevPrice) {
    //                     highlightColor = 'border-green-500'; // 가격이 동일할 경우 초록색
    //                     highlightAnimation = 'animate-pulse'; // 애니메이션 효과 추가
    //                 }
    //
    //                 // 가격 변경 시 애니메이션 리셋을 위해 타이머 설정 (1초 후)
    //                 setTimeout(() => {
    //                     setStockData((prevData) =>
    //                         prevData.map((stock) =>
    //                             stock.ticker === kafkaSecondData.ticker ? { ...stock, highlightAnimation: '' } : stock
    //                         )
    //                     );
    //                 }, 1000);
    //
    //                 // 업데이트된 stock 데이터 반환
    //                 return {
    //                     ...stock, // 기존 값 유지
    //                     price: kafkaSecondData.price, // 가격만 업데이트
    //                     diff: kafkaSecondData.diff, // 가격 차이 업데이트
    //                     diffRate: kafkaSecondData.diffRate, // 변동률 업데이트
    //                     highlightColor, // 하이라이트 색상
    //                     highlightAnimation, // 애니메이션 추가
    //                 };
    //             }
    //             return stock;
    //         });
    //     });
    // }, [kafkaSecondData]);

    // return (
    //     <div className="stock-price-table-container">
    //         {/* 필터와 실시간 표시 */}
    //         <div className="chart-header">
    //             <select className="filter-select" value={filterBy} onChange={handleFilterChange}>
    //                 <option value="">전체</option>
    //                 <option value="tradingVolume">거래대금</option>
    //                 <option value="price">가격</option>
    //                 <option value="diff">전일대비</option>
    //             </select>
    //             <div className="realtime">실시간</div>
    //         </div>
    //
    //         {/* 종목 리스트 */}
    //         <ul className="stock-list">
    //             {stockData.map((stock, index) => (
    //                 <li
    //                     key={index}
    //                     className={`stock-item ${stock.highlightAnimation ? 'highlight' : ''}`}
    //                     onClick={() => handleStockClick(stock)}
    //                 >
    //                     <div className="stock-content">
    //                         <span className="stock-name">{stock.name}</span>
    //                         <div className={`stock-info ${stock.highlightColor}`}>
    //                             <span className="stock-price">{Number(stock.price).toLocaleString()}원</span>
    //                             <div className={`stock-diff ${stock.diff > 0 ? 'text-red' : 'text-blue'}`}>
    //                                 {Number(stock.diff) > 0
    //                                     ? `+${Number(stock.diff).toLocaleString()}`
    //                                     : Number(stock.diff).toLocaleString()}
    //                                 원
    //                                 <span className={stock.diffRate > 0 ? 'text-red' : 'text-blue'}>
    //                                     ({Math.abs(stock.diffRate)}%)
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
    return (
        <div className="stock-price-list-container">
            {/* 필터와 실시간 표시 */}
            <div className="stock-price-list-chart-header">
                <select className="stock-price-list-filter-select" value={filterBy} onChange={handleFilterChange}>
                    <option value="">전체</option>
                    <option value="tradingVolume">거래대금</option>
                    <option value="price">가격</option>
                    <option value="diff">전일대비</option>
                </select>
                <div className="stock-price-list-realtime">실시간</div>
            </div>

            {/* 종목 리스트 */}
            <ul className="stock-price-list-stock-list">
                {stockData.map((stock, index) => {
                    // 가격 변동에 따른 highlight 클래스 설정
                    let highlightClass = '';
                    if (stock.highlightAnimation) {
                        if (stock.diff > 0) {
                            highlightClass = 'highlight-up'; // 상승 (빨간색)
                        } else if (stock.diff < 0) {
                            highlightClass = 'highlight-down'; // 하락 (파란색)
                        }
                    }

                    return (
                        <li
                            key={index}
                            className={`stock-price-list-stock-item ${highlightClass}`}
                            onClick={() => handleStockClick(stock)}
                        >
                            <div className="stock-price-list-stock-content">
                                <span className="stock-price-list-stock-name">{stock.name}</span>
                                <div className={`stock-price-list-stock-info ${stock.highlightColor}`}>
                                    <span className="stock-price-list-stock-price">
                                        {Number(stock.price).toLocaleString()}원
                                    </span>
                                    <div
                                        className={`stock-price-list-stock-diff ${stock.diff > 0 ? 'text-red' : 'text-blue'}`}
                                    >
                                        {Number(stock.diff) > 0
                                            ? `+${Number(stock.diff).toLocaleString()}`
                                            : Number(stock.diff).toLocaleString()}
                                        원
                                        <span className={stock.diffRate > 0 ? 'text-red' : 'text-blue'}>
                                            ({Math.abs(stock.diffRate)}%)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StockPriceList;
