import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  MoveUp,
  MoveDown,
  ExternalLink,
  Save,
  X,
  Code2,
  Cpu,
  Check
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ProjectItem } from '../../types/portfolio';

export const ProjectsManager: React.FC = () => {
  const { data, addProject, updateProject, deleteProject, reorderProjects } = usePortfolio();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form State
  const initialFormState: ProjectItem = {
    id: '',
    title: '',
    category: 'CASE STUDY // EMBEDDED SYSTEMS',
    tagline: '',
    problem: '',
    approach: '',
    outcome: '',
    techSpecs: {
      mcu: 'ESP32 NodeMCU',
      sensors: 'Analog & Digital Sensors',
      protocol: 'SPI / I2C / UART',
      languages: 'C++ / Embedded C'
    },
    metrics: [
      { label: 'Latency', value: '< 10ms' },
      { label: 'Accuracy', value: '98%' }
    ],
    githubUrl: 'https://github.com/hex021'
  };

  const [formData, setFormData] = useState<ProjectItem>(initialFormState);

  const startCreate = () => {
    setFormData({
      ...initialFormState,
      id: 'proj-' + Date.now().toString(36)
    });
    setIsCreating(true);
    setEditingProject(null);
  };

  const startEdit = (proj: ProjectItem) => {
    setFormData(JSON.parse(JSON.stringify(proj)));
    setEditingProject(proj);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (isCreating) {
      const generatedId = formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await addProject({ ...formData, id: generatedId });
      setStatusMessage(`Created project "${formData.title}"`);
    } else if (editingProject) {
      await updateProject(editingProject.id, formData);
      setStatusMessage(`Updated project "${formData.title}"`);
    }

    setTimeout(() => setStatusMessage(null), 3000);
    handleCancel();
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setConfirmDeleteId(null);
    setStatusMessage('Project deleted successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.projects.length) return;

    const list = [...data.projects];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    await reorderProjects(list);
  };

  // Dynamic Metrics management
  const addMetricRow = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { label: 'Metric Name', value: 'Value' }]
    });
  };

  const updateMetric = (index: number, key: 'label' | 'value', val: string) => {
    const updated = [...formData.metrics];
    updated[index][key] = val;
    setFormData({ ...formData, metrics: updated });
  };

  const removeMetric = (index: number) => {
    const updated = formData.metrics.filter((_, i) => i !== index);
    setFormData({ ...formData, metrics: updated });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#A61E2D]/15">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
            Subsystem Manager
          </span>
          <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
            Projects <span className="font-light italic text-[#8E949D]">&amp; Case Studies</span>
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Manage public portfolio executions, hardware specs, telemetry outcomes, and repository links.
          </p>
        </div>

        {!isCreating && !editingProject && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-gold-glow cursor-pointer"
          >
            <Plus size={15} />
            <span>New Case Study</span>
          </button>
        )}
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Editor Modal / Drawer */}
      <AnimatePresence>
        {(isCreating || editingProject) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-[#A61E2D]/30 bg-[#0E0E0E] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[#A61E2D]/15 pb-4">
              <div className="flex items-center gap-3">
                <Code2 size={18} className="text-[#A61E2D]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F5F5]">
                  {isCreating ? 'Initialize New Case Study' : `Edit: ${editingProject?.title}`}
                </h3>
              </div>
              <button
                onClick={handleCancel}
                className="text-[#A0A0A0] hover:text-[#F5F5F5] p-1.5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Row 1: Title, Category, GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Smart Crop & Scheme Advisor"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Category Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. CASE STUDY // AGRICULTURAL AI"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/hex021/..."
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                  Tagline (High-impact summary)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Translating environmental telemetry logs into intelligent agricultural recommendations."
                  className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                />
              </div>

              {/* Technical Blueprint (MCU, Sensors, Protocol, Compilers) */}
              <div className="p-5 border border-[#A61E2D]/15 bg-[#121212]/50 space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-[#A61E2D]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5]">
                    Hardware &amp; Firmware Blueprint
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-[#A0A0A0]">Microcontroller / Host</label>
                    <input
                      type="text"
                      value={formData.techSpecs.mcu}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          techSpecs: { ...formData.techSpecs, mcu: e.target.value }
                        })
                      }
                      placeholder="e.g. ESP32 NodeMCU"
                      className="w-full bg-[#181818] border border-white/10 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-[#A0A0A0]">Sensors / Transducers</label>
                    <input
                      type="text"
                      value={formData.techSpecs.sensors}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          techSpecs: { ...formData.techSpecs, sensors: e.target.value }
                        })
                      }
                      placeholder="e.g. MPU6050, Optical NPK"
                      className="w-full bg-[#181818] border border-white/10 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-[#A0A0A0]">Protocol / Link Bus</label>
                    <input
                      type="text"
                      value={formData.techSpecs.protocol}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          techSpecs: { ...formData.techSpecs, protocol: e.target.value }
                        })
                      }
                      placeholder="e.g. ESP-NOW / I2C / UART"
                      className="w-full bg-[#181818] border border-white/10 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-[#A0A0A0]">Languages / Frameworks</label>
                    <input
                      type="text"
                      value={formData.techSpecs.languages}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          techSpecs: { ...formData.techSpecs, languages: e.target.value }
                        })
                      }
                      placeholder="e.g. Embedded C++, Python"
                      className="w-full bg-[#181818] border border-white/10 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                  </div>
                </div>
              </div>

              {/* Narrative Triad: Problem, Approach, Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    The Problem
                  </label>
                  <textarea
                    rows={4}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="Describe the operational challenge or engineering bottleneck..."
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] leading-relaxed resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Engineering Approach
                  </label>
                  <textarea
                    rows={4}
                    value={formData.approach}
                    onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                    placeholder="Describe circuit design, algorithm implementation, firmware structure..."
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] leading-relaxed resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Telemetry Outcome
                  </label>
                  <textarea
                    rows={4}
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="Describe latency benchmarks, accuracy percentages, test results..."
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] leading-relaxed resize-y"
                  />
                </div>
              </div>

              {/* Metrics Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold">
                    Telemetry Metric Badges
                  </label>
                  <button
                    type="button"
                    onClick={addMetricRow}
                    className="text-[10px] text-[#A61E2D] hover:underline uppercase tracking-wider font-semibold flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Metric
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {formData.metrics.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#151515] border border-white/10 p-2">
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => updateMetric(idx, 'label', e.target.value)}
                        placeholder="Label"
                        className="w-1/2 bg-transparent text-xs text-[#A0A0A0] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                        placeholder="Value"
                        className="w-1/2 bg-transparent text-xs font-bold text-[#A61E2D] focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        className="text-[#666] hover:text-[#A61E2D] p-1"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#A61E2D]/15">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-white/15 text-xs text-[#A0A0A0] hover:text-[#F5F5F5] hover:border-white/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow"
                >
                  <Save size={14} />
                  <span>{isCreating ? 'Publish Case Study' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#A0A0A0] px-2 font-mono uppercase">
          <span>{data.projects.length} Registered Project Case Studies</span>
          <span>Order is reflected live on website</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="border border-[#A61E2D]/15 bg-[#0D0D0D] p-5 hover:border-[#A61E2D]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
            >
              {/* Left Details */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-mono font-bold text-[#A61E2D] tracking-widest px-2 py-0.5 border border-[#A61E2D]/30 bg-[#A61E2D]/5">
                    {proj.category}
                  </span>
                  <span className="text-[10px] text-[#A0A0A0] font-mono">
                    ID: {proj.id}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F5F5F5] tracking-wide uppercase">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-2">
                  {proj.tagline || proj.problem}
                </p>

                {/* Tech Specs chips preview */}
                <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono text-[#8E949D]">
                  <span className="bg-[#151515] px-2 py-0.5 border border-white/5">MCU: {proj.techSpecs.mcu}</span>
                  <span className="bg-[#151515] px-2 py-0.5 border border-white/5">Sensors: {proj.techSpecs.sensors}</span>
                  <span className="bg-[#151515] px-2 py-0.5 border border-white/5">Protocol: {proj.techSpecs.protocol}</span>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                {/* Reorder Buttons */}
                <div className="flex md:flex-col gap-1 mr-2">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    title="Move Up"
                    className="p-1.5 border border-white/10 text-[#A0A0A0] hover:text-[#F5F5F5] hover:border-white/30 disabled:opacity-20 cursor-pointer"
                  >
                    <MoveUp size={13} />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === data.projects.length - 1}
                    title="Move Down"
                    className="p-1.5 border border-white/10 text-[#A0A0A0] hover:text-[#F5F5F5] hover:border-white/30 disabled:opacity-20 cursor-pointer"
                  >
                    <MoveDown size={13} />
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => startEdit(proj)}
                  className="flex items-center gap-1 px-3 py-2 border border-white/20 hover:border-[#A61E2D] text-xs text-[#F5F5F5] hover:text-[#A61E2D] bg-[#141414] transition-colors"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                {/* GitHub link icon */}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Open GitHub Repo"
                    className="p-2 border border-white/10 hover:border-white/30 text-[#A0A0A0] hover:text-[#F5F5F5]"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}

                {/* Delete Button / Confirmation */}
                {confirmDeleteId === proj.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="px-2.5 py-1.5 bg-[#A61E2D] text-[#F5F5F5] text-[10px] font-bold uppercase"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2 py-1.5 border border-white/20 text-[10px] text-[#A0A0A0]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(proj.id)}
                    title="Delete Project"
                    className="p-2 border border-white/10 hover:border-red-500/50 text-[#A0A0A0] hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
