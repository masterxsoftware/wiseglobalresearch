import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // Use slim for stability

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // Load slim config here
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'repulse' },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: '#ffffff' },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: { enable: true },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: 'bounce' },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 50,
          },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;