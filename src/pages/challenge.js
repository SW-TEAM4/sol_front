import { useState, useEffect } from 'react';
import './challenge.css';
import axios from 'axios';

const Challenge = ({ isModalOpen, setIsModalOpen }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStampModalOpen, setIsStampModalOpen] = useState(false);
    const [stamps, setStamps] = useState(Array(30).fill(false));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentStamp, setCurrentStamp] = useState(0);
    const [modalType, setModalType] = useState('start'); // 'start' 또는 'stamp'
    const [hasStampedToday, setHasStampedToday] = useState(false);
    const [userName, setUserName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [userIdx, setUserIdx] = useState(null);
    const [accountNumber, setAccountNumber] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 쿠키에 저장된 JWT 토큰을 자동으로 포함하여 요청을 보냄
                const response = await axios.get(
                    'http://localhost:8090/api/user/user',
                    {
                        withCredentials: true, // 쿠키를 함께 보내도록 설정
                    }
                );
                console.log(response.data);

                if (
                    response.data &&
                    response.data.result &&
                    response.data.result.username
                ) {
                    setUserName(response.data.result.username); // 사용자 이름 설정
                    setUserIdx(response.data.result.userIdx);
                } else {
                    setUserName('알 수 없음');
                }

                // 계좌 정보 API 호출
                const accountResponse = await axios.get(
                    'http://localhost:8090/api/account/getAccountNo',
                    {
                        params: { userIdx: response.data.result.userIdx }, // userIdx를 파라미터로 전달
                        withCredentials: true,
                    }
                );

                if (accountResponse.data) {
                    setAccountNumber(accountResponse.data); // 계좌번호 설정
                } else {
                    console.error('계좌 번호를 찾을 수 없습니다.');
                }
            } catch (error) {
                console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!userIdx) {
            return;
        } // userIdx가 없으면 실행 X

        const fetchStamps = async () => {
            try {
                // 챌린지 시작 날짜 조회
                const startDateResponse = await axios.get(
                    `http://localhost:8090/api/stamp/startDate`
                );
                setStartDate(new Date(startDateResponse.data.startDate)); // 시작 날짜 설정

                // 사용자의 스탬프 기록 조회
                const stampResponse = await axios.get(
                    `http://localhost:8090/api/stamp/user`,
                    {
                        withCredentials: true, // 쿠키와 함께 요청
                    }
                );

                // 응답 데이터에서 result 배열을 사용
                const fetchedStamps = stampResponse.data.result.map(
                    (stamp) => stamp.day
                ); // 'result' 배열에서 day 값 추출, 찍은 날짜만 추출

                // 스탬프 상태 업데이트
                setStamps((prevStamps) => {
                    const newStamps = [...prevStamps];

                    fetchedStamps.forEach((day) => {
                        if (typeof day === 'number' && day >= 1 && day <= 30) {
                            // day가 숫자인지 확인하고 범위 체크
                            newStamps[day - 1] = true;
                        }
                    });

                    return newStamps;
                });

                // 현재까지 찍힌 스탬프 개수 설정
                setCurrentStamp(fetchedStamps.length);

                // ✅ 오늘 날짜 확인 (YYYY-MM-DD 형식)
                const today = new Date().toISOString().slice(0, 10);

                // ✅ localStorage에서 확인 (새로고침 후에도 유지)
                const storedDate = localStorage.getItem(
                    `stampedToday_${userIdx}`
                );
                if (storedDate === today) {
                    setHasStampedToday(true);
                    return;
                }

                // 오늘 스탬프 찍었는지 확인
                const stampedResponse = await axios.get(
                    `http://localhost:8090/api/stamp/stamped/today`,
                    {
                        withCredentials: true, // 쿠키와 함께 요청
                    }
                );
                if (stampedResponse.data) {
                    setHasStampedToday(true);
                    localStorage.setItem(`stampedToday_${userIdx}`, today); // ✅ 사용자별 localStorage 저장
                } else {
                    setHasStampedToday(false);
                }
            } catch (error) {
                console.error('스탬프 기록을 불러오는 데 실패했습니다.', error);
            }
        };

        fetchStamps();
    }, [userIdx]);

    // '챌린지 시작하기' 또는 '오늘 스탬프 찍기' 버튼 클릭 시 모달 열기
    const handleStampButtonClick = (type) => {
        setModalType(type);
        setIsStampModalOpen(true);
    };

    // '오늘 스탬프 찍기' 버튼 클릭 시 가장 앞의 false 값을 true로 변경
    const handleStampClick = async () => {
        if (hasStampedToday) {
            alert('오늘은 이미 스탬프를 찍었습니다!');
            return; // 이미 스탬프를 찍었으면 더 이상 진행하지 않음
        }
        try {
            // 💰 1000원 이동 API 호출
            const formData = new URLSearchParams();
            formData.append('accountNumber', accountNumber); // JWT에서 가져온 계좌번호
            formData.append('amount', 1000); // 출금 금액 1000원
            formData.append('desWitType', '1'); // 출금
            formData.append('displayName', '투자 챌린지'); // 거래 이름

            // POST 요청: application/x-www-form-urlencoded 형식으로 데이터 전송
            await axios.post(
                'http://localhost:8090/api/account/add-transaction',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true,
                }
            );

            // ✅ 스탬프 저장
            const response = await axios.post(
                'http://localhost:8090/api/stamp/save',
                {},
                {
                    withCredentials: true, // 쿠키와 함께 요청
                    headers: {
                        'Content-Type': 'application/json', // JSON 형식 명시
                    },
                }
            );
            if (response.data === '스탬프 저장 성공') {
                const newStamps = [...stamps];
                newStamps[currentStamp] = true;
                setStamps([...newStamps]);
                setCurrentStamp(currentStamp + 1); // 현재 스탬프 위치 업데이트
                return;

                // ✅ 스탬프를 찍었으므로 상태 업데이트
                const today = new Date().toISOString().slice(0, 10);
                setHasStampedToday(true);
                localStorage.setItem(`stampedToday_${userIdx}`, today); // 사용자별 저장
            }
        } catch (error) {
            console.log('스탬프 저장 실패', error);
        }
        setIsStampModalOpen(false);
    };

    // '다음에 할게요' 버튼 클릭 시 모달 닫기
    const closeStampModal = () => {
        setIsStampModalOpen(false);
    };

    // 주차 넘기기
    const handleWeekChange = (direction) => {
        if (direction === 'next' && currentWeek < 5) {
            setCurrentWeek(currentWeek + 1);
        } else if (direction === 'prev' && currentWeek > 1) {
            setCurrentWeek(currentWeek - 1);
        }
    };

    // 스탬프 표시
    const renderStamps = () => {
        const today = new Date(); // 오늘 날짜
        const startDateObj = new Date(startDate); // 시작일을 Date 객체로 변환
        const daysSinceStart =
            Math.floor((today - startDateObj) / (1000 * 60 * 60 * 24)) + 1; // 시작일부터 오늘까지 경과한 일수

        const startDay = (currentWeek - 1) * 7;
        const endDay = currentWeek * 7;

        return stamps.slice(startDay, endDay).map((stamp, index) => {
            const day = startDay + index + 1; // 해당 날짜

            // 7, 14, 21, 28일 차에는 specialCoin.svg를 표시
            const isSpecialDay = [7, 14, 21, 28].includes(day);
            // const canStamp =
            //     [7, 14, 21, 28].includes(day) &&
            //     day <= daysSinceStart &&
            //     !stamp; // 스탬프를 찍을 수 있는 조건

            // 아직 차례가 오지 않은 날 (현재 주차에 포함되지 않은 날)
            if (day > daysSinceStart) {
                return (
                    <div key={index} className="challenge-stamp">
                        {isSpecialDay ? (
                            <img
                                src="/assets/images/analyzeTest/monkey.svg"
                                alt="monkey"
                                className="challenge-stamp-image empty"
                            />
                        ) : (
                            <span>{day}일차</span>
                        )}
                        {/* 아직 차례가 오지 않은 날에는 일차 표시 */}
                    </div>
                );
            }

            // 지나간 날짜
            if (day < daysSinceStart && !stamp) {
                return (
                    <div key={index} className="challenge-stamp">
                        <img
                            src="/assets/images/analyzeTest/coin1.svg"
                            alt="지나간 스탬프"
                            className="challenge-stamp-image empty" // 지나간 날짜에는 투명 이미지
                        />
                    </div>
                );
            }

            return (
                <div
                    key={index}
                    className={`challenge-stamp ${stamp ? 'stamped' : ''}`}
                >
                    {
                        stamp ? (
                            // 스탬프를 찍었으면 coin1.svg, 특별한 날은 specialCoin.svg
                            <img
                                src={
                                    isSpecialDay
                                        ? '/assets/images/analyzeTest/monkey.svg'
                                        : '/assets/images/analyzeTest/coin1.svg'
                                }
                                alt={isSpecialDay ? '특별 스탬프' : '스탬프'}
                                className="challenge-stamp-image"
                                // onClick={() =>
                                //     canStamp && handleStampClick(day)
                                // } // 이미 찍은 스탬프를 클릭 가능하도록 처리
                            />
                        ) : isSpecialDay ? (
                            <img
                                src="/assets/images/analyzeTest/monkey.svg"
                                alt="monkey"
                                className="challenge-stamp-image empty"
                            />
                        ) : (
                            <span>{day}일차</span>
                        ) // 아직 찍지 않은 날에는 일차 표시
                    }
                </div>
            );
        });
    };

    // const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/*<button className="challenge-open-button" onClick={openModal}>*/}
            {/*    투자 챌린지*/}
            {/*</button>*/}
            {isModalOpen && (
                <div className="challenge-modal-overlay" onClick={closeModal}>
                    <div
                        className="challenge-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="challenge-modal-header">
                            <div className="challenge-header-container">
                                <p className="challenge-header">
                                    매일 1000원씩
                                    <br /> 30일 동안
                                    <br /> 투자 챌린지
                                </p>
                                <p className="challenge-info">
                                    <span className="challenge-info-name">
                                        {userName
                                            ? `${userName}님!`
                                            : '로딩 중...'}
                                    </span>
                                    <br />
                                    챌린지 성공 시{' '}
                                    <span className="challenge-cashback">
                                        10,000
                                    </span>{' '}
                                    캐시백을 드립니다!
                                </p>
                            </div>
                            <div className="challenge-image-container">
                                <img
                                    src="https://static.toss.im/3d/moneybag-shield-coin-apng.png"
                                    alt="투자 이미지"
                                    className="challenge-image"
                                />
                                <div className="challenge-stamp-button-container">
                                    <button
                                        className="challenge-stamp-button"
                                        onClick={() =>
                                            handleStampButtonClick(
                                                currentStamp === 0
                                                    ? 'start'
                                                    : 'stamp'
                                            )
                                        }
                                    >
                                        {currentStamp === 0 ? (
                                            <img src="/assets/images/analyzeTest/stampButton2.svg" />
                                        ) : (
                                            <img src="/assets/images/analyzeTest/stampButton.svg" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="challenge-week-navigation">
                            <button onClick={() => handleWeekChange('prev')}>
                                {/*&lt; {currentWeek}주차*/}
                                <img src="/assets/images/analyzeTest/leftButton.svg" />
                            </button>
                            <span>✊ {currentWeek}주차 도전중!</span>
                            <button onClick={() => handleWeekChange('next')}>
                                {/*{currentWeek + 1}주차 &gt;*/}
                                <img src="/assets/images/analyzeTest/rightButton.svg" />
                            </button>
                            <p>Click Me!</p>
                        </div>
                        <div className="challenge-stamps-container">
                            {renderStamps()}
                        </div>
                        <p className="footer-text">
                            도전은 계속된다!
                            <br /> 귀여운 스탬프로 도전 기록을 남겨요.
                        </p>
                    </div>
                </div>
            )}
            {/* '챌린지 시작하기' & '오늘 스탬프 찍기' 모달 */}
            {isStampModalOpen && (
                <div className="challenge-stamp-modal-overlay">
                    <div className="challenge-stamp-modal">
                        {modalType === 'start' ? (
                            <img
                                src="/assets/images/analyzeTest/gorilla.svg"
                                alt="gorilla"
                                className="challenge-stamp-icon"
                            />
                        ) : (
                            <img
                                src="/assets/images/analyzeTest/coin1.svg"
                                alt="gorilla"
                                className="challenge-stamp-icon"
                            />
                        )}
                        <p className="challenge-stamp-modal-title">
                            {modalType === 'start'
                                ? '챌린지 도전을 시작할까요?'
                                : '오늘 스탬프를 찍어볼까요?'}
                        </p>
                        <p className="challenge-stamp-modal-text">
                            {modalType === 'start'
                                ? "'시작 할게요' 클릭 시, 첫 스탬프가 찍히고 챌린지가 시작됩니다!"
                                : "'찍을래요' 클릭 시, 파킹 통장에서 연결된 증권계좌로 이체됩니다."}
                        </p>
                        <div className="challenge-stamp-modal-buttons">
                            <button
                                className="challenge-confirm-button"
                                onClick={handleStampClick}
                            >
                                {modalType === 'start' ? (
                                    <img src="/assets/images/analyzeTest/stampStart.svg" />
                                ) : (
                                    <img src="/assets/images/analyzeTest/stampYes.svg" />
                                )}
                            </button>
                            <button
                                className="challenge-cancel-button"
                                onClick={closeStampModal}
                            >
                                {modalType === 'start' ? (
                                    <img src="/assets/images/analyzeTest/stampNo2.svg" />
                                ) : (
                                    <img src="/assets/images/analyzeTest/stampNo.svg" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Challenge;
