import React from 'react';
import CategoryList from './CategoryList';
import UserChoice from './UserChoice';
import '../../styles/Home.css';
import accountImage from '../../images/account.png';
import FootBanner from './FootBanner';
import QuizSection from './QuizSection';

const Home = () => {
    return (
        <div className="home-container">
            {/* 사용자 정보 섹션 */}
            <UserChoice />

            {/* 챌린지 섹션 */}
            <div className="challenge-row">
                {/* 하루에 천원 투자하기 */}
                <div
                    className="challenge-card"
                    style={{ backgroundColor: '#C0D5FE' }}
                >
                    <img
                        src="https://resources-fe.toss.im/image-optimize/width=750,quality=75/https%3A%2F%2Fstatic.toss.im%2F3d%2Fu1F416-piggy-bank-side-apng.png"
                        alt="Pig"
                        className="challenge-image"
                    />
                    <div className="challenge-text">
                        <h3>하루에 천원 투자하기</h3>
                        <p>30일 챌린지</p>
                        <p>종목 결정이 어려우시면</p>
                        <p>도와드릴게요!</p>
                    </div>
                </div>

                {/* 지금까지 모은 돈 */}
                <div
                    className="money-card"
                    style={{ backgroundColor: '#FFA163' }}
                >
                    <img
                        src="https://static.toss.im/3d/moneybag-shield-coin-apng.png"
                        alt="Money"
                        className="challenge-image"
                    />
                    <div className="money-text">
                        <h3>지금까지 모은 돈</h3>
                        <p>현재 파킹통장 잔고에는</p>
                        <p>
                            <strong>?????원</strong>
                        </p>
                    </div>
                </div>
            </div>

            {/* 파킹 통장 안내 섹션 */}
            <div className="parking-info">
                <img
                    src={accountImage}
                    alt="Account"
                    className="parking-image"
                />
                <div className="parking-text">
                    <p>
                        매달 ?????%의 파킹 통장 잔액이 신한투자증권 계좌로
                        이체됩니다.
                    </p>
                    <p>비율은 지갑에서 바꿀 수 있어요!</p>
                </div>
            </div>

            {/* 퀴즈 섹션 */}
            <QuizSection />

            {/* 카테고리 섹션 */}
            <CategoryList />

            {/* 하단 배너 섹션 */}
            <FootBanner />
        </div>
    );
};

export default Home;
