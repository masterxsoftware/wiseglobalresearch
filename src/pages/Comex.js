// src/pages/Comex.js
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaSearch, FaPlus, FaTrash } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// Mock data for Indian stock market (NIFTY 500 inspired)
const mockStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3050.25, change: 2.5, sector: 'Oil & Gas', volume: 7500000 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4200.75, change: -1.2, sector: 'IT', volume: 3200000 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1600.50, change: 0.8, sector: 'Banking', volume: 8900000 },
  { symbol: 'INFY', name: 'Infosys', price: 1800.30, change: 1.5, sector: 'IT', volume: 4500000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1200.10, change: -0.5, sector: 'Banking', volume: 6700000 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 850.40, change: 1.8, sector: 'Banking', volume: 12000000 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1450.65, change: 3.2, sector: 'Telecom', volume: 5600000 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 3200.90, change: -2.0, sector: 'Conglomerate', volume: 2300000 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 12476.00, change: 0.9, sector: 'Automotive', volume: 890000 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 12495.00, change: 1.1, sector: 'Cement', volume: 450000 },
  // Add more mock stocks to simulate NIFTY 500
  ...Array.from({ length: 20 }, (_, i) => ({
    symbol: `STOCK${i + 1}`,
    name: `Stock ${i + 1} India`,
    price: Math.random() * 5000 + 100,
    change: (Math.random() * 10 - 5).toFixed(2),
    sector: ['IT', 'Banking', 'Pharma', 'Automotive', 'FMCG'][Math.floor(Math.random() * 5)],
    volume: Math.floor(Math.random() * 10000000),
  })),
];

// Mock historical data for charts
const generateHistoricalData = (basePrice) => {
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const prices = labels.map(() => basePrice * (1 + (Math.random() - 0.5) * 0.1));
  return { labels, prices };
};

const Comex = () => {
  // State management
  const [stocks, setStocks] = useState(mockStocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'desc' });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: stock.price * (1 + (Math.random() - 0.5) * 0.02),
          change: (Math.random() * 5 - 2.5).toFixed(2),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter stocks based on search and sector
  const filteredStocks = useMemo(() => {
    let result = stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedSector !== 'All') {
      result = result.filter((stock) => stock.sector === selectedSector);
    }

    // Sort stocks
    result.sort((a, b) => {
      if (sortConfig.key === 'price' || sortConfig.key === 'change' || sortConfig.key === 'volume') {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });

    return result;
  }, [stocks, searchTerm, selectedSector, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Add/remove from watchlist
  const toggleWatchlist = (stock) => {
    setWatchlist((prev) =>
      prev.some((item) => item.symbol === stock.symbol)
        ? prev.filter((item) => item.symbol !== stock.symbol)
        : [...prev, stock]
    );
  };

  // Chart data for selected stock
  const chartData = selectedStock
    ? {
        labels: generateHistoricalData(selectedStock.price).labels,
        datasets: [
          {
            label: `${selectedStock.name} Price`,
            data: generateHistoricalData(selectedStock.price).prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      }
    : null;

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price (INR)' } },
    },
  };

  // Sector options for filter
  const sectors = ['All', ...new Set(mockStocks.map((stock) => stock.sector))];

  return (
    <motion.div
      className="min-h-screen bg-transparent p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-center text-white mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Indian Stock Market - Comex Dashboard
        </motion.h1>

        {/* Search and Filter Section */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks by name or symbol..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Stock List and Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock List */}
          <motion.div
            className="lg:col-span-2 bg-gray-900 bg-opacity-50 rounded-lg p-6"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Stock List</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('symbol')}>
                      Symbol {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('price')}>
                      Price (INR) {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('change')}>
                      Change (%) {sortConfig.key === 'change' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('sector')}>
                      Sector {sortConfig.key === 'sector' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3 cursor-pointer" onClick={() => handleSort('volume')}>
                      Volume {sortConfig.key === 'volume' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredStocks.map((stock) => (
                      <motion.tr
                        key={stock.symbol}
                        className="border-b border-gray-800 hover:bg-gray-700 cursor-pointer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <td className="p-3">{stock.symbol}</td>
                        <td className="p-3">{stock.name}</td>
                        <td className="p-3">₹{stock.price.toFixed(2)}</td>
                        <td className={`p-3 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change}%
                        </td>
                        <td className="p-3">{stock.sector}</td>
                        <td className="p-3">{stock.volume.toLocaleString()}</td>
                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(stock);
                            }}
                            className="text-blue-500 hover:text-blue-300"
                          >
                            {watchlist.some((item) => item.symbol === stock.symbol) ? (
                              <FaTrash />
                            ) : (
                              <FaPlus />
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Watchlist */}
          <motion.div
            className="bg-gray-900 bg-opacity-50 rounded-lg p-6"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Watchlist</h2>
            {watchlist.length === 0 ? (
              <p className="text-gray-400">Your watchlist is empty.</p>
            ) : (
              <ul className="space-y-2">
                <AnimatePresence>
                  {watchlist.map((stock) => (
                    <motion.li
                      key={stock.symbol}
                      className="flex justify-between items-center p-2 bg-gray-800 bg-opacity-50 rounded"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>
                        {stock.symbol} - ₹{stock.price.toFixed(2)} (
                        <span className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {stock.change}%
                        </span>
                        )
                      </span>
                      <button
                        onClick={() => toggleWatchlist(stock)}
                        className="text-red-500 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </div>

        {/* Stock Chart */}
        {selectedStock && (
          <motion.div
            className="mt-8 bg-gray-900 bg-opacity-50 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Price Trend: {selectedStock.name} ({selectedStock.symbol})
            </h2>
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Comex;