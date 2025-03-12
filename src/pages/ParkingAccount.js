import BalanceDisplay from '../component/account/BalanceDisplay';
import TransferRatioSlider from '../component/account/TransferRatioSlider';
import InterestDisplay from '../component/account/InterestDisplay';
import TransactionHistory from '../component/account/TransactionHistory';
import React from 'react';
import '../styles/ParkingAccount.css';

const ParkingAccount = () => {
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
                        marginTop: '-22px',
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
