import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api/account';

// 쿠키에서 JWT 토큰을 가져오는 함수
const getAuthToken = () => {
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find((row) => row.startsWith('jwtToken='));

    if (!jwtCookie) {
        return null;
    } // 쿠키에 없으면 null 반환
    return `Bearer ${jwtCookie.split('=')[1]}`;
};

// userIdx를 로컬스토리지에서 가져오는 함수
const getUserIdx = () => {
    return localStorage.getItem('userIdx');
};
// 계좌번호를 가져오는 함수
export const getAccountNo = async () => {
    const userIdx = getUserIdx();
    const response = await axios.get(
        `${BASE_URL}/getAccountNo?userIdx=${userIdx}`,
        {
            headers: {
                Authorization: getAuthToken(), // 쿠키에서 가져옴
            },
            withCredentials: true, // 쿠키 전송
        }
    );
    return response.data; // accountNo 반환
};

// 잔액 조회
export const getBalance = async () => {
    const accountNo = await getAccountNo();
    const response = await axios.get(
        `${BASE_URL}/balance?accountNumber=${accountNo}`,
        {
            headers: {
                Authorization: getAuthToken(),
            },
            withCredentials: true,
        }
    );
    return response.data.balance;
};

// 이자 조회
export const getInterest = async () => {
    const accountNo = await getAccountNo();
    const response = await axios.get(
        `${BASE_URL}/get-interest?accountNumber=${accountNo}`,
        {
            headers: {
                Authorization: getAuthToken(),
            },
            withCredentials: true,
        }
    );
    return response.data;
};

// 이체 비율 조회
export const getTransferRatio = async () => {
    const accountNo = await getAccountNo();
    const response = await axios.get(
        `${BASE_URL}/get-ratio?accountNumber=${accountNo}`,
        {
            headers: {
                Authorization: getAuthToken(),
            },
            withCredentials: true,
        }
    );
    return response.data;
};

// 이체 비율 변경
export const setTransferRatio = async (ratio) => {
    const accountNo = await getAccountNo();
    const response = await axios.post(
        `${BASE_URL}/set-ratio`,
        { accountNumber: accountNo, ratio },
        {
            headers: {
                Authorization: getAuthToken(),
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    );
    return response.data;
};

// 거래 내역 가져오기
export const getTransactionHistory = async () => {
    const accountNo = await getAccountNo();
    const response = await axios.get(
        `${BASE_URL}/history?accountNumber=${accountNo}`,
        {
            headers: {
                Authorization: getAuthToken(),
            },
            withCredentials: true,
        }
    );
    return response.data;
};

// 이자 받기
export const collectInterest = async () => {
    try {
        const accountNo = await getAccountNo(); // 유저 계좌번호 가져오기
        console.log('현재 계좌번호:', accountNo);

        const response = await axios.post(
            `${BASE_URL}/collect-interest`,
            null,
            {
                params: { accountNumber: accountNo }, // 쿼리 파라미터로 전송
                headers: {
                    Authorization: getAuthToken(),
                },
                withCredentials: true,
            }
        );

        console.log('이자 받기 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error(
            '이자 받기 실패:',
            error.response ? error.response.data : error
        );
        throw error;
    }
};

// 사용자 이름 가져오기
export const getUserName = async () => {
    const accountNo = await getAccountNo();
    const response = await axios.get(`${BASE_URL}/${accountNo}/user-name`, {
        headers: {
            Authorization: getAuthToken(),
        },
        withCredentials: true,
    });
    return response.data;
};

// 캐시백 입금
export const addCashback = async (amount, displayName) => {
    try {
        const accountNo = await getAccountNo(); // 사용자 계좌번호 가져오기
        console.log('캐시백 추가 계좌번호:', accountNo);

        const response = await axios.post(`${BASE_URL}/add-transaction`, null, {
            params: {
                accountNumber: accountNo, // 계좌 번호
                amount: amount, // 금액 (퀴즈는 100원)
                desWitType: '0', // 0: 입금
                displayName: displayName, // 본인
            },
            headers: {
                Authorization: getAuthToken(),
            },
            withCredentials: true,
        });

        console.log('캐시백 추가 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error(
            '캐시백 추가 실패:',
            error.response ? error.response.data : error
        );
        throw error;
    }
};
