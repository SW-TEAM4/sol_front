import React, { useEffect, useState } from 'react';
import './StockInfo.css';
import MovePageModal from './movePageModal';

const StockInfo = ({ parentSelectedStock, parentCloseClick }) => {
    const [stockData, setStockData] = useState(parentSelectedStock); // Initialize with selectedStock
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        setStockData(parentSelectedStock);
    }, []);

    useEffect(() => {
        console.log('stockinfo-init: ', parentSelectedStock);
        if (!parentSelectedStock) {
            return null;
        }
        setStockData(parentSelectedStock);
    }, [parentSelectedStock]); // selectedStock이나 kafkaData가 변경될 때마다 실행

    return (
        <div className="stock-info-container">
            {/* 이름 + 코드 + x 버튼  */}
            <div className="stock-info-stock-header">
                <div>
                    <h2 className="stock-info-stock-name">
                        {parentSelectedStock.name}{' '}
                        <span className="stock-info-stock-ticker">
                            {parentSelectedStock.ticker}
                        </span>
                    </h2>
                </div>

                <button className="stock-buy-info" onClick={openModal}>
                    구매하고 싶어요
                </button>
                <button
                    className="stock-info-close-button"
                    onClick={parentCloseClick}
                >
                    ×
                </button>
            </div>
            {/* 모달 컴포넌트 */}
            <MovePageModal open={isModalOpen} handleClose={closeModal} />
            {/* 가격 + 등락폭 */}
            <div className="stock-info-stock-price-container">
                <p className="stock-info-stock-price">
                    {Number(parentSelectedStock.price).toLocaleString()}원
                    <span
                        className={`stock-info-stock-diff ${parentSelectedStock.diff > 0 ? 'text-red' : 'text-blue'}`}
                    >
                        {parentSelectedStock.diff > 0
                            ? `+${parentSelectedStock.diff}`
                            : parentSelectedStock.diff}
                        원
                        <span
                            className={`stock-info-diff-rate ${parentSelectedStock.diffRate > 0 ? 'text-red' : 'text-blue'}`}
                        >
                            ({Math.abs(parentSelectedStock.diffRate)}%)
                        </span>
                    </span>
                </p>
                <div className="stock-info-stock-highlow">
                    <span className="stock-info-high-price">
                        고가:{' '}
                        {Number(parentSelectedStock.highPrice).toLocaleString()}
                        원
                    </span>
                    <span className="stock-info-low-price">
                        저가:{' '}
                        {Number(parentSelectedStock.lowPrice).toLocaleString()}
                        원
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StockInfo;
