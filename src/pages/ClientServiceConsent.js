import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  FaUser, FaUserTie, FaIdCard, FaEnvelope, FaCalendarAlt,
  FaAddressCard, FaRegAddressCard, FaArrowRight, FaUpload, FaFilePdf, FaFileImage, FaTimesCircle
} from 'react-icons/fa';
import { ref, push, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase';
import { Link } from 'react-router-dom';

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

const ClientServiceConsent = () => { // Corrected component name
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
    const consentFormRef = push(ref(db, 'clientServiceConsentForms'));
    const submissionId = consentFormRef.key;

    try {
      const uploadFile = async (file, fieldName) => {
        if (!file) return { downloadURL: '', storagePath: '' };
        const filePath = `client-consents/${submissionId}/${fieldName}-${file.name}`;
        const fileStorageRef = storageRef(storage, filePath);
        await uploadBytes(fileStorageRef, file);
        const downloadURL = await getDownloadURL(fileStorageRef);
        return { downloadURL, storagePath: filePath };
      };

      const [panUpload, aadhaarUpload, signatureUpload] = await Promise.all([
        uploadFile(panFile, 'pan'),
        uploadFile(aadhaarFile, 'aadhaar'),
        uploadFile(signatureFile, 'signature'),
      ]);

      const submissionData = {
        ...data,
        panCard: panUpload,
        aadhaarCard: aadhaarUpload,
        signature: signatureUpload,
        timestamp: new Date().toISOString(),
      };

      await set(consentFormRef, submissionData);
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
    <motion.div variants={itemVariants} className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/70 text-xl">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          placeholder={`Enter your ${label.replace('*', '').toLowerCase()}`}
          className={`w-full pl-11 pr-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            errors[id] ? 'border-red-500 ring-red-500/50' : 'border-gray-300/50'
          }`}
        />
      </div>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
      {errors[id] && (
        <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>
      )}
    </motion.div>
  );

  const renderFileInput = (id, label, icon, setFile, file, accept) => (
    <motion.div variants={itemVariants} className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${errors[id] ? 'border-red-500' : 'border-gray-300/50 hover:border-blue-500'}`}>
        <input
            id={id}
            type="file"
            accept={accept}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            {...register(id, {
              required: file ? false : `${label.replace('*', '')} is required`,
              validate: {
                fileSize: (fileList) => !fileList[0] || fileList[0].size <= 5000000 || 'File size must be less than 5MB',
                fileType: (fileList) => {
                  if (!fileList[0]) return true;
                  const validTypes = accept.split(',');
                  return validTypes.some(type => fileList[0].type.includes(type.trim())) || 'Invalid file type. Accepted: PDF, JPG, PNG';
                }
              }
            })}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
        {!file ? (
          <div className="flex flex-col items-center justify-center text-white/70">
            {icon}
            <p className="mt-2 text-sm">Click or drag file to upload</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              {file.type.includes('pdf') ? <FaFilePdf className="text-red-400 text-2xl" /> : <FaFileImage className="text-blue-400 text-2xl" />}
              <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-400 transition-colors"
              aria-label="Remove file"
            >
              <FaTimesCircle size={20} />
            </button>
          </div>
        )}
      </div>
      {errors[id] && (
        <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>
      )}
    </motion.div>
  );

  return (
    // Removed min-h-screen, padding, and text-white for consistency
    <div className="py-12">
       <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-sm mb-8" variants={itemVariants}>
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400">Client Service Consent</span>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Client Service Consent
            </h2>
            <p className="mt-2 text-gray-300">
              Please fill out the form below and upload required documents.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={containerVariants} className="p-6 rounded-lg bg-white/5 border border-white/10">
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
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-6">
                Document Uploads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderFileInput(
                'panFile',
                'PAN Card Upload*',
                <FaUpload size={24} />,
                setPanFile,
                panFile,
                'image/jpeg,image/png,application/pdf'
              )}
              {renderFileInput(
                'aadhaarFile',
                'Aadhaar Card Upload*',
                <FaUpload size={24} />,
                setAadhaarFile,
                aadhaarFile,
                'image/jpeg,image/png,application/pdf'
              )}
              {renderFileInput(
                'signatureFile',
                'Signature Upload*',
                <FaUpload size={24} />,
                setSignatureFile,
                signatureFile,
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
                className={`w-full px-4 py-3 rounded-lg border custom-box-bg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.address ? 'border-red-500' : 'border-gray-300/50'
                }`}
              ></textarea>
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full shine-hover py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300"
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