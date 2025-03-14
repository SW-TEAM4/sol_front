import { useEffect, useState } from 'react';
import { getTransactionHistory } from '../../api/accountApi';

// 카테고리 매핑
const CATEGORY_MAP = {
    0: '연결된 증권계좌로 이체',
    1: '이자 입금',
    2: '챌린지 이체',
    3: '캐시백',
};

// 날짜 포맷 함수
const formatDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return (
        <>
            <strong>{`${month}.${day}`}</strong> | {`${hours}:${minutes}`}
        </>
    );
};

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('전체');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactionHistory(); // 이 부분에서 JWT 헤더를 포함하여 호출
                const formattedData = data
                    .map((tx) => ({
                        dateTime: formatDate(tx.created),
                        // ⭐ 직접 매칭하도록 수정
                        type:
                            CATEGORY_MAP[parseInt(tx.display_name)] ||
                            tx.display_name,
                        amount:
                            tx.des_wit_type === '1'
                                ? -tx.transfer_balance
                                : tx.transfer_balance,
                        balance:
                            tx.des_wit_type === '1'
                                ? tx.pre_balance // 출금이면 빼기
                                : tx.pre_balance // 입금이면 더하기
                    }))
                    // 내림 차순 정렬
                    .sort(
                        (a, b) =>
                            new Date(b.date + ' ' + b.time) -
                            new Date(a.date + ' ' + a.time)
                    );

                setTransactions(formattedData);
            } catch (error) {
                console.error('거래 내역 불러오기 실패:', error);
            }
        };
        fetchData();
    }, []);

    const filteredTransactions =
        selectedCategory === '전체'
            ? transactions
            : transactions.filter((tx) => tx.type === selectedCategory);

    return (
        <div className="history-container">
            <h3>거래 내역</h3>

            <div className="filter-buttons">
                {['전체', '캐시백', '이자 입금', '챌린지 이체'].map(
                    (category) => (
                        <button
                            key={category}
                            className={
                                selectedCategory === category ? 'active' : ''
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    )
                )}
            </div>

            <div className="transaction-list">
                {filteredTransactions.map((tx, idx) => (
                    <div key={idx} className="history-item">
                        <span>{tx.dateTime}</span>
                        <span>{tx.type}</span>
                        <span
                            className={tx.amount < 0 ? 'negative' : 'positive'}
                        >
                            {tx.amount.toLocaleString()}원
                        </span>
                        <span className="balance">
                            잔액 {tx.balance.toLocaleString()}원
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;
