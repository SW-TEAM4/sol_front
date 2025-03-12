import React, { useEffect, useState, useRef } from 'react';
import './OnboardingStep4.css';
import SolLogo from '../../assets/images/sol_logo.svg';
import CloudTalk from '../../assets/images/cloud_talk.svg';
import CloudTalk2 from '../../assets/images/cloud_talk_2.svg';
import Sample from '../../assets/images/onboarding_sample.svg';

const OnboardingStep4 = ({}) => {
    const textRef = useRef(null);
    const [showText, setShowText] = useState(false);

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

            // ✅ Step 4에서 Step 5로 배경 부드럽게 변경
            const step4 = document.querySelector('.step4_container');
            const step5 = document.querySelector('.step5_container');
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollY > windowHeight * 2.3) {
                step4.style.background =
                    'linear-gradient(180deg, #260909, #3D0D0D)';
                step5.style.background =
                    'linear-gradient(180deg, #3D0D0D, #4E1A1A)';
            } else {
                step4.style.background =
                    'linear-gradient(180deg, #1B1F3A, #260909)';
                step5.style.background =
                    'linear-gradient(180deg, #260909, #3D0D0D)';
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="step4_container">
            {/* ✅ SOL 로고 */}
            <img src={SolLogo} alt="SOL Logo" className="step4_solro" />

            {/* ✅ 주식 아이콘 */}
            <img src={Sample} alt="Stock Group" className="stock-group" />

            {/* ✅ 말풍선 그룹 */}
            <div className="bubble-group">
                {/* ✅ 왼쪽 말풍선 */}
                <div className="thought-bubble bubble-left">
                    <img
                        src={CloudTalk}
                        alt="Cloud Talk"
                        className="bubble-image1"
                    />
                    <div className="bubble-text1">
                        같은 투자성향을
                        <br />
                        가진 사람들은 <br />
                        어떤 종목에 투자하지?
                    </div>
                </div>

                {/* ✅ 오른쪽 말풍선 */}
                <div className="thought-bubble bubble-right">
                    <img
                        src={CloudTalk2}
                        alt="Cloud Talk 2"
                        className="bubble-image2"
                    />
                    <div className="bubble-text2">
                        내 또래는
                        <br /> 얼마만큼 투자 중이지?
                    </div>
                </div>
            </div>

            {/* ✅ 돋보기 이미지 */}
            <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Right.png"
                alt="Magnifying Glass"
                className="magnifier"
            />

            {/* ✅ 투자 선택 안내 텍스트 (스크롤 감지) */}
            <p
                ref={textRef}
                className={`step4_description ${showText ? 'show' : ''}`}
            >
                투자 선택에 대한 <br /> 의사 결정을 도와줄게요.
            </p>

            {/* ✅ 캐릭터 이미지 */}
            <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Woman%20Shrugging%20Light%20Skin%20Tone.png"
                alt="Woman Shrugging"
                className="step4_character"
            />
        </div>
    );
};

export default OnboardingStep4;
