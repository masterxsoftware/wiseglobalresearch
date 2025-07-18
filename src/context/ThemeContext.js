import React, { createContext, useState, useEffect } from 'react';

// Define an extensive set of vibrant, sexy gradients
const gradients = {
  default: {
    background: 'linear-gradient(to right, rgba(5, 160, 250, 0.84), rgba(16, 130, 223, 0.88))',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out', // Smooth transition
  },
  sunny: {
    background: 'linear-gradient(to right, #f6d365, #fda085)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  ocean: {
    background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  sunset: {
    background: 'linear-gradient(to right, #0B486B, #F56217)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  forest: {
    background: 'linear-gradient(to right, #5A3F37, #2C7744)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  fire: {
    background: 'linear-gradient(to right, #F00000, #DC281E)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  ice: {
    background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    textColor: '#000000',
    transition: 'background 0.5s ease-in-out',
  },
  gold: {
    background: 'linear-gradient(to right, #fbd786, #f7797d)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  purpleDream: {
    background: 'linear-gradient(to right, #c471f5, #fa71cd)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  greenGlow: {
    background: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  rainbowSky: {
    background: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
    textColor: '#000000',
    transition: 'background 0.5s ease-in-out',
  },
  // New Sexy Gradients
  neonPulse: {
    background: 'linear-gradient(to right, #00f260, #0575e6)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  cyberWave: {
    background: 'linear-gradient(to right, #ff00cc, #333399)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  auroraGlow: {
    background: 'linear-gradient(to right, #00dbde, #fc00ff)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  midnightMarket: {
    background: 'linear-gradient(to right, #1e3c72, #2a5298)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  goldenHorizon: {
    background: 'linear-gradient(to right, #f7971e, #ffd200)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  cosmicTrade: {
    background: 'linear-gradient(to right, #4b0082, #00b7eb)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  emeraldRush: {
    background: 'linear-gradient(to right, #00c4b4, #7cffcb)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  rubyBlaze: {
    background: 'linear-gradient(to right, #e52d27, #b31217)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  sapphireNight: {
    background: 'linear-gradient(to right, #2b32b2, #1488cc)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  tropicalVibe: {
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  electricLime: {
    background: 'linear-gradient(to right, #ccff00, #00ffcc)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  starDust: {
    background: 'linear-gradient(to right, #1a2980, #26d0ce)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  velvetDusk: {
    background: 'linear-gradient(to right, #6b206b, #ff6a88)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
  aquaFlare: {
    background: 'linear-gradient(to right, #00ddeb, #b0e0e6)',
    textColor: '#333333',
    transition: 'background 0.5s ease-in-out',
  },
  magmaCore: {
    background: 'linear-gradient(to right, #ff4500, #ff8c00)',
    textColor: '#ffffff',
    transition: 'background 0.5s ease-in-out',
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  const [previewTheme, setPreviewTheme] = useState(null); // For previewing themes

  // Apply theme transition to body for smooth gradient changes
  useEffect(() => {
    document.body.style.transition = 'background 0.5s ease-in-out';
    document.body.style.background = previewTheme ? gradients[previewTheme].background : gradients[theme].background;
    document.body.style.color = previewTheme ? gradients[previewTheme].textColor : gradients[theme].textColor;
  }, [theme, previewTheme]);

  // Change theme permanently
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setPreviewTheme(null); // Clear preview when applying
  };

  // Preview a theme temporarily
  const previewThemeFunc = (themeName) => {
    setPreviewTheme(themeName);
    setTimeout(() => setPreviewTheme(null), 3000); // Revert after 3 seconds
  };

  const currentTheme = previewTheme ? gradients[previewTheme] : gradients[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        previewTheme: previewThemeFunc,
        gradients,
        background: currentTheme.background,
        textColor: currentTheme.textColor,
        transition: currentTheme.transition,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};