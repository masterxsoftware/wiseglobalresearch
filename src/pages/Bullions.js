import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Bullions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gold');
  const [showReport, setShowReport] = useState(false);

  const commodities = {
    gold: {
      name: "Gold (MCX)",
      symbol: "GOLD1JUL25",
      currentPrice: "₹62,845 per 10gm",
      change: "+1.2%",
      description: "International spot gold prices directly impact MCX Gold contracts with additional premiums for Indian markets.",
      factors: [
        "Dollar Index (DXY) movements",
        "US Treasury yields",
        "Global risk sentiment",
        "Indian import duty structure",
        "ETF fund flows"
      ],
      contracts: [
        { month: "July 2025", expiry: "05-Jul-2025", lotSize: "1kg" },
        { month: "August 2025", expiry: "03-Aug-2025", lotSize: "1kg" },
        { month: "October 2025", expiry: "05-Oct-2025", lotSize: "1kg" }
      ]
    },
    silver: {
      name: "Silver (MCX)",
      symbol: "SILVER1JUL25",
      currentPrice: "₹78,920 per kg",
      change: "+0.8%",
      description: "Silver prices show higher volatility than gold with dual characteristics of precious metal and industrial commodity.",
      factors: [
        "Gold-silver ratio",
        "Industrial demand (especially solar)",
        "COMEX silver positions",
        "Retail investment demand",
        "Electronic sector consumption"
      ],
      contracts: [
        { month: "July 2025", expiry: "05-Jul-2025", lotSize: "30kg" },
        { month: "August 2025", expiry: "03-Aug-2025", lotSize: "30kg" },
        { month: "October 2025", expiry: "05-Oct-2025", lotSize: "30kg" }
      ]
    },
    platinum: {
      name: "Platinum (MCX)",
      symbol: "PLAT1JUL25",
      currentPrice: "₹3,42,150 per kg",
      change: "-0.3%",
      description: "The rarest precious metal with specialized industrial applications in catalytic converters and lab equipment.",
      factors: [
        "Automobile sector demand",
        "South African production levels",
        "Palladium substitution trends",
        "Jewelry market shifts",
        "Hydrogen economy developments"
      ],
      contracts: [
        { month: "July 2025", expiry: "05-Jul-2025", lotSize: "1kg" },
        { month: "August 2025", expiry: "03-Aug-2025", lotSize: "1kg" },
        { month: "October 2025", expiry: "05-Oct-2025", lotSize: "1kg" }
      ]
    }
  };

  const sampleReport = {
    date: "July 15, 2025",
    commodity: "Gold (August 2025 Futures)",
    analysis: [
      "Breakout above ₹63,000 resistance level with increased volume",
      "RSI showing bullish divergence on daily charts",
      "COMEX gold holdings increased by 2.3% this week",
      "Dollar index showing weakness below 102.50 support",
      "Physical demand picking up ahead of festival season"
    ],
    recommendation: {
      entry: "₹62,800-63,000",
      target: "₹63,800 (1.2% upside)",
      stopLoss: "₹62,400 (0.6% downside)",
      holdingPeriod: "3-5 trading days",
      riskReward: "1:2"
    },
    disclaimer: "MCX bullion prices are subject to international rates, currency fluctuations and local taxes. Trading in commodities involves risk of loss."
  };

  const performanceData = [
    { month: "Jan 2025", gold: "+3.2%", silver: "+5.8%", platinum: "-1.2%" },
    { month: "Feb 2025", gold: "+1.7%", silver: "+7.4%", platinum: "+0.8%" },
    { month: "Mar 2025", gold: "-0.5%", silver: "+2.1%", platinum: "+3.5%" },
    { month: "Apr 2025", gold: "+2.8%", silver: "+9.2%", platinum: "+1.1%" },
    { month: "May 2025", gold: "+4.1%", silver: "+12.6%", platinum: "-2.3%" },
    { month: "Jun 2025", gold: "+1.9%", silver: "+3.7%", platinum: "+0.5%" }
  ];

  const strategies = [
    {
      title: "Trend Following",
      description: "Capitalizing on sustained directional movements in bullion prices",
      approach: [
        "Using 20/50 EMA crossovers for entry signals",
        "ADX above 25 confirms trend strength",
        "Volume confirmation for breakout validity"
      ]
    },
    {
      title: "Spread Trading",
      description: "Exploiting price differentials between related contracts",
      approach: [
        "Gold-silver ratio trading (historically 60-80 range)",
        "Calendar spreads between near and far month contracts",
        "Inter-commodity spreads (Gold vs Platinum)"
      ]
    },
    {
      title: "News-Based Trading",
      description: "Reacting to macroeconomic data releases and geopolitical events",
      approach: [
        "FOMC meetings and rate decision impacts",
        "Non-farm payroll data reactions",
        "CPI inflation prints correlation",
        "Central bank gold reserve changes"
      ]
    }
  ];

  return (
    <div className="min-h-screen text-white bg-transparent">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-16 px-4 sm:px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full border border-yellow-400/30">
              MCX Commodities
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Bullion Trading
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            SEBI-registered research and execution strategies for Gold, Silver & Platinum futures
          </p>
        </div>
      </motion.div>

      {/* Commodity Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex border-b border-white/10">
          {Object.keys(commodities).map((commodity) => (
            <button
              key={commodity}
              className={`px-6 py-3 font-medium text-sm relative ${activeTab === commodity ? 'text-yellow-400' : 'text-white/70 hover:text-white'}`}
              onClick={() => setActiveTab(commodity)}
            >
              {commodities[commodity].name}
              {activeTab === commodity && (
                <motion.div
                  layoutId="commodityTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Current Commodity Data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 mt-8"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  {commodities[activeTab].name}
                  <span className="ml-3 text-sm font-normal bg-white/10 px-2 py-1 rounded">
                    {commodities[activeTab].symbol}
                  </span>
                </h2>
                <div className="mt-2 flex items-center">
                  <span className="text-2xl font-bold">
                    {commodities[activeTab].currentPrice}
                  </span>
                  <span className={`ml-3 px-2 py-1 rounded text-sm font-medium ${commodities[activeTab].change.includes('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {commodities[activeTab].change}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowReport(true)}
                className="px-6 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium transition"
              >
                Get Analysis Report
              </button>
            </div>

            <p className="mt-6 text-white/80">
              {commodities[activeTab].description}
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4 text-lg">Key Price Drivers</h3>
                <ul className="space-y-3">
                  {commodities[activeTab].factors.map((factor, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-3"></span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-lg">Active Contracts</h3>
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium">Contract Month</th>
                        <th className="py-2 px-4 text-left text-sm font-medium">Expiry Date</th>
                        <th className="py-2 px-4 text-left text-sm font-medium">Lot Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commodities[activeTab].contracts.map((contract, index) => (
                        <tr key={index} className="border-t border-white/10">
                          <td className="py-3 px-4">{contract.month}</td>
                          <td className="py-3 px-4">{contract.expiry}</td>
                          <td className="py-3 px-4">{contract.lotSize}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trading Strategies */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Proven Bullion Trading Strategies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-yellow-400/30 transition"
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{strategy.title}</h3>
              <p className="text-white/80 mb-4">{strategy.description}</p>
              <ul className="space-y-2">
                {strategy.approach.map((item, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start">
                    <span className="inline-block w-1 h-1 bg-white/50 rounded-full mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">Monthly Performance (2025)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="py-3 px-4 text-left">Month</th>
                  <th className="py-3 px-4 text-left">Gold</th>
                  <th className="py-3 px-4 text-left">Silver</th>
                  <th className="py-3 px-4 text-left">Platinum</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((data, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="py-3 px-4">{data.month}</td>
                    <td className={`py-3 px-4 ${data.gold.includes('+') ? 'text-green-400' : 'text-red-400'}`}>{data.gold}</td>
                    <td className={`py-3 px-4 ${data.silver.includes('+') ? 'text-green-400' : 'text-red-400'}`}>{data.silver}</td>
                    <td className={`py-3 px-4 ${data.platinum.includes('+') ? 'text-green-400' : 'text-red-400'}`}>{data.platinum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-white/50 mt-4 text-center">
            *Price performance based on nearest month futures contracts
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-20 mb-20 text-center">
        <motion.div
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8 backdrop-blur-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Start Trading Bullions Today</h2>
          <p className="text-white/80 mb-6">
            Get SEBI-compliant research, real-time alerts, and expert guidance for MCX bullion trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/9977909494" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition flex items-center justify-center">
                <FaWhatsapp className="mr-2 text-xl" /> WhatsApp Chat
              </button>
            </a>
            <button onClick={() => navigate('/contact')} className="px-6 py-3 bg-transparent hover:bg-white/10 border border-white/20 rounded-lg text-white font-medium transition">
              Request Callback
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sample Report Modal */}
      {showReport && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowReport(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900/95 backdrop-blur-lg rounded-xl max-w-2xl w-full border border-yellow-500/20 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 bg-yellow-500/10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-yellow-400">Bullion Analysis Report</h3>
                <button 
                  onClick={() => setShowReport(false)}
                  className="text-white/50 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-white/60 mt-1">Generated on {sampleReport.date}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">{sampleReport.commodity}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/60">Entry Range</p>
                    <p className="font-medium">{sampleReport.recommendation.entry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Target</p>
                    <p className="font-medium text-green-400">{sampleReport.recommendation.target}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Stop Loss</p>
                    <p className="font-medium text-red-400">{sampleReport.recommendation.stopLoss}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Holding Period</p>
                    <p className="font-medium">{sampleReport.recommendation.holdingPeriod}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">Technical & Fundamental Analysis</h4>
                <ul className="space-y-3">
                  {sampleReport.analysis.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-lg text-sm">
                <h4 className="font-bold mb-2">Execution Strategy</h4>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Enter in 2 lots - 50% at upper range, 50% on pullback</li>
                  <li>Trail stop-loss to breakeven when 50% target achieved</li>
                  <li>Watch for COMEX open gaps for confirmation</li>
                  <li>Reduce position size if USDINR shows abnormal volatility</li>
                </ul>
              </div>

              <div className="text-xs text-white/50 border-t border-white/10 pt-4">
                {sampleReport.disclaimer}
              </div>
            </div>

            <div className="bg-white/5 px-6 py-4 border-t border-white/10">
              <button 
                onClick={() => setShowReport(false)}
                className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 transition"
              >
                Download Full Report (PDF)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Bullions;