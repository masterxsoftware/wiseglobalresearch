import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';
import { toast } from 'react-toastify';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const mobile = localStorage.getItem('adminMobile');

  useEffect(() => {
    if (!mobile) navigate('/user-login');
  }, [mobile, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpRef = ref(db, `adminOTP/${mobile}`);
    const snapshot = await get(otpRef);
    const data = snapshot.val();

    if (!data) return toast.error('❌ No OTP found. Try again.');

    const isValid = data.otp === otp;
    const expired = Date.now() - data.timestamp > 5 * 60 * 1000;

    if (expired) return toast.error('⏰ OTP expired');
    if (!isValid) return toast.error('❌ Incorrect OTP');

    localStorage.setItem('adminLoggedIn', 'true');
    navigate('/admin/contact-data');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleVerify} className="bg-white/10 p-6 rounded-lg backdrop-blur w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <input
          type="text"
          maxLength="6"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-transparent border border-white placeholder-white"
          required
        />
        <button className="w-full bg-green-500 py-2 rounded font-bold hover:bg-green-600">Verify</button>
      </form>
    </div>
  );
}

export default VerifyOTP;
