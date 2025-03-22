import { useEffect, useState } from 'react';
import { getTransactionHistory } from '../../api/accountApi';

const CATEGORY_MAP = {
    0: '연결된 신한 투자 증권 계좌로 이체',
    1: '이자 입금',
    2: '챌린지 이체',
    3: '캐시백',
};

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('전체');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactionHistory();
                const formattedData = data
                    .map((tx) => {
                        const displayType =
                            CATEGORY_MAP[parseInt(tx.display_name)] ||
                            tx.display_name;

                        return {
                            dateTime: new Date(tx.created).toLocaleString(
                                'ko-KR',
                                {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                }
                            ),
                            type: displayType,
                            amount:
                                tx.des_wit_type === '1'
                                    ? -tx.transfer_balance
                                    : tx.transfer_balance,
                            balance: tx.pre_balance,
                        };
                    })
                    .sort(
                        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
                    ); // 최신순 정렬

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
                {['전체', '이자 입금', '챌린지 이체', '캐시백'].map(
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
                            className={
                                tx.amount < 0
                                    ? 'trans-negative'
                                    : 'trans-positive'
                            }
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
