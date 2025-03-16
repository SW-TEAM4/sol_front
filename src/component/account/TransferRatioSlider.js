import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { getBalance, getTransferRatio, setTransferRatio } from '../../api/accountApi';
import Modal from './Modal';

// JWT 토큰을 로컬스토리지에서 가져오는 함수
const getAuthToken = async () => {
    return `Bearer ${localStorage.getItem("jwtToken")}`;
};

// 이체 비율 조정 슬라이더
const TransferRatioSlider = () => {
    const [ratio, setRatio] = useState(0); // 현재 설정된 이체 비율
    const [balance, setBalance] = useState(0); // 현재 잔고
    const [transferAmount, setTransferAmount] = useState(0); // 이체 예정 금액
    const [openModal, setOpenModal] = useState(false); // 모달 상태
    const [newRatio, setNewRatio] = useState(0); // 새로 설정할 비율 (실시간 변경)
    const [prevRatio, setPrevRatio] = useState(0); // 모달 취소 시 원래대로 되돌릴 비율

    useEffect(() => {
        const fetchData = async () => {
            try {
                // JWT 토큰을 헤더에 포함시켜서 API 호출
                const ratioData = await getTransferRatio();
                const balanceData = await getBalance();

                setRatio(ratioData);
                setNewRatio(ratioData);
                setPrevRatio(ratioData);
                setBalance(balanceData);
                setTransferAmount(Math.floor(balanceData * (ratioData / 100)));
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchData();
    }, []);

    // balance 또는 ratio가 변경될 때마다 transferAmount 재계산
    useEffect(() => {
        if (balance > 0) {
            setTransferAmount(Math.floor(balance * (newRatio / 100)));
        }
    }, [balance, newRatio]);

    // 슬라이더 값 변경 이벤트 (실시간 비율 반영)
    const handleChange = (event, newValue) => {
        setNewRatio(newValue);
        setTransferAmount(Math.floor(balance * (newValue / 100)));
    };

    // 모달 열기 전에 현재 비율 저장 (취소 시 되돌리기)
    const handleMouseUp = () => {
        setPrevRatio(ratio); // 기존 비율 저장
        setOpenModal(true);
    };

    // 비율 변경 확정
    const confirmChange = async () => {
        try {
            await setTransferRatio(newRatio);
            setRatio(newRatio);
            setPrevRatio(newRatio);
        } catch (error) {
            console.error('이체 비율 업데이트 오류:', error);
        } finally {
            setOpenModal(false);
        }
    };

    // 모달 취소 시 원래 비율로 되돌리기
    const cancelChange = () => {
        setNewRatio(prevRatio); // 이전 비율로 되돌리기
        setTransferAmount(Math.floor(balance * (prevRatio / 100))); // 원래 이체 금액 복원
        setOpenModal(false);
    };

    return (
        <div className="slider-container">
            <h3 className="slider-title">투자 이체 비율 설정</h3>

            <div className="slider-row">
                <Slider
                    value={newRatio}
                    onChange={handleChange}
                    onChangeCommitted={handleMouseUp}
                    min={1}
                    max={100}
                    className="custom-slider"
                />
                <span className="slider-percentage">{newRatio}%</span>
                <span className="transfer-amount">
                    25일에 {transferAmount.toLocaleString()}원 이체 예정
                </span>
            </div>

            <Modal
                open={openModal}
                handleClose={cancelChange} // 취소하면 원래대로 복원
                handleConfirm={confirmChange} // 변경
                message={`이체 비율을 ${newRatio}%로 변경하시겠어요?`}
            />
        </div>
    );
};

export default TransferRatioSlider;
