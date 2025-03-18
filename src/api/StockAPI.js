import axios from 'axios';
import log from 'eslint-plugin-react/lib/util/log';

const BASE_URL = 'http://localhost:8090/api/stock';
// let isRequestInProgress = false; //

export const fetchStockData = async (ticker, type, page) => {
    console.log('진짜 API');
    // if (isRequestInProgress) {
    //     // If a request is already in progress, return immediately.
    //     return [];
    // }

    try {
        // isRequestInProgress = true;
        const response = await axios.get(`${BASE_URL}/inform`, {
            params: { ticker, type, page },
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
