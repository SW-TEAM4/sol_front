import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api';

// 쿠키에서 JWT 토큰을 가져오는 함수
const getAuthToken = () => {
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find((row) => row.startsWith('jwtToken='));

    if (!jwtCookie) {
        return null;
    }
    return `Bearer ${jwtCookie.split('=')[1]}`;
};

// 포트폴리오 데이터 가져오기
export const getPortfolioList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/portfolio/list`, {
            headers: {
                Authorization: getAuthToken(), // 인증 헤더 추가
            },
            withCredentials: true, // 쿠키 전송 활성화
        });
        return response.data; // 포트폴리오 데이터 반환
    } catch (error) {
        console.error(
            'Error fetching portfolio data:',
            error.response || error
        );
        throw error;
    }
};

// 지수 데이터 가져오기 함수
export const getMarketIndices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/stock/indices`, {
            headers: {
                Authorization: getAuthToken(), // 인증 헤더 추가
            },
            withCredentials: true, // 쿠키 전송 활성화
        });
        return response.data; // 지수 데이터 반환
    } catch (error) {
        console.error('지수 데이터 로딩 중 에러:', error);
        throw error;
    }
};
