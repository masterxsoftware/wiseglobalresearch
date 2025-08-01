import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { ref, onValue, off, remove } from 'firebase/database';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Pagination from '../../components/admin/Pagination';
import SearchBar from '../../components/admin/SearchBar';

const PopupSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const submissionsRef = ref(db, 'popoForms');
    const listener = onValue(
      submissionsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const submissionList = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
          setSubmissions(submissionList);
        } else {
          setSubmissions([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Firebase read failed: ', error);
        setError('Failed to fetch submissions. Please try again later.');
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => {
      off(submissionsRef, 'value', listener);
    };
  }, []);

  const handleSearchAndSort = useCallback(() => {
    let processedData = [...submissions];

    if (searchQuery) {
      processedData = processedData.filter((s) =>
        Object.values(s).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    processedData.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

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
        await remove(ref(db, `popoForms/${itemToDelete}`));
        toast.success('Submission deleted successfully.');
      } catch (error) {
        toast.error(`Failed to delete submission: ${error.message}`);
      }
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) {
      toast.info('No data to export.');
      return;
    }
    const csvData = filteredSubmissions.map((s) => ({
      Timestamp: new Date(s.timestamp).toLocaleString('en-IN'),
      Name: s.name,
      Mobile: s.mobile,
      City: s.city,
      Experience: s.experience,
      Newsletter: s.newsletter ? 'Yes' : 'No',
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'popup_submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Submissions exported to CSV.');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 p-6 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Popup Form Submissions</h1>
        <motion.button
          onClick={handleExportCSV}
          className="bg-green-500/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiDownload />
          <span>Export CSV</span>
        </motion.button>
      </div>
      <div className="mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search submissions..." />
      </div>
      {filteredSubmissions.length === 0 ? (
        <p className="text-gray-400">No submissions yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900/70 rounded-lg">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="hover:text-indigo-400 transition-colors">
                      Timestamp {sortOrder === 'desc' ? '↓' : '↑'}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Newsletter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(submission.timestamp).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{submission.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{submission.mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{submission.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{submission.experience}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{submission.newsletter ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <motion.button
                        onClick={() => handleDeleteClick(submission.id)}
                        className="text-red-500 hover:text-red-700"
                        whileHover={{ scale: 1.2 }}
                        aria-label="Delete submission"
                      >
                        <FiTrash2 />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredSubmissions.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this submission? This action cannot be undone."
      />
    </motion.div>
  );
};

export default PopupSubmissions;