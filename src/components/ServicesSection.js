import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaPhoneAlt, FaSeedling, FaBriefcase } from 'react-icons/fa';

const services = [
  {
    title: 'Equity Research',
    description: 'Get expert analysis on top-performing stocks and maximize your returns with confidence.',
    icon: <FaChartLine className="text-blue-400" />,
  },
  {
    title: 'Intraday Calls',
    description: 'Short-term stock tips for quick profits using our tested technical strategies.',
    icon: <FaPhoneAlt className="text-green-400" />,
  },
  {
    title: 'Long-Term Investment',
    description: 'Build wealth steadily with personalized investment advice based on fundamentals.',
    icon: <FaSeedling className="text-yellow-400" />,
  },
  {
    title: 'Portfolio Review',
    description: 'Get your current stock portfolio analyzed by SEBI-registered advisors.',
    icon: <FaBriefcase className="text-purple-400" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const ServicesSection = () => {
  return (
    <motion.section 
      className="py-20 px-4 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold font-josefin mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Our Services
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
          Tailored research and recommendations to help you invest smarter.
        </motion.p>
      </div>

      <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20"
            variants={itemVariants}
          >
            <div className="text-5xl mb-6 inline-block">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;