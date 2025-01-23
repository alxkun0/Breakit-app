// Import firebase Functions
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh5LszHZ92P3a96CYm3kd2MBYx-D4QR1E",
  authDomain: "projectbreakit-b1857.firebaseapp.com",
  projectId: "projectbreakit-b1857",
  storageBucket: "projectbreakit-b1857.appspot.com", 
  messagingSenderId: "188070638024",
  appId: "1:188070638024:web:bc3191b336ee8fad5810fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const firebase_auth = initializeAuth(app);

export { firebase_auth };
