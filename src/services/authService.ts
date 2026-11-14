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
const PASSWORD_OVERRIDE_KEY = 'hetansh_portfolio_admin_custom_pwd';

// Built-in verified administrator accounts for out-of-the-box access
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

export const getActiveAdminUsername = (): string => {
  if (typeof window === 'undefined') return 'hetansh';
  return localStorage.getItem(USERNAME_OVERRIDE_KEY) || 'hetansh';
};

export const hasCustomPassword = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(PASSWORD_OVERRIDE_KEY));
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

  // 2. Check custom or active local admin credentials
  const activeUser = typeof window !== 'undefined' ? localStorage.getItem(USERNAME_OVERRIDE_KEY) || 'hetansh' : 'hetansh';
  const customPwd = typeof window !== 'undefined' ? localStorage.getItem(PASSWORD_OVERRIDE_KEY) : null;

  if (cleanId.toLowerCase() === activeUser.toLowerCase()) {
    const requiredPwd = customPwd || 'hetansh-ece-2026';
    if (cleanSecret === requiredPwd) {
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

  // 3. Fallback to default accounts only if custom password has not been set
  if (!customPwd) {
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

export const updateAdminCredentials = (
  newUsername: string,
  newPassword?: string
): { success: boolean; message: string } => {
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
    localStorage.setItem(PASSWORD_OVERRIDE_KEY, cleanPwd);
  }

  // Update active session username if logged in
  const current = getStoredAuthUser();
  if (current) {
    current.username = cleanUser;
    saveAuthSession(current, true);
  }

  return { success: true, message: 'Admin username and password updated successfully.' };
};

export const updateAdminPassword = (newPassword: string): void => {
  if (newPassword && newPassword.length >= 6) {
    localStorage.setItem(PASSWORD_OVERRIDE_KEY, newPassword);
  }
};

export const resetAdminCredentialsToDefault = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USERNAME_OVERRIDE_KEY);
  localStorage.removeItem(PASSWORD_OVERRIDE_KEY);
};

const saveAuthSession = (user: AdminUser, rememberMe: boolean) => {
  const json = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, json);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, json);
  }
};
