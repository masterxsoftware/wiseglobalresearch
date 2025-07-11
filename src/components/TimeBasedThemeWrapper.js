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
        position: 'relative',
        background,
        color: textColor,
        transition: '0.6s ease-in-out',
        minHeight: '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 🔳 Transparent Texture Layer */}
      <div
        style={{
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/grid-me.png)',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 🧠 Actual Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default TimeBasedThemeWrapper;
