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
import BasicInfoForm from './pages/BasicInfoForm';
import RedirectHandler from './pages/onboarding/RedirectHandler';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

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
                                    path="/account"
                                    element={<div>내 계좌 페이지 (준비중)</div>}
                                />
                                <Route
                                    path="/challenge"
                                    element={<div>챌린지 페이지 (준비 중)</div>}
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
