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

const hoverEffect = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

function Currency() {
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
          Currency Market Research & Analytics
        </motion.h1>
        <motion.p
          className="text-sm md:text-base leading-relaxed text-gray-600 text-center mb-12"
          variants={fadeIn}
        >
          Welcome to the Currency Market Research page of Wise Global Research Services Pvt. Ltd. Our SEBI-registered research analysts provide data-driven insights and analytics for forex markets, empowering you to make informed decisions. Explore our services below to understand how we support your currency trading journey.
        </motion.p>

        {/* Introduction to Currency Services */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            About Our Currency Market Services
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Wise Global Research Services Pvt. Ltd. is a SEBI-registered research analyst (Reg. No.: INH000016719, BSE Enlistment No.: 6205, Validity: 24-June-2024 to Perpetual). With over 8 years of expertise and serving 10,000+ clients, we specialize in providing research-based analytics for the forex market, including major currency pairs, cross-currency pairs, and emerging market currencies.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Our currency market research is designed to offer transparent, data-driven insights without guaranteed profits or speculative tips. We focus on fundamental and technical analysis, market trends, and macroeconomic factors to help you navigate the volatile forex market with confidence.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Please note that trading in the currency market is subject to significant risks. Past performance is not indicative of future results, and we strongly recommend consulting SEBI-registered financial advisors before making any trading decisions.
          </motion.p>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Why Choose Wise Global Research for Currency Analytics?
          </motion.h2>
          <motion.ul className="list-disc list-inside text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            <li className="mb-2">
              <strong>SEBI-Registered Expertise:</strong> Our analysts are registered with SEBI (Reg. No.: INH000016719), ensuring compliance with regulatory standards.
            </li>
            <li className="mb-2">
              <strong>Data-Driven Insights:</strong> We provide research-based analytics, focusing on technical indicators, economic data, and global market trends.
            </li>
            <li className="mb-2">
              <strong>Transparent Approach:</strong> No speculative tips or guaranteed returns. Our focus is on empowering you with reliable data.
            </li>
            <li className="mb-2">
              <strong>Comprehensive Coverage:</strong> Analysis of major currency pairs (e.g., USD/INR, EUR/USD), cross-currency pairs, and emerging market currencies.
            </li>
            <li className="mb-2">
              <strong>Client-Centric Service:</strong> With over 10,000 clients served, we prioritize your needs and provide tailored research solutions.
            </li>
          </motion.ul>
        </motion.section>

        {/* Currency Market Risks Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Understanding Currency Market Risks
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            The forex market is one of the most liquid and volatile financial markets in the world. Factors such as interest rate changes, geopolitical events, economic data releases, and central bank policies can significantly impact currency prices.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Key risks associated with currency trading include:
          </motion.p>
          <motion.ul className="list-disc list-inside text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            <li className="mb-2">
              <strong>Market Volatility:</strong> Rapid price fluctuations can lead to significant gains or losses in a short period.
            </li>
            <li className="mb-2">
              <strong>Leverage Risks:</strong> High leverage in forex trading can amplify both profits and losses, requiring careful risk management.
            </li>
            <li className="mb-2">
              <strong>Economic Uncertainty:</strong> Unexpected economic data or policy changes can affect currency valuations unpredictably.
            </li>
            <li className="mb-2">
              <strong>Liquidity Risks:</strong> Certain currency pairs may experience lower liquidity, impacting trade execution.
            </li>
            <li className="mb-2">
              <strong>Regulatory Risks:</strong> Changes in forex regulations or restrictions in specific jurisdictions may affect trading strategies.
            </li>
          </motion.ul>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Wise Global Research provides research to help mitigate these risks through informed decision-making, but we do not eliminate them. Always consult with a qualified financial advisor and review all related documents carefully before trading.
          </motion.p>
        </motion.section>

        {/* Our Currency Analytics Services */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Our Currency Analytics Services
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Our currency market research services are designed to provide you with actionable insights based on rigorous analysis. We cover a wide range of forex instruments and strategies to support your trading goals.
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
            <motion.div
              className="p-4 border border-gray-300 rounded-md shadow-sm"
              variants={fadeIn}
              whileHover={hoverEffect.hover}
            >
              <h3 className="text-lg font-semibold font-josefin text-gray-800 mb-2">
                Major Currency Pairs
              </h3>
              <p className="text-sm text-gray-600">
                In-depth analysis of major pairs like USD/INR, EUR/USD, GBP/USD, and USD/JPY, including technical indicators and fundamental factors.
              </p>
              <motion.button
                className="mt-4 text-indigo-600 hover:underline"
                whileHover={hoverEffect.hover}
                whileTap={hoverEffect.tap}
              >
                Explore
              </motion.button>
            </motion.div>
            <motion.div
              className="p-4 border border-gray-300 rounded-md shadow-sm"
              variants={fadeIn}
              whileHover={hoverEffect.hover}
            >
              <h3 className="text-lg font-semibold font-josefin text-gray-800 mb-2">
                Cross-Currency Pairs
              </h3>
              <p className="text-sm text-gray-600">
                Research on cross-currency pairs like EUR/GBP, AUD/NZD, and others, focusing on market trends and volatility.
              </p>
              <motion.button
                className="mt-4 text-indigo-600 hover:underline"
                whileHover={hoverEffect.hover}
                whileTap={hoverEffect.tap}
              >
                Explore
              </motion.button>
            </motion.div>
            <motion.div
              className="p-4 border border-gray-300 rounded-md shadow-sm"
              variants={fadeIn}
              whileHover={hoverEffect.hover}
            >
              <h3 className="text-lg font-semibold font-josefin text-gray-800 mb-2">
                Emerging Market Currencies
              </h3>
              <p className="text-sm text-gray-600">
                Analytics for emerging market currencies, including INR, BRL, and ZAR, with a focus on economic and geopolitical factors.
              </p>
              <motion.button
                className="mt-4 text-indigo-600 hover:underline"
                whileHover={hoverEffect.hover}
                whileTap={hoverEffect.tap}
              >
                Explore
              </motion.button>
            </motion.div>
            <motion.div
              className="p-4 border border-gray-300 rounded-md shadow-sm"
              variants={fadeIn}
              whileHover={hoverEffect.hover}
            >
              <h3 className="text-lg font-semibold font-josefin text-gray-800 mb-2">
                Forex Market Trends
              </h3>
              <p className="text-sm text-gray-600">
                Comprehensive reports on global forex trends, including interest rate impacts, central bank policies, and macroeconomic data.
              </p>
              <motion.button
                className="mt-4 text-indigo-600 hover:underline"
                whileHover={hoverEffect.hover}
                whileTap={hoverEffect.tap}
              >
                Explore
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Disclaimer Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Disclaimer
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Investment in the currency market is subject to market risks. Read all related documents carefully before investing. Wise Global Research does not guarantee any returns or profits. Our analytics are based on historical data, technical analysis, and market trends, but they do not predict future outcomes.
          </motion.p>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700" variants={fadeIn}>
            Users are solely responsible for their trading decisions. We recommend consulting with SEBI-registered advisors or other qualified professionals to assess the suitability of any forex trading strategy.
          </motion.p>
        </motion.section>

        {/* SEBI Registration Details */}
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

        {/* Payment Disclaimer */}
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

        {/* Contact Us Section */}
        <motion.section className="mb-12" variants={staggerContainer}>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold font-josefin mb-4 text-gray-800"
            variants={fadeIn}
          >
            Get in Touch
          </motion.h2>
          <motion.p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4" variants={fadeIn}>
            Have questions about our currency market research services? Contact our team for personalized assistance.
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
              whileHover={hoverEffect.hover}
              whileTap={hoverEffect.tap}
            >
              Send Message
            </motion.button>
          </motion.form>
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

export default Currency;