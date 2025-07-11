import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiTrash2, FiUpload, FiSearch } from 'react-icons/fi';

const weekDays = [
  { day: 'Monday', date: 'July 8' },
  { day: 'Tuesday', date: 'July 9' },
  { day: 'Wednesday', date: 'July 10' },
  { day: 'Thursday', date: 'July 11' },
  { day: 'Friday', date: 'July 12' },
];

const categories = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

function Reports() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [reports, setReports] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    category: 'Market',
    size: '0MB',
    file: null,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('dailyReports')) || {};
    setReports(storedReports);
  }, []);

  useEffect(() => {
    setPdfPreview(null);
  }, [activeDayIndex]);

  const handlePreview = (report) => {
    setIsLoading(true);
    setTimeout(() => {
      setPdfPreview(report);
      setIsLoading(false);
    }, 800);
  };

  const handleDelete = (reportId) => {
    const currentDay = weekDays[activeDayIndex].day;
    const updatedReports = { ...reports };
    updatedReports[currentDay] = updatedReports[currentDay].filter(r => r.id !== reportId);
    setReports(updatedReports);
    localStorage.setItem('dailyReports', JSON.stringify(updatedReports));
    if (pdfPreview?.id === reportId) setPdfPreview(null);
  };

  const handleUpload = () => {
    if (!newReport.file) return;
    setUploading(true);
    const currentDay = weekDays[activeDayIndex].day;
    const newReportEntry = {
      id: Date.now(),
      title: newReport.title || "Untitled Report",
      description: newReport.description || "No description",
      category: newReport.category,
      size: `${Math.round(newReport.file.size / (1024 * 1024))}MB`,
      file: URL.createObjectURL(newReport.file),
    };
    const updatedReports = { ...reports };
    if (!updatedReports[currentDay]) updatedReports[currentDay] = [];
    updatedReports[currentDay].push(newReportEntry);
    setReports(updatedReports);
    localStorage.setItem('dailyReports', JSON.stringify(updatedReports));
    setUploading(false);
    setNewReport({ title: '', description: '', category: 'Market', size: '0MB', file: null });
    fileInputRef.current.value = '';
  };

  const getStorageUsed = () => {
    const todayReports = reports[weekDays[activeDayIndex].day] || [];
    return todayReports.reduce((sum, r) => sum + parseFloat(r.size.replace('MB', '')) || 0, 0);
  };

  const currentDay = weekDays[activeDayIndex];
  const currentDayReports = reports[currentDay.day] || [];
  const filteredReports = currentDayReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const usedStorage = getStorageUsed();
  const maxSize = 30;
  const storagePercentage = Math.min((usedStorage / maxSize) * 100, 100);
  const isStorageFull = usedStorage >= maxSize;

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Research Reports
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Daily analysis and insights (Monday to Friday)
          </p>
        </div>

        {/* Day Selector */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDayIndex(index)}
                className={`px-4 py-2 text-sm font-medium ${activeDayIndex === index 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'} 
                  ${index === 0 ? 'rounded-l-lg' : ''} 
                  ${index === weekDays.length - 1 ? 'rounded-r-lg' : ''}`}
              >
                {day.day}<br/>
                <span className="text-xs text-gray-400">{day.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <FiUpload /> Upload Report
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            className="hidden"
            onChange={(e) => setNewReport({ ...newReport, file: e.target.files[0] })}
          />
        </div>

        {/* Upload Modal */}
        {newReport.file && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Upload New Report</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-2 border rounded text-black"
              value={newReport.title}
              onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 mb-2 border rounded text-black"
              value={newReport.description}
              onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
            />
            <select
              className="w-full p-2 mb-2 border rounded text-black"
              value={newReport.category}
              onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setNewReport({ ...newReport, file: null });
                  fileInputRef.current.value = '';
                }}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Report List */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentDay.day}, {currentDay.date}
                </h3>
                {filteredReports.length > 0 ? (
                  <ul className="space-y-4">
                    {filteredReports.map((report) => (
                      <motion.li 
                        key={report.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${pdfPreview?.id === report.id 
                          ? 'bg-indigo-50 border border-indigo-200' 
                          : 'hover:bg-gray-50'}`}
                        onClick={() => handlePreview(report)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{report.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {report.size}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="inline-block text-xs font-medium text-indigo-600">
                            {report.category}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(report.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No reports found.</p>
                )}
              </div>
            </div>

            {/* PDF Preview */}
            <div className="w-full md:w-2/3 bg-gray-50">
              <div className="p-6 h-full">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : pdfPreview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-sm rounded-lg overflow-hidden h-full flex flex-col"
                  >
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">{pdfPreview.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{pdfPreview.description}</p>
                    </div>
                    <div className="flex-grow p-6 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/337/337946.png" 
                            alt="PDF Thumbnail" 
                            className="w-32 h-32 object-contain mx-auto"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center gap-2 mx-auto"
                          onClick={() => window.open(pdfPreview.file, '_blank')}
                        >
                          <FiDownload /> View Full Report
                        </motion.button>
                        <p className="mt-2 text-sm text-gray-500">
                          {pdfPreview.title} ({pdfPreview.size})
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available for viewing only
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No report selected</h3>
                      <p className="mt-1 text-sm text-gray-500">Click on a report to preview it</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className={`mt-8 bg-white shadow rounded-lg p-6 ${isStorageFull ? 'border-2 border-red-500' : ''}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Report Storage</h3>
              <p className="mt-1 text-sm text-gray-500">
                All reports are stored securely using localStorage.
                {isStorageFull && (
                  <span className="text-red-500 font-medium"> Storage full! Delete some reports to upload new ones.</span>
                )}
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="text-sm font-medium text-gray-900">Max Size</p>
                <p className="text-sm text-gray-500">30 MB per day</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">30MB</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="overflow-hidden bg-gray-200 rounded-full h-2">
              <div 
                className={`rounded-full h-2 ${storagePercentage >= 90 ? 'bg-red-500' : 'bg-indigo-600'}`} 
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Storage used: {usedStorage}MB</span>
              <span>Limit: 30MB</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Reports;