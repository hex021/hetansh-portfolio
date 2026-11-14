import React, { useState } from 'react';
import {
  Palette,
  Layout,
  Sliders,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  Cpu,
  Save,
  RotateCcw
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { UISettings } from '../../types/portfolio';

const PRESET_THEMES = [
  { id: 'crimson', name: 'Executive Crimson', hex: '#A61E2D', desc: 'Luxury dark titanium with bold crimson accent (Default)' },
  { id: 'titanium', name: 'Cyber Titanium', hex: '#8E949D', desc: 'High-end monochromatic aerospace engineering' },
  { id: 'gold', name: 'Heritage Amber Gold', hex: '#D4AF37', desc: 'Classic luxury gold with warm metallic resonance' },
  { id: 'emerald', name: 'Emerald Matrix', hex: '#10B981', desc: 'Precision terminal telemetry & cybernetic green' },
  { id: 'cobalt', name: 'Electric Cobalt', hex: '#3B82F6', desc: 'Deep robotics & aeronautics avionics blue' },
] as const;

export const UIManager: React.FC = () => {
  const { data, updateUISettings } = usePortfolio();
  const [formData, setFormData] = useState<UISettings>(() => data.ui);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handlePresetSelect = (hex: string, presetId: UISettings['themePreset']) => {
    setFormData((prev) => ({
      ...prev,
      accentColor: hex,
      themePreset: presetId
    }));
  };

  const handleCustomColor = (hex: string) => {
    setFormData((prev) => ({
      ...prev,
      accentColor: hex,
      themePreset: 'custom'
    }));
  };

  const handleToggleSection = (sectionKey: keyof UISettings['visibleSections']) => {
    setFormData((prev) => ({
      ...prev,
      visibleSections: {
        ...prev.visibleSections,
        [sectionKey]: !prev.visibleSections[sectionKey]
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUISettings(formData);
    setStatusMessage('UI and theme settings updated live across all sections.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleResetUI = () => {
    const defaults: UISettings = {
      accentColor: '#A61E2D',
      themePreset: 'crimson',
      showBackgroundCanvas: true,
      showPCBTraces: true,
      directGithubClick: false,
      heroFirstName: 'Hetansh',
      heroLastName: 'Patel',
      creedQuote: '"We do not just compile code; we instruct electrons to manifest physical action."',
      visibleSections: {
        about: true,
        philosophy: true,
        expertise: true,
        projects: true,
        research: true,
        dashboard: true,
        network: true,
        timeline: true,
        achievements: true,
        beyond: true,
        contact: true
      }
    };
    setFormData(defaults);
    setStatusMessage('UI controls reset to default executive theme.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#A61E2D]/15">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
            Interface &amp; Visual Design Engine
          </span>
          <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
            UI <span className="font-light italic text-[#8E949D]">&amp; Theme Customizer</span>
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Configure dynamic accent colors, hero identity typography, GitHub redirection behavior, and section visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetUI}
          className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-white/30 text-xs text-[#A0A0A0] hover:text-[#F5F5F5] bg-[#141414] transition-all"
        >
          <RotateCcw size={13} />
          <span>Reset Theme</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Color Palette & Accent Customization */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Palette size={16} className="text-[#A61E2D]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Color Palette &amp; Accent Highlights
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: formData.accentColor }} />
              <span className="text-xs font-mono font-bold uppercase" style={{ color: formData.accentColor }}>
                {formData.accentColor}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#A0A0A0] leading-relaxed">
            Select an executive color preset or choose any custom hex tone. Changes instantly tint buttons, borders, telemetry badges, and interactive circuit elements.
          </p>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESET_THEMES.map((theme) => {
              const isSelected = formData.accentColor.toLowerCase() === theme.hex.toLowerCase();
              return (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => handlePresetSelect(theme.hex, theme.id)}
                  className={`p-4 border text-left transition-all relative flex flex-col justify-between space-y-3 cursor-pointer ${
                    isSelected
                      ? 'border-[#A61E2D] bg-[#181818] shadow-gold-glow'
                      : 'border-white/10 bg-[#121212] hover:border-white/25 hover:bg-[#151515]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                      {theme.name}
                    </span>
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.hex }}
                    />
                  </div>
                  <p className="text-[11px] text-[#A0A0A0] leading-relaxed font-light">
                    {theme.desc}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-[10px]">
                    <span className="text-[#8E949D]">{theme.hex}</span>
                    {isSelected && (
                      <span className="text-[#A61E2D] flex items-center gap-1 font-bold">
                        <Check size={11} /> ACTIVE
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Custom Color Input Card */}
            <div className="p-4 border border-white/10 bg-[#121212] flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                  Custom Accent Hex
                </span>
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => handleCustomColor(e.target.value)}
                  className="w-6 h-6 border-0 bg-transparent cursor-pointer rounded-none"
                  title="Pick a custom color"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-[#A0A0A0]">Enter Hex Code:</label>
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => handleCustomColor(e.target.value)}
                  placeholder="#A61E2D"
                  className="w-full bg-[#181818] border border-white/10 px-3 py-1.5 text-xs font-mono text-[#F5F5F5] uppercase focus:outline-none focus:border-[#A61E2D]"
                />
              </div>
              <span className="text-[10px] text-[#8E949D] font-mono">Live updates site CSS variables</span>
            </div>
          </div>
        </div>

        {/* Section 2: Project Interaction & GitHub Redirection */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <ExternalLink size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Project Navigation &amp; GitHub Redirection Mode
            </h3>
          </div>

          <div className="p-5 border border-white/10 bg-[#141414] space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#F5F5F5] block">
                  Direct GitHub Redirection on Project Card Click
                </span>
                <p className="text-xs text-[#A0A0A0] leading-relaxed max-w-2xl">
                  When enabled, clicking on any project card in the portfolio immediately redirects the visitor to that project's GitHub repository in a new tab. When disabled, clicking opens the interactive specifications view with a prominent GitHub button.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={formData.directGithubClick}
                  onChange={(e) => setFormData({ ...formData, directGithubClick: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#252525] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A61E2D]" />
              </label>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-[#8E949D] pt-2 border-t border-white/5">
              <span className="px-2 py-0.5 bg-black/40 border border-white/10">
                Mode: {formData.directGithubClick ? 'Direct GitHub Redirect' : 'Interactive Details with GitHub Badge'}
              </span>
              <span>• Projects also include dedicated repository icons on each card</span>
            </div>
          </div>
        </div>

        {/* Section 3: Visual Background Effects */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Cpu size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Circuit Grid &amp; Particle Mesh Effects
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-white/10 bg-[#141414] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5] block">
                  Global Particle Mesh Canvas
                </span>
                <span className="text-[11px] text-[#A0A0A0] block">
                  Interactive multi-node canvas with physics and oscilloscope sweeps
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.showBackgroundCanvas}
                  onChange={(e) => setFormData({ ...formData, showBackgroundCanvas: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#252525] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A61E2D]" />
              </label>
            </div>

            <div className="p-4 border border-white/10 bg-[#141414] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5] block">
                  PCB Traces Grid Overlay
                </span>
                <span className="text-[11px] text-[#A0A0A0] block">
                  Subtle semiconductor circuit traces in the Projects section
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.showPCBTraces}
                  onChange={(e) => setFormData({ ...formData, showPCBTraces: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#252525] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A61E2D]" />
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Hero Typography & Creed Customizer */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Sliders size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Hero Typography &amp; Philosophy Creed
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                Hero First Name
              </label>
              <input
                type="text"
                value={formData.heroFirstName || ''}
                onChange={(e) => setFormData({ ...formData, heroFirstName: e.target.value })}
                placeholder="Hetansh"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                Hero Last Name (Titanium Italic Accent)
              </label>
              <input
                type="text"
                value={formData.heroLastName || ''}
                onChange={(e) => setFormData({ ...formData, heroLastName: e.target.value })}
                placeholder="Patel"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
              Creed / Philosophy Quote
            </label>
            <input
              type="text"
              value={formData.creedQuote || ''}
              onChange={(e) => setFormData({ ...formData, creedQuote: e.target.value })}
              placeholder='"We do not just compile code; we instruct electrons to manifest physical action."'
              className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
            />
          </div>
        </div>

        {/* Section 5: Section Visibility Controls */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Layout size={16} className="text-[#A61E2D]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Section Visibility Controls
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#8E949D] uppercase">
              SHOW / HIDE INDIVIDUAL SECTIONS
            </span>
          </div>

          <p className="text-xs text-[#A0A0A0]">
            Toggle any section off if you want to streamline the portfolio for specific recruiters or roles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(formData.visibleSections).map(([key, visible]) => {
              const labelMap: Record<string, string> = {
                about: '01 / About & Background',
                philosophy: '02 / Creed & Philosophy',
                expertise: '03 / Technical Skillset',
                projects: '04 / Case Studies',
                research: '05 / Active Research',
                dashboard: '06 / Operations Dashboard',
                network: '07 / 3D Network Graph',
                timeline: '08 / Trajectory Timeline',
                achievements: '09 / Key Milestones',
                beyond: '10 / Beyond Engineering',
                contact: '11 / Contact Module'
              };

              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleToggleSection(key as keyof UISettings['visibleSections'])}
                  className={`p-3 border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    visible
                      ? 'border-[#A61E2D]/40 bg-[#161616] text-[#F5F5F5]'
                      : 'border-white/10 bg-[#101010] text-[#666]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {visible ? (
                      <Eye size={13} className="text-[#A61E2D]" />
                    ) : (
                      <EyeOff size={13} className="text-[#666]" />
                    )}
                    <span className="text-xs font-mono font-semibold">
                      {labelMap[key] || key}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 border ${
                      visible
                        ? 'border-[#A61E2D]/50 text-[#A61E2D] bg-[#A61E2D]/10'
                        : 'border-white/10 text-[#666]'
                    }`}
                  >
                    {visible ? 'VISIBLE' : 'HIDDEN'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-gold-glow"
          >
            <Save size={15} />
            <span>Apply UI &amp; Theme Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};