import './question.css';
import { useNavigate } from 'react-router-dom';

const Question4 = ({ addScore, subtractScore }) => {
    const navigate = useNavigate();

    const handleAnswer = (score) => {
        addScore(score);
        navigate('/q5');
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
                    src="/assets/images/analyzeTest/question4.svg"
                    alt="question4"
                    className="progress"
                />
                <h2 className="question">주식은 길게 가져가야 돈이 된다!</h2>

                <button
                    className="option option-1"
                    onClick={() => handleAnswer(3)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer4_1.svg"
                        alt="answer4_1"
                        className="answer4_1"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Nerd%20Face.png"
                        alt="answer4_1"
                        className="emoji"
                    />
                </button>

                <button
                    className="option option-2"
                    onClick={() => handleAnswer(1)}
                >
                    <img
                        src="/assets/images/analyzeTest/answer4_2.svg"
                        alt="answer4_2"
                        className="answer4_2"
                    />
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Money-Mouth%20Face.png"
                        alt="answer4_2"
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

export default Question4;
