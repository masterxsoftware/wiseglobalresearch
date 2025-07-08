// src/pages/Cash.js
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaWhatsapp, FaArrowRight, FaRupeeSign, FaChartLine,
  FaShieldAlt, FaStar, FaUserTie,
  FaCheckCircle, FaPhoneAlt, FaClock,
  FaPercentage, FaUsers, FaChartBar, FaCalendarAlt,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Cash = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqList = useMemo(() => [
    {
      question: 'What is Equity Cash Trading?',
      answer: 'Equity Cash Trading means buying stocks directly using full payment. You become the real owner of the shares with benefits like dividends and voting rights.',
      icon: <FaChartLine className="text-blue-500 text-xl" />,
    },
    {
      question: 'Why should beginners start with cash trading?',
      answer: '• No margin risks\n• Easier to understand\n• Good for long-term goals\n• Safer for learning\n• No time decay like options',
      icon: <FaShieldAlt className="text-green-500 text-xl" />,
    },
    {
      question: 'How much should I start with?',
      answer: '• ₹5,000–10,000: Learning\n• ₹25,000+: Diversify\n• ₹50,000+: Balanced\n• ₹1,00,000+: Best portfolio\nStart small and grow step-by-step.',
      icon: <FaRupeeSign className="text-yellow-500 text-xl" />,
    },
    {
      question: 'What do I get as a member?',
      answer: '• 3–5 calls weekly\n• WhatsApp alerts\n• Daily research\n• Portfolio check\n• Webinars & insights',
      icon: <FaWhatsapp className="text-green-600 text-xl" />,
    },
    {
      question: 'What is your track record?',
      answer: '• 1-Year Return: +28.7%\n• 3-Year CAGR: +22.4%\n• Success Rate: 78.2%\n• Risk-Reward: 1:3\n• Avg. Holding: 8.5 months',
      icon: <FaStar className="text-amber-500 text-xl" />,
    },
    {
      question: 'How to join?',
      answer: '1. WhatsApp us\n2. Complete KYC\n3. Get 3 free calls\n4. Upgrade if happy\n5. Unlock all features',
      icon: <FaUserTie className="text-blue-400 text-xl" />,
    },
  ], []);

  const features = useMemo(() => [
    {
      text: 'SEBI Registered',
      icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
      desc: 'Regulatory certified with full compliance.',
    },
    {
      text: '78% Accuracy',
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
      desc: 'Verified trade accuracy for reliable returns.',
    },
    {
      text: 'Real-Time Alerts',
      icon: <FaWhatsapp className="text-teal-600 text-2xl" />,
      desc: 'Get instant buy/sell alerts on WhatsApp.',
    },
    {
      text: 'Strong Research',
      icon: <FaChartBar className="text-purple-600 text-2xl" />,
      desc: 'Backed by technical + fundamental data.',
    },
    {
      text: 'Risk Control',
      icon: <FaShieldAlt className="text-amber-600 text-2xl" />,
      desc: 'Clear stop-loss strategies to protect capital.',
    },
    {
      text: '1-on-1 Support',
      icon: <FaUserTie className="text-red-500 text-2xl" />,
      desc: 'Personal support manager for all help.',
    },
  ], []);

  const performanceStats = useMemo(() => [
    { value: '78.2%', label: 'Success Rate', icon: <FaPercentage className="text-green-500 text-2xl" /> },
    { value: '22.4%', label: 'Annual Return', icon: <FaChartLine className="text-blue-500 text-2xl" /> },
    { value: '5+ Yrs', label: 'Experience', icon: <FaCalendarAlt className="text-amber-500 text-2xl" /> },
    { value: '5000+', label: 'Happy Clients', icon: <FaUsers className="text-purple-500 text-2xl" /> },
  ], []);

  const handleWhatsAppClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open('https://wa.me/9977909494', '_blank');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="pt-20 px-4 pb-10 min-h-screen bg-gradient-to-br from-blue-50/40 via-white/20 to-indigo-50/30 text-gray-900">
      <Helmet>
        <title>Equity Cash Services | Wise Global</title>
        <meta name="description" content="SEBI Registered Cash Advisory. High accuracy, real-time alerts & portfolio support." />
      </Helmet>

      {/* Hero Section */}
      <section className="text-center mb-12 max-w-7xl mx-auto px-4">
        <span className="inline-block bg-blue-100/80 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
          SEBI Registered Advisory
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent leading-tight mb-4">
          Smarter Equity Investing
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
          Trusted by <span className="text-purple-600 font-semibold">5,000+ investors</span> with a proven <span className="text-green-600 font-semibold">22.4% return</span>
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleWhatsAppClick}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md min-w-[240px] transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              <>
                <FaWhatsapp className="text-xl" /> Get Trial Calls
              </>
            )}
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-800 border border-blue-500 hover:border-blue-600 px-6 py-3 rounded-full text-base font-semibold shadow-md min-w-[240px] transition-colors backdrop-blur-sm">
            <FaPhoneAlt className="text-blue-600" /> Talk to Advisor
          </button>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 px-4">
        {performanceStats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="flex items-center gap-3 p-4 bg-white/90 rounded-xl shadow w-full transition-all backdrop-blur-sm"
          >
            <div className="p-2 bg-blue-50/80 rounded-lg backdrop-blur-sm">{stat.icon}</div>
            <div>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10">Premium Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white/90 rounded-2xl p-6 shadow-md flex flex-col gap-3 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-blue-100/80 rounded-xl w-fit backdrop-blur-sm">{item.icon}</div>
              <h3 className="text-lg font-bold">{item.text}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-center text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqList.map((faq, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -2 }}
              className="bg-white/90 p-4 rounded-xl shadow-md transition-all backdrop-blur-sm"
            >
              <button 
                onClick={() => toggleFAQ(idx)} 
                className="flex justify-between items-center w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100/80 rounded-lg backdrop-blur-sm">{faq.icon}</div>
                  <span className="text-gray-800 font-semibold text-sm sm:text-base text-left">{faq.question}</span>
                </div>
                <FaArrowRight className={`transition-transform ${openFAQ === idx ? 'rotate-90 text-blue-600' : 'text-gray-400'}`} />
              </button>
              <AnimatePresence>
                {openFAQ === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-11 pt-2 text-gray-700 text-sm"
                  >
                    {faq.answer.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-blue-600/95 to-blue-700/95 text-white py-12 px-6 rounded-3xl max-w-5xl mx-auto backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get 3 Free Tips to Start</h2>
        <p className="text-blue-100 text-sm sm:text-base mb-6">Zero risk. Try before you buy.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleWhatsAppClick}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow-md min-w-[240px] transition-colors backdrop-blur-sm"
          >
            {isLoading ? 'Connecting...' : <><FaWhatsapp className="text-xl" /> Start Free Trial</>}
          </button>
        </div>
        <p className="mt-4 text-blue-200 text-xs sm:text-sm flex items-center justify-center gap-1">
          <FaClock /> Mon–Sat: 9 AM – 7 PM
        </p>
      </section>
    </div>
  );
};

export default Cash;