import React, { useState } from 'react';

const ChartTypeButton = ({ type, setType }) => {
    const [selectedButton, setSelectedButton] = useState(type); // 선택된 버튼 상태 관리

    const handleButtonClick = (newType) => {
        setSelectedButton(newType);
        setTimeout(() => setType(newType), 250); // 버튼 클릭 후 타입 설정
    };

    return (
        <div className="chart-type-button">
            <button
                className={selectedButton === 'daily' ? 'selected' : ''}
                onClick={() => handleButtonClick('daily')}
                tabIndex="-1"
            >
                일
            </button>
            <button
                className={selectedButton === 'weekly' ? 'selected' : ''}
                onClick={() => handleButtonClick('weekly')}
                tabIndex="-1"
            >
                주
            </button>
            <button
                className={selectedButton === 'monthly' ? 'selected' : ''}
                onClick={() => handleButtonClick('monthly')}
                tabIndex="-1"
            >
                월
            </button>
            <button
                className={selectedButton === 'yearly' ? 'selected' : ''}
                onClick={() => handleButtonClick('yearly')}
                tabIndex="-1"
            >
                연
            </button>
        </div>
    );
};

export default ChartTypeButton;
