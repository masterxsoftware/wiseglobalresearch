import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Future = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [marketData, setMarketData] = useState(null);
  const [timeframe, setTimeframe] = useState('1d');
  const [expandedCard, setExpandedCard] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setMarketData({
        indices: [
          { name: 'NIFTY 50', value: 19556.25, change: 1.23 },
          { name: 'BANK NIFTY', value: 44231.45, change: 0.87 },
          { name: 'FIN NIFTY', value: 19845.32, change: -0.45 }
        ],
        futures: [
          { symbol: 'NIFTYJUL23', last: 19585.50, oi: 12563200, change: 1.45 },
          { symbol: 'BANKNIFTYJUL23', last: 44310.25, oi: 8452100, change: 0.92 },
          { symbol: 'FINNIFTYJUL23', last: 19860.75, oi: 3562100, change: -0.32 }
        ],
        news: [
          { id: 1, title: 'Global markets rally on positive economic data', source: 'Economic Times', time: '2h ago' },
          { id: 2, title: 'FIIs increase positions in index futures', source: 'Business Standard', time: '4h ago' },
          { id: 3, title: 'RBI governor comments on market volatility', source: 'Moneycontrol', time: '6h ago' }
        ]
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCardExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const timeframes = [
    { id: '1d', label: '1D' },
    { id: '1w', label: '1W' },
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: '1y', label: '1Y' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'futures', label: 'Futures' },
    { id: 'options', label: 'Options' },
    { id: 'strategies', label: 'Strategies' },
    { id: 'news', label: 'News' }
  ];

  return (
    <div 
      className="min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8"
      
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2" style={{ color: '#1a1a1a' }}> {/* Darker text */}
            Equity Futures Dashboard
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto" style={{ color: '#333' }}> {/* Darker text */}
            Comprehensive analytics and trading tools for index and stock futures
          </p>
        </header>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm bg-white bg-opacity-30 p-1"> {/* More transparent */}
            {timeframes.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === tf.id
                    ? 'bg-blue-600 text-white' // More vibrant blue
                    : 'text-gray-800 hover:bg-gray-200 hover:bg-opacity-50' // Darker text
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white bg-opacity-30 rounded-xl shadow-xl overflow-hidden mb-8" style={{ backdropFilter: 'blur(5px)' }}> {/* More transparent */}
          {/* Tabs */}
          <div className="border-b border-gray-300 border-opacity-50"> {/* Lighter border */}
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700' // More vibrant
                      : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-400' // Darker text
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div> {/* More vibrant */}
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {marketData?.indices.map((index, i) => (
                        <motion.div
                          key={index.name}
                          whileHover={{ y: -5 }}
                          className="bg-white bg-opacity-40 rounded-lg shadow-md p-6 cursor-pointer" // More transparent
                          onClick={() => handleCardExpand(`index-${i}`)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{index.name}</h3> {/* Darker text */}
                              <p className="text-2xl font-bold mt-2 text-gray-900">{index.value.toLocaleString()}</p> {/* Darker text */}
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-sm font-medium ${
                                index.change >= 0
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {index.change >= 0 ? '+' : ''}
                              {index.change}%
                            </span>
                          </div>
                          {expandedCard === `index-${i}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-4 border-t border-gray-300 border-opacity-50" // Lighter border
                            >
                              <div className="flex justify-between text-sm text-gray-700"> {/* Darker text */}
                                <span>Open Interest</span>
                                <span className="font-medium">12.5M</span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-700 mt-2"> {/* Darker text */}
                                <span>Volume</span>
                                <span className="font-medium">8.2M</span>
                              </div>
                              <div className="mt-3">
                                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"> {/* More vibrant */}
                                  View Chart
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'futures' && marketData && (
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 divide-opacity-50"> {/* Lighter border */}
                          <thead className="bg-gray-100 bg-opacity-50"> {/* More transparent */}
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"> {/* Darker text */}
                                Symbol
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Last Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Change
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Open Interest
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white bg-opacity-30 divide-y divide-gray-300 divide-opacity-50"> {/* More transparent */}
                            {marketData.futures.map((future, i) => (
                              <tr key={future.symbol}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{future.symbol}</div> {/* Darker text */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{future.last.toLocaleString()}</div> {/* Darker text */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      future.change >= 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {future.change >= 0 ? '+' : ''}
                                    {future.change}%
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900"> {/* Darker text */}
                                    {(future.oi / 1000000).toFixed(1)}M
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"> {/* Darker text */}
                                  <button className="text-blue-600 hover:text-blue-800 mr-3"> {/* Darker blue */}
                                    Buy
                                  </button>
                                  <button className="text-red-600 hover:text-red-800"> {/* Darker red */}
                                    Sell
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'news' && marketData && (
                    <div className="space-y-4">
                      {marketData.news.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.01 }}
                          className="bg-white bg-opacity-40 rounded-lg shadow p-6" // More transparent
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3> {/* Darker text */}
                          <div className="flex justify-between text-sm text-gray-700"> {/* Darker text */}
                            <span>{item.source}</span>
                            <span>{item.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'strategies' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          name: 'Bull Call Spread',
                          description: 'Buy lower strike call, sell higher strike call',
                          risk: 'Limited',
                          reward: 'Limited'
                        },
                        {
                          name: 'Bear Put Spread',
                          description: 'Buy higher strike put, sell lower strike put',
                          risk: 'Limited',
                          reward: 'Limited'
                        },
                        {
                          name: 'Long Straddle',
                          description: 'Buy both call and put at same strike',
                          risk: 'Limited',
                          reward: 'Unlimited'
                        },
                        {
                          name: 'Iron Condor',
                          description: 'Combination of bull put and bear call spreads',
                          risk: 'Limited',
                          reward: 'Limited'
                        }
                      ].map((strategy, i) => (
                        <motion.div
                          key={strategy.name}
                          whileHover={{ y: -3 }}
                          className="bg-white bg-opacity-40 rounded-lg shadow-md p-6" // More transparent
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{strategy.name}</h3> {/* Darker text */}
                          <p className="text-gray-700 mb-4">{strategy.description}</p> {/* Darker text */}
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="text-gray-600">Risk:</span>{' '} {/* Darker text */}
                              <span className="font-medium">{strategy.risk}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Reward:</span>{' '} {/* Darker text */}
                              <span className="font-medium">{strategy.reward}</span>
                            </div>
                          </div>
                          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"> {/* More vibrant */}
                            Analyze Strategy
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-white bg-opacity-30 rounded-xl shadow-xl p-6 mb-8" style={{ backdropFilter: 'blur(5px)' }}> {/* More transparent */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Overview</h2> {/* Darker text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-40 rounded-lg p-4 shadow"> {/* More transparent */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">NIFTY 50</h3> {/* Darker text */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">19,556.25</span> {/* Darker text */}
                <span className="text-green-700 font-medium">+1.23%</span> {/* Darker green */}
              </div>
              <div className="h-40 mt-4 bg-gray-200 bg-opacity-50 rounded flex items-center justify-center text-gray-500"> {/* Lighter placeholder */}
                Chart Placeholder
              </div>
            </div>
            <div className="bg-white bg-opacity-40 rounded-lg p-4 shadow"> {/* More transparent */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SENSEX</h3> {/* Darker text */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">65,656.25</span> {/* Darker text */}
                <span className="text-green-700 font-medium">+1.05%</span> {/* Darker green */}
              </div>
              <div className="h-40 mt-4 bg-gray-200 bg-opacity-50 rounded flex items-center justify-center text-gray-500"> {/* Lighter placeholder */}
                Chart Placeholder
              </div>
            </div>
            <div className="bg-white bg-opacity-40 rounded-lg p-4 shadow"> {/* More transparent */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sector Performance</h3> {/* Darker text */}
              <div className="space-y-3">
                {[
                  { sector: 'IT', performance: '+2.3%' },
                  { sector: 'Banking', performance: '+1.8%' },
                  { sector: 'Auto', performance: '+0.7%' },
                  { sector: 'Pharma', performance: '-0.4%' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-800"> {/* Darker text */}
                    <span>{item.sector}</span>
                    <span className={item.performance.startsWith('+') ? 'text-green-700' : 'text-red-700'}> {/* Darker colors */}
                      {item.performance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-700 text-sm mt-12"> {/* Darker text */}
          <p>Data provided by Market Data API • Updated as of {new Date().toLocaleString()}</p>
          <p className="mt-2">© {new Date().getFullYear()} Equity Futures Dashboard. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Future;