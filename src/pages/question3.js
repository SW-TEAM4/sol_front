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
                className="sol_logo"
            />
            <div className="questions-box">
                <img
                    src="/assets/images/analyzeTest/question3.svg"
                    alt="question3"
                    className="progress"
                />
                <h2 className="question">사고 싶은 주식이 있는데</h2>
                <h2 className="sub-text">지금 당장 사는게 좋을까...?</h2>

                <button
                    className="option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer3_1.svg"
                        alt="answer3_1"
                        className="answer3_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Drooling%20Face.png"
                        alt="answer3_1"
                        className="emoji"
                    />
                </button>

                <button
                    className="option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer3_2.svg"
                        alt="answer3_2"
                        className="answer3_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Rolling%20Eyes.png"
                        alt="answer3_2"
                        className="emoji"
                    />
                </button>
            </div>

            <div className="button-container">
                <button className="prev-button" onClick={() => navigate(-1)}>
                    <img src="/assets/images/analyzeTest/back.svg" alt="back" />
                </button>
                <p className="next-time" onClick={() => navigate('/challenge')}>
                    다음에 할게요
                </p>
            </div>
        </div>
    );
};

export default Question3;
