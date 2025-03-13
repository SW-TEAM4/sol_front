import React from 'react';
import Onboarding from './Onboarding';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingStep4 from './OnboardingStep4';
import OnboardingStep5 from './OnboardingStep5';
import OnboardingStep6 from './OnboardingStep6';

const OnboardingFinal = () => {
    return (
        <div>
            <div className="full-page">
                <Onboarding />
            </div>
            <div className="full-page">
                <OnboardingStep2 />
            </div>
            <div className="full-page">
                <OnboardingStep3 />
            </div>
            <div className="full-page">
                <OnboardingStep4 />
            </div>
            <div className="full-page">
                <OnboardingStep5 />
            </div>
            <div className="full-page">
                <OnboardingStep6 />
            </div>
        </div>
    );
};

export default OnboardingFinal;
