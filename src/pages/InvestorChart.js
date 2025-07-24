import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaEnvelope, FaComment, FaArrowRight } from 'react-icons/fa';
import { ref, push, onValue } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.7, ease: 'easeOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const InvestorCharter = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch real-time feedback from Firebase
  useEffect(() => {
    const feedbackRef = ref(db, 'investorCharterFeedback');
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbackArray = Object.entries(data).map(([id, feedback]) => ({
          id,
          ...feedback
        }));
        setFeedbacks(feedbackArray);
      } else {
        setFeedbacks([]);
      }
    }, (error) => {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to fetch feedback', { position: 'top-center' });
    });

    return () => unsubscribe();
  }, []);

  // Handle feedback form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...data,
        timestamp: new Date().toISOString()
      };
      await push(ref(db, 'investorCharterFeedback'), submissionData);
      toast.success('Feedback submitted successfully!', { position: 'top-center' });
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error(`Failed to submit feedback: ${error.message}`, { position: 'top-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render input field
  const renderInput = (id, label, icon, type = 'text', validation) => (
    <motion.div variants={itemVariants}>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-xl">{icon}</span>
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          placeholder={`Enter ${label.replace('*', '')}`}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[id] ? 'border-red-500' : 'border-gray-300/50'}`}
        />
      </div>
      {errors[id] && <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>}
    </motion.div>
  );

  // Render textarea with FaComment icon
  const renderTextarea = (id, label, icon, validation) => (
    <motion.div variants={itemVariants}>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 text-white text-xl">{icon}</span>
        <textarea
          id={id}
          {...register(id, validation)}
          rows="4"
          placeholder={`Enter ${label.replace('*', '')}`}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[id] ? 'border-red-500' : 'border-gray-300/50'}`}
        ></textarea>
      </div>
      {errors[id] && <p className="text-red-400 text-xs mt-1">{errors[id].message}</p>}
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Breadcrumb */}
        <motion.div className="text-sm mb-8" variants={itemVariants}>
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400">Investor Charter</span>
        </motion.div>

        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Investor Charter
          </h2>
          <p className="mt-2 text-gray-300">In Respect of Research Analysts (RAs)</p>
        </motion.div>

        {/* Section A: Vision and Mission */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">A. Vision and Mission Statements for Investors</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-400">Vision</h4>
              <p className="text-gray-300">Invest with knowledge & safety.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Mission</h4>
              <p className="text-gray-300">Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.</p>
            </div>
          </div>
        </motion.div>

        {/* Section B: Business Transacted */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">B. Details of Business Transacted by the Research Analyst with Respect to the Investors</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>To publish research report based on the research activities of the RA.</li>
            <li>To provide an independent unbiased view on securities.</li>
            <li>To offer unbiased recommendation, disclosing the financial interests in recommended securities.</li>
            <li>To provide research recommendation, based on analysis of publicly available information and known observations.</li>
            <li>To conduct audit annually.</li>
            <li>To ensure that all advertisements are in adherence to the provisions of the Advertisement Code for Research Analysts.</li>
            <li>To maintain records of interactions, with all clients including prospective clients (prior to onboarding), where any conversation related to the research services has taken place.</li>
          </ul>
        </motion.div>

        {/* Section C: Services Provided */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">C. Details of Services Provided to Investors (No Indicative Timelines)</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-400">Onboarding of Clients</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Sharing of terms and conditions of research services.</li>
                <li>Completing KYC of fee-paying clients.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Disclosure to Clients</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>To disclose information that is material for the client to make an informed decision, including details of its business activity, disciplinary history, the terms and conditions of research services, details of associates, risks and conflicts of interest, if any.</li>
                <li>To disclose the extent of use of Artificial Intelligence tools in providing research services.</li>
                <li>To disclose, while distributing a third-party research report, any material conflict of interest of such third-party research provider or provide web address that directs a recipient to the relevant disclosures.</li>
                <li>To disclose any conflict of interest of the activities of providing research services with other activities of the research analyst.</li>
              </ul>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>To distribute research reports and recommendations to the clients without discrimination.</li>
              <li>To maintain confidentiality w.r.t publication of the research report until made available in the public domain.</li>
              <li>To respect data privacy rights of clients and take measures to protect unauthorized use of their confidential information.</li>
              <li>To disclose the timelines for the services provided by the research analyst to clients and ensure adherence to the said timelines.</li>
              <li>To provide clear guidance and adequate caution notice to clients when providing recommendations for dealing in complex and high-risk financial products/services.</li>
              <li>To treat all clients with honesty and integrity.</li>
              <li>To ensure confidentiality of information shared by clients unless such information is required to be provided in furtherance of discharging legal obligations or a client has provided specific consent to share such information.</li>
            </ul>
          </div>
        </motion.div>

        {/* Section D: Grievance Redressal Mechanism */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">D. Details of Grievance Redressal Mechanism and How to Access It</h3>
          <div className="space-y-4">
            <p className="text-gray-300">1. Investor can lodge complaint/grievance against Research Analyst in the following ways:</p>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Mode of Filing the Complaint with Research Analyst</h4>
              <p className="text-gray-300">In case of any grievance/complaint, an investor may approach the concerned Research Analyst who shall strive to redress the grievance immediately, but not later than 21 days of the receipt of the grievance.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Mode of Filing the Complaint on SCORES or with Research Analyst Administration and Supervisory Body (RAASB)</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>SCORES 2.0 (a web-based centralized grievance redressal system of SEBI for facilitating effective grievance redressal in time-bound manner) (<a href="https://scores.sebi.gov.in" className="text-blue-400 hover:underline">https://scores.sebi.gov.in</a>)</li>
                <li>Two-level review for complaint/grievance against Research Analyst:
                  <ul className="list-circle list-inside ml-4">
                    <li>First review done by designated body (RAASB)</li>
                    <li>Second review done by SEBI</li>
                  </ul>
                </li>
                <li>Email to designated email ID of RAASB</li>
              </ul>
            </div>
            <p className="text-gray-300">2. If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor has the option to file the complaint/grievance on SMARTODR platform for its resolution through online conciliation or arbitration.</p>
            <p className="text-gray-300">With regard to physical complaints, investors may send their complaints to:</p>
            <p className="text-gray-300 font-medium">
              Office of Investor Assistance and Education, Securities and Exchange Board of India, SEBI Bhavan, Plot No.C4-A, ‘G’ Block, Bandra – Kurla Complex, Bandra (E), Mumbai-400051
            </p>
          </div>
        </motion.div>

        {/* Section E: Rights of Investors */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">E. Rights of Investors</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Right to Privacy and Confidentiality</li>
            <li>Right to Transparent Practices</li>
            <li>Right to Fair and Equitable Treatment</li>
            <li>Right to Adequate Information</li>
            <li>Right to Initial and Continuing Disclosure</li>
            <li>Right to receive information about all the statutory and regulatory disclosures</li>
            <li>Right to Fair & True Advertisement</li>
            <li>Right to Awareness about Service Parameters and Turnaround Times</li>
            <li>Right to be informed of the timelines for each service</li>
            <li>Right to be Heard and Satisfactory Grievance Redressal</li>
            <li>Right to have timely redressal</li>
            <li>Right to Exit from Financial product or service in accordance with the terms and conditions agreed with the research analyst</li>
            <li>Right to receive clear guidance and caution notice when dealing in Complex and High-Risk Financial Products and Services</li>
            <li>Additional Rights to vulnerable consumers
              <ul className="list-circle list-inside ml-4">
                <li>Right to get access to services in a suitable manner even if differently abled</li>
              </ul>
            </li>
            <li>Right to provide feedback on the financial products and services used</li>
            <li>Right against coercive, unfair, and one-sided clauses in financial agreements</li>
          </ul>
        </motion.div>

        {/* Section F: Expectations from Investors */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">F. Expectations from the Investors (Responsibilities of Investors)</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-400">Do’s</h4>
              <ul className="list-decimal list-inside text-gray-300 space-y-2">
                <li>Always deal with SEBI registered Research Analyst.</li>
                <li>Ensure that the Research Analyst has a valid registration certificate.</li>
                <li>Check for SEBI registration number.</li>
                <li>Please refer to the list of all SEBI registered Research Analyst which is available on SEBI website in the following link: <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14" className="text-blue-400 hover:underline">https://www.sebi.gov.in</a></li>
                <li>Always pay attention towards disclosures made in the research reports before investing.</li>
                <li>Pay your Research Analyst through banking channels only and maintain duly signed receipts mentioning the details of your payments. You may make payment of fees through Centralized Fee Collection Mechanism (CeFCoM) of RAASB if research analyst has opted for the mechanism. (Applicable for fee-paying clients only)</li>
                <li>Before buying/selling securities or applying in public offer, check for the research recommendation provided by your Research Analyst.</li>
                <li>Ask all relevant questions and clear your doubts with your Research Analyst before acting on recommendation.</li>
                <li>Seek clarifications and guidance on research recommendations from your Research Analyst, especially if it involves complex and high-risk financial products and services.</li>
                <li>Always be aware that you have the right to stop availing the service of a Research Analyst as per the terms of service agreed between you and your Research Analyst.</li>
                <li>Always be aware that you have the right to provide feedback to your Research Analyst in respect of the services received.</li>
                <li>Always be aware that you will not be bound by any clause, prescribed by the research analyst, which is contravening any regulatory provisions.</li>
                <li>Inform SEBI about Research Analyst offering assured or guaranteed returns.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Don’ts</h4>
              <ul className="list-decimal list-inside text-gray-300 space-y-2">
                <li>Do not provide funds for investment to the Research Analyst.</li>
                <li>Don’t fall prey to luring advertisements or market rumors.</li>
                <li>Do not get attracted to limited period discount or other incentive, gifts, etc. offered by Research Analyst.</li>
                <li>Do not share login credential and password of your trading, demat or bank accounts with the Research Analyst.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">Submit Feedback or Complaint</h3>
          <p className="text-gray-300 mb-4">Provide your feedback or lodge a complaint regarding the Research Analyst services.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('email', 'Email ID*', <FaEnvelope />, 'email', {
                required: 'Email is required',
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
              })}
            </div>
            {renderTextarea('feedback', 'Feedback/Complaint*', <FaComment />, {
              required: 'Feedback is required',
              minLength: { value: 10, message: 'Feedback must be at least 10 characters' }
            })}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                {!isSubmitting && <FaArrowRight className="inline ml-2" />}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Real-Time Feedback Display */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">Recent Feedback</h3>
          {feedbacks.length === 0 ? (
            <p className="text-gray-300">No feedback submitted yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {feedbacks.map((feedback) => (
                <motion.div key={feedback.id} className="p-4 bg-gray-800/50 rounded-lg" variants={itemVariants}>
                  <p><strong>Email:</strong> {feedback.email}</p>
                  <p><strong>Feedback:</strong> {feedback.feedback}</p>
                  <p><strong>Timestamp:</strong> {new Date(feedback.timestamp).toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InvestorCharter;