import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { FaBook, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const currencyTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'USD/EUR Exchange Rate',
      data: [1.12, 1.15, 1.13, 1.17, 1.16, 1.18],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const tradingVolumeData = {
  labels: ['USD/EUR', 'USD/JPY', 'GBP/USD', 'AUD/USD'],
  datasets: [
    {
      label: 'Trading Volume (Simulated)',
      data: [5000, 3500, 2000, 1500],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Forex = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const services = [
    {
      title: 'Currency Education',
      description: 'Learn about currency pairs, spreads, and market behavior.',
      icon: <FaBook />,
    },
    {
      title: 'Market Insights',
      description: 'View real-time data and simulated market trends.',
      icon: <FaChartBar />,
    },
    {
      title: 'Risk Awareness',
      description: 'Understand the risks involved in Forex trading.',
      icon: <FaExclamationTriangle />,
    },
  ];

  const faqs = [
    {
      question: 'What is Forex?',
      answer:
        'Forex (Foreign Exchange) is the global market for trading currencies. It’s used by banks, businesses, and investors worldwide.',
    },
    {
      question: 'Do you offer trading accounts?',
      answer:
        'No, we do not provide any kind of trading or brokerage services. This content is for educational purposes only.',
    },
    {
      question: 'Why is Forex risky?',
      answer:
        'The Forex market is highly volatile and involves significant risk due to leverage, geopolitical changes, and economic events.',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Forex Market Overview & Education
        </h1>
        <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto">
          Explore Forex market trends, insights, and educational material. <br />
          <strong>*We do not offer any trading services.*</strong>
        </p>
        <Link to="/contact">
          <motion.button
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </Link>
      </motion.section>

      {/* Services Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          What You Can Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/20 p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <motion.div
                className="mb-4 text-4xl text-teal-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Charts Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Forex Market Insights (Simulated)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/20 p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              USD/EUR Trend
            </h3>
            <Line
              data={currencyTrendData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'USD/EUR Exchange Rate Trend' },
                },
              }}
            />
          </motion.div>
          <motion.div
            className="bg-white/20 p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Currency Pair Volume
            </h3>
            <Pie
              data={tradingVolumeData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Simulated Trading Volume' },
                },
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-4 rounded-lg shadow-md mb-4"
              variants={itemVariants}
            >
              <button
                className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                {faq.question}
                <span>{activeFaq === index ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-white mt-2"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="text-center" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white mb-4">
          Want to Learn More?
        </h2>
        <p className="text-lg text-white mb-6">
          Get in touch with us for more educational content.
        </p>
        <Link to="/contact">
          <motion.button
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </Link>
      </motion.section>

      {/* Disclaimer */}
      <motion.section className="text-center mt-12" variants={itemVariants}>
        <p className="text-sm text-white/80 max-w-xl mx-auto">
          Disclaimer: This page is for informational and educational purposes only. <br />
          We do not offer Forex trading services, investment advice, or brokerage support. <br />
          Trading in the Forex market involves high risk. Please consult a licensed advisor before making any decisions.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default Forex;
