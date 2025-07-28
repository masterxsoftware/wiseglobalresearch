import React, { useState, useEffect } from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject as deleteFile } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { db, auth } from '../../firebase';
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

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const REPORT_CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

const ReportUploadCard = ({ day, reports, onUpload, onDelete, onPreview }) => {
  const [newReport, setNewReport] = useState({ title: '', description: '', category: 'Market', file: null });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!newReport.file) {
      toast.error('Please select a file.');
      return;
    }
    setUploading(true);
    try {
      await onUpload(day, newReport);
      setNewReport({ title: '', description: '', category: 'Market', file: null });
      const fileInput = document.getElementById(`file-input-${day}`);
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(`Failed to upload report: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200/10" variants={itemVariants}>
      <h4 className="text-lg font-medium text-white mb-3">{day}</h4>
      <div className="mb-4 space-y-3">
        <input type="text" placeholder="Report Title" className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={newReport.title} onChange={(e) => setNewReport({ ...newReport, title: e.target.value })} />
        <textarea placeholder="Report Description" className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400" rows="3" value={newReport.description} onChange={(e) => setNewReport({ ...newReport, description: e.target.value })} />
        <select className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" value={newReport.category} onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}>
          {REPORT_CATEGORIES.map((cat) => <option key={cat} value={cat} className="bg-gray-800">{cat}</option>)}
        </select>
        <input id={`file-input-${day}`} type="file" accept=".pdf" className="w-full p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-indigo-600 file:text-white file:border-0 file:hover:bg-indigo-700" onChange={(e) => setNewReport({ ...newReport, file: e.target.files[0] })} />
        <motion.button onClick={handleUpload} disabled={uploading} className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50" variants={buttonVariants} whileHover="hover">
          <FiUpload /> {uploading ? 'Uploading...' : 'Upload'}
        </motion.button>
      </div>
      <div>
        <h5 className="text-sm font-medium text-gray-300 mb-2">Uploaded Reports</h5>
        {reports[day]?.length > 0 ? (
          <ul className="space-y-2">
            {reports[day].map((report) => (
              <motion.li key={report.id} className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg" variants={itemVariants}>
                <p className="text-sm text-white font-medium truncate" title={report.title}>{report.title}</p>
                <div className="flex gap-2">
                  <motion.button onClick={() => onPreview(report)} className="text-indigo-500 hover:text-indigo-700" variants={buttonVariants} whileHover="hover"><FiEye size={16} /></motion.button>
                  <motion.button onClick={() => onDelete(report.id, report.storagePath)} className="text-red-500 hover:text-red-700" variants={buttonVariants} whileHover="hover"><FiTrash2 size={16} /></motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : <p className="text-sm text-gray-400">No reports uploaded.</p>}
      </div>
    </motion.div>
  );
};

ReportUploadCard.propTypes = {
  day: PropTypes.string.isRequired,
  reports: PropTypes.object.isRequired,
  onUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
};

const ReportManager = () => {
  const [reports, setReports] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, storagePath: null });

  const storage = getStorage();

  useEffect(() => {
    const reportsRef = ref(db, 'reports');
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const groupedReports = WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
      Object.entries(data).forEach(([key, value]) => {
        if (value.day && groupedReports[value.day]) {
          groupedReports[value.day].push({ id: key, ...value });
        }
      });
      setReports(groupedReports);
      setIsLoading(false);
    }, (error) => {
      toast.error('Failed to load reports: ' + error.message);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUploadReport = async (day, reportData) => {
    if (!auth.currentUser) {
      toast.error('You must be logged in to upload reports.');
      return;
    }
    const file = reportData.file;
    const filePath = `reports/${day}/${Date.now()}_${file.name}`;
    const fileRef = storageRef(storage, filePath);

    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    const password = Math.floor(1000 + Math.random() * 9000).toString();

    const newReportData = {
      title: reportData.title || 'Untitled Report',
      description: reportData.description || 'No description',
      category: reportData.category,
      size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      fileUrl,
      storagePath: filePath,
      filename: file.name,
      timestamp: Date.now(),
      day,
      password,
    };

    await push(ref(db, 'reports'), newReportData);
    toast.success(`Report uploaded for ${day}. Password: ${password}`, { autoClose: 5000 });
  };

  const handleDeleteClick = (id, storagePath) => {
    setItemToDelete({ id, storagePath });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const { id, storagePath } = itemToDelete;
    if (id && storagePath) {
      try {
        // Delete from Realtime Database
        await remove(ref(db, `reports/${id}`));
        // Delete from Storage
        const fileRef = storageRef(storage, storagePath);
        await deleteFile(fileRef);
        toast.success('Report deleted successfully.');
      } catch (error) {
        toast.error(`Failed to delete report: ${error.message}`);
      }
      setIsModalOpen(false);
      setItemToDelete({ id: null, storagePath: null });
    }
  };

  const handlePreview = (report) => {
    window.open(report.fileUrl, '_blank');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <h2 className="text-3xl font-bold text-white mb-6">Report Manager</h2>
      {isLoading ? <LoadingSpinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEEK_DAYS.map((day) => (
            <ReportUploadCard
              key={day}
              day={day}
              reports={reports}
              onUpload={handleUploadReport}
              onDelete={handleDeleteClick}
              onPreview={handlePreview}
            />
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Report Deletion"
        message="Are you sure you want to delete this report? This action cannot be undone."
      />
    </motion.div>
  );
};

export default ReportManager;

