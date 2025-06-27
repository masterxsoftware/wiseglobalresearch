import React from 'react';

const TimeBasedThemeWrapper = ({ children }) => {
  const gradient = 'linear-gradient(to right, #6a11cb, #2575fc)';

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