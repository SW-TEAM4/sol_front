import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import logoImage from '../../images/logo.svg';

const Header = () => {
    const navigate = useNavigate();

    const handleAccountClick = () => {
        navigate('/account');
    };

    return (
        <header className="header-container">
            {/* 로고 */}
            <div className="logo">
                <Link to="/">
                    <img src={logoImage} alt="Logo" className="logo-image" />
                </Link>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="nav-menu">
                <Link to="/">홈</Link>
                <Link to="/parking">파킹통장</Link>
                <Link to="/assets">자산</Link>
                <Link to="/news">뉴스</Link>
            </nav>

            {/* 알림 및 계정 버튼 */}
            <div className="account-section">
                <img
                    src="https://static.toss.im/3d/bell-apng.png"
                    alt="Notification"
                    className="notification-icon"
                />
                <button className="account-button" onClick={handleAccountClick}>
                    My account
                </button>
            </div>
        </header>
    );
};

export default Header;
