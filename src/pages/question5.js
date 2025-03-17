import './question.css';
import { useNavigate } from 'react-router-dom';

const Question5 = ({ addScore, subtractScore }) => {
    const navigate = useNavigate();

    const handleAnswer = (score) => {
        addScore(score);
        navigate('/result');
    };

    const handleBack = () => {
        // 이전으로 이동 시, 감점
        subtractScore();
        navigate(-1);
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
                    src="/assets/images/analyzeTest/question5.svg"
                    alt="question5"
                    className="question-progress"
                />
                <h2 className="question-question">
                    좋아하는 주식 하나에 전 재산을 올인한다!
                </h2>

                <button
                    className="question-option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer5_1.svg"
                        alt="answer5_1"
                        className="question-answer5_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Savoring%20Food.png"
                        alt="answer4_2"
                        className="question-emoji"
                    />
                </button>

                <button
                    className="question-option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer5_2.svg"
                        alt="answer5_2"
                        className="question-answer5_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Crossed-Out%20Eyes.png"
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

export default Question5;
