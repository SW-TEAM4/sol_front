import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Button, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import './transferModal.css';
import { getBalance, getAccountNo } from '../api/accountApi';

const getAuthToken = () => {
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find((row) => row.startsWith('jwtToken='));

    if (!jwtCookie) {
        return null;
    }
    return `Bearer ${jwtCookie.split('=')[1]}`;
};

const TransferModal = ({ open, onClose }) => {
    const [balance, setBalance] = useState(0);
    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState(1);
    const [recipientName, setRecipientName] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("");                             // 응답 메시지


    useEffect(() => {
        if (open) {
            const fetchAccountData = async () => {
                try {
                    const accountNo = await getAccountNo();
                    setFromAccount(accountNo);

                    const balanceData = await getBalance();
                    setBalance(balanceData);
                } catch (error) {
                    console.error('잔액 또는 계좌번호 조회 실패:', error);
                }
            };

            fetchAccountData();
        }
    }, [open]);

    const handleCheckAccounts = async () => {
        if (!toAccount) {
            setMessage("조회되지 않는 계좌번호입니다.");
            return;
        }
        if (fromAccount === toAccount) {
            setMessage("출금계좌와 입금 계좌가 동일합니다. 다른 계좌를 입력해 주세요.");
            return;
        }


        try {
            const checkAccounts = await  axios.get(`http://localhost:8090/api/account/check-accounts`,
            {
                params: {
                    fromAccount: fromAccount,
                    toAccount: toAccount,
                },
                headers: {
                    Authorization: getAuthToken(),
                },
                withCredentials: true,
            });

            if(checkAccounts !== "VALID") {
                setMessage(checkAccounts.data);
                return;
            }
        }catch (error) {
            setMessage("계좌 확인 중 오류가 발생했습니다.");
        }

        try {
            const getOtherUserName = await axios.get(
                `http://localhost:8090/api/account/${toAccount}/user-name`,
                {
                    headers: {
                        Authorization: getAuthToken(),
                    },
                    withCredentials: true,
                }
            );
            setRecipientName(getOtherUserName.data || toAccount);

            console.log('받는 사람 이름:', getOtherUserName.data);

            setMessage("");
            setStep(2);
        } catch (error) {
            console.error(
                '계좌 확인 실패:',
                error.response?.data || error.message
            );
        }
    };

    const handleTransfer = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8090/api/account/transfer',
                {
                    fromAccount,
                    toAccount,
                    amount: parseInt(amount, 10),
                },
                {
                    headers: {
                        Authorization: getAuthToken(),
                    },
                    withCredentials: true,
                }
            );

            console.log('이체 성공:', response.data);
            window.location.reload();

            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error('이체 실패:', error.response?.data || error.message);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-container">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div className="transfer-step1">
                            <Typography variant="h5" className="modal-title">
                                이체
                                {message && (
                                    <div className="trans-error-message">
                                        {message}
                                    </div>
                                )}
                            </Typography>

                            <Box className="trans-form-container">
                                <Box className="input-box">
                                    <Typography className="input-label left-align">
                                        누구에게 보낼까요?
                                    </Typography>
                                    <input
                                        type="text"
                                        value={toAccount}
                                        onChange={(e) =>
                                            setToAccount(e.target.value)
                                        }
                                        className="color-input-field"
                                        placeholder="ex) 620002-04-272672"
                                    />
                                </Box>

                                <Box className="input-box">
                                    <Typography className="input-label left-align">
                                        금액{' '}
                                        <span className="sub-text">
                                            (출금 가능 금액:{' '}
                                            <strong>
                                                {balance.toLocaleString()}
                                            </strong>
                                            원 )
                                        </span>
                                    </Typography>
                                    <input
                                        type="text" // 🔹 number → text로 변경 (화살표 제거 목적)
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(
                                                Number(
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ''
                                                    ) || 0
                                                ).toLocaleString()
                                            )
                                        }
                                        className="color-input-field"
                                        placeholder="0원"
                                        inputMode="numeric" // 🔹 모바일 키보드 숫자 전용
                                    />
                                </Box>
                            </Box>

                            <Typography className="notice-text">
                                받는 분과 금액을 한 번 더 확인해 주세요.
                            </Typography>

                            <Box className="step1-button-container">
                                <Button
                                    onClick={handleCheckAccounts}
                                    style={{
                                        backgroundColor: '#37383C',
                                        color: '#fff',
                                        borderRadius: '15px',
                                        width: '200px',
                                        height: '60px',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        lineHeight: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        marginTop: '10px',
                                    }}
                                >
                                    이체
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div className="transfer-step2">
                            <Typography variant="h5" className="modal-title">
                                이체
                            </Typography>
                            <Box className="transfer-content">
                                <img
                                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png"
                                    alt="Airplane Departure"
                                    width="160"
                                    height="160"
                                    className="blockImage"
                                    draggable="false"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={(e) => e.currentTarget.blur()}
                                />
                                <Typography
                                    variant="h4"
                                    className="text-center large-text"
                                >
                                    {recipientName}님께{' '}
                                    {Number(amount).toLocaleString()}원을
                                    이체합니다.
                                </Typography>

                                <Typography
                                    variant="body1"
                                    className="notice-text"
                                >
                                    받는 분과 금액을 한 번 더 확인해 주세요.
                                </Typography>
                            </Box>

                            <div className="step2-button-container">
                                <Button
                                    onClick={() => setStep(1)}
                                    style={{
                                        backgroundColor: '#37383C',
                                        color: '#fff',
                                        borderRadius: '15px',
                                        width: '200px',
                                        height: '60px',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        lineHeight: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        marginTop: '10px',
                                    }}
                                >
                                    이전으로
                                </Button>

                                <Button
                                    onClick={handleTransfer}
                                    style={{
                                        backgroundColor: '#37383C',
                                        color: '#fff',
                                        borderRadius: '15px',
                                        width: '200px',
                                        height: '60px',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        lineHeight: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        marginTop: '10px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    확인
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Modal>
    );
};

export default TransferModal;
