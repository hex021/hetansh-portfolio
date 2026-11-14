import { firebaseSignIn, firebaseSignOut, isFirebaseConfigured } from './firebase';

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'owner';
  authMethod: 'local' | 'firebase';
  loginTime: string;
}

const AUTH_STORAGE_KEY = 'hetansh_portfolio_admin_auth';
const PASSWORD_OVERRIDE_KEY = 'hetansh_portfolio_admin_custom_pwd';

// Built-in verified administrator accounts for zero-friction out-of-the-box access
const DEFAULT_ACCOUNTS = [
  { username: 'hetansh', password: 'hetansh-ece-2026', role: 'owner' as const },
  { username: 'admin', password: 'admin123', role: 'admin' as const },
];

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

  // 2. Check custom local password if set
  const customPwd = localStorage.getItem(PASSWORD_OVERRIDE_KEY);
  if (customPwd && (cleanId.toLowerCase() === 'hetansh' || cleanId.toLowerCase() === 'admin')) {
    if (cleanSecret === customPwd) {
      const user: AdminUser = {
        id: 'user-' + Date.now(),
        username: cleanId,
        role: 'owner',
        authMethod: 'local',
        loginTime: new Date().toISOString()
      };
      saveAuthSession(user, rememberMe);
      return { success: true, user };
    }
  }

  // 3. Fallback to default credentials
  const matched = DEFAULT_ACCOUNTS.find(
    acc => acc.username.toLowerCase() === cleanId.toLowerCase() && acc.password === cleanSecret
  );

  if (matched) {
    const user: AdminUser = {
      id: 'local-' + matched.username,
      username: matched.username,
      role: matched.role,
      authMethod: 'local',
      loginTime: new Date().toISOString()
    };
    saveAuthSession(user, rememberMe);
    return { success: true, user };
  }

  return {
    success: false,
    error: 'Invalid credentials. Use hetansh / hetansh-ece-2026 or admin / admin123'
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

export const updateAdminPassword = (newPassword: string): void => {
  if (newPassword && newPassword.length >= 6) {
    localStorage.setItem(PASSWORD_OVERRIDE_KEY, newPassword);
  }
};

const saveAuthSession = (user: AdminUser, rememberMe: boolean) => {
  const json = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, json);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, json);
  }
};
