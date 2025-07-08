// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyACJa62nWU5GO21Rg630DVz0rQ7G-q8G0A",
  authDomain: "wise-global-app.firebaseapp.com",
  databaseURL: "https://wise-global-app-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ Correct URL
  projectId: "wise-global-app",
  storageBucket: "wise-global-app.appspot.com",
  messagingSenderId: "235627289554",
  appId: "1:235627289554:web:2c992df2d0360dfe3d460b",
  measurementId: "G-LRB9WJQJ3Y"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
