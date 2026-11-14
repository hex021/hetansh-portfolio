import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  FlaskConical,
  Trophy,
  Calendar,
  User,
  Cloud,
  LogOut,
  ShieldCheck,
  Eye,
  Cpu
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { ProjectsManager } from './ProjectsManager';
import { ResearchManager } from './ResearchManager';
import { AchievementsManager } from './AchievementsManager';
import { TimelineManager } from './TimelineManager';
import { ProfileManager } from './ProfileManager';
import { CloudSettings } from './CloudSettings';
import { getStoredAuthUser, logoutAdmin, type AdminUser } from '../../services/authService';

interface AdminSuiteProps {
  onBackToPortfolio: () => void;
}

type TabKey = 'projects' | 'research' | 'achievements' | 'timeline' | 'profile' | 'settings';

export const AdminSuite: React.FC<AdminSuiteProps> = ({ onBackToPortfolio }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getStoredAuthUser);
  const [activeTab, setActiveTab] = useState<TabKey>('projects');

  const handleLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <AdminLogin
        onSuccess={(user) => setCurrentUser(user)}
        onBackToPortfolio={onBackToPortfolio}
      />
    );
  }

  const tabs: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
    { key: 'projects', label: 'Projects & Specs', icon: <Code2 size={15} /> },
    { key: 'research', label: 'Research & Labs', icon: <FlaskConical size={15} /> },
    { key: 'achievements', label: 'Achievements', icon: <Trophy size={15} /> },
    { key: 'timeline', label: 'Trajectory Timeline', icon: <Calendar size={15} /> },
    { key: 'profile', label: 'Identity & Bio', icon: <User size={15} /> },
    { key: 'settings', label: 'Cloud & Database', icon: <Cloud size={15} /> },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#F5F5F5] font-sans relative selection:bg-[#A61E2D]/30 selection:text-white">
      {/* Background glow and subtle PCB grid */}
      <div className="fixed inset-0 tech-grid opacity-15 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#A61E2D]/5 blur-[160px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#A61E2D]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand & Live link */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 border border-[#A61E2D]/40 bg-[#111111] flex items-center justify-center shadow-gold-glow">
              <Cpu size={16} className="text-[#A61E2D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-wider uppercase text-[#F5F5F5]">
                  Hetansh <span className="text-[#8E949D] font-light italic">Patel</span>
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-[#A61E2D]/15 border border-[#A61E2D]/40 text-[#A61E2D]">
                  Admin Suite
                </span>
              </div>
              <span className="text-[10px] text-[#A0A0A0] font-mono">
                Hardware Architecture &amp; Telemetry Management Console
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-2 px-4 py-2 border border-[#A61E2D]/30 bg-[#111111]/60 hover:bg-[#A61E2D] hover:text-[#050505] text-xs uppercase tracking-wider font-semibold transition-all duration-300 group cursor-pointer"
            >
              <Eye size={13} className="text-[#A61E2D] group-hover:text-[#050505]" />
              <span>View Live Portfolio</span>
            </button>

            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

            {/* User Session & Logout */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-[#F5F5F5]">{currentUser.username}</span>
                <span className="text-[9px] font-mono text-[#8E949D] uppercase">
                  {currentUser.role} // {currentUser.authMethod}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 border border-white/15 hover:border-red-500/50 text-[#A0A0A0] hover:text-red-400 bg-[#111111] transition-colors cursor-pointer"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none">
          <nav className="flex space-x-2 md:space-x-4 border-t border-white/5 py-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-b-2 border-[#A61E2D] text-[#F5F5F5] font-bold bg-[#A61E2D]/10'
                      : 'text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-[#A61E2D]' : 'text-[#8E949D]'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'research' && <ResearchManager />}
          {activeTab === 'achievements' && <AchievementsManager />}
          {activeTab === 'timeline' && <TimelineManager />}
          {activeTab === 'profile' && <ProfileManager />}
          {activeTab === 'settings' && <CloudSettings />}
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="border-t border-[#A61E2D]/15 bg-[#080808] py-6 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-widest text-[#666] font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-[#A61E2D]" />
            <span>Hetansh Patel Portfolio Management Core v2.0</span>
          </div>
          <div>All updates propagate synchronously to public portfolio views.</div>
        </div>
      </footer>
    </div>
  );
};
