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
            return;
        }
        if (fromAccount === toAccount) {
            return;
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
                            <Typography variant="h4" className="modal-title">
                                이체
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
                                            {balance.toLocaleString()}원)
                                        </span>
                                    </Typography>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ''
                                                )
                                            )
                                        }
                                        className="color-input-field"
                                        placeholder="0원"
                                    />
                                </Box>
                            </Box>

                            <Typography className="notice-text">
                                받는 분과 금액을 한 번 더 확인해 주세요.
                            </Typography>

                            <Box className="button-container">
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
                            <Typography variant="h4" className="modal-title">
                                이체
                            </Typography>

                            <Box className="transfer-content">
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

                            <div className="button-container">
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
