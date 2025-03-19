import React, { useEffect, useState, useRef } from 'react';
import './OnboardingStep3.css';
import EmojiBar from '../../assets/images/emoji_bar.svg';
import CardHand from '../../assets/images/card_hand.svg';
import Calendar from '../../assets/images/Calendar.svg';
import OKBoy from '../../assets/images/ok_boy.svg';
import SolLogo from '../../assets/images/sol_logo.svg';

const OnboardingStep3 = () => {
    const textRef = useRef(null);
    const boxRefs = [useRef(null), useRef(null), useRef(null)];

    const [showText, setShowText] = useState(false);
    const [visibleBoxes, setVisibleBoxes] = useState([false, false, false]);

    useEffect(() => {
        const options = { root: null, threshold: 0.3 };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.target === textRef.current) {
                    setShowText(entry.isIntersecting);
                }

                const index = boxRefs.findIndex(
                    (ref) => ref.current === entry.target
                );
                if (index !== -1) {
                    setVisibleBoxes((prev) => {
                        const newState = [...prev];
                        newState[index] = entry.isIntersecting;
                        return newState;
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        if (textRef.current) {
            observer.observe(textRef.current);
        }
        boxRefs.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
            boxRefs.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <div className="step3_wrapper">
            <div className="step3_container">
                {/* ✅ 제목 컨테이너 */}
                <div
                    ref={textRef}
                    className={`step3_text-container ${showText ? 'show' : ''}`}
                >
                    <img src={SolLogo} alt="SOL Logo" className="sol_logo" />
                    <h2 className="step3_title">
                        신한카드로 <br />{' '}
                        <span className="step3_highlight">SOLSOL</span>한 투자
                    </h2>
                    <p className="step3_description">
                        카드를 쓰면 내 파킹통장으로 캐시백을 드립니다.
                    </p>
                </div>

                {/* 🎉 이모지 바 */}
                <div className="emoji-bar-svg">
                    <div className="emoji-bar-container">
                        <img src={EmojiBar} alt="Emoji Bar" />
                        <img src={EmojiBar} alt="Emoji Bar" />
                    </div>
                </div>

                {/* 🏆 반투명 박스들 */}
                <div className="step3_boxes">
                    <div
                        ref={boxRefs[0]}
                        className={`step3_box right ${visibleBoxes[0] ? 'show' : ''}`}
                    >
                        <img
                            src={CardHand}
                            alt="Card Hand"
                            className="box-image"
                        />
                    </div>
                    <div
                        ref={boxRefs[1]}
                        className={`step3_box left ${visibleBoxes[1] ? 'show' : ''}`}
                    >
                        <h3>융통성 있는 투자</h3>
                        <img
                            src={Calendar}
                            alt="Calendar"
                            className="box-image"
                        />
                        <p className="p2">
                            파킹통장에서 증권계좌로
                            <br />
                            넘어가는 비율을 자유롭게 조정하세요!
                        </p>
                    </div>
                    <div
                        ref={boxRefs[2]}
                        className={`step3_box right_second ${visibleBoxes[2] ? 'show' : ''}`}
                    >
                        <h3>투자 성향 테스트</h3>
                        <img src={OKBoy} alt="OK Boy" className="box-image" />
                        <p>
                            여러분의 투자성향을
                            <br />
                            알려드릴게요!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep3;
