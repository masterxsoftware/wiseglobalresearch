// src/pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaChartLine, FaRegMoneyBillAlt, FaChartBar, FaCoins,
  FaExchangeAlt, FaRegChartBar, FaArrowRight,
  FaUserTie, FaShieldAlt, FaHandshake, FaMobileAlt, FaDesktop,
  FaChartPie, FaBullseye, FaPercent, FaDatabase,
  FaLightbulb, FaBalanceScale, FaCalendarAlt, FaArrowUp
} from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useForm } from 'react-hook-form';
import { ref, push, onValue } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Market symbols
const marketSymbols = [
  { name: 'Nifty 50', symbol: 'NSE:NIFTY' },
  { name: 'Sensex', symbol: 'BSE:SENSEX' },
  { name: 'Bank Nifty', symbol: 'NSE:BANKNIFTY' },
  { name: 'Midcap Nifty', symbol: 'NSE:MIDCAPNIFTY' },
  { name: 'Nifty IT', symbol: 'NSE:NIFTYIT' },
  { name: 'Nifty Pharma', symbol: 'NSE:NIFTYPHARMA' },
];

// Trading images for 3D slider
const sliderImages = [
  'https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8348920/pexels-photo-8348920.jpeg?auto=compress&cs=tinysrgb&w=600',
];

// Generate realistic chart data with fallback
const generateChartData = (symbol) => {
  const baseValues = {
    'NSE:NIFTY': [22000, 22500, 22300, 22800, 23000, 23500, 24000],
    'BSE:SENSEX': [72000, 73000, 72500, 73500, 74000, 74500, 75000],
    'NSE:BANKNIFTY': [46000, 46500, 47000, 47500, 48000, 48500, 49000],
    'NSE:MIDCAPNIFTY': [9800, 9900, 9950, 10000, 10100, 10200, 10300],
    'NSE:NIFTYIT': [35000, 35500, 36000, 36500, 37000, 37500, 38000],
    'NSE:NIFTYPHARMA': [12500, 12600, 12750, 12800, 12900, 13000, 13100],
  };

  const colors = {
    'NSE:NIFTY': { border: '#A1C4FD', bg: 'rgba(161, 196, 253, 0.2)' },
    'BSE:SENSEX': { border: '#D4A1FD', bg: 'rgba(212, 161, 253, 0.2)' },
    'NSE:BANKNIFTY': { border: '#FFD700', bg: 'rgba(255, 215, 0, 0.2)' },
    'NSE:MIDCAPNIFTY': { border: '#00CED1', bg: 'rgba(0, 206, 209, 0.2)' },
    'NSE:NIFTYIT': { border: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.2)' },
    'NSE:NIFTYPHARMA': { border: '#4CAF50', bg: 'rgba(76, 175, 80, 0.2)' },
  };

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: baseValues[symbol] || [0, 0, 0, 0, 0, 0, 0],
    ...colors[symbol]
  };
};

// Animation variants for 3D effects
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

