import { useEffect, useState } from 'react';
import { getBalance, getTransactionHistory, getUserName } from '../../api/accountApi';

import Button from '@mui/material/Button';
import TransferModal from '../../pages/transferModal';

// 빼기 버튼 컴포넌트
const RemoveButton = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            style={{
                backgroundColor: '#37383C',
                color: '#fff',
                borderRadius: '15px',
                width: '100px',
                height: '55px',
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'none',
                lineHeight: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
            }}
        >
            빼기
        </Button>
    );
};

// 파킹통장 잔고 컴포넌트
const BalanceDisplay = () => {
    const [balance, setBalance] = useState(0);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [userName, setUserName] = useState('');

    // 빼기 버튼 클릭 이벤트
    const handleRemove = () => {
        setIsTransferModalOpen(true);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const balanceData = await getBalance(); // 잔액 조회
                setBalance(balanceData);

                const userNameData = await getUserName(); // 사용자 이름 조회
                setUserName(userNameData);
            } catch (error) {
                console.error('잔액 또는 사용자 정보 가져오기 실패:', error);
            }
        };

        fetchInitialData();
    }, []);

    // 거래 내역 변경 시 잔고 업데이트
    useEffect(() => {
        const fetchUpdatedBalance = async () => {
            try {
                const transactions = await getTransactionHistory();

                if (transactions.length > 0) {
                    const latestTransaction = transactions[0]; // 최신 거래 내역 가져오기
                    setBalance(latestTransaction.pre_balance);
                }
            } catch (error) {
                console.error('거래 내역 조회 실패:', error);
            }
        };

        fetchUpdatedBalance();
    }, [balance]); // 🔥 잔액 변경 감지 시 실행되도록 의존성 추가

    return (
        <div className="balance-container">
            <div className="balance-title">
                <h1>{userName.toString()}</h1>
                <h2>님의 파킹통장 잔고</h2>
            </div>

            <div className="balance-row">
                <h1>{balance.toLocaleString()}원</h1>
                <RemoveButton onClick={handleRemove} />
            </div>

            {isTransferModalOpen && (
                <TransferModal open={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} />
            )}
        </div>
    );
};

export default BalanceDisplay;
