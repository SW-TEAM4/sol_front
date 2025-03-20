import { useNavigate } from 'react-router-dom';
import './question.css';
import { useEffect } from 'react';

const Question2 = ({ addScore, subtractScore }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // 화면 들어오면 스크롤 막기
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            // 화면 나가면 스크롤 원상복구
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleAnswer = (score) => {
        addScore(score);
        navigate('/q3');
    };

    return (
        <div className="question-container">
            <img
                src="/assets/images/analyzeTest/sol_logo.svg"
                alt="sol_logo"
                className="question-sol_logo"
            />
            <div className="questions-box">
                <img
                    src="/assets/images/analyzeTest/question2.svg"
                    alt="question2"
                    className="question-progress"
                />
                <h2 className="question-question">
                    나에게 1억이 생긴다면 어디에 사용할까?
                </h2>
                <h2 className="question-sub-text">주식? 아니면 예적금?</h2>

                <button
                    className="question-option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer2_1.svg"
                        alt="answer2_1"
                        className="question-answer2_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png"
                        alt="answer2_1"
                        className="question-emoji"
                    />
                </button>

                <button
                    className="question-option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer2_2.svg"
                        alt="answer2_2"
                        className="question-answer2_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Disguised%20Face.png"
                        alt="answer2_1"
                        className="question-emoji"
                    />
                </button>
            </div>

            <div className="question-button-container">
                <img
                    src="/assets/images/analyzeTest/back.svg"
                    alt="back"
                    onClick={() => navigate(-1)}
                    className="question-prev-button"
                />
                <p
                    className="question-next-time"
                    onClick={() => navigate('/home')}
                >
                    다음에 할게요
                </p>
            </div>
        </div>
    );
};

export default Question2;
