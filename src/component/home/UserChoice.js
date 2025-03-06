import React, { useState } from 'react';
import '../../styles/UserChoice.css';
import profileImage from '../../images/profile.svg';
import profileImage2 from '../../images/profile2.svg';
import profileImage3 from '../../images/profile3.svg';

const userData = [
    {
        name: '채채주주님',
        stock: '삼성전자',
        tags: ['#20대', '#대학생', '#여성'],
        image: profileImage,
    },
    {
        name: '채채주주님',
        stock: '파킹통장',
        tags: ['#20대', '#직장인', '#여성'],
        image: profileImage2,
    },
    {
        name: '채채주주님',
        stock: '20%정도',
        tags: ['#30대', '#100만원이상', '#여성'],
        image: profileImage3,
    },
];

const UserChoice = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === userData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? userData.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel-container">
            <button className="arrow-button left-arrow" onClick={handlePrev}>
                ‹
            </button>
            <div className="user-info">
                <img
                    src={userData[currentIndex].image}
                    className="profile-image"
                />
                <div className="user-text">
                    <span className="user-name">
                        {userData[currentIndex].name}의 또래는
                        <br />
                        <span className="highlight">
                            {userData[currentIndex].stock}
                        </span>{' '}
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
