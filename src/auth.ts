import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithPopup,
  signInWithEmailLink,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

type AccessMode = "login" | "register";

export type PendingProfile = {
  firstName: string;
  lastName: string;
  email: string;
  mode: AccessMode;
};

const EMAIL_KEY = "diners.emailForSignIn";
const PROFILE_KEY = "diners.pendingProfile";

const getActionCodeSettings = () => ({
  url: `${window.location.origin}/postula`,
  handleCodeInApp: true,
});

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

  window.localStorage.removeItem(EMAIL_KEY);
  window.localStorage.removeItem(PROFILE_KEY);

  return {
    user: result.user,
    profile: pendingProfile,
  };
};

export const signInWithGoogleAccount = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth, provider);
};

export const signOutSession = async () => {
  await signOut(auth);
};
