import { initializeApp } from "firebase/app";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDfDjnCreldizOnb-sMvVuRP4LzD5otA7w",
    authDomain: "diners-app-c5b87.firebaseapp.com",
    projectId: "diners-app-c5b87",
    storageBucket: "diners-app-c5b87.firebasestorage.app",
    messagingSenderId: "4381550978",
    appId: "1:4381550978:web:eb88065f1a8d607ac6879b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Instancias
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configurar persistencia de forma explícita
// Esto asegura que el usuario no tenga que loguearse cada vez que refresca la pestaña
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error configurando la persistencia de Auth:", error);
    });

export default app;