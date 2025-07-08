// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminLoggedIn');
  return isAuthenticated ? children : <Navigate to="/user-login" />;
};

export default ProtectedAdminRoute;
