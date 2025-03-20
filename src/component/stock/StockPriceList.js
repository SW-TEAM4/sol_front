// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { WebSocketContext } from './WebsocketManage';
import './StockPriceList.css';

const StockPriceList = ({
    parentStockData,
    parentSelectedStock,
    onStockSelect,
}) => {
    const { kafkaData, kafkaSecondData } = useContext(WebSocketContext) || {};
    const [stockData, setStockData] = useState(parentStockData);
    const [selectedStock, setSelectedStock] = useState(null);
    const [error, setError] = useState(null); // 오류 상태

    const [filterBy, setFilterBy] = useState(null);

    useEffect(() => {
        if (onStockSelect && selectedStock === null) {
            const defaultStock = stockData.find(
                (stock) => stock.ticker === '005930'
            ); // 삼성전자 ticker
            setSelectedStock(defaultStock);
            onStockSelect(defaultStock); // 기본 주식 선택
        }
    }, [onStockSelect, selectedStock, stockData]);

    useEffect(() => {
        setStockData(parentStockData);
    }, [parentStockData]);

    // 특정 주식 박스 선택시 해당 티커 선택
    const handleStockClick = (stock) => {
        setSelectedStock(stock);
        if (onStockSelect) {
            onStockSelect(stock);
        }
    };

    const filteredData = useMemo(() => {
        if (!filterBy) {
            return stockData;
        }

        return stockData.sort((a, b) => {
            if (filterBy === 'price') {
                return b.price - a.price;
            }
            if (filterBy === 'tradingVolume') {
                return b.volume - a.volume;
            }
            if (filterBy === 'diffRate') {
                return b.diffRate - a.diffRate;
            }
            return 0;
        });
    }, [stockData, filterBy]);

    // 필터 콤보박스에서 선택된 값에 따른 필터링
    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setFilterBy(filterValue);
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
                                stock.ticker === kafkaData.ticker
                                    ? { ...stock, highlightAnimation: '' }
                                    : stock
                            )
                        );
                    }, 1000);

                    // 업데이트된 stock 데이터 반환
                    return {
                        ...stock, // 기존 값 유지
                        price: kafkaData.price, // 가격만 업데이트
                        diff: kafkaData.diff, // 가격 차이 업데이트
                        diffRate: kafkaData.diffRate, // 변동률 업데이트
                        startPrice: kafkaData.startPrice,
                        lowPrice: kafkaData.lowPrice,
                        highPrice: kafkaData.highPrice,
                        highlightColor, // 하이라이트 색상
                        highlightAnimation, // 애니메이션 추가
                    };
                }
                return stock;
            });
        });
    }, [kafkaData]);

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
                                stock.ticker === kafkaSecondData.ticker
                                    ? { ...stock, highlightAnimation: '' }
                                    : stock
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

    return (
        <div className="stock-price-list-container">
            {/* 필터와 실시간 표시 */}
            <div className="stock-price-list-chart-header">
                <div className="stock-price-list-realtime">실시간</div>
                <div className="stock-price-list-dropdown">
                    <select
                        className="stock-price-list-filter-select"
                        value={filterBy}
                        onChange={handleFilterChange}
                    >
                        <option value="">전체</option>
                        <option value="tradingVolume">거래량</option>
                        <option value="price">가격</option>
                        <option value="diffRate">변동률</option>
                    </select>
                </div>
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
                            className={`stock-price-list-stock-item ${highlightClass} `}
                            onClick={() => handleStockClick(stock)}
                        >
                            <div
                                className={`stock-price-list-stock-content ${parentSelectedStock?.ticker === stock.ticker ? 'selected' : ''}`}
                            >
                                <span className="stock-price-list-stock-index">
                                    {index + 1}
                                </span>
                                <span className="stock-price-list-stock-name">
                                    {stock.name}
                                </span>
                                <div
                                    className={`stock-price-list-stock-info ${stock.highlightColor}`}
                                >
                                    <span className="stock-price-list-stock-price">
                                        {Number(stock.price).toLocaleString()}원
                                    </span>
                                    <div
                                        className={`stock-price-list-stock-diff ${stock.diff > 0 ? 'text-red' : 'text-blue'}`}
                                    >
                                        {Number(stock.diff) > 0
                                            ? `+${Number(stock.diff).toLocaleString()}`
                                            : Number(
                                                  stock.diff
                                              ).toLocaleString()}
                                        원
                                        <span
                                            className={
                                                stock.diffRate > 0
                                                    ? 'text-red'
                                                    : 'text-blue'
                                            }
                                        >
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
