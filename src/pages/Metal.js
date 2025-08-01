import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
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
import GlobalLayout from '../components/GlobalLayout';

// Register Chart.js components for rendering charts
ChartJS.register(
  CategoryScale, // For handling categorical data on axes
  LinearScale, // For linear scaling of data
  LineElement, // For rendering line charts
  PointElement, // For rendering points on charts
  ArcElement, // For rendering doughnut/pie charts
  Title, // For chart titles
  Tooltip, // For interactive tooltips
  Legend, // For chart legends
  Filler // For filling areas under line charts
);

// Data for the Line chart (Metal Price Trends)
const metalPriceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Gold Price (₹/10g)',
      data: [65000, 65500, 67000, 66500, 68000, 69000, 69500, 70000],
      borderColor: '#FBBF24',
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
    {
      label: 'Silver Price (₹/kg)',
      data: [72000, 73000, 72500, 74000, 75000, 76000, 75500, 77000],
      borderColor: '#D1D5DB',
      backgroundColor: 'rgba(209, 213, 219, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
};

// Data for the compact Doughnut chart (Trading Volume)
const tradingVolumeData = {
  labels: ['Gold', 'Silver', 'Copper', 'Aluminum'],
  datasets: [
    {
      label: 'Trading Volume (Lots)',
      data: [3000, 2500, 1800, 1200],
      backgroundColor: ['#FBBF24', '#D1D5DB', '#B91C1C', '#6B7280'],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

// Animation variants for bouncing effect
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

// Bounce animation for buttons and cards
const bounceVariants = {
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 300, damping: 10 } },
  tap: { scale: 0.9, transition: { type: 'spring', stiffness: 300, damping: 10 } },
};

// Chart animation configuration
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top', labels: { color: '#ffffff' } },
    title: { display: true, text: 'Metal Price Trends (₹)', color: '#ffffff' },
    tooltip: { enabled: true },
  },
  animation: {
    duration: 2000, // Smooth animation duration
    easing: 'easeOutBounce', // Bouncy effect for chart rendering
  },
  scales: {
    x: { ticks: { color: '#ffffff' } },
    y: { ticks: { color: '#ffffff' }, beginAtZero: false },
  },
};

// Compact Doughnut chart options
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allow custom sizing
  plugins: {
    legend: { position: 'top', labels: { color: '#ffffff', font: { size: 12 } } },
    title: { display: true, text: 'Metal Trading Volume (Lots)', color: '#ffffff', font: { size: 14 } },
  },
  animation: {
    duration: 1500, // Slightly faster animation for compact chart
    easing: 'easeOutBounce', // Bouncy effect
  },
};

