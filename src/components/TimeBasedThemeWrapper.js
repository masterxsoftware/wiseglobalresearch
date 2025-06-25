import React, { useEffect, useState } from 'react';

const TimeBasedThemeWrapper = ({ children }) => {
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours(); // 0 to 23

    let gradientStyle = '';

    if (hour >= 0 && hour < 3) {
      gradientStyle = 'linear-gradient(to right, #0f2027, #203a43, #2c5364)';
    } else if (hour >= 3 && hour < 6) {
      gradientStyle = 'linear-gradient(to right, #3a6073, #16222a)';
    } else if (hour >= 6 && hour < 9) {
      gradientStyle = 'linear-gradient(to right, #FFEFBA, #FFFFFF)';
    } else if (hour >= 9 && hour < 12) {
      gradientStyle = 'linear-gradient(to right, #FDC830, #F37335)';
    } else if (hour >= 12 && hour < 15) {
      gradientStyle = 'linear-gradient(to right, #f6d365, #fda085)';
    } else if (hour >= 15 && hour < 18) {
      gradientStyle = 'linear-gradient(to right, #eacda3, #d6ae7b)';
    } else if (hour >= 18 && hour < 21) {
      gradientStyle = 'linear-gradient(to right, #2C3E50, #FD746C)';
    } else if (hour >= 21 && hour <= 23) {
      gradientStyle = 'linear-gradient(to right, #141E30, #243B55)';
    }

    setGradient(gradientStyle);
  }, []);

  return (
    <div
      style={{
        background: gradient,
        minHeight: '100vh',
        transition: '0.5s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default TimeBasedThemeWrapper;
