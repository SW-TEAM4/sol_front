import './question.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Question4 = ({ addScore, subtractScore }) => {
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
        navigate('/q5');
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
                    src="/assets/images/analyzeTest/question4.svg"
                    alt="question4"
                    className="question-progress"
                />
                <h2 className="question-question">
                    주식은 길게 가져가야 돈이 된다!
                </h2>

                <button
                    className="question-option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer4_1.svg"
                        alt="answer4_1"
                        className="question-answer4_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Nerd%20Face.png"
                        alt="answer4_1"
                        className="question-emoji"
                    />
                </button>

                <button
                    className="question-option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer4_2.svg"
                        alt="answer4_2"
                        className="question-answer4_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Money-Mouth%20Face.png"
                        alt="answer4_2"
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

export default Question4;
