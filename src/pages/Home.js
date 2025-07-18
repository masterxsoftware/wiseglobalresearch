import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import {
  FaChartLine, FaRegMoneyBillAlt, FaChartBar, FaCoins,
  FaExchangeAlt, FaRegChartBar, FaArrowRight,
  FaUserTie, FaShieldAlt, FaHandshake, FaMobileAlt, FaDesktop,
  FaChartPie, FaBullseye, FaPercent, FaDatabase,
  FaLightbulb, FaBalanceScale, FaCalendarAlt
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

// Generate realistic chart data
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

const Home = () => {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState(
    marketSymbols.map(symbol => ({
      ...symbol,
      value: generateChartData(symbol.symbol).values[6].toFixed(2),
      change: '+0.00 (0.00%)',
      isUp: true,
    }))
  );

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

  return (
    <div className="w-full min-h-screen bg-transparent text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4 max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Smart Investing with SEBI-Registered Analysts
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            <Typewriter
              words={[
                'Data-Driven Strategies', 
                'Real-Time Market Insights', 
                'Risk-Managed Approach',
                'AI-Powered Analysis',
                'Institutional Grade Research'
              ]}
              loop
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>
          <motion.button
            onClick={() => navigate('/services')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg text-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <FaArrowRight className="inline ml-2" />
          </motion.button>
        </motion.div>
      </section>

      {/* Market Overview */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-transparent">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Live Market Overview
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {marketData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <FaChartLine className={`text-2xl ${item.isUp ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className={`text-sm ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {marketSymbols.slice(0, 4).map((symbol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200/20"
            >
              <h3 className="text-xl font-bold mb-4 text-center">{symbol.name} Trend</h3>
              <div className="h-64">
                <AnimatedChart symbol={symbol.symbol} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Research Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Equity Research',
                desc: 'Comprehensive analysis of stocks with buy/sell recommendations',
                icon: <FaChartLine className="text-4xl text-blue-500" />,
                features: ['Fundamental Analysis', 'Valuation Models', 'Sector Reports']
              },
              {
                title: 'Derivatives',
                desc: 'Futures & options strategies for Nifty and Bank Nifty',
                icon: <FaExchangeAlt className="text-4xl text-purple-500" />,
                features: ['Option Chain Analysis', 'F&O Strategies', 'Hedging Techniques']
              },
              {
                title: 'Commodities',
                desc: 'Gold, silver and other commodity market analysis',
                icon: <FaCoins className="text-4xl text-yellow-500" />,
                features: ['MCX Analysis', 'Global Commodity Trends', 'Seasonal Patterns']
              },
              {
                title: 'Technical Analysis',
                desc: 'Chart patterns and technical indicators for trading',
                icon: <FaChartBar className="text-4xl text-green-500" />,
                features: ['Chart Patterns', 'Indicators', 'Price Action']
              },
              {
                title: 'Portfolio Management',
                desc: 'Customized portfolio strategies based on risk profile',
                icon: <FaRegMoneyBillAlt className="text-4xl text-red-500" />,
                features: ['Asset Allocation', 'Risk Assessment', 'Rebalancing']
              },
              {
                title: 'Learning Center',
                desc: 'Educational resources for traders and investors',
                icon: <FaRegChartBar className="text-4xl text-indigo-500" />,
                features: ['Webinars', 'Courses', 'Market Tutorials']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/20 cursor-pointer"
                onClick={() => navigate('/services')}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex flex-col">
                  <motion.div 
                    className="flex items-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {service.icon}
                    <h3 className="text-xl font-bold ml-4">{service.title}</h3>
                  </motion.div>
                  <p className="mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
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

      {/* Performance Metrics */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Performance Metrics
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                title: 'Accuracy Rate', 
                value: '87%', 
                icon: <FaPercent className="text-4xl text-blue-500" />,
                desc: 'Of our recommendations have been profitable'
              },
              { 
                title: 'Client Retention', 
                value: '94%', 
                icon: <FaHandshake className="text-4xl text-purple-500" />,
                desc: 'Of clients continue with our services annually'
              },
              { 
                title: 'Research Coverage', 
                value: '500+', 
                icon: <FaDatabase className="text-4xl text-green-500" />,
                desc: 'Stocks and derivatives covered in our research'
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">{metric.value}</h3>
                <p className="text-xl font-semibold mb-2">{metric.title}</p>
                <p className="text-sm">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Performance Chart */}
          <motion.div
            className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-center">Annual Performance vs Benchmark</h3>
            <div className="h-80">
              <PerformanceChart />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Research Methodology
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Fundamental Analysis',
                icon: <FaBalanceScale className="text-3xl" />,
                steps: [
                  'Financial Statement Analysis',
                  'Valuation Metrics',
                  'Management Quality',
                  'Industry Positioning'
                ]
              },
              {
                title: 'Technical Analysis',
                icon: <FaChartPie className="text-3xl" />,
                steps: [
                  'Price Action Study',
                  'Indicator Analysis',
                  'Volume Patterns',
                  'Support/Resistance'
                ]
              },
              {
                title: 'Sentiment Analysis',
                icon: <FaBullseye className="text-3xl" />,
                steps: [
                  'Market Breadth',
                  'FII/DII Activity',
                  'Derivatives Data',
                  'News Flow'
                ]
              },
              {
                title: 'Risk Management',
                icon: <FaShieldAlt className="text-3xl" />,
                steps: [
                  'Position Sizing',
                  'Stop Loss Strategy',
                  'Portfolio Allocation',
                  'Hedging'
                ]
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {method.icon}
                  <h3 className="text-xl font-bold ml-3">{method.title}</h3>
                </div>
                <ul className="space-y-3">
                  {method.steps.map((step, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start"
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
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Meet Our Expert Team
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Rahul Verma',
                role: 'Chief Analyst',
                experience: '15+ years in equity research',
                expertise: ['Fundamental Analysis', 'Portfolio Strategy'],
                icon: <FaUserTie className="text-4xl" />
              },
              {
                name: 'Priya Sharma',
                role: 'Technical Analyst',
                experience: '12+ years in technical research',
                expertise: ['Chart Patterns', 'Derivatives'],
                icon: <FaChartLine className="text-4xl" />
              },
              {
                name: 'Amit Patel',
                role: 'Quant Analyst',
                experience: '10+ years in algo trading',
                expertise: ['Algorithm Development', 'Backtesting'],
                icon: <FaDatabase className="text-4xl" />
              },
              {
                name: 'Neha Gupta',
                role: 'Research Head',
                experience: '18+ years in market research',
                expertise: ['Macro Analysis', 'Sector Research'],
                icon: <FaLightbulb className="text-4xl" />
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex justify-center mb-4">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-500 mb-2">{member.role}</p>
                <p className="text-sm mb-4">{member.experience}</p>
                <div className="space-y-2">
                  {member.expertise.map((item, i) => (
                    <p key={i} className="text-sm bg-white/5 px-3 py-1 rounded-full inline-block m-1">
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
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Platform Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Alerts',
                desc: 'Instant notifications for trading opportunities',
                icon: <FaMobileAlt className="text-3xl" />,
                animation: {
                  whileHover: { scale: 1.05 },
                  transition: { type: 'spring', stiffness: 300 }
                }
              },
              {
                title: 'Advanced Charts',
                desc: 'Interactive charts with multiple indicators',
                icon: <FaDesktop className="text-3xl" />,
                animation: {
                  whileHover: { rotate: 5 },
                  transition: { duration: 0.3 }
                }
              },
              {
                title: 'Portfolio Tracker',
                desc: 'Monitor all your investments in one place',
                icon: <FaChartBar className="text-3xl" />,
                animation: {
                  whileHover: { y: -5 },
                  transition: { duration: 0.2 }
                }
              },
              {
                title: 'Research Reports',
                desc: 'In-depth analysis of stocks and sectors',
                icon: <FaRegChartBar className="text-3xl" />,
                animation: {
                  whileHover: { scale: 1.03 },
                  transition: { duration: 0.2 }
                }
              },
              {
                title: 'Market Scanners',
                desc: 'Custom filters to find trading opportunities',
                icon: <FaBullseye className="text-3xl" />,
                animation: {
                  whileHover: { rotate: -5 },
                  transition: { duration: 0.3 }
                }
              },
              {
                title: 'Educational Content',
                desc: 'Learn from our experts through videos and articles',
                icon: <FaLightbulb className="text-3xl" />,
                animation: {
                  whileHover: { y: -5 },
                  transition: { duration: 0.2 }
                }
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                {...feature.animation}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-bold ml-4">{feature.title}</h3>
                </div>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-transparent">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          What Our Clients Say
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Rahul Sharma',
              role: 'Investor (5+ years)',
              quote: 'The research quality is exceptional. Helped me grow my portfolio by 35% last year.',
              stats: '42% annual returns'
            },
            {
              name: 'Priya Patel',
              role: 'Trader (3+ years)',
              quote: 'Accurate technical calls and excellent risk management suggestions.',
              stats: '78% win rate'
            },
            {
              name: 'Amit Kumar',
              role: 'Business Owner',
              quote: 'Their SEBI registration gives me confidence in their recommendations.',
              stats: '94% satisfaction'
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20"
            >
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.role}</p>
                </div>
                <p className="text-sm bg-white/10 px-3 py-1 rounded-full">
                  {testimonial.stats}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Plan
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '₹4,999',
                period: '/month',
                features: [
                  'Equity Research Reports',
                  'Daily Market Updates',
                  'Technical Analysis',
                  'Email Support'
                ],
                popular: false
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
                  'Weekly Webinars'
                ],
                popular: true
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
                  'Advanced Tools Access'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-xl p-6 shadow-lg border-2 ${plan.popular ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200/20'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Journey
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            {[
              {
                year: '2010',
                event: 'Company Founded',
                detail: 'Started with 3 analysts focusing on equity research'
              },
              {
                year: '2013',
                event: 'SEBI Registration',
                detail: 'Obtained SEBI research analyst registration'
              },
              {
                year: '2016',
                event: 'Mobile Platform Launch',
                detail: 'Launched our first mobile app for clients'
              },
              {
                year: '2019',
                event: '10,000 Clients',
                detail: 'Crossed milestone of 10,000 active clients'
              },
              {
                year: '2022',
                event: 'AI Integration',
                detail: 'Implemented machine learning in our research process'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`absolute top-0 ${index % 2 === 0 ? '-right-2' : '-left-2'} w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}></div>
                <div className={`p-6 rounded-lg shadow-md border border-gray-200/20 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`} style={{ maxWidth: '400px' }}>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span className="font-bold">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.event}</h3>
                  <p>{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-4">
            {[
              {
                question: 'Are you SEBI registered research analysts?',
                answer: 'Yes, all our research analysts are SEBI registered. Our registration number is INH000012345, which you can verify on the SEBI website.'
              },
              {
                question: 'What makes your research different from others?',
                answer: 'Our research combines fundamental, technical, and quantitative analysis with strict risk management protocols. We provide actionable recommendations with clear entry/exit points and risk-reward ratios.'
              },
              {
                question: 'Do you provide recommendations for intraday trading?',
                answer: 'Yes, we provide intraday trading ideas with specific entry, target and stop-loss levels. However, we recommend position trading for most investors as it has better risk-reward potential.'
              },
              {
                question: 'Can I get customized research for my portfolio?',
                answer: 'Absolutely. Our institutional clients get customized research based on their portfolio holdings and risk profile. Contact us to discuss your specific requirements.'
              },
              {
                question: 'What is your success rate for recommendations?',
                answer: 'Our recommendations have an 87% success rate over the past 5 years. However, we emphasize that past performance is not indicative of future results and proper risk management is essential.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-transparent">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 border border-gray-200/20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

const AnimatedChart = ({ symbol }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(generateChartData(symbol));

  // Animate chart data with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newValues = prev.values.map(value => 
          value + (Math.random() * 50 - 25) // Smaller range for smoother updates
        );
        return { ...prev, values: newValues };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [symbol]);

  const data = {
    labels: chartData.labels,
    datasets: [{
      label: symbol.split(':')[1],
      data: chartData.values,
      borderColor: chartData.border,
      backgroundColor: chartData.bg,
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 8,
      pointBackgroundColor: chartData.border,
      pointBorderColor: '#fff',
      borderWidth: 3,
    }]
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
          font: { size: 14 },
          color: '#333',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: chartData.border,
        borderWidth: 1,
      },
      title: {
        display: true,
        text: `${symbol.split(':')[1]} Trend`,
        font: { size: 18, weight: 'bold' },
        color: '#333',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#333' },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: '#333' },
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Line 
        ref={chartRef}
        data={data} 
        options={options}
      />
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
      }
    ]
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
          color: '#333',
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
        ticks: { color: '#333' },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { 
          color: '#333',
          callback: (value) => `${value}%` 
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '', interest: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300/50 bg-white/5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300/50 bg-white/5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300/50 bg-white/5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Area of Interest</label>
        <select
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300/50 bg-white/5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select an option</option>
          <option value="equity">Equity Research</option>
          <option value="derivatives">Derivatives Strategies</option>
          <option value="technical">Technical Analysis</option>
          <option value="portfolio">Portfolio Management</option>
          <option value="learning">Learning Resources</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300/50 bg-white/5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        ></textarea>
      </div>
      
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Submit
      </motion.button>
      
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-500 font-medium"
        >
          <FiCheckCircle className="inline mr-2" />
          Thank you! We'll contact you soon.
        </motion.div>
      )}
    </form>
  );
};

export default Home;