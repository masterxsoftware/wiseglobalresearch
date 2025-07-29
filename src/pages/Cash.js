import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaWhatsapp, FaArrowRight, FaChartLine, FaShieldAlt, FaRupeeSign,
  FaStar, FaUserTie, FaPhoneAlt, FaChartBar, FaRegClock,
  FaHandHoldingUsd, FaUniversity, FaExclamationTriangle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Card from '../components/Card';

const Cash = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleWhatsAppClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open('https://wa.me/9977909494', '_blank');
      setIsLoading(false);
    }, 500);
  };

  const handleContactClick = () => {
    toast.info('Redirecting to Contact page...', { position: 'top-center', autoClose: 1000 });
    setTimeout(() => {
      navigate('/contact');
    }, 1000);
  };

  const faqList = useMemo(() => [
    {
      question: 'What is Equity Cash Trading?',
      answer:
        'Equity cash trading involves purchasing shares with full payment, without borrowing funds. As a shareholder, you gain ownership rights, including potential dividends and voting privileges. It’s a straightforward, lower-risk approach ideal for those new to the stock market.',
      icon: <FaChartLine className="text-blue-500 text-xl" />,
    },
    {
      question: 'Why is the cash segment suitable for beginners?',
      answer:
        '• No margin-related risks\n• Simple and transparent process\n• Ideal for learning market fundamentals\n• No time decay risks as in derivatives\n• Encourages disciplined investing\n• Exposure to carefully selected stocks',
      icon: <FaShieldAlt className="text-green-500 text-xl" />,
    },
    {
      question: 'How much capital is recommended to start?',
      answer:
        '• ₹5,000–₹10,000: Test strategies with minimal risk\n• ₹25,000–₹50,000: Build a balanced portfolio\n• ₹1 Lakh+: Diversify across sectors\n• Flexible entry with no lock-in period',
      icon: <FaRupeeSign className="text-yellow-500 text-xl" />,
    },
    {
      question: 'What benefits does your advisory service offer?',
      answer:
        '• 3–5 research-based calls weekly\n• Real-time WhatsApp alerts\n• Personalized portfolio recommendations\n• Access to live webinars and training\n• Detailed research reports\n• 24/7 priority support\n• Risk management guidance',
      icon: <FaWhatsapp className="text-green-600 text-xl" />,
    },
    {
      question: 'What is the historical performance of your recommendations?',
      answer:
        '• Average Annual Return (3 Yr): 22.4% CAGR\n• Success Rate: 78.2% on recommended trades\n• Typical Holding Period: 7–9 months\n• Risk-Reward Ratio: 1:3\n• *Past performance is not indicative of future results. Detailed data available upon registration.*',
      icon: <FaStar className="text-amber-500 text-xl" />,
    },
    {
      question: 'How can I join your advisory service?',
      answer:
        '1. Contact us via WhatsApp\n2. Complete secure KYC (PAN, Aadhaar)\n3. Explore 3 research tips\n4. Choose a subscription plan\n5. Access our dashboard with live signals and analytics',
      icon: <FaUserTie className="text-blue-400 text-xl" />,
    },
    {
      question: 'What kind of support do you provide?',
      answer:
        '• Dedicated account manager\n• 24/7 support via WhatsApp and email\n• Regular portfolio reviews\n• Access to educational content\n• Technical analysis workshops\n• Daily market updates',
      icon: <FaPhoneAlt className="text-purple-500 text-xl" />,
    },
    {
      question: 'How are fees structured for your services?',
      answer:
        'Our subscription plans are tailored to various investor needs. For detailed fee information, visit our pricing page or contact our team via WhatsApp. All fees are disclosed upfront during onboarding.',
      icon: <FaRupeeSign className="text-yellow-500 text-xl" />,
    },
  ], []);

  const features = [
    {
      icon: <FaChartBar className="text-3xl text-blue-500" />,
      title: 'In-Depth Research',
      description: 'Daily market insights with fundamental and technical analysis to inform your investment decisions.',
    },
    {
      icon: <FaRegClock className="text-3xl text-green-500" />,
      title: 'Real-Time Alerts',
      description: 'Instant notifications for entry, exit, and stop-loss levels to act on market opportunities.',
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl text-yellow-500" />,
      title: 'Portfolio Management',
      description: 'Tailored portfolio reviews and rebalancing strategies to align with your financial goals.',
    },
    {
      icon: <FaUniversity className="text-3xl text-purple-500" />,
      title: 'Educational Resources',
      description: 'Webinars, video tutorials, e-books, and market analysis sessions to enhance your trading knowledge.',
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-500" />,
      title: 'Risk Management',
      description: 'Disciplined strategies to minimize losses and protect capital in volatile markets.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto text-center mb-20"
      >
        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block bg-white/10 backdrop-blur-md text-blue-200 px-4 py-1 rounded-full text-sm font-medium mb-4"
        >
          Research-Driven Stock Advisory
        </motion.span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 mb-6">
          Navigate India’s Stock Market with Expertise
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
          Partner with Wise Global for research-driven insights, real-time alerts, and personalized strategies to support your equity cash trading journey in India.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-gray-400 mt-4"
        >
          <FaExclamationTriangle className="inline mr-2" />
          Investments in securities are subject to market risks. Read all offer documents carefully before investing.
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-center mt-10 gap-6">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }}
            onClick={handleWhatsAppClick}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg min-w-[260px] transition-all"
          >
            {isLoading ? 'Connecting…' : (
              <>
                <FaWhatsapp /> Explore 3 Research Tips
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 0, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }}
            onClick={handleContactClick}
            className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-blue-200 border border-blue-500 px-8 py-4 rounded-full font-semibold shadow-lg min-w-[260px] transition-all"
          >
            <FaPhoneAlt /> Contact Research Team
          </motion.button>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Advisory Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="p-8">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="container mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqList.map((faq, idx) => (
            <Card key={idx} className="p-6">
              <button
                onClick={() => toggleFAQ(idx)}
                className="flex justify-between items-center w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-transparent rounded-lg">{faq.icon}</div>
                  <span className="font-semibold text-left text-white text-base md:text-lg">{faq.question}</span>
                </div>
                <FaArrowRight
                  className={`transition-transform duration-300 ${openFAQ === idx ? 'rotate-90 text-blue-400' : 'text-gray-400'}`}
                />
              </button>
              <AnimatePresence>
                {openFAQ === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden pt-3 pl-12 text-gray-300 text-sm"
                  >
                    {faq.answer.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </motion.section>
    </Layout>
  );
};

export default Cash;