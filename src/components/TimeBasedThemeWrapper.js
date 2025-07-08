// src/components/TimeBasedThemeWrapper.js
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const TimeBasedThemeWrapper = ({ children }) => {
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients[theme] || gradients.default;

  useEffect(() => {
    document.body.style.background = background;
    document.body.style.color = textColor;
  }, [background, textColor]);

  return (
    <div
      style={{
        background,
        color: textColor,
        transition: '0.6s ease-in-out',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default TimeBasedThemeWrapper;
