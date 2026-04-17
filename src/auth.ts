// src/auth.ts

import { auth } from "./firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

const provider = new GoogleAuthProvider();

// ðŸ” Login con Google
export const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    return result.user;
};

// ðŸ” Login con email
export const loginWithEmail = async (
    email: string,
    password: string
) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
};

// ðŸ†• Registro
export const registerUser = async (
    email: string,
    password: string
) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
};
