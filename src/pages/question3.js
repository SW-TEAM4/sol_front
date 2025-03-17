import './question.css';
import { useNavigate } from 'react-router-dom';

const Question3 = ({ addScore, subtractScore }) => {
    const navigate = useNavigate();

    const handleAnswer = (score) => {
        addScore(score);
        navigate('/q4');
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
                    src="/assets/images/analyzeTest/question3.svg"
                    alt="question3"
                    className="question-progress"
                />
                <h2 className="question-question">사고 싶은 주식이 있는데</h2>
                <h2 className="question-sub-text">
                    지금 당장 사는게 좋을까...?
                </h2>

                <button
                    className="question-option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer3_1.svg"
                        alt="answer3_1"
                        className="question-answer3_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Drooling%20Face.png"
                        alt="answer3_1"
                        className="question-emoji"
                    />
                </button>

                <button
                    className="question-option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer3_2.svg"
                        alt="answer3_2"
                        className="question-answer3_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Rolling%20Eyes.png"
                        alt="answer3_2"
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

export default Question3;
