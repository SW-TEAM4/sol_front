import React from "react";
import { Modal, Box } from "@mui/material";

const TransferModal = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    outline: "none",
                }}
            >
                {/* 헤더 */}
                <h2 className="text-3xl font-bold mb-6">이체</h2>

                {/* 입력 폼 */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {/* 수취인 입력 */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-lg mb-2">
                            누구에게 보낼까요?
                        </label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-400 py-2 text-lg outline-none"
                        />
                    </div>

                    {/* 금액 입력 */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-1 flex justify-between">
                            <span>금액</span>
                            <span className="text-gray-500 text-sm">
                (출금 가능 금액: <strong className="text-black">1,564,005원</strong>)
              </span>
                        </label>
                        <input
                            type="number"
                            className="w-full border-b border-gray-400 py-2 text-right text-lg outline-none"
                            placeholder="0원"
                        />
                    </div>

                    {/* 받는 통장 표시 */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-1">받는 통장 표시</label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-400 py-2 text-lg outline-none"
                        />
                    </div>

                    {/* 은행 선택 */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-1">은행/증권사</label>
                        <select className="w-full border-b border-gray-400 py-2 text-lg outline-none appearance-none">
                            <option value="">선택하세요</option>
                            <option value="국민은행">국민은행</option>
                            <option value="신한은행">신한은행</option>
                            <option value="카카오뱅크">카카오뱅크</option>
                        </select>
                    </div>
                </div>

                {/* 이체 확인 메시지 */}
                <div className="mt-6 text-center text-lg font-semibold">
                    OOO님께 <span className="font-bold">502,000원</span>을 이체합니다.
                    <p className="text-sm text-gray-500 mt-1">
                        받는 분과 금액을 한 번 더 확인해 주세요
                    </p>
                </div>

                {/* 이체 버튼 */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onClose}
                        className="w-32 bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
                    >
                        이체
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default TransferModal;
