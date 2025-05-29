import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyDsb32-WbtSzpR0RKVqdIclgDhCUK8NazE",
  authDomain: "feedpet-8b4a3.firebaseapp.com",
  databaseURL: "https://feedpet-8b4a3-default-rtdb.firebaseio.com/", // Make sure to include this for Realtime Database
  projectId: "feedpet-8b4a3",
  storageBucket: "feedpet-8b4a3.firebasestorage.app",
  messagingSenderId: "991082678154",
  appId: "1:991082678154:web:bc6578392339dad22faa73"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);