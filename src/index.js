import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom'; // ✅ Yeh zaroori hai
import './index.css'; // ✅ CSS import agar use ho rahi ho

// 🟡 Buffer polyfill (agar crypto use kar raha ho to)
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// 🟢 React app render with HashRouter
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
