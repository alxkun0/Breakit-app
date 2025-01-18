// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "replace_with_real_infos",
  authDomain:  "replace_with_real_infos",
  projectId:  "replace_with_real_infos",
  storageBucket:  "replace_with_real_infos",
  messagingSenderId:  "replace_with_real_infos",
  appId:  "replace_with_real_infos"
};
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const firebase_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { firebase_auth };

