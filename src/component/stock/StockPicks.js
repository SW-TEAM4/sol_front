import React, { useState } from 'react';
import '../../styles/StockPicks.css';
import samsungLogo from '../../images/samsung.svg';
import shinhanLogo from '../../images/shinhan.png';
import naverLogo from '../../images/naver.jpg';

const stocks = [
    {
        name: '신한지주',
        logo: shinhanLogo,
        description:
            '동사는 신한금융 계열사에 대한 지배/경영관리, 종속회사에 대한 자금지원 등을 주요 사업목적으로 2001년 설립된 금융지주회사임.',
        businesses: [
            {
                name: '금융그룹',
                rank: '시가총액 33위',
                image: 'https://static.toss.im/ml-product/financial-group-area.png',
            },
            {
                name: '시중은행',
                rank: '시가총액 22위',
                image: 'https://static.toss.im/ml-product/bank-area.png',
            },
            {
                name: '카드',
                rank: '시가총액 7위',
                image: 'https://static.toss.im/ml-product/credit-card-area.png',
            },
            {
                name: '생명보험',
                rank: '시가총액 11위',
                image: 'https://static.toss.im/ml-product/insurance-shield-green-area.png',
            },
        ],
    },
    {
        name: '삼성전자',
        logo: samsungLogo,
        description:
            '한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄로 구성된 글로벌 전자기업임.',
        businesses: [
            {
                name: '스마트폰제조',
                rank: '시가총액 2위',
                image: 'https://static.toss.im/ml-product/smartphone-area.png',
            },
            {
                name: '컴퓨터와 주변기기',
                rank: '시가총액 3위',
                image: 'https://static.toss.im/ml-product/computer-speaker-monitor-area.png',
            },
            {
                name: '냉방가전',
                rank: '시가총액 1위',
                image: 'https://static.toss.im/ml-product/fan-area.png',
            },
            {
                name: '주방가전',
                rank: '시가총액 1위',
                image: 'https://static.toss.im/ml-product/coffee-machine-area.png',
            },
        ],
    },
    {
        name: '네이버',
        logo: naverLogo,
        description:
            '2013년 한게임 사업부문을 인적분할하여 국내 1위 인터넷 검색 포털 네이버서비스를 기반으로 다양한 사업을 영위하고 있음.',
        businesses: [
            {
                name: '인터넷',
                rank: '시가총액 8위',
                image: 'https://static.toss.im/ml-product/internet-area.png',
            },
            {
                name: '온라인쇼핑',
                rank: '시가총액 10위',
                image: 'https://static.toss.im/ml-product/online-shopping-mall-area.png',
            },
            {
                name: '결제서비스',
                rank: '시가총액 12위',
                image: 'https://static.toss.im/ml-product/pos-payment-service-area.png',
            },
            {
                name: '인공지능',
                rank: '시가총액 6위',
                image: 'https://static.toss.im/ml-product/artificial-intelligence-area.png',
            },
        ],
    },
];

const StockPicks = () => {
    const [selectedStock, setSelectedStock] = useState(null);

    const openModal = (stock) => setSelectedStock(stock);
    const closeModal = () => setSelectedStock(null);

    return (
        <div className="stock-picks-container">
            <div className="stock-picks-header">
                <h2>맞춤 추천 종목</h2>
                <p>당신의 멘탈 지킴을 위한 우량주 TOP3</p>
            </div>

            <div className="stock-cards-container">
                {stocks.map((stock) => (
                    <div
                        key={stock.name}
                        className="stock-card"
                        onClick={() => openModal(stock)}
                    >
                        <div className="stock-logo">
                            <img src={stock.logo} alt={stock.name} />
                        </div>
                        <p className="stock-name">{stock.name}</p>
                    </div>
                ))}
            </div>

            {selectedStock && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>
                            ×
                        </button>
                        <h2>{selectedStock.name}</h2>
                        <p>{selectedStock.description}</p>

                        {selectedStock.businesses.length > 0 && (
                            <>
                                <h3>주요 사업</h3>
                                <div className="businesses-grid">
                                    {selectedStock.businesses.map(
                                        (business) => (
                                            <div
                                                key={business.name}
                                                className="business-item"
                                            >
                                                <img
                                                    src={business.image}
                                                    alt={business.name}
                                                />
                                                <div className="business-item-text">
                                                    <p>{business.name}</p>
                                                    <p>{business.rank}</p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockPicks;
