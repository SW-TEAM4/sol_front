import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동을 위한 useNavigate 추가
import './OnboardingStep6.css';
import MoneyHandIcon from '../../assets/images/coin_hand.svg';
import SolLogo from '../../assets/images/sol_logo.svg';
import KakaoLoginIcon from '../../assets/images/kakao_icon.svg';
import NaverLoginIcon from '../../assets/images/naver_icon.svg';
import BallPattern from '../../assets/images/ball_icon_bar.svg';

const OnboardingStep6 = () => {
    const textRef = useRef(null);
    const [showText, setShowText] = useState(false);
    const navigate = useNavigate(); // ✅ 로그인 후 이동을 위해 사용

    useEffect(() => {
        const handleScroll = () => {
            if (textRef.current) {
                const rect = textRef.current.getBoundingClientRect();
                const windowHeight =
                    window.innerHeight || document.documentElement.clientHeight;

                if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                    setShowText(true);
                } else {
                    setShowText(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /**
     * ✅ 카카오 로그인 버튼 클릭 시 실행
     */
    const handleKakaoLogin = () => {
        window.location.href =
            'http://localhost:8090/oauth2/authorization/kakao';
    };

    /**
     * ✅ 네이버 로그인 버튼 클릭 시 실행
     */
    const handleNaverLogin = () => {
        window.location.href =
            'http://localhost:8090/oauth2/authorization/naver';
    };

    return (
        <div className="step6_container">
            <div className="step6_text" ref={textRef}>
                <div className="step6_icon">
                    <img src={MoneyHandIcon} alt="Money Hand" />
                </div>
                <div className="step6_logo">
                    <img src={SolLogo} alt="나는 SOL로" />
                </div>
                <h1 className={`step6_main_title ${showText ? 'show' : ''}`}>
                    예비 주주님들 <br />
                    겁 먹지 말고 <br />
                    <span className="highlight-text">같이 잘 굴려봅시다.</span>
                </h1>
            </div>

            {/* 로그인 버튼 */}
            <div className="step6_buttons">
                <img
                    src={KakaoLoginIcon}
                    alt="Kakao Login"
                    className="clickable_svg"
                    onClick={handleKakaoLogin}
                />
                <img
                    src={NaverLoginIcon}
                    alt="Naver Login"
                    className="clickable_svg"
                    onClick={handleNaverLogin}
                />
            </div>

            {/* 하단 패턴 */}
            <div className="step6_pattern">
                <div className="ball_pattern_scroll">
                    <img src={BallPattern} alt="Ball Pattern" />
                    <img src={BallPattern} alt="Ball Pattern" />
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep6;
