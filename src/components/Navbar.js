import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTimes, FaBuilding, FaBriefcase, FaNewspaper, FaUserShield,
  FaChartLine, FaCoins, FaGlobe, FaUniversity, FaFileAlt, FaShieldAlt
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
    { path: '/admin', label: 'Admin Panel', icon: <FaUserShield /> },
    { path: '/client-panel', label: 'Client Panel', icon: <FaCoins /> },
    { path: '/client-service-consent', label: 'Client Service Consent', icon: <FaFileAlt /> },
    { path: '/investor-chart', label: 'Investor Chart', icon: <FaChartLine /> },
    { path: '/anti-money-laundering', label: 'Anti-Money Laundering', icon: <FaShieldAlt /> },
  ],
};

const navLinks = [
  { path: '/payment', label: 'Payment' },
  { path: '/complaint', label: 'Complaint Box' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/reports', label: 'Research Reports' },
];

const MegaMenu = React.memo(({ label, categories, location, textColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutId = useRef(null);
  const menuRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => setIsOpen(false), 300);
  };

  const handleMenuMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setIsOpen(true);
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev); // Toggle for mobile/touch devices
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <button
        className={`nav-item font-semibold text-sm md:text-base px-2 py-1${location.pathname.startsWith('/services') ? ' active' : ''}`}
        style={{ color: textColor }}
        aria-expanded={isOpen}
        aria-label={`Toggle ${label} menu`}
        onClick={handleClick}
      >
        {label}
      </button>
      <div
        className={`absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-lg border border-[var(--primary-green)] text-black shadow-lg rounded-xl z-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-[90vw] md:w-[80vw] max-w-[900px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } animate-slideDown`}
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="font-semibold text-sm md:text-base mb-2 text-[var(--primary-green)]">
              {cat.label}
            </div>
            <div className="space-y-1 text-xs md:text-sm">
              {cat.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block hover:text-blue-600 py-1 transition-all duration-300 ${
                    location.pathname === item.path ? 'text-[var(--primary-green)] font-semibold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

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

  // Handle window resize to close drawer on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav
        style={{ background, color: textColor }}
        className="fixed w-full top-0 z-50 shadow-md border-b-4 border-[var(--primary-green)] rounded-b-xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center rotate-logo">
            <div className="rounded-full p-1 border-2 border-[var(--primary-green)]">
              <img
                src={wiseLogo}
                alt="Wise Logo"
                className="h-10 sm:h-12 md:h-14 w-auto rounded-xl logo-hover"
                loading="lazy"
              />
            </div>
          </Link>

          <div className="desktop-menu hidden md:flex space-x-4 items-center font-medium">
            <Link
              to="/"
              className={`nav-item font-semibold text-sm md:text-base px-2 py-1${location.pathname==='/' ? ' active' : ''}`}
              style={{ color: textColor }}
            >
              Home
            </Link>

            <MegaMenu label="Services" categories={servicesMenu} location={location} textColor={textColor} />

            {Object.entries(dropdownLinks).map(([label, items]) => (
              <div className="relative group" key={label}>
                <button
                  className={`nav-item font-semibold text-sm md:text-base px-2 py-1${items.some(item => location.pathname.startsWith(item.path)) ? ' active' : ''}`}
                  style={{ color: textColor }}
                  aria-label={`Toggle ${label} menu`}
                >
                  {label}
                </button>
                <div className="absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-md border border-[var(--primary-green)] text-black shadow-md rounded-md z-50 group-hover:flex flex-col min-w-[200px] p-2 hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:visible animate-slideDown">
                  {items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 hover:bg-gray-200 text-xs md:text-sm flex items-center gap-2 transition-all duration-300 ${
                        location.pathname === item.path ? 'text-[var(--primary-green)] font-semibold' : ''
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
                className={`nav-item font-semibold text-sm md:text-base px-2 py-1${location.pathname===link.path ? ' active' : ''}`}
                style={{ color: textColor }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden z-50 drawer-toggle"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle mobile menu"
          >
            {drawerOpen ? (
              <FaTimes size={24} color={textColor} className="mobile-close-btn" />
            ) : (
              <div className={`hamburger ${drawerOpen ? 'open' : ''}`}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      {drawerOpen && (
        <div className="mobile-overlay" onClick={() => setDrawerOpen(false)}></div>
      )}
      <div
        className={`mobile-menu md:hidden ${drawerOpen ? 'open' : ''}`}
        ref={drawerRef}
        style={{ color: textColor }}
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
              <div className="font-bold text-base mt-4 text-[var(--primary-green)]">{cat.label}</div>
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
              <div className="font-bold text-base mt-4 text-[var(--primary-green)]">{label}</div>
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
              className={`nav-item block py-1${location.pathname===link.path ? ' active' : ''}`}
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