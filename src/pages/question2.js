import { useNavigate } from 'react-router-dom';
import './question.css';

const Question2 = ({ addScore, subtractScore }) => {
    const navigate = useNavigate();

    const handleAnswer = (score) => {
        addScore(score);
        navigate('/q3');
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
                    src="/assets/images/analyzeTest/question2.svg"
                    alt="question2"
                    className="progress"
                />
                <h2 className="question">
                    나에게 1억이 생긴다면 어디에 사용할까?
                </h2>
                <h2 className="sub-text">주식? 아니면 예적금?</h2>

                <button
                    className="option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer2_1.svg"
                        alt="answer2_1"
                        className="answer2_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Monocle.png"
                        alt="answer2_1"
                        className="emoji"
                    />
                </button>

                <button
                    className="option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer2_2.svg"
                        alt="answer2_2"
                        className="answer2_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Disguised%20Face.png"
                        alt="answer2_1"
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

export default Question2;
