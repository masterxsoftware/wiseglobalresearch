import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
  <div className="py-8 px-4 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="text-lg text-gray-600 leading-relaxed">{children}</div>
  </div>
);

const NCDEX = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="bg-yellow-100 py-16 text-center">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NCDEX Services
        </motion.h1>
        <motion.p
          className="mt-4 text-lg max-w-2xl mx-auto text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Empowering Farmers and Traders in the Agri Commodity Market with Transparency and Trust.
        </motion.p>
      </div>

      <Section title="What is NCDEX?">
        <p>
          The National Commodity and Derivatives Exchange (NCDEX) is a leading online commodity exchange platform in India, primarily dealing in agricultural commodities. It provides a transparent and efficient mechanism for farmers, traders, and investors to trade in a secure environment.
        </p>
        <p className="mt-4">
          NCDEX offers a wide range of futures contracts in commodities such as guar seed, jeera, turmeric, chana, and many more. It plays a vital role in price discovery and risk management in India's agricultural ecosystem.
        </p>
      </Section>

      <Section title="Our NCDEX Services Include:">
        <ul className="list-disc pl-5 space-y-2">
          <li>Live Commodity Price Monitoring Dashboard</li>
          <li>Real-Time NCDEX Trading Signals</li>
          <li>Risk Management & Hedging Advisory</li>
          <li>Customized NCDEX Portfolio Tracking</li>
          <li>In-depth Market Research Reports</li>
          <li>Daily Technical & Fundamental Analysis</li>
          <li>Assistance in Account Opening with NCDEX Brokers</li>
          <li>Farmer Aggregator Solutions for Rural Outreach</li>
          <li>Expert Trader Guidance via WhatsApp & Calls</li>
        </ul>
      </Section>

      <Section title="Key NCDEX Commodities We Track:">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {['Guar Seed', 'Chana', 'Jeera', 'Soybean', 'Mustard Seed', 'Turmeric'].map((item, i) => (
            <motion.div
              key={item}
              className="border rounded-xl p-6 shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-xl font-semibold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Why Choose Us?">
        <div className="space-y-4">
          <p>
            Our team of commodity analysts, market strategists, and agri-economists bring over a decade of expertise to help you make informed decisions in the NCDEX market.
          </p>
          <ul className="list-decimal pl-6 space-y-2">
            <li>100% SEBI-compliant advisory</li>
            <li>Dedicated support for farmers and traders</li>
            <li>Daily actionable trade setups</li>
            <li>Client education & training programs</li>
            <li>Mobile-friendly dashboards</li>
            <li>API integrations for brokers & fintech apps</li>
          </ul>
        </div>
      </Section>

      <Section title="How Our NCDEX Service Works">
        <ol className="list-decimal pl-6 space-y-2">
          <li>Client registers on our platform and selects a commodity plan</li>
          <li>We assign a dedicated NCDEX analyst</li>
          <li>Live signals and advisory begin via WhatsApp/Email/SMS</li>
          <li>Weekly review calls are conducted to refine strategy</li>
          <li>Client can view performance reports anytime via dashboard</li>
        </ol>
      </Section>

      <Section title="Testimonials">
        <div className="space-y-6">
          {[
            {
              name: 'Ramesh, Gujarat Farmer',
              comment:
                "Thanks to the NCDEX tips from Wise Global, I got better prices for my jeera crops. It's life-changing for small farmers.",
            },
            {
              name: 'Anita Sharma, Commodity Trader',
              comment:
                "Their daily NCDEX advisory helped me triple my monthly returns. Very professional team!",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 p-6 rounded-lg shadow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="italic">“{t.comment}”</p>
              <p className="mt-2 text-sm font-semibold text-right">- {t.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="FAQs (NCDEX Services)">
        {[
          {
            q: 'Is NCDEX trading legal in India?',
            a: 'Yes, NCDEX is regulated by SEBI and fully legal for commodity trading in India.',
          },
          {
            q: 'Do you offer trial advisory?',
            a: 'Yes, we offer a 3-day free trial for first-time users.',
          },
          {
            q: 'What platforms are supported?',
            a: 'We support Zerodha, Angel One, Upstox, and many other brokers with NCDEX access.',
          },
        ].map((faq, i) => (
          <details key={i} className="mb-4 border rounded-md p-4">
            <summary className="font-semibold cursor-pointer text-lg">{faq.q}</summary>
            <p className="mt-2 text-gray-700">{faq.a}</p>
          </details>
        ))}
      </Section>

      <Section title="Contact & Registration">
        <p>
          Ready to transform your NCDEX trading journey? Contact us today to get started or book a free consultation with our team.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow"
          >
            📱 Chat on WhatsApp
          </a>
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow"
          >
            📝 Register Now
          </a>
        </div>
      </Section>

      <footer className="bg-gray-100 py-8 text-center text-sm text-gray-500 mt-12">
        © 2025 Wise Global Research Pvt. Ltd. — NCDEX Services | All rights reserved.
      </footer>
    </div>
  );
};

export default NCDEX;
