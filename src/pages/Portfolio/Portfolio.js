import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import './Portfolio.css';
import personal_investor1 from '../../images/personal_investor1.svg';
import personal_investor2 from '../../images/personal_investor2.svg';
import personal_investor3 from '../../images/personal_investor3.svg';
import portfolio_default from '../../images/portfolio_default.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPortfolioList, getUserPortfolioInform } from '../../api/StockAPI';

const Portfolio = () => {
    const navigate = useNavigate();

    //   useState를 최상단에서 선언
    const [portfolioData, setPortfolioData] = useState(null);
    const [portfolioUserData, setPortfolioUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //   페이지 로드 후 자동 리디렉트
    useEffect(() => {
        navigate('/assets');
    }, []);

    const fetchPortfolioData = async () => {
        try {
            setLoading(true);
            const response = await getPortfolioList(); // 포트폴리오 API 호출
            console.log('portfolio response: ', response);
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
            const investorClass = portfolioUserData.investorClass || 0; // 기본값 0

            const profileImage =
                portfolioUserData.personalInvestor === 'null'
                    ? portfolio_default
                    : investorClass >= 0 && investorClass <= 5
                      ? personal_investor1
                      : investorClass >= 6 && investorClass <= 10
                        ? personal_investor2
                        : investorClass >= 11 && investorClass <= 15
                          ? personal_investor3
                          : portfolio_default; // 기본 프로필 이미지

            const profileName =
                portfolioUserData.personalInvestor === 'null'
                    ? 'null'
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
                    {portfolioUserData?.personalInvestor !== 'null' ? (
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
                            <button className="portfolio-investment-test-btn">
                                투자 성향 테스트 하기
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/*<div className="portfolio-summary-container">*/}
            {/*    <div className="portfolio-summary">*/}
            {/*        <div className="portfolio-summary-grid">*/}
            {/*            <div className="portfolio-summary-item">*/}
            {/*                <p className="portfolio-label">총 보유 현금 금액</p>*/}
            {/*                <p className="portfolio-value large">*/}
            {/*                    {porfolioUserData.balance.toLocaleString()}*/}
            {/*                    <span className="portfolio-unit">KRW</span>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="portfolio-summary-item">*/}
            {/*                <p className="portfolio-label">총 보유자산</p>*/}
            {/*                <p className="portfolio-value large">*/}
            {/*                    {(*/}
            {/*                        portfolioData.totalCurrentValue +*/}
            {/*                        porfolioUserData.balance*/}
            {/*                    ).toLocaleString()}*/}
            {/*                    <span className="portfolio-unit">KRW</span>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <hr className="summary-divider" />*/}

            {/*        <div className="portfolio-invest-data">*/}
            {/*            <div className="portfolio-data-row">*/}
            {/*                <p className="portfolio-label">총 매수 금액</p>*/}
            {/*                <p className="portfolio-value">*/}
            {/*                    {portfolioData.totalPurchaseAmount.toLocaleString()}*/}
            {/*                    <span className="portfolio-unit">KRW</span>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            /!* 🔹 총 평가손익 (빨간색/파란색 적용) *!/*/}
            {/*            <div className="portfolio-data-row">*/}
            {/*                <p className="portfolio-label">총 평가손익</p>*/}
            {/*                <p*/}
            {/*                    className={`portfolio-value ${portfolioData.totalProfitLoss < 0 ? 'profit-negative' : 'profit-positive'}`}*/}
            {/*                >*/}
            {/*                    {portfolioData.totalProfitLoss.toLocaleString()}*/}
            {/*                    <span className="portfolio-unit">KRW</span>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="portfolio-data-row">*/}
            {/*                <p className="portfolio-label">현재 평가 금액</p>*/}
            {/*                <p className="portfolio-value">*/}
            {/*                    {portfolioData.totalCurrentValue.toLocaleString()}*/}
            {/*                    <span className="portfolio-unit">KRW</span>*/}
            {/*                </p>*/}
            {/*            </div>*/}

            {/*            <div className="portfolio-data-row">*/}
            {/*                <p className="portfolio-label">총 평가수익률</p>*/}
            {/*                <p*/}
            {/*                    className={`portfolio-value ${portfolioData.totalProfitLossRate < 0 ? 'profit-negative' : 'profit-positive'}`}*/}
            {/*                >*/}
            {/*                    {portfolioData.totalProfitLossRate.toFixed(2)}*/}
            {/*                    <span className="portfolio-unit">%</span>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!* 🔹 원형 차트 *!/*/}
            {/*    <div className="portfolio-chart-wrapper">*/}
            {/*        <div className="portfolio-chart-legend">*/}
            {/*            {assets.map((item) => (*/}
            {/*                <div key={item.id} className="legend-item">*/}
            {/*                    <span*/}
            {/*                        className="legend-color"*/}
            {/*                        style={{ backgroundColor: item.color }}*/}
            {/*                    ></span>*/}
            {/*                    <span className="legend-label">*/}
            {/*                        {item.label}*/}
            {/*                    </span>*/}
            {/*                    <span className="legend-value">*/}
            {/*                        {item.amount} KRW*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*        <div className="portfolio-chart-container">*/}
            {/*            <PieChart*/}
            {/*                series={[*/}
            {/*                    {*/}
            {/*                        data: assets,*/}
            {/*                        innerRadius: 50,*/}
            {/*                        outerRadius: 100,*/}
            {/*                        arcLabel: (item) =>*/}
            {/*                            `${item.value.toLocaleString()} %`,*/}
            {/*                    },*/}
            {/*                ]}*/}
            {/*                slotProps={{ legend: { hidden: true } }}*/}
            {/*                sx={{*/}
            {/*                    [`& .${pieArcLabelClasses.root}`]: {*/}
            {/*                        fill: '#000',*/}
            {/*                        fontSize: 10,*/}
            {/*                        fontWeight: 'bold',*/}
            {/*                    },*/}
            {/*                }}*/}
            {/*                width={250}*/}
            {/*                height={250}*/}
            {/*            />*/}
            {/*            <div className="chart-center-text">보유 비중</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

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
                                        {asset.averagePrice.toLocaleString()}
                                        <span className="portfolio-unit">
                                            KRW
                                        </span>
                                    </td>
                                    <td>
                                        {asset.purchaseAmount.toLocaleString()}
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
                                            ? (
                                                  (asset.profitLoss /
                                                      asset.purchaseAmount) *
                                                  100
                                              ).toFixed(2)
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
