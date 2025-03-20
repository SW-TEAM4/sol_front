import React, { useContext, useEffect, useState } from 'react';
import './StockPriceList.css';
import './StockInfo.css';
import './StockDashboard.css';
import StockInfo from './StockInfo';
import StockPriceList from './StockPriceList';
import StockChart from './StockChart';
import StockPicks from './StockPicks';
import MarketIndices from './MarketIndices';
import Portfolio from '../../pages/Portfolio/Portfolio';
import zIndex from '@mui/material/styles/zIndex';
import { fetchDefaultStockData } from '../../api/LiveStockAPI';

const StockDashboard = () => {
    // 주식 데이터 예시
    // const [stockData, setStockData] = useState([
    //     {
    //         ticker: '005930',
    //         name: '삼성전자',
    //         price: 80000,
    //         diff: 1000,
    //         diffRate: 1.25,
    //         tradingVolume: 100000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '000660',
    //         name: 'SK하이닉스',
    //         price: 130000,
    //         diff: -2000,
    //         diffRate: -1.5,
    //         tradingVolume: 50000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '272210',
    //         name: '한화시스템',
    //         price: 790000,
    //         diff: 3000,
    //         diffRate: 0.38,
    //         tradingVolume: 12000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '035420',
    //         name: 'NAVER',
    //         price: 450000,
    //         diff: -5000,
    //         diffRate: -1.1,
    //         tradingVolume: 30000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '064350',
    //         name: '현대로템',
    //         price: 580000,
    //         diff: 4000,
    //         diffRate: 0.69,
    //         tradingVolume: 18000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '103140',
    //         name: '풍산',
    //         price: 72000,
    //         diff: 500,
    //         diffRate: 0.7,
    //         tradingVolume: 60000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '005380',
    //         name: '현대차',
    //         price: 210000,
    //         diff: 2000,
    //         diffRate: 0.96,
    //         tradingVolume: 25000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '000270',
    //         name: '기아',
    //         price: 550000,
    //         diff: -3000,
    //         diffRate: -0.54,
    //         tradingVolume: 14000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '012330',
    //         name: '현대모비스',
    //         price: 90000,
    //         diff: 1500,
    //         diffRate: 1.69,
    //         tradingVolume: 80000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '090430',
    //         name: '아모레퍼시픽',
    //         price: 200000,
    //         diff: 1000,
    //         diffRate: 0.5,
    //         tradingVolume: 35000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '003490',
    //         name: '대한항공',
    //         price: 63000,
    //         diff: -700,
    //         diffRate: -1.1,
    //         tradingVolume: 92000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '010140',
    //         name: '삼성중공업',
    //         price: 65000,
    //         diff: 800,
    //         diffRate: 1.25,
    //         tradingVolume: 41000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '323410',
    //         name: '카카오뱅크',
    //         price: 48000,
    //         diff: 600,
    //         diffRate: 1.27,
    //         tradingVolume: 52000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '055550',
    //         name: '신한지주',
    //         price: 115000,
    //         diff: -1000,
    //         diffRate: -0.86,
    //         tradingVolume: 29000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '105560',
    //         name: 'KB금융',
    //         price: 210000,
    //         diff: 2000,
    //         diffRate: 0.96,
    //         tradingVolume: 17000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '068270',
    //         name: '셀트리온',
    //         price: 120000,
    //         diff: 500,
    //         diffRate: 0.42,
    //         tradingVolume: 47000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '207940',
    //         name: '삼성바이오로직스',
    //         price: 640000,
    //         diff: -6000,
    //         diffRate: -0.93,
    //         tradingVolume: 9000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '003230',
    //         name: '삼양식품',
    //         price: 65000,
    //         diff: 700,
    //         diffRate: 1.09,
    //         tradingVolume: 60000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '097950',
    //         name: 'CJ제일제당',
    //         price: 180000,
    //         diff: 1500,
    //         diffRate: 0.84,
    //         tradingVolume: 30000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    //     {
    //         ticker: '352820',
    //         name: '하이브',
    //         price: 260000,
    //         diff: 2000,
    //         diffRate: 0.78,
    //         tradingVolume: 12000,
    //         highPrice: 12000,
    //         lowPrice: 9000,
    //     },
    // ]);

    const [stockData, setStockData] = useState([]);

    const [selectedStock, setSelectedStock] = useState(null); //

    const onStockSelect = (pickedStock) => {
        const selected = stockData.find(
            (stock) => stock.ticker === pickedStock.ticker
        );
        console.log('selected: ', selected);
        console.log('selected picked: ', pickedStock);
        setSelectedStock(pickedStock); // 선택된 주식 데이터를 상태로 업데이트
    }; // 주식 선택시 실행되는 함수

    const handleClose = () => {
        setSelectedStock(null);
        console.log('handleClose: set null selectedStock');
    }; // 닫기(X) 버튼 클릭 핸들러

    useEffect(() => {
        const loadStockData = async () => {
            const data = await fetchDefaultStockData();
            setStockData(data);
        };
        loadStockData();
    }, []);

    useEffect(() => {
        // 초기값이 설정되면 selectedStock 값으로 상태를 업데이트
        setSelectedStock(selectedStock);
    }, [selectedStock, stockData]); // selectedStock이나 stockData가 변경될 때 실행

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* 대시보드 왼쪽 컨텐츠 (주식 정보 + 차트)*/}
                <div className="dashboard-left-container">
                    {selectedStock ? (
                        <>
                            <div className="dashboard-price-header">
                                <StockInfo
                                    parentSelectedStock={selectedStock}
                                    parentCloseClick={handleClose}
                                />
                            </div>
                            <div className="dashboard-chart-container">
                                <StockChart ticker={selectedStock.ticker} />
                            </div>
                            <div className="dashboard-recommend-content">
                                <StockPicks />
                            </div>
                            <div className="dashboard-rolling-multi-index">
                                <MarketIndices />
                            </div>
                        </>
                    ) : (
                        <Portfolio />
                    )}
                </div>

                <div className="dashboard-stock-list-container ">
                    {/* 주식 종목 리스트 */}
                    <StockPriceList
                        parentStockData={stockData}
                        parentSelectedStock={selectedStock}
                        onStockSelect={onStockSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default StockDashboard;
