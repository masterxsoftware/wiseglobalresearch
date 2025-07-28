import React, { useState, useEffect, useCallback } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
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

const ConsentTable = ({ submissions, handleDelete }) => (
  <motion.div
    className="bg-gray-800/30 rounded-xl shadow-lg border border-gray-200/20 overflow-x-auto"
    variants={itemVariants}
  >
    <table className="w-full text-white">
      <thead className="bg-gray-700/50">
        <tr>
          <th className="p-4 text-left text-sm font-semibold">Client Name</th>
          <th className="p-4 text-left text-sm font-semibold">Client ID</th>
          <th className="p-4 text-left text-sm font-semibold">Email</th>
          <th className="p-4 text-left text-sm font-semibold">PAN Card</th>
          <th className="p-4 text-left text-sm font-semibold">Aadhaar Card</th>
          <th className="p-4 text-left text-sm font-semibold">Signature</th>
          <th className="p-4 text-left text-sm font-semibold">Timestamp</th>
          <th className="p-4 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
          <motion.tr
            key={submission.id}
            className="border-b border-gray-200/20 hover:bg-gray-700/20"
            variants={itemVariants}
          >
            <td className="p-4">{submission.clientName || 'N/A'}</td>
            <td className="p-4">{submission.clientId || 'N/A'}</td>
            <td className="p-4">{submission.email || 'N/A'}</td>
            <td className="p-4">
              {submission.panDataUrl ? <a href={submission.panDataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View</a> : 'N/A'}
            </td>
            <td className="p-4">
              {submission.aadhaarDataUrl ? <a href={submission.aadhaarDataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View</a> : 'N/A'}
            </td>
            <td className="p-4">
              {submission.signatureDataUrl ? <a href={submission.signatureDataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View</a> : 'N/A'}
            </td>
            <td className="p-4">{submission.timestamp ? new Date(submission.timestamp).toLocaleString('en-IN') : 'N/A'}</td>
            <td className="p-4">
              <motion.button onClick={() => handleDelete(submission.id)} className="text-red-500 hover:text-red-700" variants={buttonVariants} whileHover="hover"><FiTrash2 size={16} /></motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

ConsentTable.propTypes = {
  submissions: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const ConsentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const consentRef = ref(db, 'clientServiceConsentForms');
    const unsubscribe = onValue(consentRef, (snapshot) => {
      const data = snapshot.val();
      const consentList = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) : [];
      setSubmissions(consentList);
      setIsLoading(false);
    }, (error) => {
      toast.error('Failed to load consent submissions: ' + error.message);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = useCallback(() => {
    let processedData = [...submissions];
    if (searchQuery) {
      processedData = processedData.filter(s =>
        Object.values(s).some(val =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setFilteredSubmissions(processedData);
    setCurrentPage(1);
  }, [searchQuery, submissions]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await remove(ref(db, `clientServiceConsentForms/${itemToDelete}`));
        toast.success('Consent submission deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete consent submission: ' + error.message);
      }
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-3xl font-bold text-white mb-6">Consent Submissions</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search consents..." />
      {isLoading ? <LoadingSpinner /> : (
        <>
          <ConsentTable submissions={currentSubmissions} handleDelete={handleDeleteClick} />
          {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} paginate={setCurrentPage} />}
        </>
      )}
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Confirm Deletion" message="Are you sure you want to delete this consent submission?" />
    </motion.div>
  );
};

export default ConsentSubmissions;