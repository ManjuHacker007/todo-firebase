
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvuXcZL7ReD7pKh0C0lSmuffbXxtAYtdU",
  authDomain: "todo-app-31bfe.firebaseapp.com",
  projectId: "todo-app-31bfe",
  storageBucket: "todo-app-31bfe.firebasestorage.app",
  messagingSenderId: "375397633367",
  appId: "1:375397633367:web:fab9f6577e22f5034e4212"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);