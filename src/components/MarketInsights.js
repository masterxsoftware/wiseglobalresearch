import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, cardVariants } from '../utils/animationVariants';

const MarketInsights = () => {
  const insights = [
    {
      title: 'NIFTY Outlook',
      desc: 'Our analysts predict a bullish trend for NIFTY 50, driven by strong IT and banking sectors.',
      img: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Commodity Trends',
      desc: 'Gold prices expected to rise due to global economic uncertainties.',
      img: 'https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Market Insights
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={insight.img}
                alt={insight.title}
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                  console.error(`Failed to load insight image: ${insight.img}`);
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold mb-2">{insight.title}</h3>
              <p className="text-sm sm:text-base">{insight.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;