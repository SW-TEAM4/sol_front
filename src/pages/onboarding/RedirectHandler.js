import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8090/auth/check-basic-info', {
                withCredentials: true,
            })
            .then((response) => {
                console.log('응답 데이터:', response.data); // 응답 데이터 확인
                if (response.data.code === 4001) {
                    navigate('/basic-info'); // 기본 정보 입력이 필요한 경우
                } else {
                    navigate('/home'); // 기본 정보가 이미 입력된 경우
                }
            })
            .catch((error) => {
                console.error('기본 정보 확인 실패:', error);
                navigate('/home'); // 에러가 나면 홈으로 이동
            });
    }, [navigate]);

    return null; // UI를 렌더링할 필요는 없으므로 null 반환
};

export default RedirectHandler;
