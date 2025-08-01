// src/components/Energy.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for energy commodities
const commodityData = [
  {
    id: 1,
    name: 'Crude Oil',
    price: 82.45,
    unit: 'USD/Barrel',
    change: '+1.25%',
    trend: 'up',
    description: 'Light sweet crude oil for delivery in November.',
  },
  {
    id: 2,
    name: 'Natural Gas',
    price: 3.65,
    unit: 'USD/MMBtu',
    change: '-0.85%',
    trend: 'down',
    description: 'Natural gas futures for October delivery.',
  },
  {
    id: 3,
    name: 'Coal',
    price: 145.20,
    unit: 'USD/Tonne',
    change: '+0.45%',
    trend: 'up',
    description: 'Thermal coal for industrial use.',
  },
];

// Mock chart data for price trends
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Crude Oil Price (USD/Barrel)',
      data: [78.5, 79.2, 80.1, 81.0, 82.3, 81.8, 82.0, 82.5, 82.7, 82.45],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
    {
      label: 'Natural Gas Price (USD/MMBtu)',
      data: [3.8, 3.7, 3.65, 3.6, 3.55, 3.6, 3.62, 3.63, 3.64, 3.65],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
  ],
};

// FAQ data
const faqs = [
  {
    question: 'What is MCX Energy trading?',
    answer:
      'MCX Energy trading involves buying and selling energy commodities like crude oil and natural gas on the Multi Commodity Exchange of India. It allows investors to hedge or speculate on price movements.',
  },
  {
    question: 'How are energy prices determined?',
    answer:
      'Energy prices on MCX are influenced by global supply and demand, geopolitical events, weather conditions, and economic indicators. Prices are updated in real-time based on market activity.',
  },
  {
    question: 'Can I trade energy futures on MCX?',
    answer:
      'Yes, MCX offers futures contracts for energy commodities like crude oil and natural gas. You can trade these through registered brokers.',
  },
  {
    question: 'What are the trading hours for MCX Energy?',
    answer:
      'MCX energy contracts typically trade from 9:00 AM to 11:30 PM IST, Monday to Friday, subject to exchange regulations.',
  },
  {
    question: 'How can I stay updated on energy market trends?',
    answer:
      'Subscribe to our newsletter below or follow real-time updates on our platform to stay informed about energy market trends and price movements.',
  },
];

function Energy() {

  const navigate = useNavigate();
  // Chart options
  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Energy Commodity Price Trends (2025)',
        color: 'white',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-transparent text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          MCX Energy Services
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Explore the dynamic world of energy trading on the Multi Commodity
          Exchange (MCX). Get real-time insights, trade futures, and stay updated
          with the latest energy market trends for commodities like crude oil,
          natural gas, and more.
        </p>
      </section>

      {/* Commodity Overview Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Energy Commodities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodityData.map((commodity) => (
            <div
              key={commodity.id}
              className="bg-white/10 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {commodity.name}
              </h3>
              <p className="text-white/80 mb-2">{commodity.description}</p>
              <p className="text-lg font-semibold text-white">
                Price: {commodity.price} {commodity.unit}
              </p>
              <p
                className={`text-sm ${
                  commodity.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                Change: {commodity.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Price Trends Chart */}
      <section className="mb-12 bg-transparent rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Price Trends
        </h2>
        <div className="max-w-4xl mx-auto">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* Contact Call-to-Action */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Need More Details?
        </h2>
        <p className="text-white/80 mb-4 max-w-xl mx-auto">
          Contact our team for personalized energy updates and support.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </button>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              <p className="text-gray_FMT_600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Start Trading Today
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join thousands of traders leveraging MCX's energy markets to diversify
          their portfolios. Contact our team or sign up to begin your trading
          journey.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Energy;