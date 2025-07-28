import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
  tap: { scale: 0.95 },
};

const Pagination = ({ totalPages, currentPage, paginate }) => (
  <div className="mt-6 flex justify-center gap-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <motion.button
        key={i + 1}
        onClick={() => paginate(i + 1)}
        className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
          currentPage === i + 1
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : 'bg-gray-700/50 text-white hover:bg-indigo-600/30'
        }`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Go to page ${i + 1}`}
      >
        {i + 1}
      </motion.button>
    ))}
  </div>
);

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;