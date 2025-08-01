import React, { useState, useEffect, useCallback } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import Papa from 'papaparse';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/admin/LoadingSpinner';
import SearchBar from '../../components/admin/SearchBar';
import Pagination from '../../components/admin/Pagination';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const SubmissionTable = ({ submissions, handleDelete, sortOrder, handleSortToggle }) => (
    <motion.div
      className="bg-gray-800/30 rounded-xl shadow-lg border border-gray-200/20 overflow-x-auto p-2"
    variants={itemVariants}
  >
    <table className="min-w-full table-auto text-white">
      <thead className="bg-gray-700/50">
        <tr>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">Name</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">Mobile</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">City</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">Experience</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">Newsletter</th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">
            <button onClick={handleSortToggle} className="hover:text-indigo-400 transition-colors">
              Timestamp {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </th>
          <th className="p-2 sm:p-4 text-left text-sm sm:text-base font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
          <motion.tr
            key={submission.id}
            className="border-b border-gray-200/20 hover:bg-gray-700/20 transition-colors"
            variants={itemVariants}
          >
            <td className="p-4">{submission.name || 'N/A'}</td>
            <td className="p-4">{submission.email || 'N/A'}</td>
            <td className="p-4">{submission.phone || 'N/A'}</td>
            <td className="p-4">{submission.interest || 'N/A'}</td>
            <td className="p-4 max-w-xs truncate">{submission.message || 'N/A'}</td>
            <td className="p-4">
              {submission.timestamp ? new Date(submission.timestamp).toLocaleString('en-IN') : 'N/A'}
            </td>
            <td className="p-4">
              <motion.button
                onClick={() => handleDelete(submission.id)}
                className="text-red-500 hover:text-red-700"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiTrash2 size={16} />
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

SubmissionTable.propTypes = {
  submissions: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleSortToggle: PropTypes.func.isRequired,
};

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const submissionsRef = ref(db, 'homeFormSubmissions');
    const unsubscribe = onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      const submissionList = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setSubmissions(submissionList);
      setIsLoading(false);
    }, (error) => {
      toast.error('Failed to load submissions: ' + error.message);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSearchAndSort = useCallback(() => {
    let processedData = [...submissions];
    if (searchQuery) {
      processedData = processedData.filter(s =>
        Object.values(s).some(val =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    processedData.sort((a, b) =>
      sortOrder === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
    );
    setFilteredSubmissions(processedData);
    setCurrentPage(1);
  }, [searchQuery, submissions, sortOrder]);

  useEffect(() => {
    handleSearchAndSort();
  }, [handleSearchAndSort]);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await remove(ref(db, `homeFormSubmissions/${itemToDelete}`));
        toast.success('Submission deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete submission: ' + error.message);
      }
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredSubmissions.map(s => ({
      Name: s.name, Email: s.email, Phone: s.phone, Interest: s.interest, Message: s.message,
      Timestamp: new Date(s.timestamp).toLocaleString('en-IN'),
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'contact_submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Submissions exported to CSV.');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-3xl font-bold text-white mb-6">Contact Submissions</h2>
      <div className="flex justify-between items-center mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search contacts..." />
        <motion.button onClick={handleExportCSV} className="bg-green-500/80 text-white px-4 py-2 rounded-lg flex items-center gap-2" variants={buttonVariants} whileHover="hover">
          <FiDownload /> Export CSV
        </motion.button>
      </div>
      {isLoading ? <LoadingSpinner /> : (
        <>
          <SubmissionTable submissions={currentSubmissions} handleDelete={handleDeleteClick} sortOrder={sortOrder} handleSortToggle={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')} />
          {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} paginate={setCurrentPage} />}
        </>
      )}
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Confirm Deletion" message="Are you sure you want to delete this submission?" />
    </motion.div>
  );
};

export default ContactSubmissions;