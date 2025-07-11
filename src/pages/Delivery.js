import React from 'react';
import {
  FaChartLine, FaRupeeSign, FaShieldAlt
} from 'react-icons/fa';
import {
  MdSecurity, MdTrendingUp
} from 'react-icons/md';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import sebiImg from '../assets/images/sebi.png';

const DeliveryTrading = () => {
  const features = [
    {
      icon: <FaChartLine className="text-blue-600 text-3xl" />,
      title: "Long-Term Wealth Creation",
      desc: "Hold quality stocks for days to years to benefit from compounding and growth."
    },
    {
      icon: <FaRupeeSign className="text-blue-600 text-3xl" />,
      title: "Low Brokerage Costs",
      desc: "Pay as low as 0.1% brokerage with no hidden charges, ideal for investors."
    },
    {
      icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
      title: "SEBI-Compliant Process",
      desc: "All trades follow SEBI's investor safety protocols and T+1 settlement."
    }
  ];

  const strategies = [
    {
      title: "Blue Chip Investing",
      desc: "Invest in trusted large-cap companies with a strong dividend track record."
    },
    {
      title: "Sector Rotation",
      desc: "Switch between high-performing sectors based on economic trends."
    },
    {
      title: "Value Buying",
      desc: "Pick undervalued stocks using PE ratios, book value and financial safety."
    }
  ];

  // Faster animation settings
  const fastAnimation = {
    duration: 0.3,
    delayMultiplier: 0.05
  };

  return (
    <>
      <Helmet>
        <title>Delivery Trading | Wise Global</title>
        <meta
          name="description"
          content="Explore SEBI-compliant, research-backed delivery trading strategies by Wise Global. Build long-term wealth with smart stock investments."
        />
        <link rel="canonical" href="https://wiseglobalresearch.com/services/delivery-trading" />
      </Helmet>

      {/* Hero Section */}
      <div className="py-20 bg-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: fastAnimation.duration }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          >
            Delivery Trading Services
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Invest smartly with Wise Global's long-term, research-driven trading approach.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Wise Global?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: fastAnimation.duration, 
                  delay: index * fastAnimation.delayMultiplier 
                }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SEBI Compliance Dashboard */}
      <div className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <motion.img
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: fastAnimation.duration * 1.5 }}
                viewport={{ once: true }}
                src={sebiImg}
                alt="SEBI Compliance"
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: fastAnimation.duration * 1.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-xl"
              >
                <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center">
                  <MdSecurity className="inline-block mr-2 text-blue-600 text-4xl" />
                  SEBI Compliant Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Complaints", value: "0", color: "green" },
                    { label: "T+1 Settlement Cycle", value: "T+1", color: "blue" },
                    { label: "Transparency", value: "100%", color: "purple" },
                    { label: "Client Support", value: "24/7", color: "pink" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: fastAnimation.duration, 
                        delay: i * fastAnimation.delayMultiplier 
                      }}
                      className="bg-white rounded-lg p-4 shadow-md text-center"
                    >
                      <h3 className={`text-2xl font-bold text-${item.color}-600`}>
                        {item.value}
                      </h3>
                      <p className="text-gray-700 font-medium">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Proven Trading Strategies
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: fastAnimation.duration, 
                  delay: index * fastAnimation.delayMultiplier 
                }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <MdTrendingUp className="text-blue-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{strategy.title}</h3>
                <p className="text-gray-600 text-center">{strategy.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryTrading;