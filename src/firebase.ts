import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAswvRFIU9_EzC1H0QX5TXZCO2pzPAhBGg",
  authDomain: "mel-in-a-box-c7a85.firebaseapp.com",
  projectId: "mel-in-a-box-c7a85",
  storageBucket: "mel-in-a-box-c7a85.firebasestorage.app",
  messagingSenderId: "870003064716",
  appId: "1:870003064716:web:ba811a9f19392aa27160a9",
  measurementId: "G-33EGPTC3WY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
