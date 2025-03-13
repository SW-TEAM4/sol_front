import React, { useEffect, useState, useRef } from 'react';
import './OnboardingStep6.css';
import MoneyHandIcon from '../../assets/images/coin_hand.svg'; // 💰 돈 들고 있는 손
import SolLogo from '../../assets/images/sol_logo.svg'; // ✅ 나는 SOL로 로고
import KakaoLoginIcon from '../../assets/images/kakao_icon.svg'; // 🟨 카카오 로그인
import NaverLoginIcon from '../../assets/images/naver_icon.svg'; // 🟩 네이버 로그인
import BallPattern from '../../assets/images/ball_icon_bar.svg'; // ⚽ 공 패턴

const OnboardingStep6 = () => {
    const textRef = useRef(null);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (textRef.current) {
                const rect = textRef.current.getBoundingClientRect();
                const windowHeight =
                    window.innerHeight || document.documentElement.clientHeight;

                // ✅ 화면에 보이면 showText = true, 벗어나면 false
                if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                    setShowText(true);
                } else {
                    setShowText(false); // ✅ 스크롤 올리면 다시 사라지도록
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // ✅ 페이지 진입 시 체크

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="step6_container">
            {/* 왼쪽 텍스트 영역 */}
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

            <div className="step6_buttons">
                {/* ✅ 카카오 로그인 SVG 클릭 가능 */}
                <img
                    src={KakaoLoginIcon}
                    alt="Kakao Login"
                    className="clickable_svg"
                    onClick={() =>
                        (window.location.href =
                            'http://localhost:8090/oauth2/authorization/kakao')
                    }
                />

                {/* ✅ 네이버 로그인 SVG 클릭 가능 */}
                <img
                    src={NaverLoginIcon}
                    alt="Naver Login"
                    className="clickable_svg"
                    onClick={() =>
                        (window.location.href =
                            'http://localhost:8090/oauth2/authorization/naver')
                    }
                />
            </div>

            {/* 하단 패턴 (끊김 없이 반복) */}
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
