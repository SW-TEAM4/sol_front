import React, { createContext, useState, useEffect } from 'react';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [socket, setSocket] = useState(null); // WebSocket 객체를 상태로 관리
    const [secondData, setSecondData] = useState(null);
    const [secondSocket, setSecondSocket] = useState(null); // 2번쨰 WebSocket 객체를 상태로 관리
    useEffect(() => {
        // WebSocket 연결 상태 추적
        if (socket) {
            return; // 이미 socket이 있다면, 새로운 연결을 만들지 않음
        }

        const newSocket = new WebSocket('ws://localhost:8765');
        setSocket(newSocket); // 새로운 WebSocket을 상태에 설정

        newSocket.onopen = () => {
            console.log('WebSocket 연결 성공');
        };

        newSocket.onmessage = (event) => {
            console.log('WebSocket 메시지 수신:', event.data);
            try {
                setData(JSON.parse(event.data));
            } catch (error) {
                console.error('WebSocket 데이터 파싱 오류:', error);
            }
        };

        newSocket.onerror = (event) => {
            console.error('WebSocket 오류 발생:', event);
        };

        newSocket.onclose = (event) => {
            console.warn('WebSocket 연결 종료:', event);
        };

        return () => {
            // // 컴포넌트가 unmount될 때 연결 종료
            // if (newSocket.readyState === WebSocket.OPEN || newSocket.readyState === WebSocket.CONNECTING) {
            //     newSocket.close();
            // }
            // console.log('WebSocket 연결 해제됨');
        };
    }, [socket]); // 의존성 배열에 socket만 넣어줘서 한번만 연결되도록 함
    useEffect(() => {
        // WebSocket 연결 상태 추적
        if (secondSocket) {
            return; // 이미 socket이 있다면, 새로운 연결을 만들지 않음
        }

        const newSocket = new WebSocket('ws://localhost:8765');
        setSecondSocket(newSocket); // 새로운 WebSocket을 상태에 설정

        newSocket.onopen = () => {
            console.log('WebSocket2 연결 성공');
        };

        newSocket.onmessage = (event) => {
            console.log('WebSocket2 메시지 수신:', event.data);
            try {
                setSecondData(JSON.parse(event.data));
            } catch (error) {
                console.error('WebSocket2 데이터 파싱 오류:', error);
            }
        };

        newSocket.onerror = (event) => {
            console.error('WebSocket2 오류 발생:', event);
        };

        newSocket.onclose = (event) => {
            console.warn('WebSocket2 연결 종료:', event);
        };

        return () => {
            // // 컴포넌트가 unmount될 때 연결 종료
            // if (newSocket.readyState === WebSocket.OPEN || newSocket.readyState === WebSocket.CONNECTING) {
            //     newSocket.close();
            // }
            // console.log('WebSocket 연결 해제됨');
        };
    }, [secondSocket]); // 의존성 배열에 secondSocket만 넣어줘서 한번만 연결되도록 함

    return (
        <WebSocketContext.Provider value={{ kafkaData: data, kafkaSecondData: secondData }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketContext, WebSocketProvider };
