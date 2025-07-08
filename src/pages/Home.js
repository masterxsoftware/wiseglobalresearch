import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

// Images (Make sure these exist or replace with your own paths)
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';
import image5 from '../assets/images/image5.png';
import image6 from '../assets/images/image6.png';
import image7 from '../assets/images/image7.png';

// Slider styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    image: image1,
    staticText: 'Start Your Investment Journey',
    dynamicText: [
      'Get Verified Calls Only',
      'Daily Nifty & Bank Nifty Support-Resistance',
      'SEBI-Registered Research Analysts',
      'Transparent Profit-Loss Reporting'
    ],
  },
  {
    image: image2,
    staticText: 'SEBI Registered Company',
    dynamicText: [
      'Trusted by Thousands',
      'Fully Transparent',
      'Regulatory Compliant'
    ],
  },
  {
    image: image3,
    staticText: 'Market Research & Insights',
    dynamicText: [
      'Updated Daily',
      'Backed by Research',
      'Risk Managed'
    ],
  },
  {
    image: image4,
    staticText: 'Smart Investing Starts Here',
    dynamicText: [
      'Make Better Decisions',
      'Invest Confidently',
      'Plan Your Future'
    ],
  },
  {
    image: image5,
    staticText: 'Free Expert Consultation',
    dynamicText: [
      'No Hidden Charges',
      'Real Financial Advice',
      'One Click Away'
    ],
  },
  {
    image: image6,
    staticText: 'Learn. Grow. Succeed.',
    dynamicText: [
      'Courses & Tools',
      'Step-by-Step Guidance',
      'Investor Support'
    ],
  },
  {
    image: image7,
    staticText: 'Join a Trusted Community',
    dynamicText: [
      'Thousands of Clients',
      'Real Success Stories',
      'Growing Every Day'
    ],
  },
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="w-full relative z-10">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[calc(100vh-64px)]">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover rounded-b-3xl"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center px-6 md:px-20">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="max-w-3xl"
              >
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">
                  {slide.staticText}
                </h2>

                <h3 className="text-yellow-300 text-lg sm:text-xl md:text-2xl font-medium mb-2">
                  <Typewriter
                    words={slide.dynamicText}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={40}
                    delaySpeed={1500}
                  />
                </h3>

                <p className="text-white text-sm md:text-base max-w-md mb-6">
                  We provide real-time market research, personalized guidance, and detailed reports — all SEBI compliant.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
