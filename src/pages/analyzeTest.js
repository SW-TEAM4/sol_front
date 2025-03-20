import { useNavigate } from 'react-router-dom';
import './analyzeTest.css';

const AnalyzeTest = () => {
    const navigate = useNavigate();

    return (
        <div className="analyze-wrap-container">
            {/*<div className="analyze-banner-container">*/}
            <img
                src="/assets/images/analyzeTest/banner.svg"
                alt="banner"
                className="analyze-banner"
            />
            {/*</div>*/}
            <div className="analyze-test-intro">
                <p className="analyze-test-title">투자 성향 테스트</p>
                <p className="analyze-test-description">
                    <br />
                    많은 전문가들이 투자의 첫 번째 단계는 <br />
                    ‘자신의 성향을 이해하는 것’이라고 말해요. <br />
                    성향에 맞춘 목표와 실행 계획이, 꾸준히 나아갈 수 있는 힘이
                    되어주거든요.
                </p>
                <p className="analyze-test-invite">
                    <br />
                    지금 나의 투자 성향을 알아보고, <br />
                    앞으로의 투자 생활도 계획해보세요!
                </p>
                <p className="analyze-test-question">
                    <br />
                    나는 어떤 성향일까?
                </p>
            </div>
            <img
                src="/assets/images/analyzeTest/start.svg"
                alt="start"
                className="analyze-start-button"
                onClick={() => navigate('/q1')}
            />
            <p
                className="analyze-next-time"
                onClick={() => navigate('/challenge')}
            >
                다음에 할게요
            </p>
            <div className="analyze-participants">
                <img src="/assets/images/analyzeTest/ansook.svg" />
                <img src="/assets/images/analyzeTest/chacheol.svg" />
                <img src="/assets/images/analyzeTest/yeolsik.svg" />
            </div>
            <p className="analyze-participants-text">
                지금까지 총 <span className="analyze-count">25,227</span>명이
                참여했어요!
            </p>
        </div>
    );
};

export default AnalyzeTest;
