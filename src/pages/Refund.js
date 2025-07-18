// src/pages/Refund.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaInfoCircle, FaGavel, FaExclamationTriangle } from 'react-icons/fa';

// Animation variants for smooth transitions
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

function Refund() {
  return (
    <motion.div
      className="container mx-auto py-12 px-4"
      style={{ backgroundColor: 'transparent' }}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        variants={fadeIn}
      >
        Refund Policy
      </motion.h1>

      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={staggerContainer}
      >
        {/* Section 1: General Policy */}
        <motion.section variants={fadeIn}>
          <p className="text-base leading-relaxed mb-4">
            Wise Global Research Services Pvt Ltd. we value our clients and are perpetrated to providing unsurpassed services. While we take our accuracy seriously, our clients also need to realize that we do not offer a 100% covenant on our recommendation. Once a service has been subscribed to and payment has been made for the same, the client will start receiving the Recommendation that they asked for. If for some unforeseen reason, the client is not satisfied with our services, they may contact us to seek oversight on future Recommendations.
          </p>
          <p className="text-base leading-relaxed">
            We at Wise Global Research Services Pvt Ltd. . Will put our best effort to increase the satisfaction levels in such cases. However, in the unlikely event that if the client is not able to receive SMS on the number provided by the client because of the client’s DND status. If the records from our SMS service provider indicate that service SMS were sent to the number that the client provided, we will deem that as delivery of service from our end and will not entertain a request for a refund based on non-delivery of SMS. We advise our clients to deregister from DND either before making a payment or as soon as the service is started.
          </p>
        </motion.section>

        {/* Section 2: Sales and Dissatisfaction */}
        <motion.section variants={fadeIn} className="p-6 rounded-lg bg-yellow-100 bg-opacity-50 border-l-4 border-yellow-500">
           <div className="flex items-center mb-2">
            <FaExclamationTriangle className="text-yellow-600 mr-3 text-xl" />
            <h2 className="text-2xl font-semibold">Finality of Sales</h2>
          </div>
          <p className="text-base leading-relaxed">
            All sales are final, and we do not offer refunds for the paid period of services already availed by the client. Complaints or dissatisfaction regarding the quality of services during the paid period shall not entitle the client to any refund or compensation.
          </p>
        </motion.section>
        
        {/* Section 3: SEBI Guidelines */}
        <motion.section variants={fadeIn}>
          <div className="flex items-center mb-2">
            <FaGavel className="mr-3 text-xl" />
            <h2 className="text-2xl font-semibold">SEBI Guidelines for Cancellation</h2>
          </div>
          <p className="text-base leading-relaxed">
            As per SEBI guidelines, if a client requests to cancel the subscription, a refund shall only be issued for the unused portion of the subscription period. The refund will be calculated on a pro-rata basis, deducting the charges for the services already availed, including applicable taxes and administrative fees.
          </p>
          <p className="text-base leading-relaxed mt-4">
            Refunds will not be provided for the period of services already availed, irrespective of the client’s satisfaction with the recommendations or the outcome of trades.
          </p>
        </motion.section>

        {/* Section 4: Market Risks & User Acknowledgement */}
        <motion.section variants={fadeIn} className="p-6 rounded-lg bg-blue-100 bg-opacity-50 border-l-4 border-blue-500">
          <div className="flex items-center mb-2">
            <FaInfoCircle className="text-blue-600 mr-3 text-xl" />
            <h2 className="text-2xl font-semibold">Agreement & Acknowledgement</h2>
          </div>
          <p className="text-base leading-relaxed mb-2">
            Investment in securities markets are subject to market risks. Profits and losses incurred due to the use of our recommendations are solely the responsibility of the client.
          </p>
          <p className="text-base leading-relaxed">
            By subscribing to our services and making payment, the client acknowledges that they have read, understood, and agreed to the refund policy, as well as the disclaimer, disclosure, and other terms mentioned on our website.
          </p>
        </motion.section>

        {/* Section 5: Contact Information */}
        <motion.section variants={fadeIn} className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact for Assistance</h2>
          <p className="text-base leading-relaxed mb-4">
            For any questions or assistance regarding our refund policy, please contact us at:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-green-500" />
              <a href="tel:919977909494" className="hover:underline">91-9977909494</a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-red-500" />
              <a href="mailto:support@wiseglobalresearch.com" className="hover:underline">support@wiseglobalresearch.com</a>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}

export default Refund;
