import React, { useEffect, useState, useRef } from 'react';
import './OnboardingStep2.css';

const OnboardingStep2 = () => {
    const bubbleRefs = [useRef(null), useRef(null), useRef(null)];
    const [visibleBubbles, setVisibleBubbles] = useState([false, false, false]);

    useEffect(() => {
        const options = {
            root: null, // viewport 기준
            threshold: 0.3, // 30% 이상 보이면 실행
        };

        const observerCallback = (entries) => {
            setVisibleBubbles((prev) => {
                const newState = [...prev];

                entries.forEach((entry) => {
                    // 해당 요소가 보이면 true로 변경
                    const index = bubbleRefs.findIndex(
                        (ref) => ref.current === entry.target
                    );
                    if (index !== -1) {
                        newState[index] = entry.isIntersecting;
                    }
                });

                return newState;
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        bubbleRefs.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            bubbleRefs.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <div className="step2_container">
            <h2 className="step2_title">
                파킹통장에서 높은 이자도 챙기고, 소액으로 주식투자를
                경험해보세요!
            </h2>

            {/* ✅ 첫 번째 말풍선 */}
            <div
                ref={bubbleRefs[0]}
                className={`speech-bubble bubble1 ${visibleBubbles[0] ? 'show' : ''}`}
            >
                <div className="bubble-content">
                    <strong># 주식 투자 시작에 대한 두려움</strong>
                    <p>나는 주식 한 번도 해본 적이 없어서 무서워…ㅠㅠ</p>
                </div>
                <div className="emoji-wrapper">
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thinking%20Face.png"
                        alt="Thinking Face"
                        className="emoji"
                    />
                </div>
            </div>

            {/* ✅ 두 번째 말풍선 */}
            <div
                ref={bubbleRefs[1]}
                className={`speech-bubble bubble2 ${visibleBubbles[1] ? 'show' : ''}`}
            >
                <div className="bubble-content">
                    <strong># 주식 투자에 대한 지식 부족</strong>
                    <p>
                        주식 해보고 싶긴한데... <br /> 어떤걸 구매 해야 할지
                        모르겠어
                    </p>
                </div>
                <div className="emoji-wrapper">
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Confounded%20Face.png"
                        alt="Confounded Face"
                        className="emoji"
                    />
                </div>
            </div>

            {/* ✅ 세 번째 말풍선 */}
            <div
                ref={bubbleRefs[2]}
                className={`speech-bubble bubble3 ${visibleBubbles[2] ? 'show' : ''}`}
            >
                <div className="bubble-content">
                    <strong># 주식 투자보단 적금</strong>
                    <p>
                        적금은 이자도 나오니까 <br /> 주식보다는 안전한 적금이
                        좋지 않을까?
                    </p>
                </div>
                <div className="emoji-wrapper">
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Diagonal%20Mouth.png"
                        alt="Face with Diagonal Mouth"
                        className="emoji3"
                    />
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep2;
