import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            {/* 푸터 콘텐츠 */}
            <div className="footer-content">
                © 2025 나는 SOL로. All rights reserved.
            </div>

            {/* 빈 공간 추가 */}
            <div className="footer-space"></div>
        </footer>
    );
};

export default Footer;
