import React, { useState, useEffect } from 'react';
import '../../styles/UserChoice.css';
import profileImage from '../../images/profile.svg';
import profileImage2 from '../../images/profile2.svg';
import profileImage3 from '../../images/profile3.svg';

const UserChoice = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userData, setUserData] = useState([
        {
            name: '로딩 중...',
            stock: '삼성전자',
            tags: [],
            image: profileImage,
        },
        {
            name: '로딩 중...',
            stock: '파킹통장',
            tags: [],
            image: profileImage2,
        },
        {
            name: '로딩 중...',
            stock: '20%정도',
            tags: [],
            image: profileImage3,
        },
    ]);

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
                        const { username, gender, age, job } = data.result;

                        // 매핑 객체 정의
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

                        setUserData((prevData) =>
                            prevData.map((item) => ({
                                ...item,
                                name: `${username}님`,
                                tags: [
                                    ageMapping[age],
                                    jobMapping[job],
                                    genderMap[gender],
                                ],
                            }))
                        );
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

            <div className="user-info">
                <img
                    src={userData[currentIndex].image}
                    alt="Profile"
                    className="profile-image"
                />
                <div className="user-text">
                    <span>
                        <strong>{userData[currentIndex].name}</strong>의 또래는
                        <br />
                        <span className="highlight">
                            {userData[currentIndex].stock}
                        </span>
                        에 많이 투자하고 있어요!
                    </span>
                    <div className="user-tags">
                        {userData[currentIndex].tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <button className="arrow-button right-arrow" onClick={handleNext}>
                ›
            </button>
        </div>
    );
};

export default UserChoice;
