// src/pages/ContactData.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase'; // Import Firebase Realtime Database
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

function ContactData() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc'); // Default: newest first

  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/user-login');
      toast.error('Please log in to access this page.', { position: 'top-center' });
    }
  }, [isAuthenticated, navigate]);

  // Fetch form submissions from Firebase
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const submissionsRef = ref(db, 'formSubmissions');
    const unsubscribe = onValue(
      submissionsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const submissionList = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .sort((a, b) =>
              sortOrder === 'desc'
                ? b.timestamp - a.timestamp
                : a.timestamp - b.timestamp
            );
          setSubmissions(submissionList);
          toast.success('Submissions loaded successfully.', {
            position: 'top-center',
            autoClose: 2000,
          });
        } else {
          setSubmissions([]);
          toast.info('No submissions found.', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions. Please try again later.');
        toast.error('Failed to load submissions.', { position: 'top-center' });
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup subscription
  }, [sortOrder]);

  // Toggle sort order
  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/user-login');
    toast.success('Logged out successfully.', { position: 'top-center' });
  };

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="p-4 max-w-6xl mx-auto min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Contact Entries</h2>
        <motion.button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-aos="zoom-in"
        >
          Logout
        </motion.button>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          onClick={handleSortToggle}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          data-aos="zoom-in"
        >
          Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
        </button>
      </div>

      {loading ? (
        <div className="text-center text-white" data-aos="fade-up">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 custom-box-bg rounded-xl p-6 shadow-md border border-gray-200/20" data-aos="fade-up">
          {error}
        </div>
      ) : submissions.length === 0 ? (
        <div className="custom-box-bg rounded-xl p-6 shadow-md border border-gray-200/20 text-center text-white" data-aos="fade-up">
          No entries to display.
        </div>
      ) : (
        <motion.div
          className="custom-box-bg rounded-xl shadow-md border border-gray-200/20 overflow-x-auto"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
          data-aos="fade-up"
        >
          <table className="w-full text-white">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <motion.tr
                  key={submission.id}
                  className="border-b border-gray-200/20"
                  variants={rowVariants}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <td className="p-3">{submission.name}</td>
                  <td className="p-3">{submission.email}</td>
                  <td className="p-3">{submission.phone}</td>
                  <td className="p-3">{submission.message}</td>
                  <td className="p-3">
                    {new Date(submission.timestamp).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ContactData;