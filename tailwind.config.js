// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out forwards',
        fadeUp: 'fadeUp 0.8s ease-out forwards',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        fadeInSlow: 'fadeInSlow 2s ease-out forwards',
        pulseFast: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scroll: 'scroll 25s linear infinite',
        float: 'float 4s ease-in-out infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        rotateSlow: 'rotateSlow 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInSlow: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': {
            textShadow: '0 0 5px #fff, 0 0 15px #00ffe1, 0 0 25px #00ffe1',
          },
          '50%': {
            textShadow: '0 0 2px #fff, 0 0 10px #00ffe1, 0 0 20px #00ffe1',
          },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
