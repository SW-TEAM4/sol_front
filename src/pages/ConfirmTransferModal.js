import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion"; // 애니메이션 라이브러리 추가
import "./transferModal.css";

const TransferModal = ({ open, onClose }) => {
    const [toAccount, setToAccount] = useState("");                         // 받는 계좌번호
    const [amount, setAmount] = useState("");                               // 이체 금액
    const [message, setMessage] = useState("");                             // 응답 메시지
    const [step, setStep] = useState(1);                                  // 현재 단계 (1: 입력 폼, 2: 이체 확인 페이지)



    // 계좌 확인 후 다음 화면으로 이동
    const handleCheckAccounts = async () => {
        if (!toAccount) {
            setMessage("조회되지 않는 계좌번호입니다.");
            return;
        }

        try{
            const response = await axios.post("http://localhost:8090/api/account/deposit", {
                toAccount,
                amount
            });
        }catch(e){

        }

    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="bg-white rounded-xl shadow-lg p-8"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px', //  고정된 너비
                    height: '750px', //  고정된 높이
                    outline: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Noto Sans, sans-serif', //    글씨체 적용
                }}
            >
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                textAlign="center"
                                sx={{
                                    marginBottom: '30px',
                                    marginTop: '-20px',
                                    fontFamily: 'Noto Sans, sans-serif',
                                }}
                                className="noSelect"
                            >
                                이체
                            </Typography>

                            {/* 수취인 입력 */}
                            <div className="col-span-2 mb-4">
                                <label className="block text-gray-700 text-lg mb-2 noSelect">
                                    누구에게 보낼까요?
                                </label>
                                <input
                                    type="text"
                                    value={toAccount}
                                    onChange={(e) =>
                                        setToAccount(e.target.value)
                                    }
                                    className="w-full border-b border-gray-400 py-2 text-lg outline-none"
                                    placeholder="ex) 110-530-264742"
                                />
                            </div>


                            {/* 금액 입력 */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-lg mb-1 flex justify-between">
                                    <span>금액</span>
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full border-b border-gray-400 py-2 text-right text-lg outline-none"
                                    placeholder="0원"
                                />
                            </div>
                            {/*


                            {message && (
                                <div className="mt-6 text-center text-lg font-semibold text-red-500">
                                    {message}
                                </div>
                            )}

                            {/* 이체 버튼 */}
                            <div className="flex justify-center">
                                <Button
                                    variant="contained"
                                    onClick={handleCheckAccounts}
                                    sx={{
                                        width: '100%',
                                        height: '50px',
                                        fontSize: '18px',
                                        backgroundColor: '#263FBD',
                                        marginTop: '70px',
                                        fontfamily: 'Noto Sans, sans-serif',
                                    }}
                                >
                                    이체
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
