import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import OnboardingFinal from './pages/onboarding/onboarding_final';
import Home from './component/home/Home';
import NewsList from './component/news/NewsList';
import './App.css';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import PortfolioList from './component/portfolio/PortfolioList';
import ParkingAccount from './pages/ParkingAccount';
import BasicInfoForm from './pages/BasicInfoForm';
import RedirectHandler from './pages/onboarding/RedirectHandler';
import Challenge from './pages/challenge';
import AnalyzeTest from './pages/analyzeTest';
import Question1 from './pages/question1';
import Question2 from './pages/question2';
import Question3 from './pages/question3';
import Question4 from './pages/question4';
import Question5 from './pages/question5';
import Result from './pages/result';
import Portfolio from './pages/Portfolio/Portfolio';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalScore, setTotalScore] = useState(0);
    const [selectedScores, setSelectedScores] = useState([]);

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

        const userIdx = getCookie('userIdx'); // 로그인 여부 확인
        if (userIdx) {
            localStorage.setItem('userIdx', userIdx); // localStorage에도 저장
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    // 투자 성향 테스트 점수 추가 및 삭제 함수
    const addScore = (score) => {
        setTotalScore((prev) => prev + score);
        setSelectedScores((prev) => [...prev, score]); // 🛠 점수 기록
    };

    const subtractScore = () => {
        setSelectedScores((prev) => {
            if (prev.length === 0) {
                return prev;
            } // 선택한 점수가 없으면 그대로
            const lastScore = prev[prev.length - 1]; // 마지막 선택 점수 가져오기
            setTotalScore((prev) => prev - lastScore); // 🛠 해당 점수 빼기

            return prev.slice(0, prev.length - 1);
        });
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <Router>
            <div className="App">
                {/* 로그인된 상태에서만 Header와 Footer 표시 */}
                {isLoggedIn && (
                    <>
                        <Header />
                        <div className="content-container">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate to="/home" />}
                                />
                                <Route path="/home" element={<Home />} />
                                <Route path="/news" element={<NewsList />} />
                                <Route
                                    path="/assets"
                                    element={<PortfolioList />}
                                />
                                <Route
                                    path="/parking"
                                    element={<ParkingAccount />}
                                />
                                <Route
                                    path="/basic-info"
                                    element={<BasicInfoForm />}
                                />
                                <Route
                                    path="/redirect"
                                    element={<RedirectHandler />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/home" />}
                                />
                                <Route
                                    path="/question"
                                    element={<AnalyzeTest />}
                                />
                                <Route
                                    path="/q1"
                                    element={<Question1 addScore={addScore} />}
                                />
                                <Route
                                    path="/q2"
                                    element={
                                        <Question2
                                            addScore={addScore}
                                            subtractScore={subtractScore}
                                        />
                                    }
                                />
                                <Route
                                    path="/q3"
                                    element={
                                        <Question3
                                            addScore={addScore}
                                            subtractScore={subtractScore}
                                        />
                                    }
                                />
                                <Route
                                    path="/q4"
                                    element={
                                        <Question4
                                            addScore={addScore}
                                            subtractScore={subtractScore}
                                        />
                                    }
                                />
                                <Route
                                    path="/q5"
                                    element={
                                        <Question5
                                            addScore={addScore}
                                            subtractScore={subtractScore}
                                        />
                                    }
                                />
                                <Route
                                    path="/result"
                                    element={
                                        <Result
                                            totalScore={totalScore}
                                            setTotalScore={setTotalScore}
                                        />
                                    }
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </>
                )}

                {/* 로그인되지 않은 상태에서 접근 가능한 경로 */}
                {!isLoggedIn && (
                    <Routes>
                        <Route path="/" element={<OnboardingFinal />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}
export default App;
