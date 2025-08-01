import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaChartLine, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { itemVariants, cardVariants } from '../utils/animationVariants';

const TeamSection = () => {
  const team = [
    {
      name: 'Rahul Verma',
      role: 'Chief Analyst',
      experience: '15+ years in equity research',
      expertise: ['Fundamental Analysis', 'Portfolio Strategy'],
      icon: <FaUserTie className="text-3xl sm:text-4xl" />,
    },
    {
      name: 'Priya Sharma',
      role: 'Technical Analyst',
      experience: '12+ years in technical research',
      expertise: ['Chart Patterns', 'Derivatives'],
      icon: <FaChartLine className="text-3xl sm:text-4xl" />,
    },
    {
      name: 'Amit Patel',
      role: 'Quant Analyst',
      experience: '10+ years in algo trading',
      expertise: ['Algorithm Development', 'Backtesting'],
      icon: <FaDatabase className="text-3xl sm:text-4xl" />,
    },
    {
      name: 'Neha Gupta',
      role: 'Research Head',
      experience: '18+ years in market research',
      expertise: ['Macro Analysis', 'Sector Research'],
      icon: <FaLightbulb className="text-3xl sm:text-4xl" />,
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Meet Our Expert Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-md border-2 border-white/30 hover:shadow-2xl text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex justify-center mb-4">{member.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-blue-500 mb-2 text-sm sm:text-base">{member.role}</p>
              <p className="text-xs sm:text-sm mb-4">{member.experience}</p>
              <div className="space-y-2">
                {member.expertise.map((item, i) => (
                  <p key={i} className="text-xs sm:text-sm custom-box-bg px-3 py-1 rounded-full inline-block m-1">
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;