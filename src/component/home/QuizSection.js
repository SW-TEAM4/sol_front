import React, { useState, useEffect } from 'react';
import '../../styles/QuizSection.css';
import correctImage from '../../images/correct.svg';
import wrongImage from '../../images/wrong.svg';
import quizOkImage from '../../images/quiz_ok.svg';
import quizNoImage from '../../images/quiz_no.svg';
import chickImage from '../../images/chick.svg';
import { addCashback } from '../../api/accountApi';

// 커스텀 localStorage 훅
function useLocalStorage(key, initialValue) {
    // 초기 상태 설정
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // localStorage에 값 저장하는 함수
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

const QuizSection = ({ onCashback }) => {
    // localStorage에서 카드 상태 가져오기
    const [quizCards, setQuizCards] = useLocalStorage('quizCards', [
        { id: 1, isAnswered: false, isCorrect: null },
        { id: 2, isAnswered: false, isCorrect: null },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswer = async (cardId, answer) => {
        // 이미 답변한 카드인지 확인
        const card = quizCards.find((c) => c.id === cardId);
        if (card && card.isAnswered) {
            return;
        }

        setIsLoading(true);

        try {
            const correctAnswer = cardId === 1 ? 'X' : 'O'; // 각 퀴즈의 정답 설정
            const isCorrect = answer === correctAnswer;

            if (isCorrect) {
                try {
                    await addCashback(100, '퀴즈 캐시백'); // API 호출로 캐시백 추가
                    console.log('캐시백 추가 성공');
                    if (onCashback) {
                        onCashback(100); // 부모 컴포넌트에 캐시백 추가 알림
                    }
                } catch (error) {
                    console.error('캐시백 추가 실패:', error);
                }
            }

            // 모달 내용 설정
            setModalContent(
                isCorrect
                    ? {
                          image: correctImage,
                          message: '정답입니다! 🎉\n100 캐시백 드릴게요.',
                      }
                    : {
                          image: wrongImage,
                          message:
                              cardId === 1
                                  ? '틀렸습니다.\n여러 요인으로 평가합니다.'
                                  : "틀렸습니다.\n'시가'는 하루 중 주식 거래가\n시작될 때의 가격입니다.",
                      }
            );

            // 카드 상태 업데이트 - 단순한 객체 구조만 저장
            setQuizCards(
                quizCards.map((c) =>
                    c.id === cardId ? { ...c, isAnswered: true, isCorrect } : c
                )
            );

            setShowModal(true); // 모달 표시
        } catch (error) {
            console.error('퀴즈 처리 중 오류 발생:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="quiz-section">
            {/* 퀴즈 헤더 */}
            <div className="quiz-header p">
                <p>
                    하루에 2문제 금융상식 퀴즈 풀고 캐시백 받자!
                    <br />
                    덤으로 금융상식까지 UP
                </p>
            </div>

            {/* 퀴즈 카드 */}
            <div className="quiz-content">
                <div className="quiz-cards">
                    {quizCards.map((card) => (
                        <div key={card.id} className="quiz-card">
                            {card.isAnswered ? (
                                <p className="quiz-message">
                                    이미 퀴즈 풀었어요.
                                    <br />
                                    내일 만나요 😊
                                </p>
                            ) : (
                                <>
                                    <p>
                                        {card.id === 1 ? (
                                            <>
                                                주식에서 상장폐지가 되는 주된
                                                이유는
                                                <br />
                                                주식 가격이 너무 높아졌을
                                                때이다.
                                            </>
                                        ) : (
                                            <>
                                                '시가'는 하루 중 주식 거래가
                                                <br />
                                                시작될 때의 가격입니다.
                                            </>
                                        )}
                                    </p>
                                    <div className="quiz-button-container">
                                        <button
                                            onClick={() =>
                                                handleAnswer(card.id, 'O')
                                            }
                                            className="quiz-image-button"
                                            disabled={isLoading}
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
                                            disabled={isLoading}
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
                        <p>
                            {modalContent.message.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i <
                                        modalContent.message.split('\n')
                                            .length -
                                            1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                        <button
                            onClick={handleCloseModal}
                            className="close-modal-button"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            {/* 로딩 표시 */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
