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
                if (response.data.code === 4001) {
                    // 기본 정보 입력이 필요한 경우
                    navigate('/basic-info'); // /basic-info 페이지로 이동
                } else {
                    // 기본 정보가 이미 입력된 경우
                    navigate('/home'); // /home 페이지로 이동
                }
            })
            .catch((error) => {
                console.error('기본 정보 확인 실패:', error);
                navigate('/home'); // 에러가 나면 홈으로 이동
            });
    }, [navigate]);
};

export default RedirectHandler;
