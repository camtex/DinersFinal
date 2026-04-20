import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithRedirect,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { saveStoredUserProfile } from "./lib/dashboardStorage";

type AccessMode = "login" | "register";

export type PendingProfile = {
  firstName: string;
  lastName: string;
  email: string;
  mode: AccessMode;
};

type PersistProfileInput = {
  user: User;
  mode: AccessMode;
  firstName?: string;
  lastName?: string;
  cvFile?: File | null;
};

const EMAIL_KEY = "diners.emailForSignIn";
const PROFILE_KEY = "diners.pendingProfile";

const getActionCodeSettings = () => ({
  url: `${window.location.origin}/postula`,
  handleCodeInApp: true,
});

const splitDisplayName = (displayName: string | null) => {
  const parts = (displayName ?? "").trim().split(" ").filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
};

const getFirebaseErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return fallback;
  }

  const code = String(error.code);

  switch (code) {
    case "auth/email-already-in-use":
      return "Ese correo ya esta registrado. Inicia sesion o usa otro correo.";
    case "auth/invalid-email":
      return "El correo no tiene un formato valido.";
    case "auth/weak-password":
      return "La contrasena debe tener al menos 6 caracteres.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Correo o contrasena incorrectos.";
    case "auth/popup-closed-by-user":
      return "Se cerro la ventana de Google antes de completar el acceso.";
    case "auth/popup-blocked":
      return "El navegador bloqueo la ventana emergente de Google.";
    default:
      return fallback;
  }
};

export const persistAuthenticatedUser = async ({
  user,
  mode,
  firstName,
  lastName,
  cvFile,
}: PersistProfileInput) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const existingData = userSnap.exists() ? userSnap.data() : {};
  const displayNameParts = splitDisplayName(user.displayName);
  let cvUrl = "";

  if (cvFile && mode === "register") {
    const storageRef = ref(storage, `cvs/${user.uid}_${cvFile.name}`);
    const snapshot = await uploadBytes(storageRef, cvFile);
    cvUrl = await getDownloadURL(snapshot.ref);
  }

  const resolvedFirstName = firstName?.trim() || existingData.firstName || displayNameParts.firstName;
  const resolvedLastName = lastName?.trim() || existingData.lastName || displayNameParts.lastName;
  const fullName = `${resolvedFirstName} ${resolvedLastName}`.trim();

  saveStoredUserProfile({
    uid: user.uid,
    email: user.email ?? "",
    firstName: resolvedFirstName,
    lastName: resolvedLastName,
    fullName,
    lastAccessMode: mode,
  });

  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email ?? "",
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      fullName,
      role: existingData.role || "postulante",
      cvUrl: cvUrl || existingData.cvUrl || "",
      lastAccessAt: serverTimestamp(),
      lastAccessMode: mode,
    },
    { merge: true },
  );

  return { fullName };
};

export const registerWithEmailPassword = async ({
  email,
  password,
  firstName,
  lastName,
  cvFile,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cvFile?: File | null;
}) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    if (fullName) {
      await updateProfile(result.user, { displayName: fullName });
    }

    await persistAuthenticatedUser({
      user: result.user,
      mode: "register",
      firstName,
      lastName,
      cvFile,
    });

    return result;
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error, "No pudimos crear la cuenta."));
  }
};

export const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await persistAuthenticatedUser({
      user: result.user,
      mode: "login",
    });
    return result;
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error, "No pudimos iniciar sesion."));
  }
};

export const signInWithGoogleAccount = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithRedirect(auth, provider);
};

export const completeGoogleRedirectAccess = async () => {
  try {
    const result = await getRedirectResult(auth);

    if (!result?.user) {
      return null;
    }

    await persistAuthenticatedUser({
      user: result.user,
      mode: "login",
    });

    return result;
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error, "No pudimos completar el acceso con Google."));
  }
};

export const sendAccessLink = async (profile: PendingProfile) => {
  await sendSignInLinkToEmail(auth, profile.email, getActionCodeSettings());

  window.localStorage.setItem(EMAIL_KEY, profile.email);
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const hasEmailLink = (url: string) => isSignInWithEmailLink(auth, url);

export const getPendingProfile = () => {
  const rawProfile = window.localStorage.getItem(PROFILE_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    return JSON.parse(rawProfile) as PendingProfile;
  } catch {
    return null;
  }
};

export const completeEmailLinkAccess = async (url: string) => {
  const pendingProfile = getPendingProfile();
  const savedEmail = window.localStorage.getItem(EMAIL_KEY) ?? pendingProfile?.email;

  if (!savedEmail) {
    throw new Error("No encontramos el correo pendiente para completar el acceso.");
  }

  const result = await signInWithEmailLink(auth, savedEmail, url);
  const fullName = [pendingProfile?.firstName, pendingProfile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) {
    await updateProfile(result.user, { displayName: fullName });
  }

  await persistAuthenticatedUser({
    user: result.user,
    mode: pendingProfile?.mode ?? "login",
    firstName: pendingProfile?.firstName,
    lastName: pendingProfile?.lastName,
  });

  window.localStorage.removeItem(EMAIL_KEY);
  window.localStorage.removeItem(PROFILE_KEY);

  return {
    user: result.user,
    profile: pendingProfile,
  };
};

export const signOutSession = async () => {
  await signOut(auth);
};
