import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pigImage from '../../images/pig.svg';
import moneyImage from '../../images/money.svg';
import penguinImage from '../../images/penguin.svg';
import { getTransferRatio } from '../../api/accountApi';

const HomeMainContent = ({ balance }) => {
    // balance prop 받기ㅎㅇㅎㅇ
    const [transferRatio, setTransferRatio] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ratio = await getTransferRatio();
                setTransferRatio(ratio);
            } catch (error) {
                console.error('데이터 조회 실패:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* 챌린지와 머니 섹션을 감싸는 컨테이너 */}
            <div className="sections-container">
                {/* 챌린지 섹션 */}
                <div className="challenge-section">
                    <h1 className="section-title">챌린지</h1>
                    <div
                        className="challenge-card"
                        onClick={() => navigate('/challenge')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="challenge-text">
                            <h3>
                                하루에 천원 투자하기 <br />
                                30일 챌린지
                            </h3>
                            <p>종목 결정이 어려우시면 도와드릴게요!</p>
                        </div>
                        <img
                            src={pigImage}
                            alt="Pig"
                            className="challenge-image"
                        />
                    </div>
                </div>

                {/* 지금까지 모은 돈 섹션 */}
                <div className="money-section">
                    <h1 className="section-title">지금까지 모은 돈</h1>
                    <div className="money-card">
                        <img
                            src={moneyImage}
                            alt="Money"
                            className="money-image"
                        />
                        <div className="money-text">
                            <p>현재 파킹통장 잔고에는</p>
                            <div className="money-amount">
                                <Link
                                    to="/parking"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <div className="money-amount">
                                        {balance !== null
                                            ? `${balance.toLocaleString()}원`
                                            : '?????원'}
                                        ›
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 파킹 통장 안내 섹션 */}
            <Link
                to="/parking"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <div className="parking-info">
                    <img
                        src={penguinImage}
                        alt="Account"
                        className="parking-image"
                    />
                    <div className="parking-text">
                        <p>
                            매달{' '}
                            <strong className="percentage-highlight">
                                {transferRatio !== null
                                    ? `${transferRatio.toLocaleString()}%`
                                    : '?????%'}
                            </strong>
                            의 파킹 통장 잔액이 신한투자증권 계좌로 이체됩니다.
                        </p>
                        <span className="parking-text-highlight">
                            비율은 지갑에서 바꿀 수 있어요!
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default HomeMainContent;
