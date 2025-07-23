// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Added for Storage
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBF6R7PHX5jqq6akFvrSv0PTYLQeK5WXEw",
  authDomain: "wise-global-services.firebaseapp.com",
  databaseURL: "https://wise-global-services-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wise-global-services",
  storageBucket: "wise-global-services.appspot.com",
  messagingSenderId: "652409987561",
  appId: "1:652409987561:web:021698456d33c163b6ab78",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app); // Added storage export