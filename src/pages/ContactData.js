// src/pages/ContactData.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ContactData() {
  const navigate = useNavigate();

  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (!isAuthenticated) {
    navigate('/user-login');
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/user-login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Contact Entries</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="p-3 text-center">
              No entries to display.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactData;