import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, type Firestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, type Auth } from 'firebase/auth';
import type { PortfolioData } from '../types/portfolio';

// Safe environment variable retrieval compatible with Vite and SSR / Node test harnesses
const env: Record<string, string | undefined> =
  typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env
    ? (import.meta as unknown as { env: Record<string, string> }).env
    : {};

// Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: env.VITE_FIREBASE_APP_ID || ''
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey.trim() !== '' &&
    firebaseConfig.projectId.trim() !== ''
  );
};

export const getFirebaseInstance = () => {
  if (!isFirebaseConfigured()) {
    return { app: null, db: null, auth: null };
  }

  try {
    if (!app && getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else if (!app) {
      app = getApps()[0];
    }

    if (app && !db) {
      db = getFirestore(app);
    }
    if (app && !auth) {
      auth = getAuth(app);
    }

    return { app, db, auth };
  } catch (error) {
    console.warn('[Firebase] Initialization skipped or failed:', error);
    return { app: null, db: null, auth: null };
  }
};

const COLLECTION_NAME = 'portfolio';
const DOCUMENT_ID = 'main';

/**
 * Fetch portfolio data from Firebase Firestore
 */
export const fetchFirestorePortfolio = async (): Promise<PortfolioData | null> => {
  if (!isFirebaseConfigured()) return null;

  try {
    const { db } = getFirebaseInstance();
    if (!db) return null;

    const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    }
    return null;
  } catch (error) {
    console.error('[Firebase] Error fetching from Firestore:', error);
    return null;
  }
};

/**
 * Save portfolio data to Firebase Firestore
 */
export const saveFirestorePortfolio = async (data: PortfolioData): Promise<boolean> => {
  if (!isFirebaseConfigured()) return false;

  try {
    const { db } = getFirebaseInstance();
    if (!db) return false;

    const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
    await setDoc(docRef, {
      ...data,
      lastUpdated: new Date().toISOString()
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('[Firebase] Error saving to Firestore:', error);
    return false;
  }
};

/**
 * Sign in via Firebase Auth if enabled
 */
export const firebaseSignIn = async (email: string, pass: string): Promise<boolean> => {
  if (!isFirebaseConfigured()) return false;

  try {
    const { auth } = getFirebaseInstance();
    if (!auth) return false;

    await signInWithEmailAndPassword(auth, email, pass);
    return true;
  } catch (error) {
    console.error('[Firebase] Auth login failed:', error);
    throw error;
  }
};

/**
 * Sign out from Firebase Auth
 */
export const firebaseSignOut = async (): Promise<void> => {
  if (!isFirebaseConfigured()) return;

  try {
    const { auth } = getFirebaseInstance();
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.error('[Firebase] Auth logout error:', error);
  }
};

/**
 * Diagnostic status for the UI
 */
export const getFirebaseStatus = () => {
  const configured = isFirebaseConfigured();
  return {
    configured,
    projectId: configured ? firebaseConfig.projectId : undefined,
    storageBucket: configured ? firebaseConfig.storageBucket : undefined,
    authDomain: configured ? firebaseConfig.authDomain : undefined
  };
};
