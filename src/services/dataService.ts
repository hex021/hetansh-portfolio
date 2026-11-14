import type { PortfolioData } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialPortfolioData';
import {
  isFirebaseConfigured,
  fetchFirestorePortfolio,
  saveFirestorePortfolio,
  getFirebaseStatus
} from './firebase';

const STORAGE_KEY = 'hetansh_portfolio_data_v2';
const EVENT_NAME = 'hetansh-portfolio-data-updated';

/**
 * Retrieve data from localStorage synchronously.
 * Returns initialPortfolioData if none exists.
 */
export const getStoredPortfolioData = (): PortfolioData => {
  if (typeof window === 'undefined') return initialPortfolioData;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial data to local storage on first visit
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPortfolioData));
      return initialPortfolioData;
    }
    const parsed = JSON.parse(raw);
    // Merge shallowly with initial data in case schema has new collections
    return {
      ...initialPortfolioData,
      ...parsed,
      profile: {
        ...initialPortfolioData.profile,
        ...(parsed.profile || {})
      }
    };
  } catch (error) {
    console.error('[DataService] Failed to read from localStorage:', error);
    return initialPortfolioData;
  }
};

/**
 * Load latest data, checking Firebase first if connected, then falling back to localStorage.
 */
export const loadPortfolioData = async (): Promise<PortfolioData> => {
  const localData = getStoredPortfolioData();

  if (isFirebaseConfigured()) {
    try {
      const cloudData = await fetchFirestorePortfolio();
      if (cloudData) {
        // Cache cloud data locally
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        notifyDataChanged(cloudData);
        return cloudData;
      }
    } catch (error) {
      console.warn('[DataService] Cloud fetch failed, falling back to local cache:', error);
    }
  }

  return localData;
};

/**
 * Save data locally and push to Firebase if available.
 */
export const savePortfolioData = async (
  newData: PortfolioData
): Promise<{ success: boolean; cloudSynced: boolean; message: string }> => {
  const updatedData: PortfolioData = {
    ...newData,
    lastUpdated: new Date().toISOString()
  };

  try {
    // 1. Save to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    notifyDataChanged(updatedData);

    // 2. Sync to Firebase if configured
    let cloudSynced = false;
    let cloudMessage = 'Saved locally to browser storage.';

    if (isFirebaseConfigured()) {
      cloudSynced = await saveFirestorePortfolio(updatedData);
      if (cloudSynced) {
        cloudMessage = 'Saved locally and synchronized with Firebase Firestore.';
      } else {
        cloudMessage = 'Saved locally. Firebase sync encountered an issue.';
      }
    }

    return {
      success: true,
      cloudSynced,
      message: cloudMessage
    };
  } catch (error) {
    console.error('[DataService] Error saving data:', error);
    return {
      success: false,
      cloudSynced: false,
      message: error instanceof Error ? error.message : 'Unknown error during save.'
    };
  }
};

/**
 * Reset portfolio back to initial verified resume values.
 */
export const resetPortfolioData = async (): Promise<PortfolioData> => {
  const freshData = {
    ...initialPortfolioData,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
  notifyDataChanged(freshData);

  if (isFirebaseConfigured()) {
    await saveFirestorePortfolio(freshData);
  }

  return freshData;
};

/**
 * Export portfolio state as formatted JSON string.
 */
export const exportPortfolioDataJSON = (): string => {
  const current = getStoredPortfolioData();
  return JSON.stringify(current, null, 2);
};

/**
 * Import portfolio JSON string and validate.
 */
export const importPortfolioDataJSON = async (
  jsonStr: string
): Promise<{ success: boolean; data?: PortfolioData; error?: string }> => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON format');
    }

    // Basic structure validation
    if (!parsed.projects || !Array.isArray(parsed.projects)) {
      throw new Error('Data must contain a projects array');
    }

    const validated: PortfolioData = {
      profile: parsed.profile || initialPortfolioData.profile,
      projects: parsed.projects,
      research: Array.isArray(parsed.research) ? parsed.research : initialPortfolioData.research,
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : initialPortfolioData.achievements,
      timeline: Array.isArray(parsed.timeline) ? parsed.timeline : initialPortfolioData.timeline,
      lastUpdated: new Date().toISOString()
    };

    await savePortfolioData(validated);
    return { success: true, data: validated };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to parse JSON'
    };
  }
};

/**
 * Dispatch update event to notify all listeners
 */
const notifyDataChanged = (data: PortfolioData) => {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent(EVENT_NAME, { detail: data });
  window.dispatchEvent(event);
};

/**
 * Subscribe to live data updates
 */
export const subscribeToDataUpdates = (callback: (data: PortfolioData) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<PortfolioData>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
  };
};

export { getFirebaseStatus, isFirebaseConfigured };
