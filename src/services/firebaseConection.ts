import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjYspay2CJs4XkbVVIIBIVJC2Y29ZtTYE",
  authDomain: "linkai-francieliduartedev.firebaseapp.com",
  projectId: "linkai-francieliduartedev",
  storageBucket: "linkai-francieliduartedev.firebasestorage.app",
  messagingSenderId: "895945220844",
  appId: "1:895945220844:web:b0f226d7c6d1a43ea3fbc9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};