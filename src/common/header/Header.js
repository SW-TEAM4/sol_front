import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import logoImage from '../../images/logo.svg';
import axios from 'axios';

const Header = () => {
    /**
     * ✅ 로그아웃 기능
     */
    const navigate = useNavigate();
    const [personalInvestor, setPersonalInvestor] = useState(null); // 초기값 null

    /**
     * ✅ 로그아웃 기능
     */
    const handleLogout = () => {
        localStorage.removeItem('userIdx'); // ✅ localStorage에서 삭제
        document.cookie =
            'userIdx=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // ✅ 쿠키 삭제
        navigate('/'); // ✅ 온보딩 화면으로 이동
        window.location.reload();
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8090/api/user/user',
                    {
                        withCredentials: true, // 쿠키 포함 요청
                    }
                );

                // personalInvestor 값 설정
                setPersonalInvestor(response.data.result.personalInvestor);
            } catch (err) {
                console.log('사용자 정보 가져오기 실패:', err);
            }
        };

        fetchUserData();
    }, []);

    return (
        <header className="header-container">
            {/* 로고 */}
            <div className="logo">
                <Link to="/">
                    <img src={logoImage} alt="Logo" className="logo-image" />
                </Link>
            </div>

            {/* 오른쪽 그룹 */}
            <div className="header-right">
                {/* 네비게이션 메뉴 */}
                <nav className="nav-menu">
                    <Link to="/">홈</Link>
                    <Link to="/parking">파킹통장</Link>
                    {personalInvestor !== null ? (
                        <Link to="/assets">자산</Link>
                    ) : (
                        <Link to="/question">자산</Link>
                    )}
                    <Link to="/news">뉴스</Link>
                </nav>

                {/* 알림 및 계정 버튼 */}
                <div className="account-section">
                    <img
                        src="https://static.toss.im/3d/bell-apng.png"
                        alt="Notification"
                        className="notification-icon"
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }} // 클릭 가능하게 설정
                    />
                    {/*<Link to="/account" className="account-button-link">*/}
                    {/*    <button className="account-button">My account</button>*/}
                    {/*</Link>*/}
                </div>
            </div>
        </header>
    );
};

export default Header;
