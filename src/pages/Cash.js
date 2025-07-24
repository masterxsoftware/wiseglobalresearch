import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaWhatsapp, FaArrowRight, FaRupeeSign, FaChartLine,
  FaShieldAlt, FaStar, FaUserTie, FaPhoneAlt,
  FaRegClock, FaHandHoldingUsd, FaUniversity, FaChartBar,
  FaExclamationTriangle, FaBook
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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

  const performanceStats = [
    { metric: '6,000+', label: 'Active Investors' },
    { metric: '78.2%', label: 'Trade Success Rate' },
    { metric: '22.4%', label: '3-Yr CAGR' },
    { metric: '24/7', label: 'Support Availability' },
  ];

  const testimonials = [
    {
      text: 'The research calls are well-analyzed, and the support team is always responsive. Their insights have supported my portfolio decisions.',
      author: 'Ramesh Patel, Mumbai',
      rating: 5,
    },
    {
      text: 'The educational resources helped me gain confidence as an investor. The webinars are highly informative and practical.',
      author: 'Anjali Sharma, Delhi',
      rating: 5,
    },
    {
      text: 'Real-time alerts allow me to time my trades effectively. The team’s research is thorough and reliable.',
      author: 'Vikram Singh, Bangalore',
      rating: 4,
    },
  ];

  const regulations = [
    {
      title: 'Market Risks',
      description: 'Investments in securities are subject to market risks. Stock prices may fluctuate due to economic, political, or company-specific factors. Always review offer documents carefully.',
    },
    {
      title: 'No Guaranteed Returns',
      description: 'SEBI prohibits promises of assured returns. Historical performance, such as our 22.4% CAGR, is not indicative of future results.',
    },
    {
      title: 'KYC Compliance',
      description: 'Investors must complete KYC verification (PAN, Aadhaar) to comply with SEBI regulations, ensuring transparency and security.',
    },
    {
      title: 'Grievance Redressal',
      description: 'For complaints, contact us or use SEBI’s SCORES platform to resolve issues promptly and transparently.',
    },
  ];

  return (
    <div className="pt-24 px-4 pb-10 min-h-screen bg-transparent text-gray-800">
      <Helmet>
        <title>Equity Cash Advisory Services India | Wise Global</title>
        <meta
          name="description"
          content="Wise Global offers equity cash advisory with research-driven stock recommendations, real-time alerts, and personalized portfolio management. Navigate the Indian stock market with confidence."
        />
        <meta
          name="keywords"
          content="equity cash advisory, stock market research, investment advisory India, stock trading tips, portfolio management, investor education, financial advisory India"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Wise Global" />
        <meta property="og:title" content="Equity Cash Advisory Services India | Wise Global" />
        <meta
          property="og:description"
          content="Discover Wise Global’s equity cash advisory for research-driven stock recommendations and personalized portfolio strategies. Start your investment journey in India today."
        />
        <meta property="og:image" content="https://wiseglobal.com/assets/og-image.jpg" /> {/* Replace with actual image URL */}
        <meta property="og:url" content="https://wiseglobal.com/cash" /> {/* Replace with actual URL */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Equity Cash Advisory Services India | Wise Global" />
        <meta
          name="twitter:description"
          content="Join Wise Global for equity cash advisory with real-time alerts and personalized strategies. Navigate the Indian stock market confidently."
        />
        <meta name="twitter:image" content="https://wiseglobal.com/assets/og-image.jpg" /> {/* Replace with actual image URL */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer.replace(/\n/g, '<br>')
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-20 max-w-5xl mx-auto"
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

      {/* Performance Stats */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Track Record</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {performanceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-3">{stat.metric}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-gray-400 mt-6"
        >
          <FaExclamationTriangle className="inline mr-2" />
          Performance metrics are historical and not a guarantee of future results.
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-6xl mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Advisory Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-6xl mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Hear from Our Investors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20"
            >
              <div className="text-yellow-400 mb-4 flex">
                {Array(testimonial.rating).fill().map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <blockquote className="text-gray-300 italic mb-4">{testimonial.text}</blockquote>
              <div className="text-white font-medium">{testimonial.author}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-gray-400 mt-6"
        >
          <FaExclamationTriangle className="inline mr-2" />
          Testimonials reflect individual experiences and may not represent typical results.
        </motion.div>
      </motion.section>

      {/* Stock Market Regulations Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-6xl mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Understanding Stock Market Regulations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {regulations.map((regulation, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20"
            >
              <div className="mb-5">
                <FaBook className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{regulation.title}</h3>
              <p className="text-gray-300 text-sm">{regulation.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-5xl mx-auto mb-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqList.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20"
            >
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
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-3xl mx-auto text-center mb-16 px-4"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Start Your Investment Journey Today</h2>
        <p className="text-gray-300 mb-8 text-lg">
          Discover research-driven stock advisory with 3 introductory recommendations. Join thousands of investors navigating India’s markets with Wise Global.
        </p>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }}
          onClick={handleWhatsAppClick}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 mx-auto bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg min-w-[280px] transition-all"
        >
          {isLoading ? 'Connecting…' : (
            <>
              <FaWhatsapp /> Explore Research Tips
            </>
          )}
        </motion.button>
      </motion.section>

      {/* Compliance Footer */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="max-w-6xl mx-auto text-center px-4 py-8 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Important Disclosures</h3>
        <p className="text-gray-300 text-sm mb-4">
          <FaExclamationTriangle className="inline mr-2" />
          Investments in securities are subject to market risks. Read all offer documents carefully before investing. Past performance is not indicative of future results. Wise Global provides research-based advisory services, and recommendations are subject to market conditions. For subscription fees, visit <a href="https://x.ai/grok" className="text-blue-400 hover:underline">our pricing page</a>.
        </p>
        <p className="text-gray-300 text-sm">
          For grievances, contact us at <a href="mailto:support@wiseglobal.com" className="text-blue-400 hover:underline">support@wiseglobal.com</a> or file a complaint on SEBI’s SCORES platform at <a href="https://scores.gov.in" className="text-blue-400 hover:underline">scores.gov.in</a>.
        </p>
      </motion.section>
    </div>
  );
};

export default Cash;