import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../styles/PortfolioList.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioList = () => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                setLoading(true);
                // FastAPI 직접 호출
                const response = await fetch(
                    'http://127.0.0.1:8000/portfolio/list'
                );
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다');
                }

                // 원본 데이터 (배열)
                const rawData = await response.json();
                console.log('FastAPI에서 받은 원본 데이터:', rawData);

                if (!Array.isArray(rawData) || rawData.length === 0) {
                    throw new Error('유효한 포트폴리오 데이터가 없습니다');
                }

                // 데이터 가공 - Spring Boot 서버가 했던 작업을 직접 수행
                const totalCashBalance = rawData[0]?.krwBalance || 0; // 모든 항목이 같은 krwBalance 값을 가짐
                const totalPurchaseAmount = rawData.reduce(
                    (sum, item) => sum + (item.purchaseAmount || 0),
                    0
                );
                const totalCurrentValue = rawData.reduce(
                    (sum, item) => sum + (item.evaluationAmount || 0),
                    0
                );
                const totalProfitLoss = rawData.reduce(
                    (sum, item) => sum + (item.profitLoss || 0),
                    0
                );
                const totalProfitLossRate =
                    totalPurchaseAmount > 0
                        ? (totalProfitLoss / totalPurchaseAmount) * 100
                        : 0;

                // Spring Boot 서버가 반환하던 형식으로 데이터 구조화
                const formattedData = {
                    portfolioList: rawData,
                    totalCashBalance,
                    totalPurchaseAmount,
                    totalCurrentValue,
                    totalProfitLoss,
                    totalProfitLossRate,
                };

                setPortfolioData(formattedData);
            } catch (err) {
                console.error('Error fetching portfolio data:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (
        !portfolioData ||
        !portfolioData.portfolioList ||
        portfolioData.portfolioList.length === 0
    ) {
        return <p>No portfolio data available.</p>;
    }

    const pieData = {
        labels: portfolioData.portfolioList.map((asset) => asset.stockName),
        datasets: [
            {
                data: portfolioData.portfolioList.map(
                    (asset) => asset.evaluationAmount || 0
                ),
                backgroundColor: [
                    '#ff9999',
                    '#66b3ff',
                    '#99ff99',
                    '#ffcc99',
                    '#c2c2f0',
                    '#ffb366',
                    '#ff6666',
                    '#c2f0c2',
                ],
            },
        ],
    };

    const pieOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce(
                            (acc, value) => acc + value,
                            0
                        );
                        const currentValue =
                            dataset.data[tooltipItem.dataIndex];
                        const percentage = (
                            (currentValue / total) *
                            100
                        ).toFixed(1);
                        return `${tooltipItem.label}: ${percentage}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="portfolio-container">
            <div className="portfolio-summary">
                <h3>
                    총 보유 현금 금액:{' '}
                    {portfolioData.totalCashBalance?.toLocaleString() || 0}원
                </h3>
                <h3>
                    총 매수 금액:{' '}
                    {portfolioData.totalPurchaseAmount?.toLocaleString() || 0}원
                </h3>
                <h3>
                    현재 평가 금액:{' '}
                    {portfolioData.totalCurrentValue?.toLocaleString() || 0}원
                </h3>
                <h3>
                    총 평가 손익:{' '}
                    {portfolioData.totalProfitLoss?.toLocaleString() || 0}원
                </h3>
                <h3>
                    총 평가 수익률:{' '}
                    {portfolioData.totalProfitLossRate?.toFixed(2) || 0}%
                </h3>
            </div>

            {/* 원형 그래프 */}
            <div className="portfolio-chart">
                <Pie data={pieData} options={pieOptions} />
            </div>

            {/* 보유 자산 목록 테이블 */}
            <table className="portfolio-table">
                <thead>
                    <tr>
                        <th>보유 자산</th>
                        <th>보유 수량</th>
                        <th>매수 평균가</th>
                        <th>총 매수 금액</th>
                        <th>평가 금액</th>
                        <th>평가 손익</th>
                        <th>평가 수익률</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioData.portfolioList.map((asset) => (
                        <tr key={asset.ticker}>
                            <td>{asset.stockName}</td>
                            <td>{asset.stockQuantity}</td>
                            <td>
                                {(
                                    asset.averagePurchasePrice || 0
                                ).toLocaleString()}
                                원
                            </td>
                            <td>
                                {(asset.purchaseAmount || 0).toLocaleString()}원
                            </td>
                            <td>
                                {(asset.evaluationAmount || 0).toLocaleString()}
                                원
                            </td>
                            <td>
                                {(asset.profitLoss || 0).toLocaleString()}원
                            </td>
                            <td
                                className={
                                    asset.profitLossRate > 0
                                        ? 'profit-rate'
                                        : 'loss-rate'
                                }
                            >
                                {asset.profitLossRate > 0 ? '+' : ''}
                                {asset.profitLossRate?.toFixed(2) || 0}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PortfolioList;
