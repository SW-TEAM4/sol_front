import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './result.css';

const Result = ({ userIdx, totalScore, setTotalScore }) => {
    const navigate = useNavigate();
    const [investorInfo, setInvestorInfo] = useState({});
    const [otherInvestors, setOtherInvestors] = useState([]);

    // 투자자 유형 데이터
    const investorTypes = {
        ansook: {
            name: '안숙이',
            description:
                '당신은 안전이 최우선!\n리스크는 싫어! 꾸준하고 안정적인 수익을 선호하는 편입니다.',
            img: '/assets/images/analyzeTest/ansook.svg',
        },
        chacheol: {
            name: '차철이',
            description:
                '신중하지만 기회를 놓치진 않아!\n당신은 분석하고 차근차근 투자하는 타입이에요.',
            img: '/assets/images/analyzeTest/chacheol.svg',
        },
        yeolsik: {
            name: '열식이',
            description:
                '기회는 한 방에 잡는 거지!\n당신은 위험을 감수하고 고수익을 노리는 모험가에요.',
            img: '/assets/images/analyzeTest/yeolsik.svg',
        },
    };

    useEffect(() => {
        if (totalScore <= 5) {
            setInvestorInfo(investorTypes.ansook);
            setOtherInvestors([investorTypes.chacheol, investorTypes.yeolsik]);
        } else if (totalScore <= 10) {
            setInvestorInfo(investorTypes.chacheol);
            setOtherInvestors([investorTypes.ansook, investorTypes.yeolsik]);
        } else {
            setInvestorInfo(investorTypes.yeolsik);
            setOtherInvestors([investorTypes.ansook, investorTypes.chacheol]);
        }

        //백엔드에 점수 저장
        if (userIdx && totalScore !== undefined) {
            axios
                .post(`http://localhost:8090/api/user/${userIdx}/score`, {
                    score: totalScore,
                })
                .then(() => console.log('✅ 점수 저장 완료:', totalScore))
                .catch((err) => console.log('❌ 점수 저장 실패:', err));
        }
    }, [totalScore, userIdx]);

    // 다시하기 버튼 클릭 시 점수 초기화
    const handleRestart = () => {
        setTotalScore(0); // 점수 초기화
        navigate('/'); // 홈으로 이동
    };

    return (
        <div className="result-container">
            {/* 상단 로고 */}
            {/*<img*/}
            {/*    src="/assets/images/analyzeTest/sol_logo.svg"*/}
            {/*    alt="sol_logo"*/}
            {/*    className="sol_logo"*/}
            {/*/>*/}

            {/* 현재 투자자 성향 결과 */}
            <div className="investor-result">
                <p className="result-name">{investorInfo.name}</p>
                <img
                    src={investorInfo.img}
                    alt={investorInfo.name}
                    className="result-img"
                />
                <p className="result-description">
                    {investorInfo.description
                        ?.split('\n')
                        .map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                </p>
            </div>

            {/* 다시하기 버튼, () => navigate('/') */}
            <div className="buttons">
                <button className="retry-button" onClick={handleRestart}>
                    <img
                        src="/assets/images/analyzeTest/again.svg"
                        alt="again"
                    />
                </button>
                <button
                    className="out-button"
                    onClick={() => navigate('/challenge')}
                >
                    <img src="/assets/images/analyzeTest/out.svg" alt="out" />
                </button>
            </div>

            {/* 다른 유형들 표시 */}
            <div className="other-investors">
                <p className="sub-title">또 다른 성향</p>
                <p className="sub-text">이런 성향을 가진 친구들도 있어요!</p>
                <div className="other-investors-list">
                    {otherInvestors.map((investor, index) => (
                        <div key={index} className="investor-card">
                            <p className="other-name">{investor.name}</p>
                            <img
                                src={investor.img}
                                alt={investor.name}
                                className="other-img"
                            />
                            <p className="other-description">
                                {investor.description
                                    ?.split('\n')
                                    .map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Result;
