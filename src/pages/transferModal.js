import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion"; // 애니메이션 라이브러리 추가
import "./transferModal.css";

const TransferModal = ({ open, onClose }) => {
    const [balance, setBalance] = useState(0);                             // 출금 가능 금액
    const [toAccount, setToAccount] = useState("");                         // 받는 계좌번호
    const [amount, setAmount] = useState("");                               // 이체 금액
    const [message, setMessage] = useState("");                             // 응답 메시지
    const [step, setStep] = useState(1);                                  // 현재 단계 (1: 입력 폼, 2: 이체 확인 페이지)
    const [bank, setBank] = useState("신한은행");                            // 은행/증권사 선택 상태 추가
    const [receiverName, setReceiverName] = useState("");                  // 받는 통장 표시 상태 추가
    const [recipientName, setrecipientName] = useState("");                // 받는 사람 이름 표시

    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 이체 완료 모달 상태 추가
    const [UserNames, setUserName] = useState("");

    const fromAccount = "1001"; // 하드코딩된 계좌번호

    useEffect(() => {
        if (open) {
            axios.get(`http://localhost:8090/api/account/balance?accountNumber=${fromAccount}`)
                .then(response => setBalance(response.data.balance))
                .catch(error => console.error("잔액 조회 실패:", error));
        }
    }, [open]);

    // 계좌 확인 후 다음 화면으로 이동
    const handleCheckAccounts = async () => {
        if (!toAccount) {
            setMessage("조회되지 않는 계좌번호입니다.");
            return;
        }
        if (fromAccount === toAccount) {
            setMessage("출금 계좌와 입금 계좌가 동일합니다. 다른 계좌를 입력해 주세요.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8090/api/account/check-accounts", {
                params: { fromAccount, toAccount }
            });


            // 상대방 이름
            const getOtherUserName = await axios.get(`http://localhost:8090/api/account/${toAccount}/user-name`, {
                params: { accountNo: toAccount }
            });

            //내 이름
            const getUserName = await axios.get(`http://localhost:8090/api/account/${fromAccount}/user-name`, {
                params: { accountNo: fromAccount }
            });

            setUserName(getUserName.data);
            setrecipientName(getOtherUserName.data || toAccount);

            console.log("계좌 확인 결과:", response.data);
            setMessage(""); // 오류 메시지 초기화
            setStep(2); // 페이지 전환 (이체 확인 화면)
        } catch (error) {
            console.error("계좌 확인 실패:", error.response?.data || error.message);
            setMessage(error.response?.data || "계좌 확인 실패");
        }
    };

    // 최종 이체 실행 및 성공 모달 띄우기
    const handleTransfer = async () => {
        try {
            const response = await axios.post("http://localhost:8090/api/account/transfer", {
                fromAccount,
                toAccount,
                amount: parseInt(amount, 10)
            });

            /* account_history table 연동 */
                const prebalance = balance - amount;
                const accountHistory = await axios.post("http://localhost:8090/api/account/insertAccountHistroy", {
                    fromAccount,                                                     // 계좌번호    account_no
                    receiverName : recipientName,                                    // 받는사람    display_name
                    amount:parseInt(amount, 10),                                // 보내는 금액 transfer_balance
                    prebalance,                                                      // 현재 잔액   pre_balance
                    desWitType:"1"                                                   // 출금       des_ wit_type

                });

            const reverceaccountHistory = await axios.post("http://localhost:8090/api/account/insertAccountHistroy", {
                fromAccount : toAccount,                                                  // 계좌번호    account_no
                receiverName : UserNames,                                   // 받는사람    display_name
                amount:parseInt(amount, 10),                          // 보내는 금액 transfer_balance
                prebalance,                                                // 현재 잔액   pre_balance
                desWitType:"0"                                             // 출금       des_ wit_type

            });


            console.log("이체 성공:", response.data);
            setMessage(response.data);




            // 성공 모달 띄우기
            setIsSuccessModalOpen(true);

        } catch (error) {
            console.error("이체 실패:", error.response?.data || error.message);
            setMessage(error.response?.data || "이체 실패");
        }
    };

    // 모든 모달 닫기
    const handleCloseAllModals = () => {
        setStep(1); // 처음 화면으로 초기화
        setMessage("");
        onClose();
        setIsSuccessModalOpen(false);
        window.location.reload();

    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="modal-container">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div className="transfer-step1">
                            {/* 타이틀 */}
                            <Typography variant="h4" className="modal-title">
                                이체
                            </Typography>

                            {/* 4칸 가로 레이아웃 */}
                            <Box className="form-container">
                                {/* 계좌번호 (왼쪽 위) */}
                                <Box className="input-box">
                                    <Typography className="input-label">
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

                                {/* 금액 (오른쪽 위) */}
                                <Box className="input-box">
                                    <Typography className="input-label">
                                        금액
                                        <span className="sub-text">(출금 가능 금액:{balance.toLocaleString()}원)</span>
                                    </Typography>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value.replace(/[^0-9]/g, ""))
                                        }
                                        className="input-field text-right"
                                        placeholder="0원"
                                    />
                                </Box>

                                {/* 은행/증권사 (왼쪽 아래) */}
                                <Box className="input-box">
                                    <Typography className="input-label">
                                        은행/증권사
                                    </Typography>
                                    <select
                                        value={bank}
                                        onChange={(e) =>
                                            setBank(e.target.value)
                                        }
                                        className="input-select">
                                        <option value="신한은행">신한은행</option>
                                        <option value="신한투자증권">신한투자증권</option>
                                    </select>
                                </Box>

                                {/* 받는 통장 표시 (오른쪽 아래) */}
                                <Box className="input-box">
                                    <Typography className="input-label">받는 통장 표시</Typography>
                                    <input
                                        type="text"
                                        value={receiverName}
                                        onChange={(e) =>
                                            setReceiverName(e.target.value)
                                        }
                                        className="input-field"
                                        placeholder="ex) OOO"
                                    />
                                </Box>
                            </Box>
{/*                            <Typography sx={{marginBottom: '45px'}}></Typography>*/}
                            {/* 안내 문구 */}
                            <Typography className="notice-text">
                                받는 분과 금액을 한 번 더 확인해 주세요.
                            </Typography>

                            {/* 버튼 */}
                            <Box className="button-container">
                                <Button onClick={handleCheckAccounts} className="confirm-button">
                                    이체
                                </Button>


                            </Box>
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/*    아이콘과 텍스트를 아래로 이동 */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop: 'auto', //    아이콘과 텍스트를 아래로 이동
                                }}
                            >
                                <img
                                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane%20Departure.png"
                                    alt="Airplane Departure"
                                    width="150"
                                    height="150"
                                    className="noSelect noPointer blockImage"
                                    draggable="false"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={(e) => e.currentTarget.blur()} //  클릭 후 포커스 해제
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight="{400}"
                                    className="text-center noSelect"
                                >
                                    {recipientName}님께{' '}
                                    {Number(amount).toLocaleString()}원을
                                    이체합니다.
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    className="text-center noSelect"
                                    fontSize="15px"
                                >
                                    받는 분과 금액을 한 번 더 확인해 주세요.
                                </Typography>
                            </div>

                            {/*    버튼을 하단 고정 */}
                            <div
                                className="flex justify-center w-full"
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: 'auto', //    버튼을 하단에 고정
                                    marginBottom: '15px',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setStep(1)}
                                    sx={{
                                        backgroundColor: '#37383C', // 두 번째 버튼의 배경색 유지
                                        color: '#fff', // 대비를 위해 흰색 글자
                                        borderRadius: '10px', // 첫 번째 버튼의 border-radius 적용
                                        width: '180px', // 첫 번째 버튼의 너비 적용
                                        height: '40px', // 첫 번째 버튼의 높이 적용
                                        fontSize: '14px', // 첫 번째 버튼의 글씨 크기 적용
                                        fontWeight: 'bold', // 첫 번째 버튼의 글씨 두께 적용
                                        textTransform: 'none', // 첫 번째 버튼의 텍스트 스타일 적용
                                        lineHeight: '1', // 첫 번째 버튼의 줄 간격 적용
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: '#292A2D', // 두 번째 버튼의 hover 색상 유지
                                        },
                                    }}
                                >
                                    이전으로
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleTransfer}
                                    sx={{
                                        backgroundColor: '#37383C', // 두 번째 버튼의 배경색 유지
                                        color: '#fff', // 대비를 위해 흰색 글자
                                        borderRadius: '10px', // 첫 번째 버튼의 border-radius 적용
                                        width: '180px', // 첫 번째 버튼의 너비 적용
                                        height: '40px', // 첫 번째 버튼의 높이 적용
                                        fontSize: '14px', // 첫 번째 버튼의 글씨 크기 적용
                                        fontWeight: 'bold', // 첫 번째 버튼의 글씨 두께 적용
                                        textTransform: 'none', // 첫 번째 버튼의 텍스트 스타일 적용
                                        lineHeight: '1', // 첫 번째 버튼의 줄 간격 적용
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: '#292A2D', // 두 번째 버튼의 hover 색상 유지
                                        },
                                    }}
                                >
                                    확인
                                </Button>
                            </div>
                        </motion.div>
                    )}
                    {/* 이체 성공 모달 */}
                    <Modal
                        open={isSuccessModalOpen}
                        onClose={handleCloseAllModals}
                    >
                        <Box
                            sx={{
                                position: 'fixed', // 화면 전체 기준으로 배치
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                display: 'flex', // Flexbox로 중앙 정렬
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', // 반투명 배경 추가
                                zIndex: 2000, // 항상 최상위에 있도록 설정
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    width: '420px',
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    boxShadow:
                                        '0px 10px 30px rgba(0, 0, 0, 0.2)',
                                    padding: '30px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {/* 아이콘 */}
                                <img
                                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
                                    alt="Party Popper"
                                    width="120"
                                    height="120"
                                    style={{ marginBottom: '15px' }}
                                />

                                {/* 이체 완료 메시지 */}
                                <Typography
                                    variant="h5"
                                    fontWeight="{400}"
                                    className="noSelect"
                                    sx={{
                                        marginBottom: '10px',
                                        color: '#37383C',
                                        fontSize: '22px',
                                    }}
                                >
                                    이체가 완료되었습니다!
                                </Typography>

                                {/* 서브 메시지 */}
                                <Typography
                                    variant="body1"
                                    className="noSelect"
                                    sx={{
                                        color: '#666',
                                        fontSize: '12px',
                                        marginBottom: '25px',
                                    }}
                                >
                                    입금 내역을 확인해 보세요.
                                </Typography>

                                {/* 확인 버튼 */}
                                <Button
                                    variant="contained"
                                    onClick={handleCloseAllModals}
                                    sx={{
                                        backgroundColor: '#37383C', // 두 번째 버튼의 배경색 유지
                                        color: '#fff', // 대비를 위해 흰색 글자
                                        borderRadius: '10px', // 첫 번째 버튼의 border-radius 적용
                                        width: '180px', // 첫 번째 버튼의 너비 적용
                                        height: '40px', // 첫 번째 버튼의 높이 적용
                                        fontSize: '14px', // 첫 번째 버튼의 글씨 크기 적용
                                        fontWeight: 'bold', // 첫 번째 버튼의 글씨 두께 적용
                                        textTransform: 'none', // 첫 번째 버튼의 텍스트 스타일 적용
                                        lineHeight: '1', // 첫 번째 버튼의 줄 간격 적용
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: '#292A2D', // 두 번째 버튼의 hover 색상 유지
                                        },
                                    }}
                                >
                                    확인
                                </Button>
                            </motion.div>
                        </Box>
                    </Modal>
                </AnimatePresence>
            </Box>
        </Modal>
    );
};

export default TransferModal;
