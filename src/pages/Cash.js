// ✅ Cash.js with Transparent Background + Blur Effect

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaWhatsapp, FaArrowRight, FaRupeeSign, FaChartLine,
  FaShieldAlt, FaStar, FaUserTie, FaPhoneAlt,
  FaRegClock, FaHandHoldingUsd, FaUniversity, FaChartBar
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
      answer: 'Cash trading means buying shares with full payment — no borrowing. You become the legal shareholder with voting rights and dividends. It\'s ideal for beginners due to its simplicity and transparency.',
      icon: <FaChartLine className="text-blue-500 text-xl" />,
    },
    {
      question: 'Why is cash segment ideal for beginners?',
      answer: '• Safe entry-level exposure\n• Avoids margin pressure\n• Best for long-term learning\n• No time decay risk as in options\n• Builds foundational understanding of markets',
      icon: <FaShieldAlt className="text-green-500 text-xl" />,
    },
    {
      question: 'How much capital do I need?',
      answer: '• ₹5,000–₹10,000: Test the waters\n• ₹25,000–₹50,000: Balanced portfolio\n• ₹1 Lakh+: Diversified plan\n• No minimum lock-in, start anytime!',
      icon: <FaRupeeSign className="text-yellow-500 text-xl" />,
    },
    {
      question: 'Membership Benefits?',
      answer: '• 3–5 research calls weekly\n• WhatsApp notifications\n• Portfolio suggestions\n• Live webinars & training\n• Personalized research\n• Priority support channel',
      icon: <FaWhatsapp className="text-green-600 text-xl" />,
    },
    {
      question: 'Historical Performance?',
      answer: '• Avg Return (3 Yr): 22.4% CAGR\n• Success Ratio: 78.2%\n• Holding Period: 7–9 months\n• Risk-Reward Ratio: 1:3\n• All data verifiable post-registration',
      icon: <FaStar className="text-amber-500 text-xl" />,
    },
    {
      question: 'How to Join?',
      answer: '1. Message us on WhatsApp\n2. Submit KYC (PAN, Aadhaar)\n3. Get 3 Free Tips\n4. Upgrade Plan\n5. Access Dashboard with live signals & tracking',
      icon: <FaUserTie className="text-blue-400 text-xl" />,
    },
  ], []);

  const features = [
    {
      icon: <FaChartBar className="text-3xl text-blue-500" />,
      title: "Comprehensive Research",
      description: "Daily market analysis with fundamental and technical research reports"
    },
    {
      icon: <FaRegClock className="text-3xl text-green-500" />,
      title: "Real-time Alerts",
      description: "Instant notifications for entry, exit, and stop-loss levels"
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl text-yellow-500" />,
      title: "Portfolio Management",
      description: "Personalized portfolio review and rebalancing suggestions"
    },
    {
      icon: <FaUniversity className="text-3xl text-purple-500" />,
      title: "Educational Resources",
      description: "Weekly webinars and training modules for skill development"
    }
  ];

  const performanceStats = [
    { metric: "5,000+", label: "Satisfied Investors" },
    { metric: "78.2%", label: "Success Rate" },
    { metric: "22.4%", label: "Annual Returns (CAGR)" },
    { metric: "24/7", label: "Support Availability" }
  ];

  const handleWhatsAppClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open('https://wa.me/9977909494', '_blank');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="pt-24 px-4 pb-10 min-h-screen bg-transparent text-gray-800">
      <Helmet>
        <title>Premium Equity Cash Services | Wise Global</title>
        <meta name="description" content="SEBI Registered Cash Advisory with proven track record. Get high accuracy research, real-time alerts & portfolio management." />
      </Helmet>

      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-16 max-w-5xl mx-auto">
        <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-3">
          SEBI Registered Research Analyst
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 mb-4">
          Professional Equity Research & Advisory
        </h1>
        <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
          Join India's fastest growing investment community with verified 22.4% CAGR returns over 3 years
        </p>
        <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
          <button onClick={handleWhatsAppClick} disabled={isLoading} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg min-w-[240px] transition-all hover:scale-105">
            {isLoading ? 'Connecting…' : <><FaWhatsapp /> Get Free Trial Tips</>}
          </button>
          <a href="tel:9977909494" className="flex items-center justify-center gap-2 bg-white text-blue-700 border border-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg min-w-[240px] transition-all hover:scale-105">
            <FaPhoneAlt /> Speak to Research Head
          </a>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {performanceStats.map((stat, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-transparent backdrop-blur-md p-6 rounded-xl text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{stat.metric}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold text-center text-white mb-10">Our Premium Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} className="bg-transparent backdrop-blur-md p-6 rounded-xl border border-white/10">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold text-center text-white mb-8">What Our Clients Say</h2>
        <div className="bg-transparent backdrop-blur-md p-6 rounded-xl border border-white/10">
          <div className="text-yellow-400 mb-2">★★★★★</div>
          <blockquote className="text-gray-300 italic mb-4">
            "I've been with Wise Global for 2 years and seen my portfolio grow by 48%. Their research calls are accurate and their support team is always available to clarify doubts."
          </blockquote>
          <div className="text-white font-medium">- Ramesh Patel, Mumbai</div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold text-center text-white mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqList.map((faq, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.01 }} className="bg-transparent backdrop-blur-md p-4 rounded-xl border border-white/20">
              <button onClick={() => toggleFAQ(idx)} className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-transparent rounded-lg">{faq.icon}</div>
                  <span className="font-semibold text-left text-white text-sm md:text-base">{faq.question}</span>
                </div>
                <FaArrowRight className={`transition-transform ${openFAQ === idx ? 'rotate-90 text-blue-400' : 'text-gray-400'}`} />
              </button>
              <AnimatePresence>
                {openFAQ === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden pt-2 pl-11 text-gray-300 text-sm">
                    {faq.answer.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="max-w-2xl mx-auto text-center mb-16 px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Investment Journey?</h2>
        <p className="text-gray-300 mb-6">Get 3 free research calls to experience our service quality</p>
        <button onClick={handleWhatsAppClick} disabled={isLoading} className="flex items-center justify-center gap-2 mx-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg min-w-[240px] transition-all hover:scale-105">
          {isLoading ? 'Connecting…' : <><FaWhatsapp /> Claim Free Tips</>}
        </button>
      </motion.section>

      <div className="text-xs text-gray-400 text-center mt-8 leading-5 max-w-4xl mx-auto px-4">
        <p><strong>SEBI Reg. No.: INH000016719</strong> — SEBI Registered Research Analyst</p>
        <p>Disclaimer: Investments in securities market are subject to market risks. Read all the related documents carefully before investing.</p>
        <p>Contact: <a href="mailto:support@wiseglobalresearch.com" className="text-yellow-300 underline">support@wiseglobalresearch.com</a> | <a href="tel:9977909494" className="text-yellow-300 underline">+91 9977909494</a></p>
        <p className="mt-2">© {new Date().getFullYear()} Wise Global Research. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Cash;