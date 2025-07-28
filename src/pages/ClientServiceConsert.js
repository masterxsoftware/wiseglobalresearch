import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  FaUser, FaUserTie, FaIdCard, FaEnvelope, FaCalendarAlt,
  FaAddressCard, FaRegAddressCard, FaArrowRight, FaUpload
} from 'react-icons/fa';
import { ref, push } from 'firebase/database'; // Removed storage imports
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

// Helper function to convert file to Base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ClientServiceConsent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Convert files to Base64 strings
      const panDataUrl = panFile ? await fileToBase64(panFile) : '';
      const aadhaarDataUrl = aadhaarFile ? await fileToBase64(aadhaarFile) : '';
      const signatureDataUrl = signatureFile ? await fileToBase64(signatureFile) : '';

      const submissionData = {
        ...data,
        panDataUrl,
        aadhaarDataUrl,
        signatureDataUrl,
        timestamp: new Date().toISOString(),
      };

      await push(ref(db, 'clientServiceConsentForms'), submissionData);
      toast.success('Consent form submitted successfully!', {
        position: 'top-center',
      });
      reset();
      setPanFile(null);
      setAadhaarFile(null);
      setSignatureFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to submit form: ${error.message}`, {
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (id, label, icon, type = 'text', validation, note) => (
    <motion.div variants={itemVariants}>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-xl">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          placeholder={`Enter ${label.replace('*', '')}`}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors[id] ? 'border-red-500' : 'border-gray-300/50'
          }`}
        />
      </div>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
      {errors[id] && (
        <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>
      )}
    </motion.div>
  );

  const renderFileInput = (id, label, icon, setFile, accept) => (
    <motion.div variants={itemVariants}>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-xl">
          {icon}
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          {...register(id, {
            required: `${label.replace('*', '')} is required`,
            validate: {
              fileSize: (fileList) => fileList[0]?.size <= 5000000 || 'File size must be less than 5MB',
              fileType: (fileList) => {
                if (!fileList[0]) return 'No file selected';
                const validTypes = accept.split(',');
                return validTypes.some(type => fileList[0].type.includes(type.trim())) || 'Invalid file type';
              }
            }
          })}
          onChange={(e) => {
            if (e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 ${
            errors[id] ? 'border-red-500' : 'border-blue-500/50'
          }`}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
      {errors[id] && (
        <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-sm mb-8" variants={itemVariants}>
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400">Client Service Consent Form</span>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Client Service Consent Form
            </h2>
            <p className="mt-2 text-gray-300">
              Please fill out the form below and upload required documents.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-6">
              Client Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput(
                'clientName',
                'Client Name*',
                <FaUser />,
                'text',
                { 
                  required: 'Client name is required',
                  minLength: { value: 2, message: 'Client name must be at least 2 characters' }
                }
              )}
              {renderInput(
                'fatherName',
                "Father's Name*",
                <FaUserTie />,
                'text',
                { 
                  required: "Father's name is required",
                  minLength: { value: 2, message: "Father's name must be at least 2 characters" }
                }
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput(
                'clientId',
                'Client ID*',
                <FaIdCard />,
                'text',
                { 
                  required: 'Client ID is required',
                  pattern: {
                    value: /^[A-Za-z0-9]{4,}$/,
                    message: 'Client ID must be alphanumeric and at least 4 characters'
                  }
                },
                'Ask your representative for the client ID.'
              )}
              {renderInput(
                'email',
                'Email ID*',
                <FaEnvelope />,
                'email',
                {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput(
                'dob',
                'Date Of Birth*',
                <FaCalendarAlt />,
                'date',
                { 
                  required: 'Date of birth is required',
                  validate: {
                    pastDate: (value) => {
                      const today = new Date();
                      const inputDate = new Date(value);
                      return inputDate < today || 'Date of birth must be in the past';
                    }
                  }
                }
              )}
              {renderInput(
                'pan',
                'PAN*',
                <FaAddressCard />,
                'text',
                {
                  required: 'PAN is required',
                  pattern: {
                    value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
                    message: 'Invalid PAN format',
                  },
                  minLength: { value: 10, message: 'PAN must be 10 characters' },
                  maxLength: { value: 10, message: 'PAN must be 10 characters' },
                }
              )}
            </div>

            {renderInput(
              'aadhaar',
              'Aadhaar*',
              <FaRegAddressCard />,
              'text',
              {
                required: 'Aadhaar is required',
                pattern: {
                  value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
                  message: 'Invalid Aadhaar format',
                },
                minLength: { value: 12, message: 'Aadhaar must be 12 digits' },
                maxLength: { value: 12, message: 'Aadhaar must be 12 digits' },
              }
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderFileInput(
                'panFile',
                'PAN Card Upload*',
                <FaUpload />,
                setPanFile,
                'image/jpeg,image/png,application/pdf'
              )}
              {renderFileInput(
                'aadhaarFile',
                'Aadhaar Card Upload*',
                <FaUpload />,
                setAadhaarFile,
                'image/jpeg,image/png,application/pdf'
              )}
              {renderFileInput(
                'signatureFile',
                'Signature Upload*',
                <FaUpload />,
                setSignatureFile,
                'image/jpeg,image/png,application/pdf'
              )}
            </div>

            <motion.div variants={itemVariants}>
              <label htmlFor="address" className="block text-sm font-medium text-white mb-2">
                Address*
              </label>
              <textarea
                id="address"
                {...register('address', { 
                  required: 'Address is required',
                  minLength: { value: 10, message: 'Address must be at least 10 characters' }
                })}
                rows="4"
                placeholder="Enter Full Address"
                className={`w-full px-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300/50'
                }`}
              ></textarea>
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full shine-hover py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                {!isSubmitting && <FaArrowRight className="inline ml-2" />}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientServiceConsent;