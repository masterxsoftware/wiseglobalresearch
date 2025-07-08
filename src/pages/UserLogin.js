// src/pages/UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

function UserLogin() {
  const [mobile, setMobile] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [sentOTP, setSentOTP] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const adminMobile = '7879946775';

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendEmailOTP = (otp) => {
    const templateParams = {
      to_email: 'durgeshrathor05@gmail.com',
      otp: otp,
    };

    emailjs.send(
      'your_service_id',     // 🔁 Replace this
      'your_template_id',    // 🔁 Replace this
      templateParams,
      'your_public_key'      // 🔁 Replace this
    )
    .then(() => {
      alert('✅ OTP sent to durgeshrathor05@gmail.com');
    })
    .catch((err) => {
      console.error('❌ Email send error:', err);
      alert('❌ Email sending failed. Check console.');
    });
  };

  const handleSendOTP = async () => {
    if (mobile !== adminMobile) {
      setError('❌ Unauthorized mobile number.');
      return;
    }

    const otp = generateOTP();
    setSentOTP(otp);
    setStep(2);
    setError('');

    await set(ref(db, 'adminOTP'), {
      mobile,
      otp,
      timestamp: Date.now()
    });

    sendEmailOTP(otp);
  };

  const handleVerifyOTP = () => {
    if (enteredOTP === sentOTP) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/contact-data');
    } else {
      setError('❌ Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h1>

        {step === 1 && (
          <>
            <label className="block text-gray-700 mb-2">Enter Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 border rounded mb-4"
              placeholder="Enter admin mobile number"
            />
            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
            <button
              onClick={handleSendOTP}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-gray-700 mb-2">Enter OTP</label>
            <input
              type="text"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
              className="w-full p-3 border rounded mb-4"
              placeholder="Enter 6-digit OTP"
            />
            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
