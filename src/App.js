import React, { useState } from 'react'; // useState 추가
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Question1 from './pages/question1';
import Question2 from './pages/question2';
import Question3 from './pages/question3';
import Question4 from './pages/question4';
import Question5 from './pages/question5';
import Result from './pages/result';
import AnalyzeTest from './pages/analyzeTest';
import Challenge from './pages/challenge';

function App() {
    const [totalScore, setTotalScore] = useState(0);
    const [selectedScores, setSelectedScores] = useState([]); // 🛠 선택한 점수 저장
    const userIdx = 1;

    const addScore = (score) => {
        setTotalScore((prev) => prev + score);
        setSelectedScores((prev) => [...prev, score]); // 🛠 점수 기록
    };

    const subtractScore = () => {
        setSelectedScores((prev) => {
            if (prev.length === 0) {
                return prev;
            } // 선택한 점수가 없으면 그대로
            const lastScore = prev[prev.length - 1]; // 마지막 선택 점수 가져오기
            setTotalScore((prev) => prev - lastScore); // 🛠 해당 점수 빼기

            return prev.slice(0, prev.length - 1);
        });
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/challenge"
                    element={<Challenge userIdx={userIdx} />}
                />
                <Route path="/" element={<AnalyzeTest />} />
                <Route path="/q1" element={<Question1 addScore={addScore} />} />
                <Route
                    path="/q2"
                    element={
                        <Question2
                            addScore={addScore}
                            subtractScore={subtractScore}
                        />
                    }
                />
                <Route
                    path="/q3"
                    element={
                        <Question3
                            addScore={addScore}
                            subtractScore={subtractScore}
                        />
                    }
                />
                <Route
                    path="/q4"
                    element={
                        <Question4
                            addScore={addScore}
                            subtractScore={subtractScore}
                        />
                    }
                />
                <Route
                    path="/q5"
                    element={
                        <Question5
                            addScore={addScore}
                            subtractScore={subtractScore}
                        />
                    }
                />
                <Route
                    path="/result"
                    element={
                        <Result
                            userIdx={userIdx}
                            totalScore={totalScore}
                            setTotalScore={setTotalScore}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}
export default App;
