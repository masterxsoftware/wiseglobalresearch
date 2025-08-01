import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, cardVariants } from '../utils/animationVariants';

const FAQSection = () => {
  const faqs = [
    {
      question: 'Are you SEBI registered research analysts?',
      answer:
        'Yes, all our research analysts are SEBI registered. Our registration number is INH000012345, which you can verify on the SEBI website.',
    },
    {
      question: 'What makes your research different from others?',
      answer:
        'Our research combines fundamental, technical, and quantitative analysis with strict risk management protocols. We provide actionable recommendations with clear entry/exit points and risk-reward ratios.',
    },
    {
      question: 'Do you provide recommendations for intraday trading?',
      answer:
        'Yes, we provide intraday trading ideas with specific entry, target and stop-loss levels. However, we recommend position trading for most investors as it has better risk-reward potential.',
    },
    {
      question: 'Can I get customized research for my portfolio?',
      answer:
        'Absolutely. Our institutional clients get customized research based on their portfolio holdings and risk profile. Contact us to discuss your specific requirements.',
    },
    {
      question: 'What is your success rate for recommendations?',
      answer:
        'Our recommendations have an 87% success rate over the past 5 years. However, we emphasize that past performance is not indicative of future results and proper risk management is essential.',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="custom-box-bg rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/20"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-sm sm:text-base">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;