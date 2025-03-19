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
                        const { username, gender, age, job } = data.result;

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

                        const userTags = [
                            ageMapping[age],
                            jobMapping[job],
                            genderMap[gender],
                        ];

                        setUserData([
                            {
                                name: `${username}님`,
                                stock: '삼성전자',
                                tags: userTags,
                                image: profileImage,
                            },
                            {
                                name: `${username}님`,
                                stock: '파킹통장',
                                tags: userTags,
                                image: profileImage,
                            },
                            {
                                name: `${username}님`,
                                stock: '20%정도',
                                tags: userTags,
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
                                <strong>{userData[currentIndex].name}</strong>의
                                또래는
                                <br />
                                <span className="highlight">
                                    {userData[currentIndex].stock}
                                </span>
                                에 많이 투자하고 있어요!
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
