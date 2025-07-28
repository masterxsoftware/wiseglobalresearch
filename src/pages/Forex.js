import React, { useState } from 'react';
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
  Filler
} from 'chart.js';

// Register Chart.js components
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

// Sample data for charts
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
      label: 'Trading Volume (Lots)',
      data: [5000, 3500, 2000, 1500],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

// Animation variants
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
      title: 'Currency Trading',
      description: 'Trade major, minor, and exotic currency pairs with low spreads.',
      icon: '💱',
    },
    {
      title: 'Market Analysis',
      description: 'Real-time Forex market insights and technical analysis.',
      icon: '📡',
    },
    {
      title: 'Risk Management',
      description: 'Tools and strategies to protect your trading capital.',
      icon: '🛡️',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$49/month',
      features: ['Access to Major Pairs', 'Daily Market Updates', 'Email Support'],
    },
    {
      name: 'Professional',
      price: '$149/month',
      features: [
        'All Currency Pairs',
        'Real-time Analysis',
        'Priority Support',
        'Trading Signals',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: [
        'Custom Trading Solutions',
        'Dedicated Account Manager',
        'Advanced Analytics',
        '24/7 Support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is Forex trading?',
      answer:
        'Forex trading involves buying and selling currencies on the foreign exchange market to profit from changes in exchange rates.',
    },
    {
      question: 'How can I start trading with your platform?',
      answer:
        'Choose a plan, open an account, and access our trading platform with guided onboarding and support.',
    },
    {
      question: 'What are the risks in Forex trading?',
      answer:
        'Forex trading carries risks like market volatility and leverage-related losses, but our tools help manage these risks effectively.',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Forex Services
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock the potential of the global currency market with our expert Forex
          trading services and tools.
        </p>
        <motion.button
          className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Trading
        </motion.button>
      </motion.section>

      {/* Services Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Our Forex Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <span className="text-4xl mb-4 block">{service.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Charts Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Forex Market Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Trading Volume
            </h3>
            <Pie
              data={tradingVolumeData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Currency Pair Trading Volume' },
                },
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Plans Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Our Trading Plans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-emerald-600 mb-4">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-16" variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
              variants={itemVariants}
            >
              <button
                className="w-full text-left text-lg font-semibold text-gray-600 flex justify-between items-center"
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
                    className="text-gray-600 mt-2"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Trade Forex?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Join our platform and start trading currencies with confidence.
        </p>
        <motion.button
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Trading Now
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default Forex;