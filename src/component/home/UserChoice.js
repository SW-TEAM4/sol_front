import React, { useState, useEffect } from 'react';
import '../../styles/UserChoice.css';
import profileImage from '../../images/profile.svg';

const UserChoice = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8090/auth/user/me',
                    {
                        credentials: 'include',
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.isSuccess && data.result) {
                        const {
                            username,
                            gender,
                            age,
                            job,
                            investor,
                            userIdx,
                        } = data.result;

                        // 기본 태그 매핑
                        const genderMap = { M: '#남성', F: '#여성' };
                        const ageMapping = {
                            1: '#10대',
                            2: '#20대',
                            3: '#30대',
                            4: '#40대',
                            5: '#50대',
                            6: '#60대이상',
                        };
                        const jobMapping = {
                            0: '#학생',
                            1: '#대학생',
                            2: '#직장인',
                            3: '#프리랜서',
                            4: '#주부',
                            5: '#기타',
                        };

                        // 연령대 태그 설정
                        const ageTags = [
                            ageMapping[age],
                            genderMap[gender],
                            jobMapping[job],
                        ];

                        // 파킹통장 금액 및 태그 가져오기
                        const parkingResponse = await fetch(
                            `http://localhost:8090/api/account/parking-tags?userIdx=${userIdx}`,
                            { credentials: 'include' }
                        );

                        let parkingTags = [];
                        if (parkingResponse.ok) {
                            const parkingData = await parkingResponse.json();
                            parkingTags = parkingData.tags;
                        } else {
                            console.error('파킹통장 데이터를 가져오는 중 실패');
                        }

                        const investorScore = investor === null ? -1 : investor;
                        // 투자 점수에 따른 태그 설정
                        let investorTags = [];
                        if (
                            investorScore === -1 ||
                            (investorScore >= 0 && investorScore <= 5)
                        ) {
                            investorTags = [
                                '#6개월이상',
                                '#신한지주',
                                '#안숙이',
                            ];
                        } else if (investorScore >= 6 && investorScore <= 10) {
                            investorTags = [
                                '#신한지주',
                                '#차철이',
                                '#분산투자',
                            ];
                        } else if (investorScore >= 11 && investorScore <= 15) {
                            investorTags = [
                                '#치고빠지기',
                                '#열식이',
                                '#고위험',
                            ];
                        }

                        // 사용자 데이터 설정
                        setUserData([
                            // 첫 번째 카드: 연령대 기반 메시지
                            {
                                name: `${username}님의 또래는`,
                                stock: '신한지주에 많이 투자하고 있어요!',
                                tags: ageTags,
                                image: profileImage,
                            },
                            // 두 번째 카드: 파킹통장 금액 기반 메시지
                            {
                                name: `${username}님`,
                                stock: '파킹통장 잔고 비슷한분들은',
                                tags: parkingTags,
                                image: profileImage,
                            },
                            // 세 번째 카드: 투자 점수 기반 메시지
                            {
                                name: `${username}님`,
                                stock:
                                    investorScore >= 0 && investorScore <= 5
                                        ? '진득하게 길게 투자해보세요!'
                                        : investorScore >= 6 &&
                                            investorScore <= 10
                                          ? '한 종목보다 골고루 투자해보세요!'
                                          : '모르겠고 묻고 더블로 가보세요!',
                                tags: investorTags,
                                image: profileImage,
                            },
                        ]);
                    }
                } else {
                    console.error('API 호출 실패:', response.status);
                }
            } catch (error) {
                console.error('사용자 정보 로딩 중 에러:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleNext = () =>
        setCurrentIndex((prev) => (prev + 1) % userData.length);
    const handlePrev = () =>
        setCurrentIndex((prev) =>
            prev === 0 ? userData.length - 1 : prev - 1
        );

    return (
        <div className="carousel-container">
            <button className="arrow-button left-arrow" onClick={handlePrev}>
                ‹
            </button>

            <div className="user-content">
                <img
                    src={
                        userData.length > 0
                            ? userData[currentIndex].image
                            : profileImage
                    }
                    alt="Profile"
                    className="profile-image"
                />
                <div className="user-text">
                    {userData.length > 0 ? (
                        <>
                            <span>
                                <strong>{userData[currentIndex].name}</strong>
                                {/*의 또래는*/}
                                <br />
                                <span className="highlight">
                                    {userData[currentIndex].stock}
                                </span>
                                {/*에 많이 투자하고 있어요!*/}
                            </span>
                            <div className="user-tags">
                                {userData[currentIndex].tags.map(
                                    (tag, index) => (
                                        <span key={index}>{tag}</span>
                                    )
                                )}
                            </div>
                        </>
                    ) : (
                        <span>사용자 정보를 불러오는 중입니다...</span>
                    )}
                </div>
            </div>

            <button className="arrow-button right-arrow" onClick={handleNext}>
                ›
            </button>
        </div>
    );
};

export default UserChoice;
