import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for smooth transitions
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

function Legal() {
  return (
    <motion.div
      className="py-16 px-6 bg-transparent text-gray-800 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold font-josefin mb-8 text-center text-gray-900"
          variants={fadeIn}
        >
          Legal Disclaimer & Terms of Use
        </motion.h1>
        <motion.p
          className="text-sm md:text-base leading-relaxed text-gray-600 text-center mb-12"
          variants={fadeIn}
        >
          Welcome to the Legal Disclaimer page of Wise Global Research Services Pvt. Ltd. Please read the following information carefully to understand the terms, conditions, and risks associated with the use of our services, website, and content.
        </motion.p>

        {/* General Disclaimer Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            General Disclaimer
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Wise Global Research Services Pvt. Ltd. (hereinafter referred to as "Wise Global Research") is a SEBI-registered research analyst (Reg. No.: INH000016719, BSE Enlistment No.: 6205, Validity: 24-June-2024 to Perpetual). Our services, including but not limited to research reports, market analytics, and insights for equity cash, equity futures, equity options, index futures, index options, commodities (MCX, NCDEX, bullion), and currencies, are provided for informational and educational purposes only.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Investment in securities, commodities, or currency markets is inherently subject to market risks. Past performance of any financial instrument or strategy is not indicative of future results. We strongly recommend consulting with SEBI-registered financial advisors or other qualified professionals before making any investment decisions. Wise Global Research does not guarantee any returns, profits, or financial outcomes under any circumstances.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Any financial decisions made based on our content are at your sole discretion and risk. Wise Global Research, its affiliates, employees, or representatives shall not be held liable for any direct, indirect, incidental, or consequential losses resulting from the use of our services, recommendations, or advice.
          </motion.p>
        </motion.section>

        {/* Risk Disclosure Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Risk Disclosure
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Investing in financial markets, including equity cash, equity futures, equity options, index futures, index options, commodities (MCX, NCDEX, bullion), and currencies, involves a high degree of risk. The value of investments may fluctuate significantly due to market volatility, economic conditions, geopolitical events, or other unforeseen factors.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Users should carefully evaluate their financial situation, investment objectives, and risk tolerance before engaging in any trading or investment activities. Our research services, such as data-driven insights for equity cash, in-depth analytics for equity futures, strategic analytics for equity options, and transparent analytics for index and commodity markets, are designed to assist informed decision-making but do not eliminate risks.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Wise Global Research shall not be liable for any losses or damages, including but not limited to financial losses, arising from the use of our services or reliance on our content. Users are solely responsible for their investment decisions and should not rely exclusively on our research or analytics.
          </motion.p>
        </motion.section>

        {/* Terms of Use Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Terms of Use
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            By accessing or using the Wise Global Research website, services, or content, you agree to be bound by the following terms and conditions. If you do not agree with these terms, you should refrain from using our services.
          </motion.p>
          <motion.ul className="list-disc list-inside text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            <li className="mb-2">
              The content provided on this website, including research reports and market analytics, is for general information and educational purposes only. It is not intended as financial, legal, or professional advice.
            </li>
            <li className="mb-2">
              Wise Global Research reserves the right to modify, update, or discontinue any content, service, or feature at any time without prior notice.
            </li>
            <li className="mb-2">
              Users are prohibited from reproducing, distributing, or using our content for commercial purposes without prior written consent from Wise Global Research.
            </li>
            <li className="mb-2">
              Unauthorized use of our website, including hacking, data scraping, or any activity that disrupts the functionality of the site, is strictly prohibited and may result in legal action.
            </li>
            <li className="mb-2">
              Payments for our services must be made only to the account details listed on the Wise Global Research website. We do not accept payments to any other accounts.
            </li>
          </motion.ul>
        </motion.section>

        {/* Intellectual Property Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Intellectual Property
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            All content on the Wise Global Research website, including text, graphics, logos, research reports, and analytics, is the intellectual property of Wise Global Research Services Pvt. Ltd. or its licensors. Unauthorized use, reproduction, or distribution of this content is strictly prohibited and may result in legal consequences.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Users may access and view the content for personal, non-commercial use only, provided they comply with all applicable copyright and intellectual property laws.
          </motion.p>
        </motion.section>

        {/* Limitation of Liability Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Limitation of Liability
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            To the fullest extent permitted by law, Wise Global Research, its affiliates, employees, or representatives shall not be liable for any damages, including but not limited to direct, indirect, incidental, consequential, or punitive damages, arising from the use or inability to use our services or content.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            We do not warrant that our website or services will be uninterrupted, error-free, or free from viruses or other harmful components. Users access our website at their own risk.
          </motion.p>
        </motion.section>

        {/* Governing Law Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Governing Law
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            These terms and conditions are governed by the laws of India. Any disputes arising from the use of our services or content shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
          </motion.p>
        </motion.section>

        {/* SEBI Registration Details Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            SEBI Registration Details
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Wise Global Research Services Pvt. Ltd. is a SEBI-registered research analyst with the following details:
          </motion.p>
          <motion.ul className="list-disc list-inside text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            <li className="mb-2">SEBI Registration No.: INH000016719</li>
            <li className="mb-2">BSE Enlistment No.: 6205</li>
            <li className="mb-2">Validity: 24-June-2024 to Perpetual</li>
            <li className="mb-2">GST No.: 23AADCW7173Q1ZO</li>
            <li className="mb-2">CIN: U66190MP2024PTC069199</li>
            <li className="mb-2">SEBI Office: Bandra (E), Mumbai – 400051</li>
            <li className="mb-2">Toll Free: 1800 22 7575</li>
          </motion.ul>
        </motion.section>

        {/* Contact Information Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Contact Us
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            For any questions or concerns regarding this Legal Disclaimer, our Terms of Use, or our services, please contact us at:
          </motion.p>
          <motion.div className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            <p><strong>Email:</strong> support@wiseglobalresearch.com</p>
            <p><strong>Phone:</strong> +91 9977909494</p>
            <p><strong>Address:</strong> 18 AB Road, Onam Plaza, Office No 602, Indore, MP - 452001, India</p>
          </motion.div>
          {/* Contact Form */}
          <motion.form
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeIn}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile No
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter your mobile number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Type your message"
                rows="4"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.section>

        {/* Payment Disclaimer Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Payment Disclaimer
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            कृपया ध्यान दें – प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते।
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Note: Dear Client, payments will be accepted only if made to the account details listed on the Wise Global Research website. We do not accept payments to any other accounts.
          </motion.p>
        </motion.section>

        {/* Footer Note */}
        <motion.p
          className="text-sm md:text-base leading-relaxed text-gray-600 text-center mt-12"
          variants={fadeIn}
        >
          Last Updated: July 15, 2025
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Legal;