import BalanceDisplay from '../component/account/BalanceDisplay';
import TransferRatioSlider from '../component/account/TransferRatioSlider';
import InterestDisplay from '../component/account/InterestDisplay';
import TransactionHistory from '../component/account/TransactionHistory';
import React from 'react';
import '../styles/ParkingAccount.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ParkingAccount = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // 여기서 리디렉트가 일어나면 "/account"에 접근이 안 됨
        navigate('/parking');
    }, []);

    return (
        <>
            <div className="parking-account">
                <div className="container">
                    <BalanceDisplay />
                    <TransferRatioSlider />
                    <InterestDisplay />
                </div>
                <div
                    style={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: '#929292',
                        marginTop: '-25px',
                    }}
                ></div>
                <div className="container">
                    <TransactionHistory />
                </div>
            </div>
        </>
    );
};

export default ParkingAccount;
