// src/pages/Services.js
import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import { FaChartLine, FaDollarSign, FaUserCheck } from 'react-icons/fa'; // For icons

const Services = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Daily Recommendations</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Explore our wide range of financial services and daily market recommendations to help you achieve your investment goals.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Services Overview */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Financial Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaChartLine className="text-4xl text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Market Analysis</h3>
              <p className="text-gray-600">
                Daily insights and technical analysis to guide your investment decisions in stocks, commodities, and forex.
              </p>
            </div>
            {/* Service Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaDollarSign className="text-4xl text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Investment Plans</h3>
              <p className="text-gray-600">
                Tailored investment strategies to maximize returns and manage risks effectively.
              </p>
            </div>
            {/* Service Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaUserCheck className="text-4xl text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Support</h3>
              <p className="text-gray-600">
                Dedicated advisors to provide one-on-one guidance for your financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="bg-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Basic Plan</h3>
              <p className="text-3xl font-semibold text-blue-900 mb-4">$99/month</p>
              <ul className="text-gray-600 mb-6">
                <li>Daily Market Updates</li>
                <li>Weekly Reports</li>
                <li>Email Support</li>
              </ul>
              <Link
                to="/signup"
                className="inline-block bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
              >
                Choose Plan
              </Link>
            </div>
            {/* Plan 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-yellow-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Pro Plan</h3>
              <p className="text-3xl font-semibold text-blue-900 mb-4">$199/month</p>
              <ul className="text-gray-600 mb-6">
                <li>Daily Recommendations</li>
                <li>Real-Time Alerts</li>
                <li>Priority Email Support</li>
              </ul>
              <Link
                to="/signup"
                className="inline-block bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
              >
                Choose Plan
              </Link>
            </div>
            {/* Plan 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Elite Plan</h3>
              <p className="text-3xl font-semibold text-blue-900 mb-4">$399/month</p>
              <ul className="text-gray-600 mb-6">
                <li>Personalized Portfolio</li>
                <li>One-on-One Consulting</li>
                <li>24/7 Support</li>
              </ul>
              <Link
                to="/signup"
                className="inline-block bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
              >
                Choose Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6">
          Join thousands of satisfied clients and take control of your financial future with our expert recommendations.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Wise Global Research</h3>
          <p className="text-gray-400 mb-4">
            Providing expert financial advice and daily market recommendations since 2010.
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
          </div>
          <p className="text-gray-500">&copy; 2025 Wise Global Research. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;