import { useState } from 'react';
import Onboarding from './pages/onboarding/Onboarding';
import OnboardingStep2 from './pages/onboarding/OnboardingStep2';
import OnboardingStep3 from './pages/onboarding/OnboardingStep3';
import OnboardingStep4 from './pages/onboarding/OnboardingStep4';
import OnboardingStep5 from './pages/onboarding/OnboardingStep5';
import OnboardingStep6 from './pages/onboarding/OnboardingStep6';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="full-page">
                <Onboarding />
            </div>
            <div className="full-page">
                <OnboardingStep2 />
            </div>
            <div className="full-page">
                <OnboardingStep3 />
            </div>
            <div className="full-page step4-container">
                <OnboardingStep4 />
            </div>
            <div className="full-page step5-container">
                <OnboardingStep5 />
            </div>
            <div className="full-page step6-container">
                <OnboardingStep6 />
            </div>
        </div>
    );
}

export default App;