const Metal = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  // Service data for the services section
  const services = [
    {
      title: 'Metal Trading',
      description: 'Trade gold, silver, copper, and more on the MCX with competitive rates.',
      icon: '🪙',
    },
    {
      title: 'Market Insights',
      description: 'Real-time price updates and technical analysis for metal commodities.',
      icon: '📈',
    },
    {
      title: 'Hedging Solutions',
      description: 'Protect your investments with tailored hedging strategies.',
      icon: '🔒',
    },
    {
      title: 'Portfolio Management',
      description: 'Manage your metal investments with our advanced tools and analytics.',
      icon: '📊',
    },
  ];

  // Pricing plans data
  const plans = [
    {
      name: 'Basic',
      price: '₹999/month',
      features: ['Access to Gold & Silver', 'Daily Market Updates', 'Email Support', 'Basic Analytics'],
    },
    {
      name: 'Pro',
      price: '₹2499/month',
      features: [
        'All Metal Commodities',
        'Real-time Price Alerts',
        'Priority Support',
        'Hedging Tools',
        'Advanced Analytics',
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
        'API Access',
      ],
    },
  ];

  // Expanded FAQ data to increase line count
  const faqs = [
    {
      question: 'What is MCX metal trading?',
      answer:
        'MCX metal trading involves buying and selling metal commodities like gold, silver, copper, and aluminum on the Multi Commodity Exchange of India.',
    },
    {
      question: 'How do I start trading metals?',
      answer: 'Select a plan, open an MCX trading account, and use our platform to start trading with guided support.',
    },
    {
      question: 'What are the risks in metal trading?',
      answer: 'Metal trading involves risks like price volatility, but our hedging tools and market insights help manage these risks.',
    },
    {
      question: 'Can I trade metals internationally?',
      answer: 'Our platform focuses on MCX, but we provide insights and tools for global metal market trends.',
    },
    {
      question: 'What are the benefits of the Pro plan?',
      answer: 'The Pro plan offers access to all metal commodities, real-time alerts, priority support, and advanced hedging tools.',
    },
    {
      question: 'How secure is my data on your platform?',
      answer: 'We use industry-standard encryption and security protocols to protect your data and transactions.',
    },
  ];

  // Testimonial data for new section
  const testimonials = [
    {
      name: 'Rahul Sharma',
      feedback: 'The platform’s real-time insights helped me make informed trading decisions!',
      role: 'Individual Trader',
    },
    {
      name: 'Priya Gupta',
      feedback: 'The hedging tools are fantastic for managing risks in volatile markets.',
      role: 'Portfolio Manager',
    },
    {
      name: 'Anil Verma',
      feedback: 'The Enterprise plan’s custom solutions boosted our trading efficiency.',
      role: 'Corporate Investor',
    },
  ];

  return (
    <GlobalLayout>
      {/* Main container with transparent background */}
      <div className="bg-transparent text-white min-h-screen">
        {/* Hero Section with bouncing button */}
        <motion.section
          className="text-center mb-16 mt-12 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            MCX Metal Services
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Trade precious and base metals on the Multi Commodity Exchange with our expert tools and insights.
          </p>
          <motion.button
            className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
            variants={bounceVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/contact')}
          >
            Start Trading
          </motion.button>
        </motion.section>

        {/* Price Trends Chart Section */}
        <motion.section
          className="mb-16 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Metal Price Trends
          </h2>
          <motion.div
            className="bg-transparent p-6 rounded-lg shadow-lg text-white max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <Line
              data={metalPriceData}
              options={chartOptions}
            />
          </motion.div>
        </motion.section>

        {/* Services Section with bouncing cards */}
        <motion.section
          className="mb-16 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Metal Trading Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-lg text-center text-white"
                variants={bounceVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Compact Trading Volume Chart */}
          <motion.div
            className="bg-transparent p-6 rounded-lg shadow-lg text-white max-w-md mx-auto mt-8"
            variants={itemVariants}
            style={{ height: '250px' }} // Fixed height for compact chart
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Trading Volume by Metal
            </h3>
            <Doughnut
              data={tradingVolumeData}
              options={doughnutOptions}
            />
          </motion.div>
        </motion.section>

        {/* Pricing Plans Section with bouncing cards */}
        <motion.section
          className="mb-16 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Trading Plans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-transparent p-6 rounded-lg shadow-lg text-center text-white"
                variants={bounceVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-amber-600 mb-4">{plan.price}</p>
                <ul className="text-white/80 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">{feature}</li>
                  ))}
                </ul>
                <motion.button
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
                  variants={bounceVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section with expanded FAQs */}
        <motion.section
          className="mb-16 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-transparent p-4 rounded-lg mb-4 text-white"
                variants={itemVariants}
              >
                <button
                  className="w-full text-left text-lg font-semibold text-white flex justify-between items-center bg-transparent"
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
                      className="text-white/80 mt-2"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Market Snapshot Section */}
        <motion.section
          className="mb-16 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Market Snapshot
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metal: 'Gold', price: '₹69,000/10g', change: '+1.2%' },
              { metal: 'Silver', price: '₹76,000/kg', change: '+0.8%' },
              { metal: 'Copper', price: '₹850/kg', change: '-0.5%' },
              { metal: 'Aluminum', price: '₹220/kg', change: '+0.3%' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-transparent p-4 rounded-lg text-center text-white"
                variants={bounceVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <h3 className="text-lg font-semibold text-white">{item.metal}</h3>
                <p className="text-xl font-bold text-amber-600">{item.price}</p>
                <p
                  className={`text-sm ${
                    item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </motion.div>
              ))}
          </div>
        </motion.section>

        {/* New Testimonials Section */}
        <motion.section
          className="mb-16 text-white"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-lg text-center text-white"
                variants={bounceVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <p className="text-white/80 mb-4">{testimonial.feedback}</p>
                <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                <p className="text-white/60">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section with bouncing button */}
        <motion.section
          className="text-center text-white mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Trade Metals?</h2>
          <p className="text-lg text-white/80 mb-6">
            Join our MCX platform and start trading metals with confidence.
          </p>
          <motion.button
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
            variants={bounceVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Start Trading Now
          </motion.button>
        </motion.section>
      </div>
    </GlobalLayout>
  );
};

export default Metal;