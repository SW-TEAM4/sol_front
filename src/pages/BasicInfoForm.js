import { useState } from 'react';
import '../styles/BasicInfoForm.css';
import logo from '../images/logo.svg'; // 🔥 logo.svg 불러오기

const BasicInfoForm = () => {
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    // 모든 항목이 선택되었는지 확인
    const isFormComplete = selectedGender && selectedAge && selectedJob;

    return (
        <div className="form-container">
            <img src={logo} alt="SOL 로고" className="logo" />

            {/*<div className="profile-badge">간편 프로필 등록</div>*/}

            {/* 성별 선택 */}
            <p className="question">우지호님의 성별을 선택해주세요</p>
            <div className="button-group gender-group">
                {['남자', '여자'].map((gender) => (
                    <button
                        key={gender}
                        className={`btn ${selectedGender === gender ? 'selected' : ''}`}
                        onClick={() => setSelectedGender(gender)}
                    >
                        {gender}
                    </button>
                ))}
            </div>

            {/* 연령대 선택 */}
            <p className="question">우지호님의 연령대를 알려주세요</p>
            <div className="button-group">
                {['10대', '20대', '30대', '40대', '50대', '60대 이상'].map(
                    (age) => (
                        <button
                            key={age}
                            className={`btn ${selectedAge === age ? 'selected' : ''}`}
                            onClick={() => setSelectedAge(age)}
                        >
                            {age}
                        </button>
                    )
                )}
            </div>

            {/* 직업 선택 */}
            <p className="question">우지호님은 어떤 직업을 갖고 계신가요?</p>
            <div className="button-group">
                {['학생', '대학생', '직장인', '프리랜서', '주부', '기타'].map(
                    (job) => (
                        <button
                            key={job}
                            className={`btn ${selectedJob === job ? 'selected' : ''}`}
                            onClick={() => setSelectedJob(job)}
                        >
                            {job}
                        </button>
                    )
                )}
            </div>

            {/* 기본 정보 입력 완료 버튼 */}
            <button
                className={`submit-btn ${!isFormComplete ? 'disabled' : ''}`}
                disabled={!isFormComplete}
            >
                기본 정보 입력 완료
            </button>
        </div>
    );
};

export default BasicInfoForm;
