import React from 'react';
import '../../styles/Header.css';
import logoImage from '../../images/logo.svg';

const Header = () => {
    return (
        <header className="header-container">
            {/* 로고 */}
            <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-image" />
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="nav-menu">
                <a href="/home">홈</a>
                <a href="/parking">파킹통장</a>
                <a href="/assets">자산</a>
                <a href="/news">뉴스</a>
            </nav>

            {/* 알림 및 계정 버튼 */}
            <div className="account-section">
                <img
                    src="https://static.toss.im/3d/bell-apng.png"
                    alt="Notification"
                    className="notification-icon"
                />
                <button className="account-button">My account</button>
            </div>
        </header>
    );
};

export default Header;
