import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiBarChart2, FiUsers, FiAward, FiBook, FiLayers, FiTrendingUp, FiDollarSign, FiPieChart } from 'react-icons/fi';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { value: "15+", label: "Years in Market Research", icon: <FiAward className="w-8 h-8 text-white" /> },
    { value: "5000+", label: "Client Reports Generated", icon: <FiBook className="w-8 h-8 text-white" /> },
    { value: "50+", label: "Industry Experts", icon: <FiUsers className="w-8 h-8 text-white" /> },
    { value: "25+", label: "Countries Coverage", icon: <FiGlobe className="w-8 h-8 text-white" /> },
    { value: "120+", label: "Sectors Analyzed", icon: <FiLayers className="w-8 h-8 text-white" /> },
    { value: "24/7", label: "Research Support", icon: <FiTrendingUp className="w-8 h-8 text-white" /> }
  ];

  const methodologies = [
    {
      title: "Fundamental Analysis",
      description: "Reviewing financial statements and business models using proprietary frameworks.",
      icon: <FiDollarSign className="w-6 h-6 text-white" />
    },
    {
      title: "Technical Analysis",
      description: "Analyzing chart patterns and indicators to interpret market trends.",
      icon: <FiBarChart2 className="w-6 h-6 text-white" />
    },
    {
      title: "Quantitative Models",
      description: "Using statistical models to evaluate and rank securities.",
      icon: <FiPieChart className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen text-white">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Market Research Excellence Since 2008
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/80"
          >
            Delivering independent, data-driven financial insights to institutional clients worldwide.
          </motion.p>
        </div>
      </motion.section>

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 text-center bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-md"
          >
            <div className="mx-auto mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-sm text-white/80">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16 text-white/90"
        >
          <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
          <p className="mb-4">Founded during the 2008 financial crisis, we started with a focus on equity research in India and expanded globally over the years.</p>
          <p className="mb-4">Our proprietary frameworks and commitment to analytical rigor have earned us the trust of over 500 institutional clients worldwide.</p>
          <p>We now offer research across multiple asset classes and geographic regions, maintaining a strict focus on quality, ethics, and compliance.</p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Research Methodologies</h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80">
            We blend classical financial analysis with cutting-edge quantitative methods.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {methodologies.map((method, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-center shadow-md"
            >
              <div className="mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold mb-3">{method.title}</h3>
              <p className="leading-relaxed text-white/80">{method.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 border-t border-white/10"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Access Our Premium Research</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/80">
            For informational purposes only. Institutional investors can request reports aligned with SEBI compliance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors">
              Request Sample Report
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Schedule Consultation
            </button>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Please consult your financial advisor before making investment decisions.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
