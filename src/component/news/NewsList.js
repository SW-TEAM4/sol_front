import React, { useState, useEffect } from 'react';
import '../../styles/NewsList.css';

const NewsList = () => {
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 뉴스 헤드라인 가져오기
    useEffect(() => {
        setLoading(true);
        fetch('http://127.0.0.1:8000/news/headlines') // 경로 수정
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버 응답이 올바르지 않습니다.');
                }
                return response.json();
            })
            .then((data) => {
                // 유효한 뉴스 항목만 필터링
                const filteredHeadlines = (data.headlines || []).filter(
                    (item) =>
                        item.title &&
                        item.title !== '제목 없음' &&
                        item.link &&
                        item.summary
                );
                setHeadlines(filteredHeadlines);
                setLoading(false);
            })
            .catch((error) => {
                console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
                setError(
                    '뉴스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
                );
                setLoading(false);
            });
    }, []);

    // 상대적 시간 표시 (예: '3분 전')
    const getRelativeTime = (dateTimeStr) => {
        if (!dateTimeStr) {
            return '';
        }

        const date = new Date(dateTimeStr.replace(/-/g, '/'));
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);

        if (diffMin < 1) {
            return '방금 전';
        }
        if (diffMin < 60) {
            return `${diffMin}분 전`;
        }
        if (diffHour < 24) {
            return `${diffHour}시간 전`;
        }

        return date.toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // 로딩 상태 표시
    if (loading) {
        return (
            <div className="news-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>뉴스를 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    // 에러 상태 표시
    if (error) {
        return (
            <div className="news-container">
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button
                        className="retry-btn"
                        onClick={() => window.location.reload()}
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="news-container">
            <h1 className="news-title">매일경제 증권 뉴스</h1>

            {headlines.length > 0 ? (
                <div className="news-list">
                    {headlines.map((item, index) => (
                        <div
                            className="news-item"
                            key={index}
                            onClick={() =>
                                window.open(
                                    item.link,
                                    '_blank',
                                    'noopener,noreferrer'
                                )
                            }
                        >
                            {/*/!* 이미지를 왼쪽에 배치 *!/*/}
                            {/*<div className="news-image-container">*/}
                            {/*    <span className="news-emoji">📰</span>*/}
                            {/*</div>*/}

                            <div className="news-content">
                                <div className="news-header">
                                    <h2>{item.title}</h2>
                                    <span className="news-time">
                                        {getRelativeTime(item.time_info)}
                                    </span>
                                </div>
                                <p className="news-summary">{item.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-news">표시할 뉴스가 없습니다.</p>
            )}
        </div>
    );
};

export default NewsList;
