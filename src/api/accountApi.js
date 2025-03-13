import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api/account';

// 잔액 조회
export const getBalance = async () => {
    const response = await axios.get(`${BASE_URL}/balance?accountNumber=1001`);
    return response.data.balance;
};

// 이자 조회
export const getInterest = async () => {
    const response = await axios.get(
        `${BASE_URL}/get-interest?accountNumber=1001`
    );
    return response.data;
};

// 이체 비율 조회
export const getTransferRatio = async () => {
    const response = await axios.get(
        `${BASE_URL}/get-ratio?accountNumber=1001`
    );
    return response.data;
};

// 이체 비율 변경
export const setTransferRatio = async (ratio) => {
    const response = await axios.post(`${BASE_URL}/set-ratio`, {
        accountNumber: '1001',
        ratio,
    });
    return response.data;
};

// 거래 내역 가져오기
export const getTransactionHistory = async () => {
    const response = await axios.get(`${BASE_URL}/history?accountNumber=1001`);
    return response.data;
};

// 이자 받기
export const collectInterest = async (accountNumber) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/collect-interest`,
            null,
            {
                params: { accountNumber },
            }
        );
        return response.data;
    } catch (error) {
        console.error('이자 받기 실패:', error);
        throw error;
    }
};

/**
 * 사용자 이름 가져오기
 * 작성자 : JDeok
 * 생성일 : 2025.03.12
 * **/
export const getUserName = async () => {
    const reponse = await axios.get(`http://localhost:8090/api/account/1001/user-name`);
    return reponse.data;
};


// 새로운 거래 추가
export const addTransaction = async (
    accountNumber,
    amount,
    desWitType,
    displayName
) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-transaction`, null, {
            params: { accountNumber, amount, desWitType, displayName },
        });
        return response.data;
    } catch (error) {
        console.error('거래 추가 실패:', error);
        throw error;
    }
};

