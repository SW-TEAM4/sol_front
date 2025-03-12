import React, { useState } from 'react';
import CategoryModal from '../category/CategoryModal';
import '../../styles/CategoryList.css';
import categoryImages from '../category/CategoryImages';
import categoryScreamImg from '../../images/category_scream.svg';
import categoryFileImg from '../../images/category_file.svg';

const CategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, name: 'food', displayName: '식품' },
        { id: 2, name: 'video', displayName: '동영상플랫폼' },
        { id: 3, name: 'bank', displayName: '은행' },
        { id: 4, name: 'bio', displayName: '바이오' },
        { id: 5, name: 'car', displayName: '자동차' },
        { id: 6, name: 'semiconductor', displayName: '반도체' },
        { id: 7, name: 'beauty', displayName: '뷰티' },
        { id: 8, name: 'travel', displayName: '여행' },
        { id: 9, name: 'shipbuilding', displayName: '조선' },
    ];

    // 카테고리 클릭 핸들러
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="category-container">
            <p className="category-title">
                복잡한 주식을{' '}
                <img
                    src={categoryScreamImg}
                    alt="놀람"
                    className="category-emoji"
                />
                <br />
                카테고리로 분류 해드릴게요{' '}
                <img
                    src={categoryFileImg}
                    alt="파일"
                    className="category-emoji"
                />
            </p>
            <div className="category-grid">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="category-item"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <img
                            src={categoryImages[category.name]}
                            alt={category.displayName}
                            className="category-icon"
                        />
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
