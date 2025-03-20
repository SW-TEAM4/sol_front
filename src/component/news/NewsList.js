import React, { useState, useEffect } from 'react';
import '../../styles/NewsList.css';
import { getNewsHeadlines } from '../../api/StockAPI';

const NewsList = () => {
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                setLoading(true);
                const data = await getNewsHeadlines(); // StockAPI의 함수 호출
                console.log('받은 뉴스 데이터:', data); // 디버깅용 로그 추가

                // 유효한 뉴스 항목만 필터링
                const filteredHeadlines = (data || []).filter((item) => {
                    const isValid = item.title && item.link && item.summary;

                    if (!isValid) {
                        console.warn('필터링된 항목:', item);
                    }
                    return isValid;
                });

                setHeadlines(filteredHeadlines);
            } catch (error) {
                console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
                setError(
                    '뉴스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHeadlines();
    }, []);

    // 상대적 시간 표시 (예: '3분 전')
    const getRelativeTime = (timeInfo) => {
        if (!timeInfo) {
            return '';
        }

        const date = new Date(timeInfo.replace(/-/g, '/'));
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
            <h1 className="news-title">오늘의 경제 뉴스</h1>

            {headlines.length > 0 ? (
                <div className="news-list">
                    {headlines.map((item, index) => (
                        <div
                            className="news-item"
                            key={index}
                            onClick={() =>
                                window.open(
                                    item.link || '#', // 링크 없을 경우 기본값 사용
                                    '_blank',
                                    'noopener,noreferrer'
                                )
                            }
                        >
                            <div className="news-content">
                                <div className="news-header">
                                    <h2>{item.title || '제목 없음'}</h2>{' '}
                                    {/* 제목 없을 경우 기본값 */}
                                    <span className="news-time">
                                        {getRelativeTime(item.timeInfo || '')}
                                    </span>
                                </div>
                                <p className="news-summary">
                                    {item.summary || '요약 정보 없음'}
                                </p>
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
