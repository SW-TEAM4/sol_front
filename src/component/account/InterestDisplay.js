import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import {
    getInterest,
    collectInterest,
    getBalance,
    getTransactionHistory,
} from '../../api/accountApi';
import accountCardImg from '../../images/account_card_img.svg';

// "받기" 버튼
const ReceiveButton = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            style={{
                backgroundColor: '#fff',
                color: '#37383C',
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
            받기
        </Button>
    );
};

const InterestDisplay = () => {
    const [interest, setInterest] = useState(0);
    const [balance, setBalance] = useState(0); // 최신 잔액 추가
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchInterest = async () => {
            try {
                const data = await getInterest();
                setInterest(data);
            } catch (error) {
                console.error('이자 조회 실패:', error);
            }
        };

        const fetchBalance = async () => {
            try {
                const data = await getBalance();
                setBalance(data);
            } catch (error) {
                console.error('잔액 조회 실패:', error);
            }
        };

        fetchInterest();
        fetchBalance();
    }, []);

    // 이자 받기 기능
    const handleReceiveInterest = async () => {
        try {
            await collectInterest('1001');

            window.location.reload();
        } catch (error) {
            alert('이자 받기 실패');
            console.error('이자 받기 오류:', error);
        }
    };

    return (
        <div className="interest-wrapper">
            {/* 상단 : 파킹 통장과 연결된 카드 보기 */}
            <div className="card-header" onClick={() => setOpenModal(true)}>
                <div className="card-title">
                    <span>MY CARD</span>
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Credit%20Card.png"
                        alt="Credit Card"
                        width="50"
                        height="50"
                    />
                </div>
            </div>
            {/* 하단 : 이자 받기 */}
            <div className="interest-card">
                <div className="interest-content">
                    <div className="interest-text">
                        <p className="interest-label">어제까지 쌓인 이자</p>
                        <h2 className="interest-amount">
                            {interest.toLocaleString()}원
                        </h2>
                    </div>
                    <ReceiveButton onClick={handleReceiveInterest} />
                </div>
            </div>
            {/* 연결된 카드 보여주는 모달 */}
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                PaperProps={{
                    style: {
                        borderRadius: '30px',
                        backgroundColor: '#333333',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '20px',
                        maxWidth: '550px',
                        width: '100%',
                    },
                }}
            >
                <DialogContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h2>현재 파킹통장과 연결된 SOL 카드</h2>
                    <div
                        className="modal-card-container"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: '20px',
                        }}
                    >
                        <img
                            src={accountCardImg}
                            width="417"
                            height="322"
                            alt="SOL 카드"
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <div className="bank-icon">
                <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Bank.png"
                    alt="Bank"
                    width="200"
                    height="200"
                />
            </div>
        </div>
    );
};

export default InterestDisplay;
