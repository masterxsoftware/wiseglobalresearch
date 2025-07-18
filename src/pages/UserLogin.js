// src/pages/UserLogin.js
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners'; // Added spinner

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Add login logic here
    setTimeout(() => setLoading(false), 2000); // Simulate API call
  };

  return (
    <div>
      <h1>User Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? <ClipLoader size={15} color="#fff" /> : 'Login'}
      </button>
    </div>
  );
};

export default UserLogin;