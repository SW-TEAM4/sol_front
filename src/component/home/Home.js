import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import UserChoice from './UserChoice';
import Header from '../../common/header/Header';
import '../../styles/Home.css';
import penguinImage from '../../images/penguin.svg';
import pigImage from '../../images/pig.svg';
import moneyImage from '../../images/money.svg';
import FootBanner from './FootBanner';
import QuizSection from './QuizSection';

const Home = () => {
    const navigate = useNavigate();
    const [userIdx, setUserIdx] = useState(null);

    /**
     * 쿠키에서 userIdx 가져와서 localStorage에 저장
     */
    useEffect(() => {
        const getCookie = (name) => {
            const cookies = document.cookie.split('; ');
            for (let i = 0; i < cookies.length; i++) {
                const [key, value] = cookies[i].split('=');
                if (key === name) {
                    return value;
                }
            }
            return null;
        };

        const savedUserIdx = getCookie('userIdx'); // 쿠키에서 userIdx 가져오기

        if (savedUserIdx) {
            localStorage.setItem('userIdx', savedUserIdx); // localStorage에 저장
            setUserIdx(savedUserIdx); //상태 업데이트
            console.log('userIdx 저장 완료:', savedUserIdx);
        } else {
            console.log('userIdx 쿠키가 존재하지 않음, 온보딩으로 이동');
            navigate('/'); // 로그인 안 했으면 온보딩 페이지로 이동
        }
    }, [navigate]);

    /**
     * 로그아웃 기능
     */
    // const handleLogout = () => {
    //     localStorage.removeItem('userIdx'); // localStorage에서 삭제
    //     document.cookie =
    //         'userIdx=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // 쿠키 삭제
    //     setUserIdx(null);
    //     navigate('/'); // 온보딩 화면으로 이동
    // };

    return (
        <div className="home-container">
            <Header />
            {/* 사용자 정보 및 로그아웃 버튼 */}
            <UserChoice />
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
                                        1,564,005원 ›
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 파킹 통장 안내 섹션 */}
            <div className="parking-info">
                <img
                    src={penguinImage}
                    alt="Account"
                    className="parking-image"
                />
                <div className="parking-text">
                    <p>
                        매달{' '}
                        <strong className="percentage-highlight">10%</strong>의
                        파킹 통장 잔액이 신한투자증권 계좌로 이체됩니다.
                    </p>
                    <span className="parking-text-highlight">
                        비율은 지갑에서 바꿀 수 있어요!
                    </span>
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
