// src/pages/ContactData.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function ContactData() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ⛔ Redirect if not authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/user-login');
    }
  }, [navigate]);

  // 💤 Auto logout on inactivity after 5 min
  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alert("⏳ Session expired due to inactivity.");
        localStorage.removeItem('isAuthenticated');
        navigate('/user-login');
      }, 5 * 60 * 1000);
    };

    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [navigate]);

  // 🗂️ Fetch contact data
  useEffect(() => {
    const contactsRef = ref(db, 'contacts');
    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      const formatted = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setContacts(formatted.reverse());
      setLoading(false);
    });
  }, []);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📋 Contact Entries</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactData;
