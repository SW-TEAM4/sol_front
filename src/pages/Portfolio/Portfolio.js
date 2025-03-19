import React, { useContext, useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import './Portfolio.css';
import personal_investor1 from '../../images/personal_investor1.svg';
import personal_investor2 from '../../images/personal_investor2.svg';
import personal_investor3 from '../../images/personal_investor3.svg';
import portfolio_default from '../../images/portfolio_default.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPortfolioList, getUserPortfolioInform } from '../../api/StockAPI';
import { WebSocketContext } from '../../component/stock/WebsocketManage';

const Portfolio = () => {
    const { kafkaData, kafkaSecondData } = useContext(WebSocketContext) || {};
    const navigate = useNavigate();

    //   useState를 최상단에서 선언
    const [portfolioData, setPortfolioData] = useState([]);
    const [portfolioUserData, setPortfolioUserData] = useState(null);
    const [summaryData, setSummaryData] = useState({
        totalPurchaseAmount: 0,
        totalCurrentValue: 0,
        totalProfitLoss: 0,
        totalProfitLossRate: 0,
        totalAssets: 0,
    }); // 포트폴리오 요약 데이터
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);

    //   페이지 로드 후 자동 리디렉트
    useEffect(() => {
        navigate('/assets');
    }, []);

    const fetchPortfolioData = async () => {
        try {
            setLoading(true);
            console.log(' 포트폴리오 데이터 요청 시작');
            const response = await getPortfolioList(); // 포트폴리오 API 호출
            console.log(' 포트폴리오 데이터 응답:', response);
            if (response.length === 0) {
                throw new Error('데이터를 불러오는데 실패했습니다');
            }

            setPortfolioData(response);
        } catch (err) {
            console.error('Error fetching portfolio data:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserInvestmentInfo = async () => {
        try {
            console.log('사용자 포트폴리오 정보 요청 시작');
            const response = await getUserPortfolioInform();
            console.log('유저 포트폴리오 response: ', response);
            // if (!response.data.length === 0) {
            //     throw new Error('데이터를 불러오는데 실패했습니다');
            // }
            if (!response.status === 200) {
                throw new Error('데이터를 불러오는데 실패했습니다');
            }

            setPortfolioUserData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log('포트폴리오 init');
        fetchPortfolioData();
        getUserInvestmentInfo();
    }, []);

    useEffect(() => {
        if (!portfolioUserData) {
            return;
        }

        console.log('포트폴리오 유저 data set', portfolioUserData);

        if (!portfolioUserData.hasOwnProperty('profileImage')) {
            const investorClass = portfolioUserData.investorClass || 100; // 기본값 0

            const profileImage =
                portfolioUserData.personalInvestor === 100
                    ? portfolio_default
                    : investorClass >= 0 && investorClass <= 5
                      ? personal_investor1
                      : investorClass >= 6 && investorClass <= 10
                        ? personal_investor2
                        : investorClass >= 11 && investorClass <= 15
                          ? personal_investor3
                          : portfolio_default; // 기본 프로필 이미지

            const profileName =
                portfolioUserData.personalInvestor === 100
                    ? ''
                    : investorClass >= 0 && investorClass <= 5
                      ? '안숙이'
                      : investorClass >= 6 && investorClass <= 10
                        ? '차철이'
                        : investorClass >= 11 && investorClass <= 15
                          ? '열식이'
                          : ''; // 기본값

            setPortfolioUserData((prevData) => ({
                ...prevData,
                profileImage,
                profileName,
            }));
        }
    }, [portfolioUserData]);
    // 포트폴리오 요약 데이터 계산
    useEffect(() => {
        console.log(' useEffect 실행됨');
        console.log(' loading 상태:', loading);
        console.log(' portfolioData 상태:', portfolioData);
        console.log(' portfolioUserData 상태:', portfolioUserData);

        if (loading) {
            console.log(' 실행 중단');
            return;
        }

        if (portfolioData.length === 0 || !portfolioUserData) {
            console.log(
                'portfolioData가 비어 있음 또는 portfolioUserData가 없음 - 실행 중단'
            );
            return;
        }

        console.log(' 데이터가 존재');

        /*주식 금액 먼저 더하기 */
        const totalEvaluationAmount = portfolioData.reduce(
            (sum, asset) => sum + (asset.closingPrice * asset.stockCount || 0), // * asset.stockCount (주식 수량 고려 가능)
            0
        );

        // 하나의 reduce로 모든 값 계산
        const summary = portfolioData.reduce(
            (acc, asset, index) => {
                const stockValue = asset.closingPrice * asset.stockCount || 0; // 현재 평가 금액 계산
                acc.totalPurchaseAmount += asset.purchaseAmount || 0; // 총 매수 금액
                acc.totalCurrentValue += stockValue; // 총 평가 금액

                acc.chartData.push({
                    id: index,
                    value:
                        totalEvaluationAmount > 0
                            ? (
                                  (stockValue / totalEvaluationAmount) *
                                  100
                              ).toFixed(2)
                            : 0, // 비율 계산
                    amount: stockValue.toLocaleString(), // 금액 표기
                    label: asset.stockName, // 종목명
                    color: [
                        '#6FAE3F',
                        '#1E56A0',
                        '#F4A900',
                        '#7442C8',
                        '#E86A33',
                    ][index % 5], // 색상
                });
                return acc;
            },
            {
                totalPurchaseAmount: 0,
                totalCurrentValue: 0,
                totalEvaluationAmount: 0, //  총 평가 금액 (차트 비율 계산용)
                chartData: [], //  차트 데이터 저장
            }
        );

        // 평가손익 및 수익률 계산
        summary.totalProfitLoss =
            summary.totalCurrentValue - summary.totalPurchaseAmount; // 총 평가 손익 = 총 평가금액 - 총 매수 금액
        summary.totalProfitLossRate = // 총 평가 수익률 = (총 평가 손익 / 총 매수 금액) * 100
            summary.totalPurchaseAmount > 0
                ? (summary.totalProfitLoss / summary.totalPurchaseAmount) * 100
                : 0;

        // 총 보유자산 = 총 평가 금액 + 보유 현금
        summary.totalAssets =
            summary.totalCurrentValue + (portfolioUserData.balance || 0);

        // 상태 업데이트
        setSummaryData(summary);
        setChartData(summary.chartData);
    }, [portfolioData, portfolioUserData]);

    // 카프카 실시간 데이터 처리
    useEffect(() => {
        if (!kafkaData && !kafkaSecondData) {
            return;
        }
        setPortfolioData((prevData) => {
            return prevData.map((portfolio) => {
                let newClosingPrice = portfolio.closingPrice;
                if (kafkaData && portfolio.ticker === kafkaData.ticker) {
                    newClosingPrice = kafkaData.price;
                } else if (
                    kafkaSecondData &&
                    portfolio.ticker === kafkaSecondData.ticker
                ) {
                    newClosingPrice = kafkaSecondData.price;
                } else {
                    return portfolio; // 변경 사항 없으면 기존 데이터 유지
                }

                const newProfitLoss =
                    (newClosingPrice - portfolio.averagePrice) *
                    portfolio.stockCount;
                const newProfitLossRate = parseFloat(
                    ((newProfitLoss / portfolio.purchaseAmount) * 100).toFixed(
                        2
                    )
                );

                return {
                    ...portfolio,
                    closingPrice: newClosingPrice,
                    profitLoss: newProfitLoss,
                    profitLossRate: newProfitLossRate,
                };
            });
        });
    }, [kafkaData, kafkaSecondData]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    // //   데이터가 비어있을 경우
    // if (
    //     !portfolioData ||
    //     !portfolioData.portfolioList ||
    //     portfolioData.portfolioList.length === 0
    // ) {
    //     return <p>No portfolio data available.</p>;
    // }
    //
    // //   총 평가 금액 계산
    // const totalEvaluationAmount = portfolioData.portfolioList.reduce(
    //     (sum, asset) => sum + (asset.evaluationAmount || 0),
    //     0
    // );
    //
    // //   자산별 데이터 생성 (퍼센트 + 금액 저장)
    // const assets = portfolioData.portfolioList.map((asset, index) => ({
    //     id: index,
    //     value:
    //         totalEvaluationAmount > 0
    //             ? (
    //                   (asset.evaluationAmount / totalEvaluationAmount) *
    //                   100
    //               ).toFixed(2) // 🔹 퍼센트 변환
    //             : 0,
    //     amount: asset.evaluationAmount.toLocaleString(), // 🔹 원래 평가 금액 (금액 표기용)
    //     label: asset.stockName,
    //     color: ['#6FAE3F', '#1E56A0', '#F4A900', '#7442C8', '#E86A33'][
    //         index % 5
    //     ],
    // }));

    return (
        <div className="portfolio-card">
            {/* 🔹 사용자 정보 */}
            <div className="portfolio-user-info">
                <img
                    src={portfolioUserData?.profileImage} // 동적으로 프로필 이미지 변경
                    alt="프로필"
                    className="portfolio-user-img"
                />
                <div className="portfolio-user-text-container">
                    {portfolioUserData?.personalInvestor !== 100 ? (
                        // investorClass가 있으면 투자 성향 출력
                        <p className="portfolio-user-text">
                            {portfolioUserData?.userName} 님의 주식 투자 성향은
                            <div className="portfolio-user-investorclass-container">
                                <span className="portfolio-user-investorclass">
                                    {portfolioUserData?.profileName}
                                </span>
                                <span className="portfolio-user-text">
                                    입니다.
                                </span>
                            </div>
                        </p>
                    ) : (
                        // investorClass가 없으면 다른 내용 출력
                        <div>
                            <p className="portfolio-user-text">
                                {portfolioUserData?.userName} 님의 주식 투자
                                성향을 알려주세요.
                            </p>
                            <button
                                className="portfolio-investment-test-btn"
                                onClick={() => navigate('/question')}
                            >
                                투자 성향 테스트 하기
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="portfolio-summary-container">
                <div className="portfolio-summary">
                    <div className="portfolio-summary-grid">
                        <div className="portfolio-summary-item">
                            <p className="portfolio-label">총 보유 현금 금액</p>
                            <p className="portfolio-value large">
                                {(
                                    portfolioUserData?.balance ?? 0
                                ).toLocaleString()}
                                <span className="portfolio-unit">KRW</span>
                            </p>
                        </div>
                        <div className="portfolio-summary-item">
                            <p className="portfolio-label">총 보유자산</p>
                            <p className="portfolio-value large">
                                {summaryData?.totalAssets.toLocaleString() ||
                                    '0'}
                                <span className="portfolio-unit">KRW</span>
                            </p>
                        </div>
                    </div>

                    <hr className="summary-divider" />

                    <div className="portfolio-invest-data">
                        <div className="portfolio-data-row">
                            <p className="portfolio-label">총 매수 금액</p>
                            <p className="portfolio-value">
                                {summaryData?.totalPurchaseAmount.toLocaleString() ||
                                    '0'}
                                <span className="portfolio-unit">KRW</span>
                            </p>
                        </div>
                        {/* 🔹 총 평가손익 (빨간색/파란색 적용) */}
                        <div className="portfolio-data-row">
                            <p className="portfolio-label">총 평가손익</p>
                            <p
                                className={`portfolio-value ${
                                    summaryData.totalProfitLoss < 0
                                        ? 'profit-negative'
                                        : 'profit-positive'
                                }`}
                            >
                                {summaryData?.totalProfitLoss.toLocaleString() ||
                                    '0'}
                                <span className="portfolio-unit">KRW</span>
                            </p>
                        </div>
                        <div className="portfolio-data-row">
                            <p className="portfolio-label">현재 평가 금액</p>
                            <p className="portfolio-value">
                                {summaryData?.totalCurrentValue.toLocaleString() ||
                                    '0'}
                                <span className="portfolio-unit">KRW</span>
                            </p>
                        </div>

                        <div className="portfolio-data-row">
                            <p className="portfolio-label">총 평가수익률</p>
                            <p
                                className={`portfolio-value ${
                                    summaryData.totalProfitLossRate < 0
                                        ? 'profit-negative'
                                        : 'profit-positive'
                                }`}
                            >
                                {summaryData?.totalProfitLossRate.toFixed(2) ||
                                    '0'}
                                <span className="portfolio-unit">%</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/*  원형 차트*/}
                <div className="portfolio-chart-wrapper">
                    <div className="portfolio-chart-legend">
                        {chartData.map((item) => (
                            <div key={item.id} className="legend-item">
                                <span
                                    className="legend-color"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="legend-label">
                                    {item.label}
                                </span>
                                <span className="legend-value">
                                    {item.amount} KRW
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="portfolio-chart-container">
                        <PieChart
                            series={[
                                {
                                    data: chartData,
                                    innerRadius: 50,
                                    outerRadius: 100,
                                },
                            ]}
                            slotProps={{
                                legend: { hidden: true },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: (params) =>
                                        `${params.data.label}: ${params.data.value}%`,
                                },
                            }}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    display: 'none',
                                },
                            }}
                            width={250}
                            height={250}
                        />
                        <div className="chart-center-text">보유 비중</div>
                    </div>
                </div>
            </div>

            {/* 🔹 보유 자산 목록 */}
            <div className="portfolio-container">
                <div className="portfolio-card portfolio-table-container">
                    <h3 className="portfolio-table-title">보유자산 목록</h3>
                    <table className="portfolio-table">
                        <thead>
                            <tr>
                                <th>보유자산</th>
                                <th>보유수량</th>
                                <th>매수평균가</th>
                                <th>매수금액</th>
                                <th>평가금액</th>
                                <th>평가손익</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioData.map((asset, index) => (
                                <tr key={index}>
                                    <td>{asset.stockName}</td>
                                    <td>{asset.stockCount}</td>
                                    <td>
                                        {asset.averagePrice?.toLocaleString()}
                                        <span className="portfolio-unit">
                                            KRW
                                        </span>
                                    </td>
                                    <td>
                                        {asset.purchaseAmount?.toLocaleString()}
                                        <span className="portfolio-unit">
                                            KRW
                                        </span>
                                    </td>
                                    <td>
                                        {Number(
                                            asset.closingPrice *
                                                asset.stockCount
                                        ).toLocaleString()}
                                        <span className="portfolio-unit">
                                            KRW
                                        </span>
                                    </td>
                                    <td
                                        className={
                                            (asset.profitLoss /
                                                asset.purchaseAmount) *
                                                100 <
                                            0
                                                ? 'portfolio-profit-negative'
                                                : 'portfolio-profit-positive'
                                        }
                                    >
                                        {asset.purchaseAmount > 0
                                            ? asset.profitLossRate.toFixed(2)
                                            : '0'}
                                        <span className="portfolio-unit">
                                            %
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
