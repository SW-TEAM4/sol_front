import { useNavigate } from 'react-router-dom';

const QuestionCard = ({ question, options, nextPage, addScore }) => {
    const navigate = useNavigate();

    const handleAnswer = (score) => {
        addScore(score);
        navigate(nextPage);
    };

    return (
        <div className="question.card">
            <h2>{question}</h2>
            {options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option.score)}>
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default QuestionCard;
