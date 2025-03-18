import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import "./Portfolio.css";
import personal_investor1 from '../../images/personal_investor1.svg';
import personal_investor2 from '../../images/personal_investor2.svg';
import personal_investor3 from '../../images/personal_investor3.svg';
import portfolio_default from '../../images/portfolio_default.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Portfolio = () => {

    const navigate = useNavigate();

    //   useState를 최상단에서 선언
    const [portfolioData, setPortfolioData] = useState(null);
    const [porfolioUserData , setPorfolioUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState();
    const [investorClass, setInvestorClass] = useState();

    //   페이지 로드 후 자동 리디렉트
    useEffect(() => {
        navigate('/assets');
    }, []);
    const fetchPortfolioData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/portfolio/list'); // FastAPI 호출
            if (!response.ok) {
                throw new Error('데이터를 불러오는데 실패했습니다');
            }
            const rawData = await response.json();
            console.log('FastAPI에서 받은 데이터:', rawData);

            if (!Array.isArray(rawData) || rawData.length === 0) {
                throw new Error('유효한 포트폴리오 데이터가 없습니다');
            }

            // 데이터 가공
            const totalCashBalance = rawData[0]?.krwBalance || 0;
            const totalPurchaseAmount = rawData.reduce((sum, item) => sum + (item.purchaseAmount || 0), 0);
            const totalCurrentValue = rawData.reduce((sum, item) => sum + (item.evaluationAmount || 0), 0);
            const totalProfitLoss = rawData.reduce((sum, item) => sum + (item.profitLoss || 0), 0);
            const totalProfitLossRate = totalPurchaseAmount > 0 ? (totalProfitLoss / totalPurchaseAmount) * 100 : 0;

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
    // userIdx를 로컬스토리지에서 가져오는 함수
    const getUserIdx = () => {
        return localStorage.getItem('userIdx');
    };
    // 쿠키에서 JWT 토큰을 가져오는 함수
    const getAuthToken = () => {
        const cookies = document.cookie.split('; ');
        const jwtCookie = cookies.find((row) => row.startsWith('jwtToken='));

        if (!jwtCookie) {
            return null;
        } // 쿠키에 없으면 null 반환
        return `Bearer ${jwtCookie.split('=')[1]}`;
    };
    const getUserInvestmentInfo = async () => {
        try {
            const userIdx = getUserIdx();
            const getbalance = await axios.get(
                `http://localhost:8090/api/portfolio/accountInformation?userIdx=${userIdx}`,
                {
                    headers: {
                        Authorization: getAuthToken(), // 쿠키에서 가져옴
                    },
                    withCredentials: true, // 쿠키 전송
                }
            );

            setPorfolioUserData(getbalance.data);
            setInvestorClass(getbalance.data.personalInvestor);
            setUserName(getbalance.data.userName);

        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {


        fetchPortfolioData();
        getUserInvestmentInfo();
    }, []);

    //   데이터가 로딩 중이면 "Loading..." 표시
    if (loading) return <p>Loading...</p>;

    //   오류 발생 시 오류 메시지 표시
    if (error) return <p>Error: {error}</p>;

    //   데이터가 비어있을 경우
    if (!portfolioData || !portfolioData.portfolioList || portfolioData.portfolioList.length === 0) {
        return <p>No portfolio data available.</p>;
    }

    //   총 평가 금액 계산
    const totalEvaluationAmount = portfolioData.portfolioList.reduce(
        (sum, asset) => sum + (asset.evaluationAmount || 0),
        0
    );

    //   자산별 데이터 생성 (퍼센트 + 금액 저장)
    const assets = portfolioData.portfolioList.map((asset, index) => ({
        id: index,
        value: totalEvaluationAmount > 0
            ? ((asset.evaluationAmount / totalEvaluationAmount) * 100).toFixed(2)  // 🔹 퍼센트 변환
            : 0,
        amount: asset.evaluationAmount.toLocaleString(), // 🔹 원래 평가 금액 (금액 표기용)
        label: asset.stockName,
        color: ["#6FAE3F", "#1E56A0", "#F4A900", "#7442C8", "#E86A33"][index % 5],
    }));

    const profileImage =
        investorClass === 'null' ? portfolio_default :
            investorClass >= 0 && investorClass <= 5 ? personal_investor1 :
            investorClass >= 6 && investorClass <= 10 ? personal_investor2 :
            investorClass >= 11 && investorClass <= 15 ? personal_investor3 :
            portfolio_default; // 기본값 설정

    const profileName =
        investorClass === 'null' ? 'null' :
            investorClass >= 0 && investorClass <= 5   ? "안숙이" :
            investorClass >= 6 && investorClass <= 10  ? "차철이" :
            investorClass >= 11 && investorClass <= 15 ? "열식이" :
            ""; // 기본값 설정
    return (
            <div className="portfolio-card">
                {/* 🔹 사용자 정보 */}
                <div className="portfolio-user-info">
                    <img
                        src={profileImage} // 동적으로 프로필 이미지 변경
                        alt="프로필"
                        className="portfolio-user-img"
                    />
                    <div className="portfolio-user-text-container">
                        {investorClass !== 'null' ? (
                            // investorClass가 있으면 투자 성향 출력
                            <p className="portfolio-user-text">
                                {userName} 님의 주식 투자 성향은
                                <div className="portfolio-user-investorclass-container">
                                    <span className="portfolio-user-investorclass">
                                        {profileName}
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
                                    {userName} 님의 주식 투자 성향을 알려주세요.
                                </p>
                                <button className="portfolio-investment-test-btn">
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
                                <p className="portfolio-label">
                                    총 보유 현금 금액
                                </p>
                                <p className="portfolio-value large">
                                    {porfolioUserData.balance.toLocaleString()}
                                    <span className="portfolio-unit">KRW</span>
                                </p>
                            </div>
                            <div className="portfolio-summary-item">
                                <p className="portfolio-label">총 보유자산</p>
                                <p className="portfolio-value large">
                                    {(
                                        portfolioData.totalCurrentValue +
                                        porfolioUserData.balance
                                    ).toLocaleString()}
                                    <span className="portfolio-unit">KRW</span>
                                </p>
                            </div>
                        </div>

                        <hr className="summary-divider" />

                        <div className="portfolio-invest-data">
                            <div className="portfolio-data-row">
                                <p className="portfolio-label">총 매수 금액</p>
                                <p className="portfolio-value">
                                    {portfolioData.totalPurchaseAmount.toLocaleString()}
                                    <span className="portfolio-unit">KRW</span>
                                </p>
                            </div>
                            {/* 🔹 총 평가손익 (빨간색/파란색 적용) */}
                            <div className="portfolio-data-row">
                                <p className="portfolio-label">총 평가손익</p>
                                <p
                                    className={`portfolio-value ${portfolioData.totalProfitLoss < 0 ? 'profit-negative' : 'profit-positive'}`}
                                >
                                    {portfolioData.totalProfitLoss.toLocaleString()}
                                    <span className="portfolio-unit">KRW</span>
                                </p>
                            </div>
                            <div className="portfolio-data-row">
                                <p className="portfolio-label">
                                    현재 평가 금액
                                </p>
                                <p className="portfolio-value">
                                    {portfolioData.totalCurrentValue.toLocaleString()}
                                    <span className="portfolio-unit">KRW</span>
                                </p>
                            </div>

                            <div className="portfolio-data-row">
                                <p className="portfolio-label">총 평가수익률</p>
                                <p
                                    className={`portfolio-value ${portfolioData.totalProfitLossRate < 0 ? 'profit-negative' : 'profit-positive'}`}
                                >
                                    {portfolioData.totalProfitLossRate.toFixed(
                                        2
                                    )}
                                    <span className="portfolio-unit">%</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 원형 차트 */}
                    <div className="portfolio-chart-wrapper">
                        <div className="portfolio-chart-legend">
                            {assets.map((item) => (
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
                                        data: assets,
                                        innerRadius: 50,
                                        outerRadius: 100,
                                        arcLabel: (item) =>
                                            `${item.value.toLocaleString()} %`,
                                    },
                                ]}
                                slotProps={{ legend: { hidden: true } }}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: '#000',
                                        fontSize: 10,
                                        fontWeight: 'bold',
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
                                {portfolioData.portfolioList.map(
                                    (asset, index) => (
                                        <tr key={index}>
                                            <td>{asset.stockName}</td>
                                            <td>{asset.stockQuantity}</td>
                                            <td>
                                                {asset.averagePurchasePrice.toLocaleString()}
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
                                                {asset.evaluationAmount.toLocaleString()}
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
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

export default Portfolio;
