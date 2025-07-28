import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiMail, FiFileText, FiBarChart2, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    auth.signOut();
    navigate('/user-login');
    toast.success('Logged out successfully.', { position: 'top-center' });
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { path: '/admin/contacts', label: 'Contact Submissions', icon: <FiMail /> },
    { path: '/admin/consents', label: 'Consent Submissions', icon: <FiFileText /> },
    { path: '/admin/complaints', label: 'Complaint Manager', icon: <FiAlertCircle /> },
    { path: '/admin/reports', label: 'Report Manager', icon: <FiBarChart2 /> },
  ];

  return (
    <div className="flex min-h-screen bg-transparent pt-20 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800/30 p-4 flex-shrink-0 border-r border-gray-200/20 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-2 flex-grow">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-700/50'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <motion.button
          onClick={handleLogout}
          className="mt-auto w-full flex items-center gap-3 px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiLogOut />
          <span>Logout</span>
        </motion.button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;