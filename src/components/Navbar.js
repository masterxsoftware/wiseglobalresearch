// ✅ Final Responsive Navbar with Drawer Animations & Scroll

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars, FaTimes, FaBuilding, FaBriefcase, FaNewspaper, FaUserShield,
  FaChartLine, FaCoins, FaGlobe, FaUniversity
} from 'react-icons/fa';
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css';

const gradients = [
  'bg-gradient-to-r from-blue-400 to-blue-600',
  'bg-gradient-to-r from-indigo-400 to-purple-600',
  'bg-gradient-to-r from-teal-400 to-cyan-600',
  'bg-gradient-to-r from-yellow-300 to-orange-500',
  'bg-gradient-to-r from-orange-600 to-rose-700',
  'bg-gradient-to-r from-pink-600 to-purple-800',
  'bg-gradient-to-r from-gray-800 to-gray-900',
  'bg-gradient-to-r from-slate-700 to-black',
];

const servicesMenu = [
  {
    label: 'EQUITY',
    items: [
      { path: '/services/equity/cash', label: 'Cash' },
      { path: '/services/equity/stock-option', label: 'Stock Option' },
      { path: '/services/equity/delivery', label: 'Delivery' },
      { path: '/services/equity/index', label: 'Index' },
      { path: '/services/equity/future', label: 'Future' },
      { path: '/services/equity/stock-index-option', label: 'Stock + Index Option' },
      { path: '/services/equity/btst', label: 'BTST' },
    ],
  },
  {
    label: 'MCX',
    items: [
      { path: '/mcx', label: 'MCX' },
      { path: '/services/mcx/bullions', label: 'Bullions' },
      { path: '/services/mcx/energy', label: 'Energy' },
      { path: '/services/mcx/metal', label: 'Metal' },
      { path: '/services/mcx/mcx-option', label: 'MCX Option' },
    ],
  },
  {
    label: 'NCDEX',
    items: [{ path: '/services/ncdex', label: 'Normal NCDEX' }],
  },
  {
    label: 'FOREX',
    items: [{ path: '/services/forex', label: 'FOREX' }],
  },
  {
    label: 'CURRENCY',
    items: [{ path: '/services/currency', label: 'Currency' }],
  },
  {
    label: 'COMEX',
    items: [{ path: '/services/comex', label: 'COMEX' }],
  },
];

const dropdownLinks = {
  Company: [
    { path: '/about', label: 'About Us', icon: <FaBuilding /> },
    { path: '/team', label: 'Our Team', icon: <FaUserShield /> },
    { path: '/vision', label: 'Vision & Mission', icon: <FaChartLine /> },
  ],
  'HR Zone': [
    { path: '/career', label: 'Career', icon: <FaBriefcase /> },
    { path: '/training', label: 'Training', icon: <FaUniversity /> },
  ],
  Insights: [
    { path: '/blogs', label: 'Blogs', icon: <FaNewspaper /> },
    { path: '/market-news', label: 'Market News', icon: <FaGlobe /> },
  ],
  Dashboard: [
    { path: '/user-login', label: 'User Login', icon: <FaUserShield /> },
    { path: '/client-panel', label: 'Client Panel', icon: <FaCoins /> },
  ],
};

const navLinks = [
  { path: '/reports', label: 'Research Reports' },
  { path: '/payment', label: 'Payment' },
  { path: '/complaint', label: 'Complaint Box' },
  { path: '/contact', label: 'Contact Us' },
];

const MegaMenu = ({ label, categories, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className="relative group hidden md:block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="nav-item glow-text text-white font-semibold text-sm">{label}</button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 backdrop-blur-lg bg-white/50 border border-[#37eb34] text-black shadow-lg rounded-xl z-50 grid grid-cols-3 gap-6 p-6 w-[900px] animate-fadeIn">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="font-semibold mb-2 text-[#37eb34]">{cat.label}</div>
              <div className="space-y-1 text-sm">
                {cat.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block hover:text-blue-600 pb-1 transition-all duration-300 border-b border-gray-200 ${
                      location.pathname === item.path ? 'text-green-600 font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function Navbar() {
  const [gradientIndex, setGradientIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 10800000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  return (
    <nav className={`${gradients[gradientIndex]} transition-all duration-1000 text-white fixed w-full top-0 z-50 shadow-md border-b-4 border-[#37eb34] rounded-b-xl`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center rotate-logo">
          <div className="rounded-full p-1 border-2 border-[#37eb34]">
            <img src={wiseLogo} alt="Wise Logo" className="h-20 w-auto rounded-xl logo-hover" />
          </div>
        </Link>

        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <Link to="/" className={`nav-item glow-text ${location.pathname === '/' ? 'text-[#34eb52] font-semibold' : ''}`}>Home</Link>
          <MegaMenu label="Services" categories={servicesMenu} location={location} />

          {Object.entries(dropdownLinks).map(([label, items]) => (
            <div className="relative group" key={label}>
              <button className="nav-item glow-text text-white font-semibold text-sm">{label}</button>
              <div className="absolute top-full left-0 mt-2 bg-white/50 backdrop-blur-md border border-[#37eb34] text-black shadow-md rounded-md z-50 animate-fadeIn hidden group-hover:block">
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 hover:bg-gray-200 text-sm flex items-center gap-2 transition-all duration-300 ${
                      location.pathname === item.path ? 'text-[#34eb52] font-semibold' : ''
                    }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`nav-item glow-text ${location.pathname === link.path ? 'text-[#34eb52] font-semibold' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden z-50">
          <button onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${drawerOpen ? 'open' : ''} md:hidden`} ref={drawerRef}>
        <div className="flex flex-col space-y-4 text-sm overflow-y-auto max-h-[90vh] pr-2">
          <Link to="/" className="nav-item" onClick={() => setDrawerOpen(false)}>Home</Link>

          {servicesMenu.map((cat) => (
            <div key={cat.label}>
              <div className="font-bold mt-4 text-[#37eb34]">{cat.label}</div>
              {cat.items.map((item) => (
                <Link key={item.path} to={item.path} className="nav-item" onClick={() => setDrawerOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          {Object.entries(dropdownLinks).map(([label, items]) => (
            <div key={label}>
              <div className="font-bold mt-4 text-[#37eb34]">{label}</div>
              {items.map((item) => (
                <Link key={item.path} to={item.path} className="nav-item" onClick={() => setDrawerOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-item" onClick={() => setDrawerOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
