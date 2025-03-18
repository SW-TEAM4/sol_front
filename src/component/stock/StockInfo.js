import React from 'react';
import './StockInfo.css';

const StockInfo = ({ selectedStock }) => {
    if (!selectedStock) {
        return null;
    }

    return (
        <div className="stock-info-container">
            {/* 이름 + 코드 & 고가 + 저가 */}
            <div className="stock-info-stock-header">
                <h2 className="stock-info-stock-name">
                    {selectedStock.name} <span className="stock-info-stock-ticker">{selectedStock.ticker}</span>
                </h2>
                <div className="stock-info-stock-highlow">
                    <span className="stock-info-high-price">
                        고가: {Number(selectedStock.highPrice).toLocaleString()}원
                    </span>
                    <span className="stock-info-low-price">
                        저가: {Number(selectedStock.lowPrice).toLocaleString()}원
                    </span>
                </div>
            </div>

            {/* 가격 + 등락폭 */}
            <div className="stock-info-stock-price-container">
                <p className="stock-info-stock-price">{Number(selectedStock.price).toLocaleString()}원</p>
                <p className={`stock-info-stock-diff ${selectedStock.diff > 0 ? 'text-red' : 'text-blue'}`}>
                    {selectedStock.diff > 0 ? `+${selectedStock.diff}` : selectedStock.diff}원
                    <span className={`stock-info-diff-rate ${selectedStock.diffRate > 0 ? 'text-red' : 'text-blue'}`}>
                        ({Math.abs(selectedStock.diffRate)}%)
                    </span>
                </p>
            </div>
        </div>
    );
};

export default StockInfo;
