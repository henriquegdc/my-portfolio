import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXp65SSdFhSE6O6ai4tdPiaGDtDfb6wGA",
  authDomain: "my-portifolio-6a389.firebaseapp.com",
  projectId: "my-portifolio-6a389",
  storageBucket: "my-portifolio-6a389.firebasestorage.app",
  messagingSenderId: "93925680477",
  appId: "1:93925680477:web:e279cb8959353d906af4b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
