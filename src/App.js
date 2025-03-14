import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingFinal from './pages/onboarding/onboarding_final';
import BasicInfoForm from './pages/BasicInfoForm';
import Home from './component/home/Home';
import RedirectHandler from './pages/onboarding/RedirectHandler';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/onboarding" element={<OnboardingFinal />} />
                <Route path="/basic-info" element={<BasicInfoForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<OnboardingFinal />} />{' '}
                {/* 기본적으로 온보딩 페이지로 */}
                <Route path="/redirect" element={<RedirectHandler />} />{' '}
                {/* /redirect 경로 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
