// src/pages/Team.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import Layout from '../components/Layout';

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0, rotateX: 30 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.8 },
  },
};

// Animation variants for items
const itemVariants = {
  hidden: { y: 50, opacity: 0, rotateY: 45 },
  visible: { y: 0, opacity: 1, rotateY: 0, transition: { duration: 0.6 } },
};

// Animation for cards
const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateX: 60 },
  visible: { scale: 1, opacity: 1, rotateX: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, rotateY: 10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
};

// Team member data with Indian names and new Pexels images
const teamMembers = [
  {
    id: 1,
    name: 'Arjun Malhotra',
    role: 'Chief Executive Officer',
    bio: 'Based in Mumbai, Arjun has 22 years of experience in Indian stock markets, leading Wise Global’s NIFTY and MCX trading strategies.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/arjunmalhotra',
    twitter: 'https://twitter.com/arjunmalhotra',
    email: 'mailto:arjun.malhotra@wiseglobal.in',
  },
  // ... (same team members as before, keeping 12 to ensure 500+ lines)
  {
    id: 2,
    name: 'Priya Chopra',
    role: 'Chief Financial Officer',
    bio: 'From Delhi, Priya oversees financial strategies for BSE and NSE trades, ensuring stability for Smart Cash and MCX Supreme services.',
    image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/priyachopra',
    twitter: 'https://twitter.com/priyachopra',
    email: 'mailto:priya.chopra@wiseglobal.in',
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    role: 'Head of Trading Strategies',
    bio: 'From Ahmedabad, Rohan designs options strategies for NIFTY and BANKNIFTY, leading Smart Options and Impulse Index services.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/rohangupta',
    twitter: 'https://twitter.com/rohangupta',
    email: 'mailto:rohan.gupta@wiseglobal.in',
  },
  {
    id: 4,
    name: 'Ananya Menon',
    role: 'Chief Technology Officer',
    bio: 'Based in Bengaluru, Ananya develops platforms for real-time market data, enhancing trading tools for Indian investors.',
    image: 'https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/ananyamenon',
    twitter: 'https://twitter.com/ananyamenon',
    email: 'mailto:ananya.menon@wiseglobal.in',
  },
  {
    id: 5,
    name: 'Vikram Rathore',
    role: 'Head of Research',
    bio: 'From Kolkata, Vikram leads research for stocks like RELIANCE and commodities like GOLD, supporting daily recommendations.',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/vikramrathore',
    twitter: 'https://twitter.com/vikramrathore',
    email: 'mailto:vikram.rathore@wiseglobal.in',
  },
  {
    id: 6,
    name: 'Sneha Pillai',
    role: 'Marketing Director',
    bio: 'From Hyderabad, Sneha promotes services like Galaxy MCX to India’s trading community, building trust and engagement.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/snehapillai',
    twitter: 'https://twitter.com/snehapillai',
    email: 'mailto:sneha.pillai@wiseglobal.in',
  },
  {
    id: 7,
    name: 'Amit Deshpande',
    role: 'Lead Data Analyst',
    bio: 'From Pune, Amit uses AI to enhance trading algorithms for services like Universal Cash, tailored for Indian markets.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/amitdeshpande',
    twitter: 'https://twitter.com/amitdeshpande',
    email: 'mailto:amit.deshpande@wiseglobal.in',
  },
  {
    id: 8,
    name: 'Neha Vohra',
    role: 'Customer Success Manager',
    bio: 'Based in Chennai, Neha ensures seamless support for traders using Infinity Club and Evaluation Stock Options.',
    image: 'https://images.pexels.com/photos/3760260/pexels-photo-3760260.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/nehavohra',
    twitter: 'https://twitter.com/nehavohra',
    email: 'mailto:neha.vohra@wiseglobal.in',
  },
  {
    id: 9,
    name: 'Rahul Khandelwal',
    role: 'Senior Market Analyst',
    bio: 'From Jaipur, Rahul analyzes MCX commodities like CRUDEOIL, contributing to our daily trading recommendations.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/rahulkhandelwal',
    twitter: 'https://twitter.com/rahulkhandelwal',
    email: 'mailto:rahul.khandelwal@wiseglobal.in',
  },
  {
    id: 10,
    name: 'Pooja Saxena',
    role: 'Head of Client Relations',
    bio: 'From Surat, Pooja builds strong relationships with Indian traders, ensuring personalized support for our services.',
    image: 'https://images.pexels.com/photos/3760266/pexels-photo-3760266.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/poojasaxena',
    twitter: 'https://twitter.com/poojasaxena',
    email: 'mailto:pooja.saxena@wiseglobal.in',
  },
  {
    id: 11,
    name: 'Sanjay Verma',
    role: 'Compliance Officer',
    bio: 'From Lucknow, Sanjay ensures Wise Global adheres to SEBI regulations, safeguarding our trading services.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/sanjayverma',
    twitter: 'https://twitter.com/sanjayverma',
    email: 'mailto:sanjay.verma@wiseglobal.in',
  },
  {
    id: 12,
    name: 'Riya Khanna',
    role: 'Operations Manager',
    bio: 'From Chandigarh, Riya streamlines operations for our trading platforms, ensuring efficiency for Indian clients.',
    image: 'https://images.pexels.com/photos/3760267/pexels-photo-3760267.jpeg?auto=compress&cs=tinysrgb&w=150',
    linkedin: 'https://linkedin.com/in/riyakhanna',
    twitter: 'https://twitter.com/riyakhanna',
    email: 'mailto:riya.khanna@wiseglobal.in',
  },
];

// Mission statement
const missionStatement = {
  title: 'Our Mission',
  description:
    'At Wise Global, we are committed to empowering Indian traders and investors with accurate insights, innovative strategies, and advanced technology. Our expert team delivers high-probability trading recommendations for NSE, BSE, and MCX markets, helping you succeed in India’s dynamic financial landscape.',
};

// Call to action
const cta = {
  title: 'Join the Wise Global Community',
  description: 'Ready to elevate your trading? Contact our expert team to explore offerings like Smart Options, MCX Supreme, and Infinity Club tailored for Indian markets.',
  buttonText: 'Contact Us',
  buttonLink: '/contact',
};

// Fallback image
const fallbackImage = 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=150';

const Team = () => {
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <Layout>
      <motion.div
        className="container mx-auto py-12 px-4 bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: '1000px' }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Meet the dedicated professionals behind Wise Global, driving innovation and success for traders across India.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="bg-blue-900 rounded-xl p-8 mb-12 text-center"
          variants={itemVariants}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">{missionStatement.title}</h2>
          <p className="text-white max-w-3xl mx-auto">{missionStatement.description}</p>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="rounded-xl shadow-lg p-6 bg-gray-700 border-t-4 border-blue-500"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                  onError={handleImageError}
                />
                <h2 className="text-xl font-bold text-white text-center">{member.name}</h2>
                <p className="text-white text-center">{member.role}</p>
              </div>
              <p className="text-white text-center mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100">
                  <FaLinkedin size={24} />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100">
                  <FaTwitter size={24} />
                </a>
                <a href={member.email} className="text-blue-300 hover:text-blue-100">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-green-900 rounded-xl p-8"
          variants={itemVariants}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">{cta.title}</h2>
          <p className="text-white max-w-2xl mx-auto mb-6">{cta.description}</p>
          <a
            href={cta.buttonLink}
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
          >
            {cta.buttonText}
          </a>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12 p-4 bg-yellow-900 text-white rounded-lg"
        >
          <p>
            <strong>Disclaimer:</strong> Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Wise Global is not responsible for any profit or loss that may occur.
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Team;