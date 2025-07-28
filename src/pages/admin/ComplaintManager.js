import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/admin/LoadingSpinner';
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

const EditModal = ({ isOpen, onClose, rowData, onSave }) => {
  const [editedRow, setEditedRow] = useState(rowData || {});

  useEffect(() => {
    setEditedRow(rowData || {});
  }, [rowData]);

  const handleSave = () => {
    if (!editedRow.srNo) {
      toast.error('Invalid row data.');
      return;
    }
    onSave(editedRow);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200/20 max-w-md w-full text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4">Edit Row {rowData?.srNo}</h3>
            <div className="space-y-4">
              {Object.keys(editedRow).map(key => (
                key !== 'srNo' && (
                  <div key={key}>
                    <label className="capitalize text-sm text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={typeof editedRow[key] === 'number' ? 'number' : 'text'}
                      value={editedRow[key] || ''}
                      onChange={(e) => setEditedRow({ ...editedRow, [key]: e.target.value })}
                      className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder={key}
                      disabled={key === 'source' && rowData?.srNo === 'Grand Total'}
                    />
                  </div>
                )
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <motion.button onClick={onClose} className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600" variants={buttonVariants} whileHover="hover">Cancel</motion.button>
              <motion.button onClick={handleSave} className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600" variants={buttonVariants} whileHover="hover">Save</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rowData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

const ComplaintTable = ({ tableData, handleEdit, handleDelete }) => (
  <motion.div className="bg-gray-800/30 rounded-xl shadow-lg border border-gray-200/20 overflow-x-auto" variants={itemVariants}>
    <table className="w-full text-white">
      <thead className="bg-gray-700/50">
        <tr>
          <th className="p-4 text-left text-sm font-semibold">Sr. No.</th>
          <th className="p-4 text-left text-sm font-semibold">Received from</th>
          <th className="p-4 text-left text-sm font-semibold">Pending last month</th>
          <th className="p-4 text-left text-sm font-semibold">Received</th>
          <th className="p-4 text-left text-sm font-semibold">Resolved</th>
          <th className="p-4 text-left text-sm font-semibold">Pending</th>
          <th className="p-4 text-left text-sm font-semibold">Pending  3 Months</th>
          <th className="p-4 text-left text-sm font-semibold">Avg. Resolution time (days)</th>
          <th className="p-4 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(Array.isArray(tableData) ? tableData : Object.values(tableData || {})).map(row => (
          <motion.tr key={row.srNo} className="border-b border-gray-200/20 hover:bg-gray-700/20" variants={itemVariants}>
            <td className="p-4">{row.srNo}</td>
            <td className="p-4">{row.source || 'N/A'}</td>
            <td className="p-4">{row.pendingLastMonth || 0}</td>
            <td className="p-4">{row.received || 0}</td>
            <td className="p-4">{row.resolved || 0}</td>
            <td className="p-4">{row.pending || 0}</td>
            <td className="p-4">{row.pending3Months || 0}</td>
            <td className="p-4">{row.avgResolutionTime || 0}</td>
            <td className="p-4 flex gap-2">
              <motion.button onClick={() => handleEdit(row)} className="text-blue-500 hover:text-blue-700" variants={buttonVariants} whileHover="hover"><FiEdit size={16} /></motion.button>
              {row.srNo !== 'Grand Total' && (
                <motion.button onClick={() => handleDelete(row.srNo)} className="text-red-500 hover:text-red-700" variants={buttonVariants} whileHover="hover"><FiTrash2 size={16} /></motion.button>
              )}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

ComplaintTable.propTypes = {
  tableData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const ComplaintManager = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const tableRef = ref(db, 'complaintTableData/data');
    const unsubscribe = onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      setTableData(data ? (Array.isArray(data) ? data : Object.values(data)) : []);
      setIsLoading(false);
    }, (error) => {
      toast.error('Failed to load complaint data: ' + error.message);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = (row) => {
    setEditRowData(row);
    setIsEditModalOpen(true);
  };

  const handleSave = async (editedRow) => {
    try {
      const updatedData = tableData.map(row => row.srNo === editedRow.srNo ? editedRow : row);
      await update(ref(db, 'complaintTableData'), { data: updatedData });
      toast.success('Row updated successfully.');
    } catch (error) {
      toast.error('Failed to update row: ' + error.message);
    }
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (srNo) => {
    setItemToDelete(srNo);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        const updatedData = tableData.filter(row => row.srNo !== itemToDelete);
        await update(ref(db, 'complaintTableData'), { data: updatedData });
        toast.success('Row deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete row: ' + error.message);
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-3xl font-bold text-white mb-6">Complaint Manager</h2>
      {isLoading ? <LoadingSpinner /> : (
        <ComplaintTable tableData={tableData} handleEdit={handleEdit} handleDelete={handleDeleteClick} />
      )}
      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} rowData={editRowData} onSave={handleSave} />
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} title="Confirm Deletion" message="Are you sure you want to delete this row?" />
    </motion.div>
  );
};

export default ComplaintManager;

