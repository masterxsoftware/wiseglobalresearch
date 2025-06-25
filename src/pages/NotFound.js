// pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline">Go to Home</Link>
    </div>
  );
}

export default NotFound;
