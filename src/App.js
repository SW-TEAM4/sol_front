import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Router 추가
import OnboardingFinal from './pages/onboarding/onboarding_final'; //onboarding_final.js import
import Home from './component/home/Home';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            {' '}
            {/* Router로 감싸기 */}
            <div className="App">
                {!isLoggedIn ? (
                    <OnboardingFinal />
                ) : (
                    <div className="full-page">
                        <Home />
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
