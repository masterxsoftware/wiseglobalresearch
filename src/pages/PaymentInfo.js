import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import qrImage from '../assets/images/QR.png'; // Make sure image exists

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const PaymentInfo = () => {
  return (
    <motion.div
      className="relative min-h-screen py-20 px-4 text-white overflow-hidden bg-gradient-to-br from-[#6a11cb] to-[#2575fc]"
      initial="hidden"
      animate="visible"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={fadeInUp}
        custom={0}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-md mb-10 underline decoration-[#64ed37] underline-offset-8"
          variants={fadeInUp}
          custom={1}
        >
          Payment Information
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={fadeInUp}
          custom={2}
        >
          {/* QR Block */}
          <motion.div
            className="bg-white/30 border border-white/30 p-6 rounded-xl shadow-2xl backdrop-blur-xl hover:scale-105 transition duration-300 animate-float"
            variants={fadeInUp}
            custom={3}
          >
            <div className="bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded mx-auto mb-4 shadow text-center w-fit">
              IDFC FIRST Bank
            </div>

            <h3 className="font-semibold text-white mb-3 text-center">
              Scan & Pay
            </h3>

            <div className="w-full flex justify-center items-center mb-4">
              <img
                src={qrImage}
                alt="QR Code"
                className="w-60 h-60 rounded-lg border border-white shadow-inner"
              />
            </div>

            <p className="text-sm text-center text-white">
              <strong>UPI ID:</strong>{' '}
              <span className="text-[#fdfdfd] font-medium">wiseglobal@idfcbank</span>
            </p>
          </motion.div>

          {/* Bank Details */}
          <motion.div className="space-y-8" variants={fadeInUp} custom={4}>
            <BankCard
              title="HDFC BANK"
              color="text-blue-400"
              bg="bg-blue-100/20"
              custom={4.1}
              details={{
                'Account Holder': 'Wise Global Research Services Pvt Ltd',
                'Account Number': '50200098347178',
                'IFSC Code': 'HDFC0008125',
                'Account Type': 'Current',
                Branch: 'AB Road, Indore',
              }}
            />
            <BankCard
              title="IDFC FIRST BANK"
              color="text-red-400"
              bg="bg-red-100/20"
              custom={4.2}
              details={{
                'Account Holder': 'Wise Global Research Services Pvt Ltd',
                'Account Number': '80123123121',
                'IFSC Code': 'IDFB0041269',
                'Account Type': 'Current',
                Branch: 'Vijay Nagar, Indore',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Payment Gateway Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center mt-10"
          variants={fadeInUp}
          custom={5}
        >
          {/* CCAvenue Button */}
          <a
            href="https://formbuilder.ccavenue.com/live/au-small-finance-bank/wise-global-research-services-pvt-ltd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.07, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-green-500/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-lg border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition duration-300"
            >
              <FaMoneyCheckAlt className="text-white text-xl" />
              Pay via CCAvenue
            </motion.button>
          </a>

          {/* PayU Button */}
          <a
            href="https://u.payu.in/hr313T3SHfRR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.07, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-yellow-500/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-lg border border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition duration-300"
            >
              <FaMoneyCheckAlt className="text-white text-xl" />
              Pay via PayU
            </motion.button>
          </a>
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center text-sm text-yellow-200 font-semibold mt-12"
          variants={fadeInUp}
          custom={6}
        >
          ⚠️ <strong>Note:</strong> We accept payments only through the details listed above. Do not pay to any personal account.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ✅ Reusable BankCard Component
const BankCard = ({ title, color, bg, details, custom }) => (
  <motion.div
    className={`border border-white/30 p-6 rounded-xl shadow-2xl backdrop-blur-xl hover:scale-[1.02] transition duration-300 animate-float ${bg}`}
    variants={fadeInUp}
    custom={custom}
  >
    <h3 className={`${color} font-bold text-xl text-center mb-6 underline underline-offset-4`}>
      {title}
    </h3>
    {Object.entries(details).map(([label, value]) => (
      <div
        key={label}
        className="flex justify-between text-sm py-1 text-white border-b border-white/10"
      >
        <span className="font-semibold">{label}:</span>
        <span className="text-white/90">{value}</span>
      </div>
    ))}
  </motion.div>
);

export default PaymentInfo;
