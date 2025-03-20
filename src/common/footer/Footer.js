import React, { useState } from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false); // 토글 상태 관리

    return (
        <footer className="footer-container">
            {/* 빈 공간 추가 */}
            <div className="footer-space"></div>

            {/* 푸터 콘텐츠와 토글 버튼을 감싸는 컨테이너 */}
            <div className="footer-content-wrapper">
                {/* 푸터 콘텐츠 */}
                <div className="footer-content">
                    © 2025 나는 SOL로. All rights reserved.
                </div>

                {/* 토글 버튼 및 리스트 컨테이너 */}
                <div className="footer-toggle-container">
                    <button
                        className="footer-toggle-button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        신한금융그룹 {isOpen ? '  ▲' : '  ▼'}
                    </button>

                    {/* 리스트 (토글 상태에 따라 보이게) */}
                    {isOpen && (
                        <ul className="footer-list">
                            <li>
                                <a href="https://www.shinhangroup.com/">
                                    신한금융지주회사
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhan.com/index.jsp">
                                    신한은행
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhancard.com/">
                                    신한카드
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhansec.com/">
                                    신한투자증권
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhanlife.co.kr/">
                                    신한라이프
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shcap.co.kr/">
                                    신한캐피탈
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhanfund.com/">
                                    신한자산운용
                                </a>
                            </li>
                            <li>
                                <a href="https://www.jejubank.co.kr/">
                                    제주은행
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhansavings.com/">
                                    신한저축은행
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhantrust.kr/">
                                    신한자산신탁
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhands.co.kr/">
                                    신한DS
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhanfundpartners.com/">
                                    신한펀드파트너스
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhanci.co.kr/">
                                    신한신용정보
                                </a>
                            </li>
                            <li>
                                <a href="http://www.shinhanrem.com/">
                                    신한리츠운용
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhanvc.com/kr">
                                    신한벤처투자
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shinhanez.co.kr/">
                                    신한EZ손해보험
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            {/* 빈 공간 추가 */}
            <div className="footer-space"></div>
        </footer>
    );
};

export default Footer;
