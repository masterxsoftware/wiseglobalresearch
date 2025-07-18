// src/pages/Vision.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaChartLine, FaShieldAlt, FaBookOpen, FaLightbulb } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, rotateX: 30 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, rotateY: 45 },
  visible: { y: 0, opacity: 1, rotateY: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateX: 60 },
  visible: { scale: 1, opacity: 1, rotateX: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, rotateY: 10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
};

// Vision pillars and core values data (same as before)
const visionPillars = [
  {
    id: 1,
    title: 'Empowering Wealth Creation',
    description: 'We aim to empower Indian traders and investors with strategies to build wealth through NSE, BSE, and MCX markets, focusing on stocks like RELIANCE and commodities like GOLD.',
    icon: <FaChartLine className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 2,
    title: 'Ethical Guidance',
    description: 'Our commitment to SEBI-compliant, transparent advice ensures trust and integrity in every recommendation, from Smart Options to MCX Supreme.',
    icon: <FaShieldAlt className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 3,
    title: 'Education and Insights',
    description: 'We provide regular blogs, webinars, and demos to educate investors on market trends, helping them navigate NIFTY and BANKNIFTY with confidence.',
    icon: <FaBookOpen className="text-blue-300 text-4xl mb-4" />,
  },
  {
    id: 4,
    title: 'Innovative Technology',
    description: 'Leveraging AI and real-time data, we deliver cutting-edge tools for Indian traders, enhancing profitability in services like Universal Cash and Infinity Club.',
    icon: <FaLightbulb className="text-blue-300 text-4xl mb-4" />,
  },
];

const coreValues = [
  {
    id: 1,
    title: 'Transparency',
    description: 'We provide clear, honest, and SEBI-compliant advice, ensuring clients understand every recommendation and its risks.',
  },
  {
    id: 2,
    title: 'Client-Centric Approach',
    description: 'Our strategies are tailored to the needs of Indian investors, from beginners in Mumbai to seasoned traders in Delhi.',
  },
  {
    id: 3,
    title: 'Innovation',
    description: 'We use advanced analytics and AI to deliver high-probability trading signals for NSE, BSE, and MCX markets.',
  },
  {
    id: 4,
    title: 'Education',
    description: 'We empower clients with knowledge through workshops, blogs, and market updates, fostering informed decision-making.',
  },
  {
    id: 5,
    title: 'Integrity',
    description: 'Our commitment to ethical practices ensures we prioritize client trust and long-term success over short-term gains.',
  },
  {
    id: 6,
    title: 'Excellence',
    description: 'We strive for excellence in every service, from daily recommendations to personalized support for Indian traders.',
  },
];

const cta = {
  title: 'Join Wise Global Research',
  description: 'Ready to achieve financial success? Contact our expert team to explore tailored trading solutions for Indian markets, including Smart Options and MCX Supreme.',
  buttonText: 'Contact Us',
  buttonLink: '/contact',
};

const visionImage = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600';
const fallbackImage = 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=600';

const Vision = () => {
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <motion.div
      className="container mx-auto py-12 px-4 max-w-5xl bg-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Our Vision & Mission
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          At <span className="font-semibold text-blue-300">Wise Global Research</span>, we are dedicated to transforming the financial advisory landscape in India.
        </p>
      </motion.div>

      {/* Vision Section */}
      <motion.div className="bg-blue-900 rounded-xl p-8 mb-12" variants={itemVariants} style={{ transformStyle: 'preserve-3d' }}>
        <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
        <p className="text-white text-lg leading-7 mb-6">
          To be India’s most trusted and innovative financial advisory firm, empowering traders and investors with accurate, real-time, and ethical guidance for wealth creation in NSE, BSE, and MCX markets.
        </p>
        <img
          src={visionImage}
          alt="Vision of Wise Global Research"
          className="w-full h-64 object-cover rounded-lg mt-4"
          onError={handleImageError}
        />
      </motion.div>

      {/* Mission Section */}
      <motion.div className="mb-12" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-white text-lg leading-7 mb-4">
          Our mission is to empower Indian investors with the tools and knowledge needed to succeed in dynamic financial markets. We strive to:
        </p>
        <ul className="list-disc pl-6 text-white space-y-2">
          <motion.li variants={itemVariants}>
            Deliver personalized, research-backed strategies for stocks like RELIANCE and commodities like GOLD and CRUDEOIL.
          </motion.li>
          <motion.li variants={itemVariants}>
            Provide transparent and SEBI-compliant financial advice to build trust.
          </motion.li>
          <motion.li variants={itemVariants}>
            Educate investors through blogs, webinars, and demos on NIFTY and BANKNIFTY trends.
          </motion.li>
          <motion.li variants={itemVariants}>
            Leverage AI and real-time data to maximize profitability in services like Smart Options.
          </motion.li>
          <motion.li variants={itemVariants}>
            Prioritize client protection with adherence to SEBI regulations.
          </motion.li>
        </ul>
      </motion.div>

      {/* Vision Pillars Section */}
      <motion.div className="mb-12" variants={containerVariants}>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Vision Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionPillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              className="bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 border-blue-500 text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {pillar.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{pillar.title}</h3>
              <p className="text-white">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Values Section */}
      <motion.div className="mb-12" variants={containerVariants}>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value) => (
            <motion.div
              key={value.id}
              className="bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 border-green-500 text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <FaBullseye className="text-green-300 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-white">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center bg-green-900 rounded-xl p-8"
        variants={itemVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">{cta.title}</h2>
        <p className="text-white max-w-2xl mx-auto mb-6">{cta.description}</p>
        <a
          href={cta.buttonLink}
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
        >
          {cta.buttonText}
        </a>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        variants={itemVariants}
        className="text-center mt-12 p-4 bg-yellow-900 text-white rounded-lg"
      >
        <p>
          <strong>Disclaimer:</strong> Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Wise Global Research is not responsible for any profit or loss that may occur.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Vision;