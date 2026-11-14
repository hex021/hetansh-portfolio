/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  PortfolioData,
  ProjectItem,
  ResearchItem,
  AchievementItem,
  TimelineItem,
  ProfileData,
  UISettings
} from '../types/portfolio';
import {
  getStoredPortfolioData,
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  exportPortfolioDataJSON,
  importPortfolioDataJSON,
  subscribeToDataUpdates
} from '../services/dataService';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  saveData: (newData: PortfolioData) => Promise<{ success: boolean; cloudSynced: boolean; message: string }>;
  resetData: () => Promise<void>;
  exportData: () => string;
  importData: (jsonStr: string) => Promise<{ success: boolean; error?: string }>;
  
  // Projects CRUD
  addProject: (project: ProjectItem) => Promise<void>;
  updateProject: (id: string, updated: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  reorderProjects: (projects: ProjectItem[]) => Promise<void>;

  // Research CRUD
  addResearch: (item: ResearchItem) => Promise<void>;
  updateResearch: (id: string, updated: Partial<ResearchItem>) => Promise<void>;
  deleteResearch: (id: string) => Promise<void>;

  // Achievements CRUD
  addAchievementItem: (catId: string, item: AchievementItem) => Promise<void>;
  updateAchievementItem: (catId: string, itemId: string, updated: Partial<AchievementItem>) => Promise<void>;
  deleteAchievementItem: (catId: string, itemId: string) => Promise<void>;

  // Timeline CRUD
  addTimelineItem: (item: TimelineItem) => Promise<void>;
  updateTimelineItem: (id: string, updated: Partial<TimelineItem>) => Promise<void>;
  deleteTimelineItem: (id: string) => Promise<void>;

  // Profile CRUD
  updateProfile: (profile: Partial<ProfileData>) => Promise<void>;

  // UI Settings
  updateUISettings: (settings: Partial<UISettings>) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(getStoredPortfolioData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and load latest data (cloud or local)
  useEffect(() => {
    let mounted = true;
    loadPortfolioData().then((loaded) => {
      if (mounted) {
        setData(loaded);
        setIsLoading(false);
      }
    });

    const unsubscribe = subscribeToDataUpdates((freshData) => {
      if (mounted) {
        setData(freshData);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const handleSaveData = useCallback(async (newData: PortfolioData) => {
    setData(newData);
    return await savePortfolioData(newData);
  }, []);

  const handleReset = useCallback(async () => {
    const fresh = await resetPortfolioData();
    setData(fresh);
  }, []);

  const handleExport = useCallback(() => {
    return exportPortfolioDataJSON();
  }, []);

  const handleImport = useCallback(async (jsonStr: string) => {
    const result = await importPortfolioDataJSON(jsonStr);
    if (result.success && result.data) {
      setData(result.data);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  // Projects CRUD
  const addProject = useCallback(async (project: ProjectItem) => {
    const next = { ...data, projects: [project, ...data.projects] };
    await handleSaveData(next);
  }, [data, handleSaveData]);

  const updateProject = useCallback(async (id: string, updated: Partial<ProjectItem>) => {
    const nextProjects = data.projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    await handleSaveData({ ...data, projects: nextProjects });
  }, [data, handleSaveData]);

  const deleteProject = useCallback(async (id: string) => {
    const nextProjects = data.projects.filter((p) => p.id !== id);
    await handleSaveData({ ...data, projects: nextProjects });
  }, [data, handleSaveData]);

  const reorderProjects = useCallback(async (reordered: ProjectItem[]) => {
    await handleSaveData({ ...data, projects: reordered });
  }, [data, handleSaveData]);

  // Research CRUD
  const addResearch = useCallback(async (item: ResearchItem) => {
    const next = { ...data, research: [item, ...data.research] };
    await handleSaveData(next);
  }, [data, handleSaveData]);

  const updateResearch = useCallback(async (id: string, updated: Partial<ResearchItem>) => {
    const nextResearch = data.research.map((r) => (r.id === id ? { ...r, ...updated } : r));
    await handleSaveData({ ...data, research: nextResearch });
  }, [data, handleSaveData]);

  const deleteResearch = useCallback(async (id: string) => {
    const nextResearch = data.research.filter((r) => r.id !== id);
    await handleSaveData({ ...data, research: nextResearch });
  }, [data, handleSaveData]);

  // Achievements CRUD
  const addAchievementItem = useCallback(async (catId: string, item: AchievementItem) => {
    const nextCats = data.achievements.map((cat) => {
      if (cat.id === catId) {
        return { ...cat, items: [item, ...cat.items] };
      }
      return cat;
    });
    await handleSaveData({ ...data, achievements: nextCats });
  }, [data, handleSaveData]);

  const updateAchievementItem = useCallback(
    async (catId: string, itemId: string, updated: Partial<AchievementItem>) => {
      const nextCats = data.achievements.map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            items: cat.items.map((i) => (i.id === itemId ? { ...i, ...updated } : i))
          };
        }
        return cat;
      });
      await handleSaveData({ ...data, achievements: nextCats });
    },
    [data, handleSaveData]
  );

  const deleteAchievementItem = useCallback(
    async (catId: string, itemId: string) => {
      const nextCats = data.achievements.map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            items: cat.items.filter((i) => i.id !== itemId)
          };
        }
        return cat;
      });
      await handleSaveData({ ...data, achievements: nextCats });
    },
    [data, handleSaveData]
  );

  // Timeline CRUD
  const addTimelineItem = useCallback(async (item: TimelineItem) => {
    const next = { ...data, timeline: [item, ...data.timeline] };
    await handleSaveData(next);
  }, [data, handleSaveData]);

  const updateTimelineItem = useCallback(async (id: string, updated: Partial<TimelineItem>) => {
    const next = data.timeline.map((t) => (t.id === id ? { ...t, ...updated } : t));
    await handleSaveData({ ...data, timeline: next });
  }, [data, handleSaveData]);

  const deleteTimelineItem = useCallback(async (id: string) => {
    const next = data.timeline.filter((t) => t.id !== id);
    await handleSaveData({ ...data, timeline: next });
  }, [data, handleSaveData]);

  // Profile CRUD
  const updateProfile = useCallback(async (profileUpdate: Partial<ProfileData>) => {
    const next = {
      ...data,
      profile: {
        ...data.profile,
        ...profileUpdate
      }
    };
    await handleSaveData(next);
  }, [data, handleSaveData]);

  // UI Settings CRUD
  const updateUISettings = useCallback(async (uiUpdate: Partial<UISettings>) => {
    const next = {
      ...data,
      ui: {
        ...data.ui,
        ...uiUpdate,
        visibleSections: {
          ...data.ui.visibleSections,
          ...(uiUpdate.visibleSections || {})
        }
      }
    };
    await handleSaveData(next);
  }, [data, handleSaveData]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        saveData: handleSaveData,
        resetData: handleReset,
        exportData: handleExport,
        importData: handleImport,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addResearch,
        updateResearch,
        deleteResearch,
        addAchievementItem,
        updateAchievementItem,
        deleteAchievementItem,
        addTimelineItem,
        updateTimelineItem,
        deleteTimelineItem,
        updateProfile,
        updateUISettings
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
