import React from 'react';

const ProgressBar = ({ target = 0, targetAchieved = 0 }) => {
  // Calculate progress percentage
  const progress = target > 0 ? Math.trunc((targetAchieved / target) * 100) : 0;

  return (
    <div className="my-2 position-relative" style={{ height: '13px' }}>
      {/* Background Bar */}
      <div
        className="progress"
        style={{
          height: '100%',
          borderRadius: '20px',
          backgroundColor: 'rgba(75, 77, 70, 0.18)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress Fill */}
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{
            width: `${progress}%`,
            borderRadius: '20px',
            transition: 'width 0.6s ease-in-out',
          }}
        ></div>
      </div>

      {/* Centered Text */}
      <span
        className="fs-12 fw-semibold position-absolute top-50 start-50 translate-middle"
        style={{
          whiteSpace: 'nowrap',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {targetAchieved} / {target}
      </span>
    </div>
  );
};

export default ProgressBar;
