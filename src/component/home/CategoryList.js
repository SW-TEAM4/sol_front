import React, { useState } from 'react';
import CategoryModal from '../category/CategoryModal';
import '../../styles/CategoryList.css';

const CategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, name: 'food', icon: '🍎', displayName: '식품' },
        { id: 2, name: 'video', icon: '📺', displayName: '동영상플랫폼' },
        { id: 3, name: 'bank', icon: '🏦', displayName: '은행' },
        { id: 4, name: 'bio', icon: '🧬', displayName: '바이오' },
        { id: 5, name: 'car', icon: '🚗', displayName: '자동차' },
        { id: 6, name: 'semiconductor', icon: '🔬', displayName: '반도체' },
        { id: 7, name: 'beauty', icon: '🧴', displayName: '뷰티' },
        { id: 8, name: 'travel', icon: '✈️', displayName: '여행' },
        { id: 9, name: 'shipbuilding', icon: '⚓', displayName: '조선' },
    ];

    // 카테고리 클릭 핸들러
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="category-container">
            <h2 className="category-title">
                복잡한 주식을 😱
                <br />
                카테고리로 분류 해드릴게요 📦
            </h2>
            <div className="category-grid">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="category-item"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="category-icon">{category.icon}</div>
                        <div className="category-name">
                            {category.displayName}
                        </div>
                    </div>
                ))}
            </div>
            {/* 모달 렌더링 */}
            {selectedCategory && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                />
            )}
        </div>
    );
};

export default CategoryList;
