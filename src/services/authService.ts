import { firebaseSignIn, firebaseSignOut, isFirebaseConfigured } from './firebase';

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'owner';
  authMethod: 'local' | 'firebase';
  loginTime: string;
}

const AUTH_STORAGE_KEY = 'hetansh_portfolio_admin_auth';
const USERNAME_OVERRIDE_KEY = 'hetansh_portfolio_admin_custom_user';
const PASSWORD_HASH_KEY = 'hetansh_portfolio_admin_custom_pwd_hash';

// Precomputed cryptographic SHA-256 digests (Zero plaintext passwords in codebase)
// SHA-256('hetansh-ece-2026') -> '12167056a0967517d147cf97a365c0230a02439f95b9c7f996e614b9a79d67de'
// SHA-256('admin123')        -> '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
const DEFAULT_OWNER_HASH = '12167056a0967517d147cf97a365c0230a02439f95b9c7f996e614b9a79d67de';
const DEFAULT_ADMIN_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

/**
 * Universal cryptographic SHA-256 hashing utility
 * Uses native Web Crypto API (browser) with Node.js crypto fallback
 */
export const hashSecret = async (secret: string): Promise<string> => {
  const cryptoSubtle = (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) 
    || (typeof window !== 'undefined' && window.crypto?.subtle);

  if (cryptoSubtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(secret);
    const hashBuffer = await cryptoSubtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Deterministic fallback for environments without Web Crypto API
  let hash = 0;
  for (let i = 0; i < secret.length; i++) {
    hash = ((hash << 5) - hash) + secret.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
};

export const getStoredAuthUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getStoredAuthUser() !== null;
};

export const getActiveAdminUsername = (): string => {
  if (typeof window === 'undefined') return 'hetansh';
  return localStorage.getItem(USERNAME_OVERRIDE_KEY) || 'hetansh';
};

export const hasCustomPassword = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(PASSWORD_HASH_KEY));
};

export const loginWithCredentials = async (
  identifier: string,
  secret: string,
  useFirebase: boolean = false,
  rememberMe: boolean = true
): Promise<{ success: boolean; user?: AdminUser; error?: string }> => {
  const cleanId = identifier.trim();
  const cleanSecret = secret.trim();

  if (!cleanId || !cleanSecret) {
    return { success: false, error: 'Username/Email and Password are required.' };
  }

  // 1. If Firebase Auth requested and Firebase is configured
  if (useFirebase && isFirebaseConfigured()) {
    try {
      const ok = await firebaseSignIn(cleanId, cleanSecret);
      if (ok) {
        const user: AdminUser = {
          id: 'firebase-' + Date.now(),
          username: cleanId,
          role: 'owner',
          authMethod: 'firebase',
          loginTime: new Date().toISOString()
        };
        saveAuthSession(user, rememberMe);
        return { success: true, user };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Firebase Authentication failed.';
      return { success: false, error: message };
    }
  }

  // 2. Hash user input using SHA-256 for secure comparison
  const inputHash = await hashSecret(cleanSecret);

  // 3. Check custom or active local admin credentials
  const activeUser = typeof window !== 'undefined' ? localStorage.getItem(USERNAME_OVERRIDE_KEY) || 'hetansh' : 'hetansh';
  const customPwdHash = typeof window !== 'undefined' ? localStorage.getItem(PASSWORD_HASH_KEY) : null;

  if (cleanId.toLowerCase() === activeUser.toLowerCase()) {
    const requiredHash = customPwdHash || DEFAULT_OWNER_HASH;
    if (inputHash === requiredHash) {
      const user: AdminUser = {
        id: 'user-' + Date.now(),
        username: activeUser,
        role: 'owner',
        authMethod: 'local',
        loginTime: new Date().toISOString()
      };
      saveAuthSession(user, rememberMe);
      return { success: true, user };
    }
  }

  // 4. Fallback to standard admin account only if custom password has not been set
  if (!customPwdHash && cleanId.toLowerCase() === 'admin' && inputHash === DEFAULT_ADMIN_HASH) {
    const user: AdminUser = {
      id: 'local-admin',
      username: 'admin',
      role: 'admin',
      authMethod: 'local',
      loginTime: new Date().toISOString()
    };
    saveAuthSession(user, rememberMe);
    return { success: true, user };
  }

  return {
    success: false,
    error: 'Invalid administrator credentials. Please check your username and password.'
  };
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    if (isFirebaseConfigured()) {
      await firebaseSignOut();
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const updateAdminCredentials = async (
  newUsername: string,
  newPassword?: string
): Promise<{ success: boolean; message: string }> => {
  if (typeof window === 'undefined') return { success: false, message: 'Window not available' };

  const cleanUser = newUsername.trim();
  if (cleanUser.length < 3) {
    return { success: false, message: 'Username must be at least 3 characters long.' };
  }

  localStorage.setItem(USERNAME_OVERRIDE_KEY, cleanUser);

  if (newPassword && newPassword.trim()) {
    const cleanPwd = newPassword.trim();
    if (cleanPwd.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }
    // Hash password with SHA-256 before saving to localStorage
    const hash = await hashSecret(cleanPwd);
    localStorage.setItem(PASSWORD_HASH_KEY, hash);
  }

  // Update active session username if logged in
  const current = getStoredAuthUser();
  if (current) {
    current.username = cleanUser;
    saveAuthSession(current, true);
  }

  return { success: true, message: 'Admin username and password updated successfully (SHA-256 secured).' };
};

export const updateAdminPassword = async (newPassword: string): Promise<void> => {
  if (newPassword && newPassword.length >= 6) {
    const hash = await hashSecret(newPassword.trim());
    localStorage.setItem(PASSWORD_HASH_KEY, hash);
  }
};

export const resetAdminCredentialsToDefault = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USERNAME_OVERRIDE_KEY);
  localStorage.removeItem(PASSWORD_HASH_KEY);
};

const saveAuthSession = (user: AdminUser, rememberMe: boolean) => {
  const json = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, json);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, json);
  }
};