const Home = () => {
  const navigate = useNavigate();
  const contactFormRef = useRef(null);
  const [marketData, setMarketData] = useState(
    marketSymbols.map(symbol => ({
      ...symbol,
      value: generateChartData(symbol.symbol).values[6]?.toFixed(2) || '0.00',
      change: '+0.00 (0.00%)',
      isUp: true,
    }))
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tableData, setTableData] = useState([
    { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
    { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
  ]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [errorTable, setErrorTable] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to contact form
  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update market data randomly to simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => {
        const change = (Math.random() * 200 - 100);
        const newValue = parseFloat(item.value) + change;
        const percentChange = (change / parseFloat(item.value)) * 100;
        return {
          ...item,
          value: newValue.toFixed(2),
          change: `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${percentChange.toFixed(2)}%)`,
          isUp: change >= 0
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // Fetch table data from Firebase
  useEffect(() => {
    const tableRef = ref(db, 'complaintTableData/data');
    const unsubscribe = onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Array.isArray(data) ? data : Object.values(data);
        setTableData(dataArray);
      } else {
        setTableData([
          { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
          { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
        ]);
      }
      setLoadingTable(false);
    }, (error) => {
      console.error('Error fetching table data:', error);
      setErrorTable('Failed to load table data. Please try again later.');
      setLoadingTable(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      className="w-full min-h-screen text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {/* Hero Section with 3D Slider */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {sliderImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Trading Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `translateZ(${index === currentSlide ? 0 : -200}px) scale(${
                  index === currentSlide ? 1 : 0.8
                })`,
                opacity: index === currentSlide ? 1 : 0,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                transform: `translateZ(${index === currentSlide ? 0 : -200}px) scale(${
                  index === currentSlide ? 1 : 0.8
                })`,
              }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              onError={(e) => {
                e.target.src = 'https://d9hhrg4mnvzow.cloudfront.net/promo.alparigroup.com/en/brand-1/5f52611f-rectangle-7_10g30hc000000000000028.png';
                console.error(`Failed to load image: ${image}`);
              }}
            />
          ))}
        </div>
        <motion.div
          className="text-center px-4 sm:px-6 max-w-3xl z-10 custom-box-bg rounded-xl p-6 sm:p-8"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-float">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Smart Investing with SEBI-Registered Analysts
            </span>
          </h1>
          <motion.button
            onClick={() => navigate('/services')}
            className="shine-hover px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-base sm:text-lg font-bold"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <FaArrowRight className="inline ml-2" />
          </motion.button>
        </motion.div>
      </section>

      {/* Alert Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden">
        <div className="container">
          <div className="animate-scroll">
            Market Alert: Stay updated with our latest research reports and trading strategies!
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'SEBI-Registered Expertise',
                desc: 'Our analysts are certified by SEBI, ensuring compliance and reliability.',
                icon: <FaShieldAlt className="text-3xl sm:text-4xl text-blue-500" />,
              },
              {
                title: 'AI-Driven Insights',
                desc: 'Leverage cutting-edge AI for precise market predictions.',
                icon: <FaLightbulb className="text-3xl sm:text-4xl text-yellow-500" />,
              },
              {
                title: 'Proven Track Record',
                desc: 'Over 10 years of delivering profitable recommendations.',
                icon: <FaChartLine className="text-3xl sm:text-4xl text-green-500" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-lg sm:text-xl font-bold ml-4">{item.title}</h3>
                </div>
                <p className="text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Live Market Overview
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {marketData.map((item, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base sm:text-lg">{item.name}</h3>
                  <FaChartLine className={`text-xl sm:text-2xl ${item.isUp ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div className="mt-4">
                  <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
                  <p className={`text-xs sm:text-sm ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {marketSymbols.slice(0, 6).map((symbol, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">{symbol.name} Trend</h3>
                <div className="h-48 sm:h-64 w-full">
                  <AnimatedChart symbol={symbol.symbol} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Our Research Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'Equity Research',
                desc: 'Comprehensive analysis of stocks with buy/sell recommendations',
                icon: <FaChartLine className="text-3xl sm:text-4xl text-blue-500" />,
                features: ['Fundamental Analysis', 'Valuation Models', 'Sector Reports'],
              },
              {
                title: 'Derivatives',
                desc: 'Futures & options strategies for Nifty and Bank Nifty',
                icon: <FaExchangeAlt className="text-3xl sm:text-4xl text-purple-500" />,
                features: ['Option Chain Analysis', 'F&O Strategies', 'Hedging Techniques'],
              },
              {
                title: 'Commodities',
                desc: 'Gold, silver and other commodity market analysis',
                icon: <FaCoins className="text-3xl sm:text-4xl text-yellow-500" />,
                features: ['MCX Analysis', 'Global Commodity Trends', 'Seasonal Patterns'],
              },
              {
                title: 'Technical Analysis',
                desc: 'Chart patterns and technical indicators for trading',
                icon: <FaChartBar className="text-3xl sm:text-4xl text-green-500" />,
                features: ['Chart Patterns', 'Indicators', 'Price Action'],
              },
              {
                title: 'Portfolio Management',
                desc: 'Customized portfolio strategies based on risk profile',
                icon: <FaRegMoneyBillAlt className="text-3xl sm:text-4xl text-red-500" />,
                features: ['Asset Allocation', 'Risk Assessment', 'Rebalancing'],
              },
              {
                title: 'Learning Center',
                desc: 'Educational resources for traders and investors',
                icon: <FaRegChartBar className="text-3xl sm:text-4xl text-indigo-500" />,
                features: ['Webinars', 'Courses', 'Market Tutorials'],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20 cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => navigate('/services')}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex flex-col">
                  <motion.div
                    className="flex items-center mb-4"
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {service.icon}
                    <h3 className="text-lg sm:text-xl font-bold ml-4">{service.title}</h3>
                  </motion.div>
                  <p className="mb-4 text-sm sm:text-base">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm sm:text-base">
                        <FiCheckCircle className="mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Market Insights
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {[
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
            ].map((insight, index) => (
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

      {/* Performance Metrics */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Our Performance Metrics
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {[
              {
                title: 'Accuracy Rate',
                value: '87%',
                icon: <FaPercent className="text-3xl sm:text-4xl text-blue-500" />,
                desc: 'Of our recommendations have been profitable',
              },
              {
                title: 'Client Retention',
                value: '94%',
                icon: <FaHandshake className="text-3xl sm:text-4xl text-purple-500" />,
                desc: 'Of clients continue with our services annually',
              },
              {
                title: 'Research Coverage',
                value: '500+',
                icon: <FaDatabase className="text-3xl sm:text-4xl text-green-500" />,
                desc: 'Stocks and derivatives covered in our research',
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20 text-center"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-2">{metric.value}</h3>
                <p className="text-lg sm:text-xl font-semibold mb-2">{metric.title}</p>
                <p className="text-sm sm:text-base">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200/20"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Annual Performance vs Benchmark</h3>
            <div className="h-64 sm:h-80 w-full">
              <PerformanceChart />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Our Research Methodology
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'Fundamental Analysis',
                icon: <FaBalanceScale className="text-2xl sm:text-3xl" />,
                steps: [
                  'Financial Statement Analysis',
                  'Valuation Metrics',
                  'Management Quality',
                  'Industry Positioning',
                ],
              },
              {
                title: 'Technical Analysis',
                icon: <FaChartPie className="text-2xl sm:text-3xl" />,
                steps: [
                  'Price Action Study',
                  'Indicator Analysis',
                  'Volume Patterns',
                  'Support/Resistance',
                ],
              },
              {
                title: 'Sentiment Analysis',
                icon: <FaBullseye className="text-2xl sm:text-3xl" />,
                steps: [
                  'Market Breadth',
                  'FII/DII Activity',
                  'Derivatives Data',
                  'News Flow',
                ],
              },
              {
                title: 'Risk Management',
                icon: <FaShieldAlt className="text-2xl sm:text-3xl" />,
                steps: [
                  'Position Sizing',
                  'Stop Loss Strategy',
                  'Portfolio Allocation',
                  'Hedging',
                ],
              },
            ].map((method, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
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

      {/* Team Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Meet Our Expert Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
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
            ].map((member, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20 text-center"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex justify-center mb-4">
                  {member.icon}
                </div>
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

      {/* Platform Features */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Our Platform Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'Real-time Alerts',
                desc: 'Instant notifications for trading opportunities',
                icon: <FaMobileAlt className="text-2xl sm:text-3xl" />,
                animation: {
                  whileHover: { scale: 1.05, rotateY: 10 },
                  transition: { type: 'spring', stiffness: 300 },
                },
              },
              {
                title: 'Advanced Charts',
                desc: 'Interactive charts with multiple indicators',
                icon: <FaDesktop className="text-2xl sm:text-3xl" />,
                animation: {
                  whileHover: { rotateY: 5 },
                  transition: { duration: 0.3 },
                },
              },
              {
                title: 'Portfolio Tracker',
                desc: 'Monitor all your investments in one place',
                icon: <FaChartBar className="text-2xl sm:text-3xl" />,
                animation: {
                  whileHover: { y: -5 },
                  transition: { duration: 0.2 },
                },
              },
              {
                title: 'Research Reports',
                desc: 'In-depth analysis of stocks and sectors',
                icon: <FaRegChartBar className="text-2xl sm:text-3xl" />,
                animation: {
                  whileHover: { scale: 1.03 },
                  transition: { duration: 0.2 },
                },
              },
              {
                title: 'Market Scanners',
                desc: 'Custom filters to find trading opportunities',
                icon: <FaBullseye className="text-2xl sm:text-3xl" />,
                animation: {
                  whileHover: { rotateY: -5 },
                  transition: { duration: 0.3 },
                },
              },
              {
                title: 'Educational Content',
                desc: 'Learn from our experts through videos and articles',
                icon: <FaLightbulb className="text-2xl sm:text-3xl" />,
                animation: {
                  whileHover: { y: -5 },
                  transition: { duration: 0.2 },
                },
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                style={{ transformStyle: 'preserve-3d' }}
                {...feature.animation}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-lg sm:text-xl font-bold ml-4">{feature.title}</h3>
                </div>
                <p className="text-sm sm:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: 'Rahul Sharma',
                role: 'Investor (5+ years)',
                quote: 'The research quality is exceptional. Helped me grow my portfolio by 35% last year.',
                stats: '42% annual returns',
              },
              {
                name: 'Priya Patel',
                role: 'Trader (3+ years)',
                quote: 'Accurate technical calls and excellent risk management suggestions.',
                stats: '78% win rate',
              },
              {
                name: 'Amit Kumar',
                role: 'Business Owner',
                quote: 'Their SEBI registration gives me confidence in their recommendations.',
                stats: '94% satisfaction',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="italic mb-4 text-sm sm:text-base">"{testimonial.quote}"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-base sm:text-lg">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                  <p className="text-xs sm:text-sm custom-box-bg px-3 py-1 rounded-full">{testimonial.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Choose Your Plan
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: 'Basic',
                price: '₹4,999',
                period: '/month',
                features: [
                  'Equity Research Reports',
                  'Daily Market Updates',
                  'Technical Analysis',
                  'Email Support',
                ],
                popular: false,
              },
              {
                name: 'Professional',
                price: '₹9,999',
                period: '/month',
                features: [
                  'All Basic Features',
                  'Derivatives Strategies',
                  'Portfolio Recommendations',
                  'Priority Support',
                  'Weekly Webinars',
                ],
                popular: true,
              },
              {
                name: 'Institutional',
                price: '₹24,999',
                period: '/month',
                features: [
                  'All Professional Features',
                  'Custom Research Requests',
                  '1-on-1 Analyst Calls',
                  'Portfolio Review',
                  'Advanced Tools Access',
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative custom-box-bg rounded-xl p-4 sm:p-6 shadow-lg border-2 ${
                  plan.popular ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200/20'
                }`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 sm:px-4 py-1 rounded-bl-lg rounded-tr-lg text-xs sm:text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm sm:text-base">{plan.period}</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm sm:text-base">
                      <FiCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="shine-hover w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg shadow-md text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <motion.div
          className="container text-center custom-box-bg rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200/20"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your Investment Journey Today</h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            Join thousands of investors who trust our SEBI-registered research for financial success.
          </p>
          <motion.button
            onClick={scrollToContactForm}
            className="shine-hover px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-base sm:text-lg font-bold"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now <FaArrowRight className="inline ml-2" />
          </motion.button>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 sm:block hidden"></div>
            {[
              {
                year: '2010',
                event: 'Company Founded',
                detail: 'Started with 3 analysts focusing on equity research',
              },
              {
                year: '2013',
                event: 'SEBI Registration',
                detail: 'Obtained SEBI research analyst registration',
              },
              {
                year: '2016',
                event: 'Mobile Platform Launch',
                detail: 'Launched our first mobile app for clients',
              },
              {
                year: '2019',
                event: '10,000 Clients',
                detail: 'Crossed milestone of 10,000 active clients',
              },
              {
                year: '2022',
                event: 'AI Integration',
                detail: 'Implemented machine learning in our research process',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative mb-8 sm:mb-12 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'} flex flex-col sm:flex-row`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={`absolute top-0 ${index % 2 === 0 ? 'sm:-right-2 right-1/2' : 'sm:-left-2 left-1/2'} w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transform sm:-translate-x-0 -translate-x-1/2`}
                ></div>
                <div
                  className={`custom-box-bg p-4 sm:p-6 rounded-lg shadow-md border border-gray-200/20 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-full sm:max-w-[400px]`}
                >
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span className="font-bold">{item.year}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{item.event}</h3>
                  <p className="text-sm sm:text-base">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                question: 'Are you SEBI registered research analysts?',
                answer:
                  'Yes, all our research analysts are SEBI registered. Our registration number is INH000012345, which you can verify on the SEBI website.',
              },
              {
                question: 'What makes your research different from others?',
                answer:
                  'Our research combines fundamental, technical, and quantitative analysis with strict risk management protocols. We provide actionable recommendations with clear entry/exit points and risk-reward ratios.',
              },
              {
                question: 'Do you provide recommendations for intraday trading?',
                answer:
                  'Yes, we provide intraday trading ideas with specific entry, target and stop-loss levels. However, we recommend position trading for most investors as it has better risk-reward potential.',
              },
              {
                question: 'Can I get customized research for my portfolio?',
                answer:
                  'Absolutely. Our institutional clients get customized research based on their portfolio holdings and risk profile. Contact us to discuss your specific requirements.',
              },
              {
                question: 'What is your success rate for recommendations?',
                answer:
                  'Our recommendations have an 87% success rate over the past 5 years. However, we emphasize that past performance is not indicative of future results and proper risk management is essential.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={contactFormRef} className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container max-w-2xl custom-box-bg rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200/20">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h2>
          <ContactForm />
        </div>
      </section>

      {/* Complaint Table Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            Complaint Data for July 2025
          </motion.h2>
          {loadingTable ? (
            <div className="flex justify-center items-center py-6">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : errorTable ? (
            <div className="bg-red-500/20 rounded-xl p-6 shadow-lg border border-red-500/30 text-center text-white">
              {errorTable}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200/20 custom-scrollbar">
              <table
                className="w-full border-collapse text-left text-xs sm:text-sm bg-white/10 backdrop-blur-[10px] -webkit-backdrop-blur-[10px]"
                aria-label="Complaint Data for July 2025"
              >
                <thead>
                  <tr className="bg-white/20 text-white">
                    <th className="p-2 sm:p-3 border border-gray-200/30">Sr. No.</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Received from</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Pending at the end of last month</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Received</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Resolved</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Pending</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Pending Complaints 3 Months</th>
                    <th className="p-2 sm:p-3 border border-gray-200/30">Average Resolution time (in days)^</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(tableData) ? (
                    tableData.map((row) => (
                      <tr key={row.srNo} className="bg-white/5 hover:bg-white/10 transition-colors">
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.srNo}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.source}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.pendingLastMonth || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.received || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.resolved || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.pending || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.pending3Months || 0}</td>
                        <td className="p-2 sm:p-3 border border-gray-200/30">{row.avgResolutionTime || 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-2 sm:p-3 border border-gray-200/30 text-center text-red-500">
                        Error: Table data is not in a valid format
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-xs sm:text-sm text-gray-300">
            ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
          </p>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </motion.div>
  );
};

const AnimatedChart = ({ symbol }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(generateChartData(symbol));

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newValues = prev.values.map(value => value + (Math.random() * 50 - 25));
        return { ...prev, values: newValues };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [symbol]);

  useEffect(() => {
    if (!chartData.values || chartData.values.some(isNaN)) {
      console.error(`Invalid chart data for ${symbol}:`, chartData);
    }
  }, [chartData, symbol]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: symbol.split(':')[1],
        data: chartData.values,
        borderColor: chartData.border || '#A1C4FD',
        backgroundColor: chartData.bg || 'rgba(161, 196, 253, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: chartData.border || '#A1C4FD',
        pointBorderColor: '#fff',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 12 },
          color: '#fff',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: chartData.border || '#A1C4FD',
        borderWidth: 1,
      },
      title: {
        display: true,
        text: `${symbol.split(':')[1]} Trend`,
        font: { size: 16, weight: 'bold' },
        color: '#fff',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#fff', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#fff', font: { size: 10 } },
        beginAtZero: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
    >
      <div className="relative w-full h-full">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </motion.div>
  );
};

const PerformanceChart = () => {
  const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Our Performance',
        data: [12, 28, 42, 35, 58, 72],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Benchmark (Nifty 50)',
        data: [3, 12, 15, 24, 4, 20],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#333',
        bodyColor: '#333',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#fff', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: '#fff',
          font: { size: 10 },
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        message: data.message,
        timestamp: Date.now(),
      };
      await push(ref(db, 'homeFormSubmissions'), formData);

      toast.success('Form submitted successfully! We will contact you soon.', { position: 'top-center' });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.message ? error.message : String(error);
      toast.error(`Failed to submit form: ${errorMessage}`, { position: 'top-center' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1 text-white">Name</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
          type="text"
          className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            type="email"
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Phone</label>
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9][0-9]{9}$/,
                message: 'Phone number must be 10 digits starting with 6, 7, 8, or 9',
              },
            })}
            type="tel"
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white">Area of Interest</label>
        <select
          {...register('interest', { required: 'Please select an area of interest' })}
          className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.interest ? 'border-red-500' : ''}`}
        >
          <option value="" className="text-black">Select an option</option>
          <option value="equity" className="text-black">Equity Research</option>
          <option value="derivatives" className="text-black">Derivatives Strategies</option>
          <option value="technical" className="text-black">Technical Analysis</option>
          <option value="portfolio" className="text-black">Portfolio Management</option>
          <option value="learning" className="text-black">Learning Resources</option>
        </select>
        {errors.interest && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.interest.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-white">Message</label>
        <textarea
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
          rows={4}
          className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.message ? 'border-red-500' : ''}`}
        ></textarea>
        {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message.message}</p>}
      </div>
      <motion.button
        type="submit"
        disabled={submitting}
        className={`shine-hover w-full py-2 sm:py-3 rounded-lg shadow-md text-sm sm:text-base ${
          submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'
        } text-white`}
        whileHover={{ scale: submitting ? 1 : 1.02, rotateY: submitting ? 0 : 10 }}
        whileTap={{ scale: submitting ? 1 : 0.98 }}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </motion.button>
    </form>
  );
};

export default Home;