import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaExclamationTriangle,
  FaPaperPlane,
  FaCheckCircle,
  FaRegClock,
  FaUserTie
} from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    complaintType: '',
    description: '',
    resolution: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const complaintTypes = [
    "Service Delay", "Research Quality", "Miscommunication",
    "Refund Request", "Technical Issue", "Billing Problem", "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(4);
    setTimeout(() => setSubmitted(true), 1500);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-red-100 text-red-600 p-3 rounded-full mb-4"
          >
            <RiCustomerService2Fill className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Investor <span className="text-red-500">Grievance</span> Portal
          </h1>
          <p className="text-lg text-white-600 dark:text-white-300 max-w-2xl mx-auto">
            Your concerns are our priority. We're SEBI-committed to resolving complaints within <span className="font-semibold">7 working days</span>.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex justify-between relative">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center z-10 ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step === 4 ? <FaCheckCircle className="text-xl" /> : <span className="font-bold">{step}</span>}
                </div>
                <span className="mt-2 text-sm font-medium">
                  {['Details', 'Complaint', 'Review', 'Submit'][step - 1]}
                </span>
              </motion.div>
            ))}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-1">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep - 1) * 33.33}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
            >
              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaUserTie className="text-blue-500" />
                    Your Information
                  </h2>
                  <div className="space-y-5">
                    {["name", "email", "mobile"].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                          {field === "email" ? "Client ID / Email" : field.replace(/^\w/, c => c.toUpperCase())} *
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                      disabled={!formData.name || !formData.email || !formData.mobile}
                    >
                      Next: Complaint Details
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    Complaint Details
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nature of Complaint *</label>
                      <select
                        name="complaintType"
                        value={formData.complaintType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        <option value="">Select complaint type</option>
                        {complaintTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Resolution</label>
                      <input
                        type="text"
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.complaintType || !formData.description}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      Next: Review
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <FaRegClock className="text-yellow-500" />
                    Review Your Complaint
                  </h2>
                  <div className="space-y-3 text-gray-700 dark:text-gray-200 text-sm">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email / Client ID:</strong> {formData.email}</p>
                    <p><strong>Mobile:</strong> {formData.mobile}</p>
                    <p><strong>Complaint Type:</strong> {formData.complaintType}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    {formData.resolution && (
                      <p><strong>Preferred Resolution:</strong> {formData.resolution}</p>
                    )}
                  </div>
                  <div className="mt-6 flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <input type="checkbox" required className="mr-2 mt-1" />
                    <label>I confirm this complaint is genuine and understand it will be registered as per SEBI compliance.</label>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Submit Complaint
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Loading */}
              {currentStep === 4 && (
                <motion.div className="p-8 text-center">
                  <FaPaperPlane className="text-blue-500 text-4xl mb-4 animate-bounce" />
                  <p className="text-lg text-gray-700 dark:text-white">Submitting your complaint, please wait...</p>
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl text-center p-12">
              <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Complaint Registered Successfully!</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">Grievance ID: <span className="font-mono bg-yellow-100 px-2 py-1 rounded">SEBI-{Math.floor(Math.random()*90000)+10000}</span></p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({ name: '', email: '', mobile: '', complaintType: '', description: '', resolution: '' });
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Another Complaint
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEBI Compliance Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">SEBI Compliance Information</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">Our Commitment:</h3>
              <ul className="space-y-2">
                <li>✓ SEBI Registration No: INH000016719</li>
                <li>✓ All complaints recorded in grievance register</li>
                <li>✓ Annual audit of research and complaints</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Investor Rights:</h3>
              <ul className="space-y-2">
                <li>• Right to escalate to SEBI if unsatisfied</li>
                <li>• Right to transparent resolution process</li>
                <li>• Right to access complaint status anytime</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Complaint;
