import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css'; // Hover underline, .nav-item styles

const Dropdown = ({ label, items, location }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="nav-item glow-text">{label}</button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white text-black shadow-md rounded-md z-50 w-44">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 hover:bg-gray-200 text-sm ${
                location.pathname === item.path ? 'text-[#34eb52] font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);
  const location = useLocation();

  const gradients = [
    'bg-gradient-to-r from-blue-400 to-blue-600',
    'bg-gradient-to-r from-indigo-400 to-purple-600',
    'bg-gradient-to-r from-teal-400 to-cyan-600',
    'bg-gradient-to-r from-yellow-300 to-orange-500',
    'bg-gradient-to-r from-orange-600 to-rose-700',
    'bg-gradient-to-r from-pink-600 to-purple-800',
    'bg-gradient-to-r from-gray-800 to-gray-900',
    'bg-gradient-to-r from-slate-700 to-black'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 10800000); // 3 hours
    return () => clearInterval(interval);
  }, [gradients.length]);

  const dropdownLinks = {
    Company: [
      { path: '/about', label: 'About Us' },
      { path: '/team', label: 'Our Team' },
      { path: '/vision', label: 'Vision & Mission' },
    ],
    Services: [
      { path: '/equity', label: 'Equity' },
      { path: '/intraday', label: 'Intraday' },
      { path: '/mcx', label: 'MCX' },
    ],
    'HR Zone': [
      { path: '/career', label: 'Career' },
      { path: '/training', label: 'Training' },
    ],
    Insights: [
      { path: '/blogs', label: 'Blogs' },
      { path: '/market-news', label: 'Market News' },
    ],
    Dashboard: [
      { path: '/user-login', label: 'User Login' },
      { path: '/client-panel', label: 'Client Panel' },
    ],
  };

  const navLinks = [
    { path: '/payment', label: 'Payment' },
    { path: '/complaint', label: 'Complaint Box' },
    { path: '/reports', label: 'Research Reports' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav
      className={`
        ${gradients[gradientIndex]} 
        transition-all duration-1000 
        text-white fixed w-full top-0 z-50 shadow-md 
        border-b-4 border-[#64ed37] rounded-b-xl
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div
            className="rounded-full p-1 border-4"
            style={{ borderColor: '#4efc03' }}
          >
            <img src={wiseLogo} alt="Wise Logo" className="h-20 w-auto rounded-xl" />
          </div>
        </Link>

        <div className="hidden md:flex space-x-5 items-center text-sm font-medium">
          <Link
            to="/"
            className={`nav-item glow-text ${
              location.pathname === '/' ? 'text-[#34eb52] font-semibold' : ''
            }`}
          >
            Home
          </Link>

          {Object.entries(dropdownLinks).map(([label, items]) => (
            <Dropdown key={label} label={label} items={items} location={location} />
          ))}

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item glow-text ${
                location.pathname === link.path ? 'text-[#34eb52] font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 px-4 pb-4 space-y-3 text-sm">
          <Link
            to="/"
            className={`block glow-text text-white hover:text-yellow-300 ${
              location.pathname === '/' ? 'text-[#34eb52]' : ''
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          {Object.entries(dropdownLinks).map(([label, items]) => (
            <div key={label}>
              <div className="text-yellow-300 font-semibold pt-2 glow-text">{label}</div>
              {items.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block text-white pl-4 py-1 hover:text-yellow-300 glow-text ${
                    location.pathname === item.path ? 'text-[#34eb52]' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-white hover:text-yellow-300 glow-text ${
                location.pathname === link.path ? 'text-[#34eb52]' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
