import React, { useEffect, useState, useRef } from 'react';
import './OnboardingStep5.css';
import CloverIcon from '../../assets/images/clover.svg'; // ✅ 네잎클로버
import Heart from '../../assets/images/heart.svg'; // ✅ 하트

const OnboardingStep5 = () => {
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
        <div className="step5_container">
            {/* 왼쪽 텍스트 */}
            <div className="step5_text" ref={textRef}>
                <div className={`step5_icon ${showText ? 'show' : ''}`}>
                    <img src={CloverIcon} alt="Clover Icon" />
                </div>
                <h2 className={`step5_title ${showText ? 'show' : ''}`}>
                    매일 1000원씩 <br /> 30일 동안 <br /> 투자 챌린지
                </h2>
                <p className={`step5_description ${showText ? 'show' : ''}`}>
                    챌린지 성공 시 <span className="highlight">10,000</span>{' '}
                    캐시백을 드립니다
                </p>
            </div>

            {/* 오른쪽 돼지 저금통 + 하트 */}
            <div className="step5_graphic">
                {/* ✅ 돼지 저금통 (외부 URL 이미지 사용) */}
                <img
                    src="https://resources-fe.toss.im/image-optimize/width=750,quality=75/https%3A%2F%2Fstatic.toss.im%2F3d%2Fu1F416-piggy-bank-side-apng.png"
                    alt="Piggy Bank"
                    className="piggy_bank"
                />

                {/* ✅ 하트 아이콘 (로컬 이미지 사용) */}
                <img src={Heart} alt="Heart Icon" className="heart" />
            </div>
        </div>
    );
};

export default OnboardingStep5;
