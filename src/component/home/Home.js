import React from 'react';
import CategoryList from './CategoryList';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import '../../styles/Home.css';
import profileImage from '../../images/profile.svg';
import accountImage from '../../images/account.png';
import chickImage from '../../images/chick.svg';
import footBannerImage from '../../images/footbanner.svg';

const Home = () => {
    return (
        <>
            {/* Header 섹션 */}
            <Header />
            <div className="home-container">
                {/* Header 섹션 */}
                {/* 사용자 정보 섹션 */}
                <div className="user-info">
                    <div className="user-profile">
                        {/* 프로필 이미지와 텍스트를 row 형태로 배치 */}
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                        <div className="user-text">
                            <span className="user-name">
                                ?????님의 또래는{' '}
                                <span className="highlight">삼성전자</span>에
                            </span>
                            많이 투자하고 있어요!
                            <div className="user-tags">
                                <span>#20대</span>
                                <span>#대학생</span>
                                <span>#여성</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 챌린지 섹션 */}
                <div className="challenge-row">
                    {/* 하루에 천원 투자하기 */}
                    <div
                        className="challenge-card"
                        style={{ backgroundColor: '#C0D5FE' }}
                    >
                        <img
                            src="   https://resources-fe.toss.im/image-optimize/width=750,quality=75/https%3A%2F%2Fstatic.toss.im%2F3d%2Fu1F416-piggy-bank-side-apng.png"
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
                <div
                    className="parking-info"
                    style={{ backgroundColor: '#6FC4DA' }}
                >
                    <img
                        src={accountImage}
                        alt="Account"
                        className="parking-image"
                    />
                    <div className="parking-text">
                        매달 ?????%의 파킹 통장 잔액이 신한투자증권 계좌로
                        이체됩니다. 비율은 지갑에서 바꿀 수 있어요!
                    </div>
                </div>
                {/* 퀴즈 섹션 */}
                <div className="quiz-section">
                    {/* 텍스트 */}
                    <div className="quiz-header">
                        <h3>하루에 2문제 금융상식 퀴즈 풀고 캐시백 받자!</h3>
                        <p>덤으로 금융상식까지 UP</p>
                    </div>

                    {/* 퀴즈 카드와 이미지 */}
                    <div className="quiz-content">
                        {/* 퀴즈 카드 */}
                        <div className="quiz-cards">
                            {/* 첫 번째 카드 */}
                            <div className="quiz-card">
                                ‘시가’는 하루 중 주식 가격이 가장 높았을 때의
                                가격을 의미한다.
                                <br />
                                <button>O</button>
                                <button>X</button>
                            </div>

                            {/* 두 번째 카드 */}
                            <div className="quiz-card">
                                ‘시가’는 하루 중 주식 가격이 가장 높았을 때의
                                가격을 의미한다.
                                <br />
                                <button>O</button>
                                <button>X</button>
                            </div>
                        </div>

                        {/* 병아리 이미지 */}
                        <img
                            src={chickImage}
                            alt="Chick"
                            className="quiz-image"
                        />
                    </div>
                </div>
                {/* 카테고리 섹션 */}
                <CategoryList />
                {/* 하단 배너 섹션 */}
                <footer className="footer-info">
                    {/* 푸터 배너 이미지 */}
                    <img
                        src={footBannerImage}
                        alt="Footer Banner"
                        className="footer-banner-image"
                    />
                </footer>
            </div>
            {/* Footer 섹션 */}
            <Footer />
        </>
    );
};

export default Home;
