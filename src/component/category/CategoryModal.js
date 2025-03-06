import React, { useState, useEffect } from 'react';
import '../../styles/CategoryModal.css';
import companyNameMapping from './CompanyNameMapping';
import categoryImages from '../category/CategoryImages';

const CategoryModal = ({ category, onClose }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `/api/stocks/category/${category.name}`
                );
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다');
                }
                const data = await response.json();
                setStocks(data);
            } catch (err) {
                console.error('Error fetching stocks:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, [category]);

    // 회사명을 한글로 변환하는 함수
    const getKoreanCompanyName = (englishName) => {
        const koreanName = companyNameMapping[englishName] || englishName;
        return koreanName;
    };

    // 가격 포맷팅 함수
    const formatPrice = (price) => {
        if (!price) {
            return 'N/A';
        } // 가격이 없을 경우 "N/A" 반환

        // ₩ 기호 제거, 쉼표 제거 후 숫자로 변환
        const numericPrice = parseFloat(
            price.toString().replace('₩', '').replace(/,/g, '')
        );

        // 천 단위 쉼표 추가 후 "원" 추가
        return `${Math.round(numericPrice).toLocaleString()}원`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* 모달 헤더 */}
                <div className="modal-header">
                    <button className="back-button" onClick={onClose}>
                        ←
                    </button>
                    {/* 카테고리 이미지 추가 */}
                    <img
                        src={categoryImages[category.name]}
                        alt={`${category.displayName} 이미지`}
                        className="modal-category-image"
                    />
                    <h2 className="modal-title">
                        {`${category.displayName} (${stocks.length}개)`}
                    </h2>

                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                {/* 수익률 요약 */}
                <div className="performance-summary">
                    <div className="period-label">수익률</div>
                    <div className="performance-periods">
                        {stocks.length > 0 ? (
                            <>
                                {[
                                    '어제보다',
                                    '1개월 전보다',
                                    '3개월 전보다',
                                    '1년 전보다',
                                ].map((period, index) => {
                                    const changeKey = [
                                        'yesterdayChange',
                                        'oneMonthChange',
                                        'threeMonthChange',
                                        'oneYearChange',
                                    ][index];
                                    const changeValue = stocks[0][changeKey];
                                    return (
                                        <div key={period} className="period">
                                            <div className="period-name">
                                                {period}
                                            </div>
                                            <div
                                                className={`period-value ${
                                                    changeValue >= 0
                                                        ? 'positive'
                                                        : 'negative'
                                                }`}
                                            >
                                                {changeValue >= 0 ? '+' : ''}
                                                {changeValue !== null
                                                    ? `${changeValue}%`
                                                    : 'N/A'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <p>수익률 정보를 가져올 수 없습니다.</p>
                        )}
                    </div>
                </div>

                {/* 주식 목록 */}
                <div className="stocks-list">
                    {loading ? (
                        <div className="loading">
                            데이터를 불러오는 중입니다...
                        </div>
                    ) : error ? (
                        <div className="error">
                            데이터를 불러오는 데 실패했습니다. 잠시 후 다시
                            시도해주세요.
                        </div>
                    ) : stocks.length > 0 ? (
                        stocks.map((stock) => (
                            <div key={stock.ticker} className="stock-item">
                                {/* 회사명 */}
                                <span className="stock-name">
                                    {getKoreanCompanyName(stock.companyName)}
                                </span>
                                {/* 현재가 */}
                                <span className="stock-price">
                                    {formatPrice(stock.currentPrice)}
                                </span>
                                {/* 변동률 */}
                                <span
                                    className={`stock-change ${
                                        stock.yesterdayChange >= 0
                                            ? 'positive'
                                            : 'negative'
                                    }`}
                                >
                                    {stock.yesterdayChange !== null
                                        ? `${stock.yesterdayChange >= 0 ? '+' : ''}${stock.yesterdayChange}%`
                                        : 'N/A'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>표시할 데이터가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
