import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiFileText, FiAlertCircle, FiBarChart2, FiBell } from 'react-icons/fi';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Dashboard = () => {
  const cards = [
    { title: 'Contact Submissions', link: '/admin/contacts', icon: <FiMail size={24} /> },
    { title: 'Popup Submissions', link: '/admin/popups', icon: <FiBell size={24} /> },
    { title: 'Consent Submissions', link: '/admin/consents', icon: <FiFileText size={24} /> },
    { title: 'Complaint Manager', link: '/admin/complaints', icon: <FiAlertCircle size={24} /> },
    { title: 'Report Manager', link: '/admin/reports', icon: <FiBarChart2 size={24} /> },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h1
        className="text-3xl font-bold text-white mb-8"
        variants={itemVariants}
      >
        Admin Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={card.link} className="block bg-gray-800/30 p-6 rounded-xl shadow-lg border border-gray-200/20 hover:bg-indigo-600/30 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-indigo-400 mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;