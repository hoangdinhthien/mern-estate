// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-3a8a3.firebaseapp.com',
  projectId: 'mern-estate-3a8a3',
  storageBucket: 'mern-estate-3a8a3.appspot.com',
  messagingSenderId: '497076387134',
  appId: '1:497076387134:web:04bd9c42e231690907c06f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
