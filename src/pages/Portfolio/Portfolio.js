import React, { useState } from 'react';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import "./Portfolio.css";
import personal_investor1 from '../../images/personal_investor1.svg';
import personal_investor2 from '../../images/personal_investor2.svg';
import personal_investor3 from '../../images/personal_investor3.svg';
import portfolio_default from '../../images/portfolio_default.svg';

const Portfolio = () => {
    // 보유 비중 데이터
    const assets = [
        { id: 0, value: 54.7, label: "KRW", color: "#6FAE3F" },
        { id: 1, value: 18.2, label: "SHIB", color: "#1E56A0" },
        { id: 2, value: 10.0, label: "BTC", color: "#F4A900" },
        { id: 3, value: 9.0, label: "XRP", color: "#7442C8" },
        { id: 4, value: 8.1, label: "DOGE", color: "#E86A33" },
    ];

    // 보유 자산 목록 데이터
    const holdings = [
        { name: "시바이누", quantity: "871,319,875", price: "0.0290", totalBuy: "18,222", totalValue: "18,222", profit: "+0.00" },
        { name: "비트코인", quantity: "128,864,000", price: "9,995", totalBuy: "9,991", totalValue: "9,995", profit: "-0.03" },
        { name: "리플(XRP)", quantity: "2.69308425", price: "3,341", totalBuy: "9,000", totalValue: "8,975", profit: "-0.27" },
        { name: "도지코인", quantity: "26.30594348", price: "307.9", totalBuy: "8,100", totalValue: "8,078", profit: "-0.26" },
    ];

    const [userName, setUserName] = useState("우지호");
    const [investorClass, setInvestorClass] = useState(15);

    const profileImage =
        investorClass === null ? portfolio_default :
            investorClass >= 0 && investorClass <= 5 ? personal_investor1 :
            investorClass >= 6 && investorClass <= 10 ? personal_investor2 :
            investorClass >= 11 && investorClass <= 15 ? personal_investor3 :
            portfolio_default; // 기본값 설정

    return (
        <div className="portfolio-center">
            <div className="portfolio-card">
                {/* 🔹 사용자 정보 */}
                <div className="portfolio-user-info">
                    <img
                        src={profileImage}  // 동적으로 프로필 이미지 변경
                        alt="프로필"
                        className="portfolio-user-img"
                    />
                    <div className="portfolio-user-text-container">
                        {investorClass !== null ? (
                            // investorClass가 있으면 투자 성향 출력
                            <p className="portfolio-user-text">
                                {userName} 님의 주식 투자 성향은
                                <div className="portfolio-user-investorclass-container">
                                    <span className="portfolio-user-investorclass">
                                        {investorClass}
                                    </span>
                                    <span className="portfolio-user-text">입니다.</span>
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

                {/* 🔹 투자 개요 + 원형 차트 */}
                <div className="portfolio-summary-container">
                    {/* 투자 개요 */}
                    <div className="portfolio-summary">
                        <div className="portfolio-summary-grid">
                            <div className="portfolio-summary-item">
                                <p className="portfolio-label">
                                    총 보유 현금 금액
                                </p>
                                <p className="portfolio-value large">
                                    54,660 <span>KRW</span>
                                </p>
                            </div>
                            <div className="portfolio-summary-item">
                                <p className="portfolio-label">총 보유자산</p>
                                <p className="portfolio-value large">
                                    99,929 <span>KRW</span>
                                </p>
                            </div>
                        </div>

                        <hr className="summary-divider" />

                        <div className="portfolio-invest-data">
                            <div className="portfolio-data-row">
                                <p className="portfolio-label">총 매수 금액</p>
                                <p className="portfolio-value">
                                    45,318 <span>KRW</span>
                                </p>
                            </div>
                            <div className="portfolio-data-row">
                                <p className="portfolio-label">총 평가손익</p>
                                <p className="portfolio-value blue">
                                    -48 <span>KRW</span>
                                </p>
                            </div>

                            <div className="portfolio-data-row">
                                <p className="portfolio-label">
                                    현재 평가 금액
                                </p>
                                <p className="portfolio-value">
                                    45,269 <span>KRW</span>
                                </p>
                            </div>
                            <div className="portfolio-data-row">
                                <p className="portfolio-label">총 평가수익률</p>
                                <p className="portfolio-value blue">
                                    -0.11 <span className="percent">%</span>
                                </p>
                            </div>

                            <div className="portfolio-data-row">
                                <p className="portfolio-label">
                                    총 보유 현금 금액
                                </p>
                                <p className="portfolio-value">
                                    54,660 <span>KRW</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-chart-wrapper">
                        {/* 🔹 차트 왼쪽에 보유 비중 텍스트 추가 */}
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
                                        {item.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* 원형 차트 */}
                        <div className="portfolio-chart-container">
                            <PieChart
                                series={[
                                    {
                                        data: assets,
                                        innerRadius: 50,
                                        outerRadius: 100,
                                        arcLabel: (item) => `${item.value}%`,
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
                            <div className="chart-center-text">
                                보유 비중 (%)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="portfolio-container">
                    {/* 보유 자산 목록 */}
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
                                <th>평가손익(%)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {holdings.map((item, index) => (
                                <tr key={index}>
                                    <td className="portfolio-asset">
                                        {item.name}{' '}
                                    </td>
                                    <td className="portfolio-value">
                                        {item.quantity}
                                        <span>KRW</span>
                                    </td>
                                    <td className="portfolio-value">
                                        {item.price} <span>KRW</span>
                                    </td>
                                    <td className="portfolio-value">
                                        {item.totalBuy}
                                        <span>KRW</span>
                                    </td>
                                    <td className="portfolio-value">
                                        {item.totalValue}
                                        <span>KRW</span>
                                    </td>
                                    <td
                                        className={
                                            parseFloat(item.profit) < 0
                                                ? 'portfolio-profit-negative'
                                                : 'portfolio-profit-positive'
                                        }
                                    >
                                        {item.profit}
                                        <span className="percent">%</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
