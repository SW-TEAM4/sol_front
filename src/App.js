import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import Home from './component/home/Home';
import NewsList from './component/news/NewsList';
import PortfolioList from './component/portfolio/PortfolioList';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/parking"
                            element={<div>파킹통장 페이지 (준비 중)</div>}
                        />
                        <Route
                            path="/assets"
                            element={<div>자산 페이지 (준비 중)</div>}
                        />
                        <Route path="/news" element={<NewsList />} />
                        <Route
                            path="/account"
                            element={<div>내 계좌 페이지 (준비중)</div>}
                        />
                        <Route
                            path="/challenge"
                            element={<div>챌린지 페이지 (준비 중)</div>}
                        />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
