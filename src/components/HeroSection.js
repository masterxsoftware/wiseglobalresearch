import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { cardVariants } from '../utils/animationVariants';

import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide3 from '../assets/images/slide3.png';

const sliderImages = [slide1, slide2, slide3];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section
      className="relative pt-16 flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="absolute inset-0 z-0">
        {sliderImages.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Trading Slide ${index + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `translateZ(${index === currentSlide ? 0 : -200}px) scale(${index === currentSlide ? 1 : 0.8})`,
              opacity: index === currentSlide ? 1 : 0,
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              transform: `translateZ(${index === currentSlide ? 0 : -200}px) scale(${index === currentSlide ? 1 : 0.8})`,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            onError={(e) => {
              e.target.src = '/logo192.png';
              console.warn(`Failed to load image: ${image}`);
            }}
          />
        ))}
      </div>

      {/* FIX: Wrap the content inside a motion.div */}
      <motion.div
        className="text-center px-4 sm:px-6 max-w-3xl z-10 rounded-xl p-6 sm:p-8"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transformStyle: 'preserve-3d',
        }}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-float">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Smart Investing with SEBI-Registered Analysts
          </span>
        </h1>
        <motion.button
          onClick={() => navigate('/services')}
          className="shine-hover px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-base sm:text-lg font-bold"
          whileHover={{ scale: 1.05, rotateY: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <FaArrowRight className="inline ml-2" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
