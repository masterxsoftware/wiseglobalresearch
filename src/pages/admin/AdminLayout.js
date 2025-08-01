import React, { Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaEnvelope, FaFileContract, FaExclamationCircle, FaChartBar, FaSignOutAlt, FaBullhorn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { FaHome } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminLayout = () => {
  const navigate = useNavigate();
  // Ref for idle timeout
  const idleTimeoutRef = React.useRef();
  // Redirect to login if not authenticated
  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect without showing login prompt
        navigate('/user-login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  const handleLogout = React.useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAuthenticated');
        toast.success('Logged out successfully.', { position: 'top-center' });
        navigate('/user-login');
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error.message}`, { position: 'top-center' });
      });
  }, [navigate]);
  // Log out and go to home page
  const handleGoHome = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, { position: 'top-center' });
      });
  };

  // Auto logout after 5 minutes of inactivity
  React.useEffect(() => {
    const events = ['mousemove','mousedown','keydown','touchstart','scroll'];
    const resetTimer = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => handleLogout(), 5 * 60 * 1000);
    };
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
    }, [handleLogout]);

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/contacts', label: 'Contact Submissions', icon: <FaEnvelope /> },
    { path: '/admin/popups', label: 'Popup Submissions', icon: <FaBullhorn /> },
    { path: '/admin/consents', label: 'Consent Submissions', icon: <FaFileContract /> },
    { path: '/admin/complaints', label: 'Complaint Manager', icon: <FaExclamationCircle /> },
    { path: '/admin/reports', label: 'Report Manager', icon: <FaChartBar /> },
  ];

  return (
    <div className="flex min-h-screen bg-transparent text-white">
      <aside className="w-64 bg-gray-800/80 p-4 flex-shrink-0 border-r border-gray-700 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-2 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700/50'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* Go Home Button */}
        <motion.button
          onClick={handleGoHome}
          className="mt-4 mb-2 w-full flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHome />
          <span>Home</span>
        </motion.button>
        <motion.button
          onClick={handleLogout}
          className="mt-auto w-full flex items-center gap-3 px-4 py-2 bg-red-600/80 hover:bg-red-700 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </motion.button>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Suspense fallback={
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AdminLayout;