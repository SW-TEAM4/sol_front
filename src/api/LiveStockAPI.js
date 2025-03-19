import axios from 'axios';
import log from 'eslint-plugin-react/lib/util/log';

const BASE_URL = 'http://localhost:8090/api/livestock';
// 쿠키에서 JWT 토큰을 가져오는 함수
const getAuthToken = () => {
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find((row) => row.startsWith('jwtToken='));

    if (!jwtCookie) {
        return null;
    }
    return `Bearer ${jwtCookie.split('=')[1]}`;
};
export const fetchStockData = async (ticker, type, page) => {
    console.log('진짜 API');

    try {
        // isRequestInProgress = true;
        const response = await axios.get(`${BASE_URL}/inform`, {
            params: { ticker, type, page },
            headers: {
                Authorization: getAuthToken(), // 인증 헤더 추가
            },
            withCredentials: true, // 쿠키 전송 활성화
        });

        const rawData = response.data || [];

        if (rawData.length === 0) {
            return [];
        }

        // 타입별 데이터 키 매핑
        const keyMapping = {
            daily: {
                startPrice: 'startPrice',
                endPrice: 'endPrice',
                highPrice: 'highPrice',
                lowPrice: 'lowPrice',
                volume: 'volume',
                date: 'date',
            },
            weekly: {
                startPrice: 'weeklyStartPrice',
                endPrice: 'weeklyEndPrice',
                highPrice: 'weeklyHighPrice',
                lowPrice: 'weeklyLowPrice',
                volume: 'weeklyVolume',
                date: 'date',
            },
            monthly: {
                startPrice: 'monthlyStartPrice',
                endPrice: 'monthlyEndPrice',
                highPrice: 'monthlyHighPrice',
                lowPrice: 'monthlyLowPrice',
                volume: 'monthlyVolume',
                date: 'date',
            },
            yearly: {
                startPrice: 'yearlyStartPrice',
                endPrice: 'yearlyEndPrice',
                highPrice: 'yearlyHighPrice',
                lowPrice: 'yearlyLowPrice',
                volume: 'yearlyVolume',
                date: 'date',
            },
        };

        const mapping = keyMapping[type];

        // 데이터 변환
        return rawData.map((item) => {
            return {
                date: item[mapping.date],
                startPrice: item[mapping.startPrice],
                endPrice: item[mapping.endPrice],
                highPrice: item[mapping.highPrice],
                lowPrice: item[mapping.lowPrice],
                volume: item[mapping.volume],
            };
        });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return []; // 오류 발생 시 빈 배열 반환
    } finally {
        // isRequestInProgress = false;
    }
};

export const fetchDefaultStockData = async () => {
    console.log('진짜 API');

    try {
        // isRequestInProgress = true;
        const response = await axios.get(`${BASE_URL}/default`, {
            headers: {
                Authorization: getAuthToken(), // 인증 헤더 추가
            },
            withCredentials: true, // 쿠키 전송 활성화
        });

        const rawData = response.data || [];

        if (rawData.length === 0) {
            return [];
        }

        // 데이터 변환
        return rawData.map((item) => {
            return {
                ticker: item['ticker'],
                name: item['tickerName'],
                startPrice: item['startPrice'],
                price: item['endPrice'],
                highPrice: item['highPrice'],
                lowPrice: item['lowPrice'],
                diffRate: item['diffRate'],
                diff: item['diff'],
                volume: item['volume'],
            };
        });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return []; // 오류 발생 시 빈 배열 반환
    } finally {
        // isRequestInProgress = false;
    }
};
