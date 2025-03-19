import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import UserChoice from './UserChoice';
import '../../styles/Home.css';
import HomeMainContent from './HomeMainContent';
import QuizSection from './QuizSection';
import MarketIndices from './MarketIndices';
import StockPicks from './StockPicks';
import { getBalance } from '../../api/accountApi';

const Home = () => {
    const navigate = useNavigate();
    const [userIdx, setUserIdx] = useState(null);
    const [balance, setBalance] = useState(null); // 잔고 상태 관리

    // 초기 잔고 로드
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balanceData = await getBalance();
                setBalance(balanceData);
            } catch (error) {
                console.error('잔고 가져오기 실패:', error);
            }
        };
        fetchBalance();
    }, []);

    // 캐시백 받으면 호출되는 함수
    const handleCashback = (amount) => {
        setBalance((prevBalance) => prevBalance + amount);
    };

    // 사용자 인증 처리
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

        const savedUserIdx = getCookie('userIdx');
        if (savedUserIdx) {
            localStorage.setItem('userIdx', savedUserIdx);
            setUserIdx(savedUserIdx);
        } else {
            window.location.reload();
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <UserChoice />
            <HomeMainContent balance={balance} /> {/* balance prop 전달 */}
            <QuizSection onCashback={handleCashback} /> {/* 함수 전달 */}
            <CategoryList />
            {/*<StockPicks />*/}
            {/*<MarketIndices />*/}
        </div>
    );
};

export default Home;
