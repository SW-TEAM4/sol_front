import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import UserChoice from './UserChoice';
import '../../styles/Home.css';
import HomeMainContent from './HomeMainContent';
import FootBanner from './FootBanner';
import QuizSection from './QuizSection';
import MarketIndices from './MarketIndices';

const Home = () => {
    const navigate = useNavigate();
    const [userIdx, setUserIdx] = useState(null);

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
            setUserIdx(savedUserIdx); // 상태 업데이트
            console.log('userIdx 저장 완료:', savedUserIdx);
        } else {
            console.log('userIdx 쿠키가 존재하지 않음, 온보딩으로 이동');
            window.location.reload();
            //navigate('/'); // 로그인 안 했으면 온보딩 페이지로 이동
        }
    }, [navigate]);

    return (
        <div className="home-container">
            {/* 사용자 정보 섹션 */}
            <UserChoice />

            {/* 메인 콘텐츠 (챌린지, 모은 돈, 파킹 통장 안내) */}
            <HomeMainContent />

            {/* 퀴즈 섹션 */}
            <QuizSection />

            {/* 카테고리 섹션 */}
            <CategoryList />

            {/* 지수 섹션 */}
            <MarketIndices />

            {/* 하단 배너 섹션 */}
            <FootBanner />
        </div>
    );
};

export default Home;
