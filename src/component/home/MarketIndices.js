import React, { useState, useEffect } from 'react';
import { getMarketIndices } from '../../api/StockAPI';
import '../../styles/MarketIndices.css';

const IndexCard = ({ name, data }) => {
    const isRising = data.changeValue >= 0;
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
                    {data.changeValue.toFixed(2)} ({isRising ? '+' : ''}
                    {data.changePercent.toFixed(1)}%)
                </p>
            </div>
        </div>
    );
};

const MarketIndices = () => {
    const [indices, setIndices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndices = async () => {
            try {
                setLoading(true);
                const rawData = await getMarketIndices();

                // 데이터를 배열 형태로 저장
                const formattedData = rawData.map((item) => ({
                    name: item.indexName,
                    current: Number(item.current),
                    changeValue: Number(item.changeValue),
                    changePercent: Number(item.changePercent),
                }));

                setIndices(formattedData);
                setError(null);
            } catch (err) {
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchIndices();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    if (loading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="market-indices-container">
            <div className="market-indices-scroll">
                {indices.map((item, index) => (
                    <IndexCard key={index} name={item.name} data={item} />
                ))}
            </div>
        </div>
    );
};

export default MarketIndices;
