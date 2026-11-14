import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft, ShieldCheck, Key, Database, AlertCircle } from 'lucide-react';
import { loginWithCredentials } from '../../services/authService';
import type { AdminUser } from '../../services/authService';
import { getFirebaseStatus } from '../../services/firebase';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToPortfolio }) => {
  const [identifier, setIdentifier] = useState('hetansh');
  const [password, setPassword] = useState('hetansh-ece-2026');
  const [useFirebase, setUseFirebase] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firebaseStatus = getFirebaseStatus();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await loginWithCredentials(identifier, password, useFirebase, rememberMe);
      if (result.success && result.user) {
        onSuccess(result.user);
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = (account: 'owner' | 'admin') => {
    if (account === 'owner') {
      setIdentifier('hetansh');
      setPassword('hetansh-ece-2026');
    } else {
      setIdentifier('admin');
      setPassword('admin123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#F5F5F5] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#A61E2D]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <button
          onClick={onBackToPortfolio}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors py-2 px-4 border border-[#A61E2D]/15 bg-[#111111]/40 hover:border-[#A61E2D]/40"
        >
          <ArrowLeft size={14} className="text-[#A61E2D]" />
          <span>Return to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[#A0A0A0] bg-[#111111]/60 px-3 py-1.5 border border-[#A61E2D]/10">
          <ShieldCheck size={13} className="text-[#A61E2D]" />
          <span>Security Protocol Active</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-[#A61E2D]/30 bg-[#111111] rounded-none mb-2 shadow-gold-glow">
            <Lock size={22} className="text-[#A61E2D]" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
            System Console // Authentication
          </span>
          <h1 className="text-3xl font-serif text-[#F5F5F5] tracking-wide uppercase">
            Portfolio <span className="font-light italic text-[#8E949D]">Admin</span>
          </h1>
          <p className="text-xs text-[#A0A0A0] max-w-xs mx-auto leading-relaxed">
            Enter administrative credentials to modify projects, telemetry metrics, and research records.
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E]/90 backdrop-blur-xl p-8 space-y-6 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#A61E2D] to-transparent" />

          {error && (
            <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 flex items-start gap-2.5 text-xs text-[#F5F5F5]">
              <AlertCircle size={16} className="text-[#A61E2D] shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-semibold flex items-center justify-between">
                <span>Account Identifier</span>
                <span className="text-[9px] text-[#A61E2D] font-mono">ID / USER</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="hetansh or admin"
                  required
                  className="w-full bg-[#151515] border border-[#A61E2D]/20 text-[#F5F5F5] px-4 py-3 pl-10 text-xs tracking-wider focus:outline-none focus:border-[#A61E2D] transition-colors"
                />
                <User size={15} className="absolute left-3.5 top-3.5 text-[#A0A0A0]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-semibold flex items-center justify-between">
                <span>Security Token / Password</span>
                <span className="text-[9px] text-[#A61E2D] font-mono">SECURE</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#151515] border border-[#A61E2D]/20 text-[#F5F5F5] px-4 py-3 pl-10 text-xs tracking-wider focus:outline-none focus:border-[#A61E2D] transition-colors font-mono"
                />
                <Key size={15} className="absolute left-3.5 top-3.5 text-[#A0A0A0]" />
              </div>
            </div>

            {/* Firebase Auth Toggle if available */}
            <div className="pt-2 border-t border-[#A61E2D]/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#A0A0A0] hover:text-[#F5F5F5]">
                  <input
                    type="checkbox"
                    checked={useFirebase}
                    onChange={(e) => setUseFirebase(e.target.checked)}
                    disabled={!firebaseStatus.configured}
                    className="accent-[#A61E2D] w-3.5 h-3.5"
                  />
                  <span>Firebase Auth Mode</span>
                </label>
                <span className={`text-[9px] font-mono uppercase px-2 py-0.5 border ${
                  firebaseStatus.configured
                    ? 'border-[#A61E2D]/40 text-[#A61E2D] bg-[#A61E2D]/5'
                    : 'border-white/10 text-[#666] bg-black/40'
                }`}>
                  {firebaseStatus.configured ? 'Firebase Active' : 'Local Fallback'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#A0A0A0] hover:text-[#F5F5F5]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#A61E2D] w-3.5 h-3.5"
                  />
                  <span>Keep Session Active</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#A61E2D] text-[#F5F5F5] text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#C1273D] transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F5F5F5] border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Access Management Console</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="pt-4 border-t border-[#A61E2D]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-[#A0A0A0]">Quick Access Credentials:</span>
              <span className="text-[9px] text-[#A61E2D] font-mono">1-CLICK LOGIN</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => autofillDemo('owner')}
                className="p-2 border border-[#A61E2D]/15 bg-[#141414] hover:border-[#A61E2D]/50 text-left transition-colors"
              >
                <div className="text-[10px] text-[#F5F5F5] font-bold uppercase">Hetansh (Owner)</div>
                <div className="text-[9px] text-[#A0A0A0] font-mono">hetansh / hetansh-ece-2026</div>
              </button>
              <button
                type="button"
                onClick={() => autofillDemo('admin')}
                className="p-2 border border-[#A61E2D]/15 bg-[#141414] hover:border-[#A61E2D]/50 text-left transition-colors"
              >
                <div className="text-[10px] text-[#F5F5F5] font-bold uppercase">Admin (Standard)</div>
                <div className="text-[9px] text-[#A0A0A0] font-mono">admin / admin123</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-[#666666] uppercase tracking-widest font-mono">
          <Database size={11} className="text-[#A61E2D]" />
          <span>Dynamic Firestore &amp; Local Dual-Sync Engine</span>
        </div>
      </motion.div>
    </div>
  );
};
