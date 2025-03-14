import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/MarketIndices.css';

const IndexCard = React.memo(({ name, data }) => {
    const isRising = data.change >= 0;
    const cardClass = isRising ? 'rising' : 'falling';

    return (
        <div className={`market-index ${cardClass}`}>
            <div className="market-index-text">
                <h3>{name}</h3>
                <p className="current-value">{data.current.toFixed(2)}</p>
                <p
                    className={`change-value ${isRising ? 'positive' : 'negative'}`}
                >
                    {isRising ? '+' : ''}
                    {data.change.toFixed(2)} ({isRising ? '+' : ''}
                    {data.changePercent.toFixed(1)}%)
                </p>
            </div>
        </div>
    );
});

const MarketIndices = () => {
    const [indices, setIndices] = useState({
        kospi: { current: 0, change: 0, changePercent: 0, chartData: [] },
        kosdaq: { current: 0, change: 0, changePercent: 0, chartData: [] },
        dow: { current: 0, change: 0, changePercent: 0, chartData: [] },
        nasdaq: { current: 0, change: 0, changePercent: 0, chartData: [] },
        sp500: { current: 0, change: 0, changePercent: 0, chartData: [] },
        usdKrw: { current: 0, change: 0, changePercent: 0, chartData: [] },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleIndices] = useState([
        'kospi',
        'kosdaq',
        'dow',
        'nasdaq',
        'sp500',
        'usdKrw',
    ]);

    // 지수 정보 (이름과 타입)
    const indexInfo = {
        kospi: { name: '코스피 종합', type: 'korean' },
        kosdaq: { name: '코스닥 종합', type: 'korean' },
        dow: { name: '다우 산업', type: 'american' },
        nasdaq: { name: '나스닥 종합', type: 'american' },
        sp500: { name: 'S&P 500', type: 'american' },
        usdKrw: { name: '원/달러 환율', type: 'currency' },
    };

    const fetchIndices = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'http://localhost:8000/market/indices'
            );
            setIndices(response.data);
            setError(null);
        } catch (err) {
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIndices();
        const intervalId = setInterval(fetchIndices, 300000);
        return () => clearInterval(intervalId);
    }, [fetchIndices]);

    if (loading) {
        return (
            <div className="market-indices-container loading">로딩 중...</div>
        );
    }
    if (error) {
        return <div className="market-indices-container error">{error}</div>;
    }

    // 필요한 지수만 렌더링
    const renderVisibleIndices = () => {
        return visibleIndices.map((key) => (
            <IndexCard
                key={key}
                name={indexInfo[key].name}
                data={indices[key]}
            />
        ));
    };

    return (
        <div className="market-indices-container">
            <div className="market-indices-scroll">
                {renderVisibleIndices()}
                {renderVisibleIndices()}
                {renderVisibleIndices()}
                {renderVisibleIndices()}
            </div>
        </div>
    );
};

export default MarketIndices;
