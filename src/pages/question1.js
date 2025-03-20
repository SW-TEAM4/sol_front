import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './question.css';

const Question1 = ({ addScore }) => {
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
        navigate('/q2');
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
                    src="/assets/images/analyzeTest/question1.svg"
                    alt="question1"
                    className="question-progress"
                />
                <h2 className="question-question">
                    내가 산 주식이 하루 만에 -10% 하락했다!
                </h2>
                <h2 className="question-sub-text">
                    가장 먼저 떠오른 생각은...
                </h2>

                <button
                    className="question-option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer1_1.svg"
                        alt="answer1_1"
                        className="question-answer1_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png"
                        alt="answer1_1"
                        className="question-emoji"
                    />
                </button>

                <button
                    className="question-option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer1_2.svg"
                        alt="answer1_2"
                        className="question-answer1_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                        alt="answer1_2"
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

export default Question1;
