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
                const response = await fetch('/api/portfolio/list'); // Spring Boot API 호출
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다');
                }
                const data = await response.json();
                setPortfolioData(data); // 데이터를 상태에 저장
            } catch (err) {
                console.error('Error fetching portfolio data:', err.message);
                setError(err.message); // 에러 메시지 저장
            } finally {
                setLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchPortfolioData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // 로딩 중 메시지 표시
    }

    if (error) {
        return <p>Error: {error}</p>; // 에러 메시지 표시
    }

    if (!portfolioData || !portfolioData.portfolioList) {
        return <p>No portfolio data available.</p>; // 데이터가 없을 경우 메시지 표시
    }

    const pieData = {
        labels: portfolioData.portfolioList.map((asset) => asset.stockName),
        datasets: [
            {
                data: portfolioData.portfolioList.map(
                    (asset) => asset.evaluationAmount || 0
                ),
                backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
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

    if (!portfolioData || !portfolioData.portfolioList) {
        return <p>No portfolio data available.</p>;
    }

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
                        <th>평가 수익률</th> {/* 새 열 추가 */}
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
