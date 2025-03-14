import './Onboarding.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PointingHand from '../../assets/images/Index Pointing at the Viewer 1.svg';
import OKHand from '../../assets/images/OK Hand 1.svg';
import SOLLogo from '../../assets/images/sol_logo.svg'; // ✅ 로고 이미지 import

const Onboarding = ({ onNext }) => {
    const { ref, inView } = useInView({ threshold: 0.5 });

    return (
        <motion.div
            ref={ref}
            className="onboarding-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.8 }}
        >
            <div className="step1_content">
                {/* ✅ 제목과 이모지를 하나로 묶는 wrapper 추가 */}
                <div className="step1_title-wrapper">
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Cat.png"
                        alt="Crying Cat"
                        className="step1_emoji-cat"
                    />
                    <h1 className="step1_title">
                        겁쟁이들 너도,
                        <img
                            src={PointingHand}
                            alt="Pointing Hand"
                            className="step1_emoji-img"
                        />
                        <br />
                        주식 투자 할 수 있어
                        <img
                            src={OKHand}
                            alt="OK Hand"
                            className="step1_emoji-img1"
                        />
                    </h1>
                </div>

                <p className="step1_description">
                    주식이 두려운 겁쟁이들도 소액으로 부담 없이 <br />
                    투자를 시작할 수 있어요!
                </p>
                <p className="step1_highlight">
                    <img
                        src={SOLLogo}
                        alt="SOL Logo"
                        className="step1_sol-logo"
                    />
                    는 투자가 두려워 시작을 주저하고 있는 <br />
                    예비 주주님들에게 주식 투자 경험을 만들어 드립니다.
                </p>
            </div>
        </motion.div>
    );
};

export default Onboarding;
