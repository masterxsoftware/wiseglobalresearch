// src/components/FloatingPayButton.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave } from 'react-icons/fa';

const FloatingPayButton = () => {
  return (
    <motion.a
      href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/wise-global-research-services-pvt-ltd"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50" // ⬅️ Changed from right-6 to left-6
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    >
      <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm md:text-base animate-bounce backdrop-blur-md border border-white/20">
        <FaMoneyBillWave className="text-white text-xl" />
        Quick Pay
      </button>
    </motion.a>
  );
};

export default FloatingPayButton;