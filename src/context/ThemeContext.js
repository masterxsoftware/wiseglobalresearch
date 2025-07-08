// ✅ STEP 1: ThemeContext.js (final)
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const gradients = {
  default: {
    background: 'linear-gradient(to right,rgb(31, 231, 148),rgb(15, 107, 50))',
    textColor: '#ffffff',
  },
  dark: {
    background: 'linear-gradient(to right, #1f1f1f, #000000)',
    textColor: '#ffffff',
  },
  sunny: {
    background: 'linear-gradient(to right, #f6d365, #fda085)',
    textColor: '#333333',
  },
  ocean: {
    background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
    textColor: '#ffffff',
  },
  sunset: {
    background: 'linear-gradient(to right, #0B486B, #F56217)',
    textColor: '#ffffff',
  },
  forest: {
    background: 'linear-gradient(to right, #5A3F37, #2C7744)',
    textColor: '#ffffff',
  },
  fire: {
    background: 'linear-gradient(to right, #F00000, #DC281E)',
    textColor: '#ffffff',
  },
  ice: {
    background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    textColor: '#000000',
  },
  gold: {
    background: 'linear-gradient(to right, #fbd786, #f7797d)',
    textColor: '#333333',
  },
  purpleDream: {
    background: 'linear-gradient(to right, #c471f5, #fa71cd)',
    textColor: '#ffffff',
  },
  greenGlow: {
    background: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    textColor: '#ffffff',
  },
  rainbowSky: {
    background: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
    textColor: '#000000',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const currentTheme = gradients[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        gradients,
        background: currentTheme.background,
        textColor: currentTheme.textColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
