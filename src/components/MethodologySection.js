import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaChartPie, FaBullseye, FaShieldAlt } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { itemVariants, cardVariants } from '../utils/animationVariants';

const MethodologySection = () => {
  const methods = [
    {
      title: 'Fundamental Analysis',
      icon: <FaBalanceScale className="text-2xl sm:text-3xl" />,
      steps: ['Financial Statement Analysis', 'Valuation Metrics', 'Management Quality', 'Industry Positioning'],
    },
    {
      title: 'Technical Analysis',
      icon: <FaChartPie className="text-2xl sm:text-3xl" />,
      steps: ['Price Action Study', 'Indicator Analysis', 'Volume Patterns', 'Support/Resistance'],
    },
    {
      title: 'Sentiment Analysis',
      icon: <FaBullseye className="text-2xl sm:text-3xl" />,
      steps: ['Market Breadth', 'FII/DII Activity', 'Derivatives Data', 'News Flow'],
    },
    {
      title: 'Risk Management',
      icon: <FaShieldAlt className="text-2xl sm:text-3xl" />,
      steps: ['Position Sizing', 'Stop Loss Strategy', 'Portfolio Allocation', 'Hedging'],
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Our Research Methodology
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              className="bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-md border-2 border-white/30 hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center mb-4">
                {method.icon}
                <h3 className="text-lg sm:text-xl font-bold ml-3">{method.title}</h3>
              </div>
              <ul className="space-y-3">
                {method.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start text-sm sm:text-base"
                    whileHover={{ x: 5 }}
                  >
                    <FiCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;