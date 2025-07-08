import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSelectorBox = () => {
  const { changeTheme, gradients } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-64 mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-2 px-4 bg-white text-black rounded shadow font-bold"
      >
        🎨 Select Theme
      </button>

      {open && (
        <div className="absolute top-12 w-full bg-white rounded shadow z-10 max-h-60 overflow-y-auto">
          {Object.entries(gradients).map(([key, gradient]) => (
            <div
              key={key}
              onClick={() => {
                changeTheme(key);
                setOpen(false);
              }}
              className="cursor-pointer p-3 text-white font-semibold hover:opacity-90 transition"
              style={{
                background: gradient.background, // ✅ fixed
                borderBottom: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelectorBox;
