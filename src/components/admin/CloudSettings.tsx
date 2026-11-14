import React, { useState } from 'react';
import {
  Database,
  Cloud,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  Key,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getFirebaseStatus } from '../../services/firebase';
import { 
  getActiveAdminUsername, 
  updateAdminCredentials, 
  resetAdminCredentialsToDefault 
} from '../../services/authService';

export const CloudSettings: React.FC = () => {
  const { data, saveData, resetData, exportData, importData } = usePortfolio();
  const [syncing, setSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Backup & Restore
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Credentials Change
  const [currentUsername, setCurrentUsername] = useState(() => getActiveAdminUsername());
  const [newUsername, setNewUsername] = useState(() => getActiveAdminUsername());
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const firebaseStatus = getFirebaseStatus();

  const handleManualSync = async () => {
    setSyncing(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const result = await saveData(data);
      if (result.cloudSynced) {
        setStatusMessage('Successfully synchronized all collections with Firebase Firestore.');
      } else {
        setStatusMessage('Data stored safely in browser storage. ' + result.message);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const handleExportBackup = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hetansh-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage('Backup JSON successfully generated and downloaded.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    const res = await importData(importJsonText);
    if (res.success) {
      setStatusMessage('Portfolio database successfully restored from JSON backup.');
      setImportJsonText('');
      setShowImportBox(false);
    } else {
      setErrorMessage(res.error || 'Failed to import JSON data.');
    }
  };

  const handleResetDefaults = async () => {
    await resetData();
    setShowResetConfirm(false);
    setStatusMessage('Restored all portfolio sections to original verified baseline.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        setPwdMessage({ text: 'Password must be at least 6 characters long.', isError: true });
        return;
      }
      if (newPassword !== confirmPassword) {
        setPwdMessage({ text: 'Passwords do not match.', isError: true });
        return;
      }
    }

    const res = await updateAdminCredentials(newUsername, newPassword || undefined);
    if (res.success) {
      setCurrentUsername(newUsername.trim());
      setNewPassword('');
      setConfirmPassword('');
      setPwdMessage({ text: res.message });
      setTimeout(() => setPwdMessage(null), 4000);
    } else {
      setPwdMessage({ text: res.message, isError: true });
    }
  };

  const handleResetCredentials = () => {
    resetAdminCredentialsToDefault();
    setCurrentUsername('hetansh');
    setNewUsername('hetansh');
    setNewPassword('');
    setConfirmPassword('');
    setPwdMessage({ text: 'Admin ID & Password reset to default (hetansh / hetansh-ece-2026).' });
    setTimeout(() => setPwdMessage(null), 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="pb-6 border-b border-[#A61E2D]/15">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
          Database &amp; Architecture Control
        </span>
        <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
          Cloud <span className="font-light italic text-[#8E949D]">&amp; System Engine</span>
        </h2>
        <p className="text-xs text-[#A0A0A0] mt-1">
          Dual-engine persistence controller. Seamlessly mirrors local browser cache with Google Firebase Firestore.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
          <AlertTriangle size={14} className="text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Grid: Firebase Engine Status & Manual Sync */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Cloud Status */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Cloud size={16} className="text-[#A61E2D]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Firebase Cloud State
              </h3>
            </div>
            <span
              className={`text-[9px] font-mono uppercase px-2.5 py-0.5 border ${
                firebaseStatus.configured
                  ? 'border-[#A61E2D] text-[#A61E2D] bg-[#A61E2D]/10'
                  : 'border-yellow-500/40 text-yellow-500 bg-yellow-500/10'
              }`}
            >
              {firebaseStatus.configured ? 'Firestore Connected' : 'Local Persistent Mode'}
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#A0A0A0]">
            <div className="flex justify-between py-1 border-b border-white/5 font-mono">
              <span>Sync Architecture:</span>
              <span className="text-[#F5F5F5]">Dual-Mode (LocalStorage + Firestore)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5 font-mono">
              <span>Target Collection:</span>
              <span className="text-[#F5F5F5]">portfolio/main</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5 font-mono">
              <span>Firebase Project ID:</span>
              <span className="text-[#F5F5F5]">{firebaseStatus.projectId || 'None (Using local storage)'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5 font-mono">
              <span>Last Synchronized:</span>
              <span className="text-[#A61E2D]">
                {data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : 'Current session'}
              </span>
            </div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="w-full py-3 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-gold-glow disabled:opacity-50"
          >
            <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
            <span>{syncing ? 'Synchronizing Pipeline...' : 'Force Sync To Database'}</span>
          </button>
        </div>

        {/* Card 2: Backup & Restore */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-[#A61E2D]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Export &amp; Disaster Recovery
              </h3>
            </div>
            <span className="text-[9px] font-mono text-[#8E949D] uppercase">JSON SNAPSHOTS</span>
          </div>

          <p className="text-xs text-[#A0A0A0] leading-relaxed">
            Download complete portfolio datasets as self-contained JSON backups or import external datasets onto any device.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              className="py-2.5 px-3 border border-[#A61E2D]/40 bg-[#141414] hover:bg-[#A61E2D]/20 text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Download size={14} className="text-[#A61E2D]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="py-2.5 px-3 border border-white/15 bg-[#141414] hover:border-white/30 text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Upload size={14} className="text-[#8E949D]" />
              <span>Import JSON</span>
            </button>
          </div>

          {/* Reset button */}
          <div className="pt-2">
            {showResetConfirm ? (
              <div className="p-3 border border-red-500/50 bg-red-950/20 space-y-2">
                <span className="text-[11px] text-red-200 block font-semibold">
                  Are you sure? This restores all 7 projects and resume data back to initial verified defaults.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleResetDefaults}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1 border border-white/20 text-[#A0A0A0] text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-2 border border-white/10 hover:border-red-500/40 text-[#A0A0A0] hover:text-red-300 text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw size={13} />
                <span>Restore Verified Resume Defaults</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* JSON Import Collapsible Drawer */}
      {showImportBox && (
        <form onSubmit={handleImportSubmit} className="border border-[#A61E2D]/30 bg-[#0E0E0E] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#F5F5F5]">
              Paste Portfolio JSON Payload
            </span>
            <button
              type="button"
              onClick={() => setShowImportBox(false)}
              className="text-[#A0A0A0] hover:text-[#F5F5F5]"
            >
              ×
            </button>
          </div>
          <textarea
            rows={6}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder="Paste your valid backup JSON string here..."
            required
            className="w-full bg-[#151515] border border-white/10 p-3 text-xs font-mono text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowImportBox(false)}
              className="px-4 py-1.5 border border-white/15 text-xs text-[#A0A0A0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase"
            >
              Apply JSON Dataset
            </button>
          </div>
        </form>
      )}

      {/* Security: Change Admin ID & Password */}
      <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Key size={16} className="text-[#A61E2D]" />
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Admin Access Credentials (Change ID &amp; Password)
              </h3>
              <p className="text-[10px] text-[#A0A0A0] mt-0.5">
                Currently logged in as active admin: <span className="text-[#A61E2D] font-mono font-bold">"{currentUsername}"</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetCredentials}
            className="text-[10px] text-[#A0A0A0] hover:text-[#A61E2D] uppercase font-mono tracking-wider flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            title="Reset to factory credentials: hetansh / hetansh-ece-2026"
          >
            <RotateCcw size={11} />
            <span>Reset to Default</span>
          </button>
        </div>

        {pwdMessage && (
          <div className={`p-3 border text-xs flex items-center gap-2 ${
            pwdMessage.isError 
              ? 'bg-red-950/40 border-red-500/50 text-red-200' 
              : 'bg-[#A61E2D]/10 border-[#A61E2D]/40 text-[#F5F5F5]'
          }`}>
            {pwdMessage.isError ? <AlertTriangle size={14} className="text-red-400" /> : <Check size={14} className="text-[#A61E2D]" />}
            <span>{pwdMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleChangeCredentials} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Username / Admin ID */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#A0A0A0] font-bold">Admin ID / Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="New Admin ID"
                  required
                  className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#A0A0A0] font-bold">New Password (leave empty to keep current)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password (min 6 chars)"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#A0A0A0] font-bold">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-gold-glow flex items-center gap-2"
            >
              <Key size={13} />
              <span>Update ID &amp; Password</span>
            </button>
          </div>
        </form>

        <div className="flex items-start gap-2 text-[10px] text-[#777] font-mono bg-[#121212] p-3 border border-white/5">
          <Info size={13} className="text-[#A61E2D] shrink-0 mt-0.5" />
          <span>
            Credentials are saved in your browser storage. If you want cross-device cloud authentication with email/password hosted on Google Cloud, connect Firebase in `.env`.
          </span>
        </div>
      </div>
    </div>
  );
};
