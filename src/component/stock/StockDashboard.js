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

const StockDashboard = () => {
    const [selectedStock, setSelectedStock] = useState({
        ticker: '005930',
        name: '삼성전자',
        price: 80000,
        diff: 1000,
        diffRate: 1.25,
        tradingVolume: 100000,
        highPrice: 12000,
        lowPrice: 9000,
    }); // 초기값을 기본값

    const saveSelectedStock = (stock) => {
        setSelectedStock(stock);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <Header />
            </div>
            <div className="dashboard-content">
                {/* 대시보드 왼쪽 컨텐츠 (주식 정보 + 차트)*/}
                <div className="dashboard-left-container">
                    {/* 선택한 주식 정보 표시 */}
                    <div className="dashboard-price-header">
                        <StockInfo selectedStock={selectedStock} />
                    </div>

                    <div className="dashboard-chart-container">
                        <StockChart ticker={selectedStock.ticker} />
                    </div>
                    <div className="dashboard-recommend-content"></div>
                    <div className="dashboard-rolling-multi-index"></div>
                </div>

                <div className="dashboard-stock-list-container ">
                    {/* 주식 종목 리스트 */}
                    <StockPriceList stockData={selectedStock} onStockSelect={saveSelectedStock} />
                </div>
            </div>
            <div className="dashboard-footer">
                <Footer />
            </div>
        </div>
    );
};

export default StockDashboard;
