import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyBt64kjW-dmdIwkirMTIa7Iktl5yM-lcK0",
  authDomain: "hallyuapp-2d1bd.firebaseapp.com",
  projectId: "hallyuapp-2d1bd",
  storageBucket: "hallyuapp-2d1bd.firebasestorage.app",
  messagingSenderId: "907387332967",
  appId: "G-379XLJB662"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = firestore();

export { db };