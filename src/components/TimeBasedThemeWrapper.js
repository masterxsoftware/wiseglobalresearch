// src/components/TimeBasedThemeWrapper.js
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import back2 from '../assets/images/back2.png';

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
        color: textColor,
        transition: '0.6s ease-in-out',
        minHeight: '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >

      {/* ✨ Subtle Smooth Texture Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: theme === 'default'
          ? `url(${back2})`
          : "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: theme === 'default' ? 'cover' : '20px 20px',
        backgroundRepeat: theme === 'default' ? 'no-repeat' : 'repeat',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* 🧠 Actual Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default TimeBasedThemeWrapper;
