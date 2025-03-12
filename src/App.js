import { useState } from 'react';
import TransferModal from './pages/transferModal';
// eslint-disable-next-line no-unused-vars
import ParkingAccount from './pages/ParkingAccount';

export default function App() {
    return <ParkingAccount />;
    // const [open, setOpen] = useState(false); // ✅ open 상태 추가
    //
    // return (
    //     <div className="h-screen flex items-center justify-center bg-gray-100">
    //         <button
    //             onClick={() => setOpen(true)} // ✅ 모달 열기
    //             className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition"
    //         >
    //             이체하기
    //         </button>
    //
    //         {/* ✅ 모달 컴포넌트에 상태 전달 */}
    //         <TransferModal open={open} onClose={() => setOpen(false)} />
    //     </div>
    // );
}
