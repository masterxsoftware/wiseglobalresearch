import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTimes, FaBuilding, FaBriefcase, FaNewspaper, FaUserShield,
  FaChartLine, FaCoins, FaGlobe, FaUniversity
} from 'react-icons/fa';
import wiseLogo from '../assets/images/wise3.png';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

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

const MegaMenu = ({ label, categories, location, textColor }) => {
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
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="nav-item font-semibold text-sm md:text-base px-2 py-1" style={{ color: textColor }}>
        {label}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 backdrop-blur-lg bg-white/50 border border-[#37eb34] text-black shadow-lg rounded-xl z-50 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-[90vw] md:w-[80vw] max-w-[900px] animate-fadeIn">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="font-semibold text-sm md:text-base mb-2 text-[#37eb34]">{cat.label}</div>
              <div className="space-y-1 text-xs md:text-sm">
                {cat.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block hover:text-blue-600 py-1 transition-all duration-300 ${
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef();
  const { theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients?.[theme] || gradients.default;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  return (
    <>
      <nav
        style={{ background, color: textColor }}
        className="fixed w-full top-0 z-50 shadow-md border-b-4 border-[#37eb34] rounded-b-xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center rotate-logo">
            <div className="rounded-full p-1 border-2 border-[#37eb34]">
              <img src={wiseLogo} alt="Wise Logo" className="h-12 w-auto rounded-xl logo-hover" />
            </div>
          </Link>

          <div className="desktop-menu hidden md:flex space-x-4 items-center font-medium">
            <Link to="/" className="nav-item font-semibold text-sm md:text-base px-2 py-1" style={{ color: textColor }}>
              Home
            </Link>

            <MegaMenu label="Services" categories={servicesMenu} location={location} textColor={textColor} />

            {Object.entries(dropdownLinks).map(([label, items]) => (
              <div className="relative group" key={label}>
                <button className="nav-item font-semibold text-sm md:text-base px-2 py-1" style={{ color: textColor }}>
                  {label}
                </button>
                <div className="absolute top-full left-0 mt-2 bg-white/50 backdrop-blur-md border border-[#37eb34] text-black shadow-md rounded-md z-50 group-hover:flex flex-col min-w-[200px] p-2 hidden animate-slideDown">
                  {items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 hover:bg-gray-200 text-xs md:text-sm flex items-center gap-2 transition-all duration-300 ${
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
              <Link
                key={link.path}
                to={link.path}
                className="nav-item font-semibold text-sm md:text-base px-2 py-1"
                style={{ color: textColor }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden z-50 drawer-toggle" onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? (
              <FaTimes size={24} color={textColor} className="mobile-close-btn" />
            ) : (
              <div className="drawer-toggle">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="mobile-overlay" onClick={() => setDrawerOpen(false)}></div>
      )}
      <div
        className={`mobile-menu md:hidden ${drawerOpen ? 'open' : ''}`}
        ref={drawerRef}
        style={{ background: 'transparent', color: textColor }}
      >
        <div className="flex flex-col space-y-3 text-sm px-4 py-6">
          <Link
            to="/"
            className="nav-item font-semibold py-1"
            onClick={() => setDrawerOpen(false)}
            style={{ color: textColor }}
          >
            Home
          </Link>

          {servicesMenu.map((cat) => (
            <div key={cat.label}>
              <div className="font-bold text-base mt-4 text-[#37eb34]">{cat.label}</div>
              {cat.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-item block py-1 pl-2"
                  onClick={() => setDrawerOpen(false)}
                  style={{ color: textColor }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          {Object.entries(dropdownLinks).map(([label, items]) => (
            <div key={label}>
              <div className="font-bold text-base mt-4 text-[#37eb34]">{label}</div>
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-item block py-1 pl-2 flex items-center gap-2"
                  onClick={() => setDrawerOpen(false)}
                  style={{ color: textColor }}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          ))}

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-item block py-1"
              onClick={() => setDrawerOpen(false)}
              style={{ color: textColor }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;