// src/firebase.ts

import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ðŸ‘ˆ FALTABA

const firebaseConfig = {
    apiKey: "AIzaSyDfDjnCreldizOnb-sMvVuRP4LzD5otA7w",
    authDomain: "diners-app-c5b87.firebaseapp.com",
    projectId: "diners-app-c5b87",
    storageBucket: "diners-app-c5b87.firebasestorage.app",
    messagingSenderId: "4381550978",
    appId: "1:4381550978:web:eb88065f1a8d607ac6879b"
};

const app = initializeApp(firebaseConfig);

// âœ… Servicios exportados
export const auth = getAuth(app);
export const db = getFirestore(app);
void setPersistence(auth, browserLocalPersistence);

export default app;
