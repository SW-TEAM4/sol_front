import { useNavigate } from 'react-router-dom';
import './question.css';

const Question1 = ({ addScore }) => {
    const navigate = useNavigate();

    const handleAnswer = (score) => {
        addScore(score);
        navigate('/q2');
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
                    src="/assets/images/analyzeTest/question1.svg"
                    alt="question1"
                    className="progress"
                />
                <h2 className="question">
                    내가 산 주식이 하루 만에 -10% 하락했다!
                </h2>
                <h2 className="sub-text">가장 먼저 떠오른 생각은...</h2>

                <button
                    className="option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer1_1.svg"
                        alt="answer1_1"
                        className="answer1_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png"
                        alt="answer1_1"
                        className="emoji"
                    />
                </button>

                <button
                    className="option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer1_2.svg"
                        alt="answer1_2"
                        className="answer1_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
                        alt="answer1_2"
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

export default Question1;
