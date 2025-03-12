import React, { useState } from 'react';
import '../../styles/QuizSection.css';
import correctImage from '../../images/correct.svg'; // 정답 이미지
import wrongImage from '../../images/wrong.svg'; // 오답 이미지
import quizOkImage from '../../images/quiz_ok.svg'; // O 버튼 이미지
import quizNoImage from '../../images/quiz_no.svg'; // X 버튼 이미지
import chickImage from '../../images/chick.svg'; // 병아리 이미지

const QuizSection = () => {
    const [cards, setCards] = useState([
        { id: 1, isAnswered: false, isCorrect: null, cardMessage: '' },
        { id: 2, isAnswered: false, isCorrect: null, cardMessage: '' },
    ]);
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부
    const [modalContent, setModalContent] = useState(null); // 모달 내용

    const handleAnswer = (cardId, answer) => {
        setCards((prevCards) =>
            prevCards.map((card) => {
                if (card.id === cardId && !card.isAnswered) {
                    const correctAnswer = 'O'; // 정답 설정
                    const isCorrect = answer === correctAnswer;
                    setModalContent(
                        isCorrect
                            ? {
                                  image: correctImage,
                                  message:
                                      '정답입니다! 🎉 100 캐시백 드릴게요.',
                              }
                            : {
                                  image: wrongImage,
                                  message:
                                      "'시가'는 하루 중 주식 가격이 가장 높았을 때의 가격을 의미합니다.",
                              }
                    );
                    setShowModal(true); // 모달 표시
                    return {
                        ...card,
                        isAnswered: true,
                        isCorrect,
                        cardMessage: isCorrect
                            ? '정답입니다! 🎉 100 캐시백 드릴게요.'
                            : "'시가'는 하루 중 주식 가격이 가장 높았을 때의 가격을 의미합니다.",
                    };
                }
                return card;
            })
        );
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 닫기
    };

    return (
        <div className="quiz-section">
            {/* 퀴즈 헤더 */}
            <div className="quiz-header">
                <h3>하루에 2문제 금융상식 퀴즈 풀고 캐시백 받자!</h3>
                <p>덤으로 금융상식까지 UP</p>
            </div>

            {/* 퀴즈 카드와 병아리 이미지 */}
            <div className="quiz-content">
                {/* 퀴즈 카드 */}
                <div className="quiz-cards">
                    {cards.map((card) => (
                        <div key={card.id} className="quiz-card">
                            {card.isAnswered ? (
                                <>
                                    <p>{card.cardMessage}</p>{' '}
                                    {/* 정답/오답 메시지 표시 */}
                                    <p className="quiz-message">
                                        이미 퀴즈 푸셨습니다. 내일 만나요 😊
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        {card.id === 1
                                            ? '‘시가’는 하루 중 주식 가격이 가장 높았을 때의 가격을 의미한다.'
                                            : '‘시가’는 하루 중 주식 가격이 가장 낮았을 때의 가격을 의미한다.'}
                                    </p>
                                    <div className="quiz-button-container">
                                        <button
                                            onClick={() =>
                                                handleAnswer(card.id, 'O')
                                            }
                                            className="quiz-image-button"
                                        >
                                            <img
                                                src={quizOkImage}
                                                alt="O"
                                                className="quiz-button-image"
                                            />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleAnswer(card.id, 'X')
                                            }
                                            className="quiz-image-button"
                                        >
                                            <img
                                                src={quizNoImage}
                                                alt="X"
                                                className="quiz-button-image"
                                            />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* 병아리 이미지 */}
                <img src={chickImage} alt="Chick" className="quiz-image" />
            </div>

            {/* 모달 */}
            {showModal && modalContent && (
                <div className="quiz-modal">
                    <div className="quiz-modal-content">
                        <img src={modalContent.image} alt="모달 이미지" />
                        <p>{modalContent.message}</p>
                        <button
                            onClick={handleCloseModal}
                            className="close-modal-button"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
