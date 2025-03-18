import React, { useEffect, useState } from 'react';
import './StockPriceList.css';
// import StockChart from './StockChart.css';
import './StockInfo.css';
import './StockDashboard.css';
import StockInfo from './StockInfo';
import StockPriceList from './StockPriceList';
import StockChart from './StockChart';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import Portfolio from '../../pages/Portfolio/Portfolio';

const StockDashboard = () => {
    const [selectedStock, setSelectedStock] = useState( null
       /* {
        ticker: '005930',
        name: '삼성전자',
        price: 80000,
        diff: 1000,
        diffRate: 1.25,
        tradingVolume: 100000,
        highPrice: 12000,
        lowPrice: 9000,
    }*/
    ); // 초기값을 기본값

    const [isStockSelected, setIsStockSelected] = useState(false); // 주식 선택 여부 상태 추가

    useEffect(() => {
        setSelectedStock(false);
        closeOverlay();
    }, []); // 빈 배열을 넣어 첫 렌더링 시 한 번만 실행되도록 설정

    const saveSelectedStock = (stock) => {
        setSelectedStock(stock);
        setIsStockSelected(true); // 주식이 선택되면 Portfolio 숨기기
    };
    const closeOverlay = () => {
        setSelectedStock(null);    //  선택된 주식 초기화
        setIsStockSelected(false); //  Portfolio로 되돌아가기
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* 대시보드 왼쪽 컨텐츠 (주식 정보 + 차트)*/}
                <div className="dashboard-left-container">
                    {!isStockSelected || selectedStock === null ? ( // ✅ 선택된 주식이 없으면 Portfolio 표시
                        <Portfolio />
                    ) : (
                        <div className="dashboard-overlay"> {/* 덮어씌울 영역 */}
                            <button className="close-button" onClick={closeOverlay}>✖</button>
                            {selectedStock && ( //  selectedStock이 있을 때만 렌더링
                                <>
                                    <div className="dashboard-price-header">
                                        <StockInfo selectedStock={selectedStock} />
                                    </div>

                                    <div className="dashboard-chart-container">
                                        <StockChart ticker={selectedStock.ticker} />
                                    </div>

                                    <div className="dashboard-recommend-content"></div>
                                    <div className="dashboard-rolling-multi-index"></div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="dashboard-stock-list-container ">
                    {/* 주식 종목 리스트 */}
                    <StockPriceList stockData={selectedStock} onStockSelect={saveSelectedStock} selectedStock={selectedStock}   />
                </div>
            </div>
        </div>
    );
};

export default StockDashboard;
