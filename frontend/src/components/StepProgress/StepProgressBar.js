import React from 'react';
import './StepProgress.css'; // 스타일링을 위한 CSS 파일

const StepProgressBar = ({ currentStep }) => {
  const steps = [1, 2, 3, 4];

  return (
    <div className="step-progress-bar">
      {steps.map((step, index) => (
        <div key={index} className={`step ${currentStep === step ? 'active' : ''}`}>
          <div className="step-number">{step}</div>
          {index < steps.length - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
