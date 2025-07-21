// src/pages/UserLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const allowedEmail = 'wiseglobalresearchservice@gmail.com';

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Initialize EmailJS and AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    emailjs.init('ScyszsjDfNxwKWuxn'); // New EmailJS public key
    console.log('EmailJS initialized with public key: ScyszsjDfNxwKWuxn');
  }, []);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);
    return otp;
  };

  const handleSendOTP = async () => {
    setError('');
    if (email !== allowedEmail) {
      setError('Invalid Email Address.');
      toast.error('Only official email allowed.', { position: 'top-center' });
      console.log('Invalid email entered:', email);
      return;
    }

    const generatedOtp = generateOTP();
    const timestamp = Date.now();

    try {
      // Save OTP to Firebase
      await set(ref(db, 'adminOTP'), {
        email,
        otp: generatedOtp,
        timestamp,
      });
      console.log('OTP saved to Firebase:', { email, otp: generatedOtp, timestamp });

      // Send OTP via EmailJS
      const templateParams = {
        to_email: email,
        otp: generatedOtp,
      };

      const response = await emailjs.send(
        'service_8u6ie54', // Replace with your correct EmailJS service ID
        'template_7n0xtk5', // Replace with your correct EmailJS template ID
        templateParams
      );
      console.log('EmailJS response:', response);

      setOtpSent(true);
      toast.success('OTP sent successfully!', { position: 'top-center' });
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError(`Failed to send OTP: ${err.message}`);
      toast.error(`Failed to send OTP: ${err.message}`, { position: 'top-center' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (email !== allowedEmail) {
      setError('Invalid Email Address.');
      toast.error('Only official email allowed.', { position: 'top-center' });
      console.log('Invalid email entered:', email);
      return;
    }

    try {
      const otpRef = ref(db, 'adminOTP');
      const snapshot = await get(otpRef);
      const data = snapshot.val();
      const currentTime = Date.now();
      const otpAge = currentTime - data?.timestamp;

      console.log('OTP verification data:', { data, otpAge });

      if (
        data &&
        data.email === email &&
        data.otp === otp &&
        otpAge < 300000 // 5-minute expiry
      ) {
        localStorage.setItem('isAuthenticated', 'true');
        toast.success('Login successful!', { position: 'top-center' });
        navigate('/admin/contact-data');
      } else {
        setError('Invalid or expired OTP. Please try again.');
        toast.error('Invalid or expired OTP.', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError(`Login failed: ${error.message}`);
      toast.error(`Login failed: ${error.message}`, { position: 'top-center' });
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-4 custom-box-bg rounded-xl shadow-lg border border-gray-200/20 min-h-screen flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 text-white"
              required
              data-aos="fade-up"
              data-aos-delay="100"
            />
          </div>

          {!otpSent && (
            <motion.button
              type="button"
              onClick={handleSendOTP}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Send OTP
            </motion.button>
          )}

          {otpSent && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300/50 custom-box-bg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                  data-aos="fade-up"
                  data-aos-delay="300"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                Login
              </motion.button>
            </>
          )}

          {error && (
            <p className="text-red-500 text-sm" data-aos="fade-up" data-aos-delay="500">
              {error}
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

export default UserLogin;