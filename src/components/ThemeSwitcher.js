// 🔹 src/components/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-[999] flex gap-2 p-2 rounded shadow bg-white/80 backdrop-blur-md">
      <button onClick={() => setTheme('green')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Green</button>
      <button onClick={() => setTheme('red')} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Red</button>
      <button onClick={() => setTheme('blue')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Blue</button>
      <button onClick={() => setTheme('default')} className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Default</button>
    </div>
  );
};

export default ThemeSwitcher;   