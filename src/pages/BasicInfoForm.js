import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // To send the API request
import '../styles/BasicInfoForm.css';
import logo from '../images/logo.svg'; // 🔥 logo.svg 불러오기

const BasicInfoForm = () => {
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    // 모든 항목이 선택되었는지 확인
    const isFormComplete = selectedGender && selectedAge && selectedJob;

    const handleSubmit = async () => {
        if (!selectedGender || !selectedAge || !selectedJob) {
            return;
        }

        // 나이, 직업, 성별 매핑
        const genderMapping = {
            남자: 'M', // Male
            여자: 'F', // Female
        };

        // 나이와 직업 매핑
        const ageMapping = {
            '10대': 1,
            '20대': 2,
            '30대': 3,
            '40대': 4,
            '50대': 5,
            '60대 이상': 6,
        };

        const jobMapping = {
            학생: 0,
            대학생: 1,
            직장인: 2,
            프리랜서: 3,
            주부: 4,
            기타: 5,
        };

        const requestData = {
            gender: genderMapping[selectedGender], // 성별은 그대로
            age: ageMapping[selectedAge], // 매핑된 나이 값
            job: jobMapping[selectedJob], // 매핑된 직업 값
        };

        console.log('전송 데이터:', requestData); // 요청 데이터 확인

        try {
            const response = await axios.patch(
                'http://localhost:8090/auth/basic-info',
                requestData,
                {
                    withCredentials: true, // 쿠키 포함
                    headers: {
                        'Content-Type': 'application/json', // JSON 형식으로 보내기
                    },
                }
            );

            console.log('기본 정보 저장 응답:', response.data); // 응답 로그

            if (response.data.isSuccess) {
                console.log('기본 정보 저장 성공!');
                navigate('/home'); // 기본 정보 저장 후 홈 이동
            } else {
                console.error('기본 정보 저장 실패:', response.data.message);
            }
        } catch (error) {
            console.error('기본 정보 저장 실패:', error);
        }
    };

    return (
        <div className="form-container">
            <img src={logo} alt="SOL 로고" className="logo" />

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
                onClick={handleSubmit}
                disabled={!isFormComplete}
            >
                기본 정보 입력 완료
            </button>
        </div>
    );
};

export default BasicInfoForm;
