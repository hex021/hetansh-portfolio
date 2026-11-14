import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, FlaskConical, Check, Cpu } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ResearchItem } from '../../types/portfolio';

export const ResearchManager: React.FC = () => {
  const { data, addResearch, updateResearch, deleteResearch } = usePortfolio();
  const [editingItem, setEditingItem] = useState<ResearchItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const initialFormState: ResearchItem = {
    id: '',
    title: '',
    badge: 'Active Research Project',
    department: 'Department of Civil & ECE',
    supervisor: 'Dr. Uma Chaduvula',
    period: 'January 2026 – Present',
    location: 'Geotech Laboratory, PDEU',
    summary: '',
    contributions: [
      'Designed circuit schematics for multi-sensor acquisition nodes',
      'Calibrated ultrasonic transducers and strain gauge amplification circuits'
    ],
    techStack: ['ESP32', 'Ultrasonic Sensors', 'Strain Gauges', 'Python'],
    researchInterests: ['IoT and Embedded Systems', 'Sensor Instrumentation', 'Wireless Sensing'],
    docUrl: 'https://github.com/hex021'
  };

  const [formData, setFormData] = useState<ResearchItem>(initialFormState);
  const [newContribution, setNewContribution] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const startCreate = () => {
    setFormData({
      ...initialFormState,
      id: 'res-' + Date.now().toString(36)
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const startEdit = (item: ResearchItem) => {
    setFormData(JSON.parse(JSON.stringify(item)));
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (isCreating) {
      const generatedId = formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await addResearch({ ...formData, id: generatedId });
      setStatusMessage(`Created research project "${formData.title}"`);
    } else if (editingItem) {
      await updateResearch(editingItem.id, formData);
      setStatusMessage(`Updated research project "${formData.title}"`);
    }

    setTimeout(() => setStatusMessage(null), 3000);
    handleCancel();
  };

  const handleDelete = async (id: string) => {
    await deleteResearch(id);
    setConfirmDeleteId(null);
    setStatusMessage('Research project deleted successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Contributions helpers
  const addContribution = () => {
    if (!newContribution.trim()) return;
    setFormData({
      ...formData,
      contributions: [...formData.contributions, newContribution.trim()]
    });
    setNewContribution('');
  };

  const removeContribution = (index: number) => {
    setFormData({
      ...formData,
      contributions: formData.contributions.filter((_, i) => i !== index)
    });
  };

  // Tech stack helpers
  const addTech = () => {
    if (!newTech.trim()) return;
    setFormData({
      ...formData,
      techStack: [...formData.techStack, newTech.trim()]
    });
    setNewTech('');
  };

  const removeTech = (index: number) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index)
    });
  };

  // Research interests helpers
  const addInterest = () => {
    if (!newInterest.trim()) return;
    setFormData({
      ...formData,
      researchInterests: [...formData.researchInterests, newInterest.trim()]
    });
    setNewInterest('');
  };

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      researchInterests: formData.researchInterests.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#A61E2D]/15">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
            Academic &amp; Lab Research
          </span>
          <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
            Research <span className="font-light italic text-[#8E949D]">Manager</span>
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Maintain academic investigations, sensor instrumentation rigs, and research supervisor attributions.
          </p>
        </div>

        {!isCreating && !editingItem && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-gold-glow cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Research Project</span>
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
        {(isCreating || editingItem) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-[#A61E2D]/30 bg-[#0E0E0E] p-6 md:p-8 space-y-6 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-[#A61E2D]/15 pb-4">
              <div className="flex items-center gap-3">
                <FlaskConical size={18} className="text-[#A61E2D]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F5F5]">
                  {isCreating ? 'Initialize Research Entry' : `Edit: ${editingItem?.title}`}
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
              {/* Row 1: Title & Badge */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Research Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Low-Cost Smart Monitoring System..."
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Active Research Project"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>

              {/* Row 2: Supervisor, Department, Timeline, Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#A0A0A0]">Supervisor Name</label>
                  <input
                    type="text"
                    value={formData.supervisor}
                    onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                    placeholder="Dr. Uma Chaduvula"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#A0A0A0]">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Department of Civil & ECE"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#A0A0A0]">Period / Timeline</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="January 2026 – Present"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#A0A0A0]">Lab / Facility</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Geotech Laboratory, PDEU"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                  Project Overview Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Describe the research objective, methodology, and sensor configurations..."
                  className="w-full bg-[#151515] border border-[#A61E2D]/20 p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] leading-relaxed resize-y"
                />
              </div>

              {/* Key Contributions */}
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                  Key Contributions &amp; Milestones
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newContribution}
                    onChange={(e) => setNewContribution(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addContribution();
                      }
                    }}
                    placeholder="Add a new contribution bullet point..."
                    className="flex-1 bg-[#151515] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                  <button
                    type="button"
                    onClick={addContribution}
                    className="px-4 py-2 bg-[#A61E2D] text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C1273D]"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {formData.contributions.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-2 bg-[#151515] border border-white/10 text-xs text-[#B8BCC4]"
                    >
                      <span className="flex-1">— {c}</span>
                      <button
                        type="button"
                        onClick={() => removeContribution(idx)}
                        className="text-[#666] hover:text-[#A61E2D] p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instrumentation Stack & Research Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tech Stack */}
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                    <Cpu size={13} className="text-[#A61E2D]" />
                    <span>Instrumentation Stack</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTech();
                        }
                      }}
                      placeholder="e.g. ESP32, Strain Gauges..."
                      className="flex-1 bg-[#151515] border border-white/10 px-3 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                    <button
                      type="button"
                      onClick={addTech}
                      className="px-3 py-1.5 bg-[#181818] border border-white/20 text-[#F5F5F5] text-xs hover:border-[#A61E2D]"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#151515] border border-[#A61E2D]/20 text-[10px] text-[#A0A0A0] font-mono"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => removeTech(idx)}
                          className="hover:text-[#A61E2D]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research Interests */}
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Domain / Research Interests
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addInterest();
                        }
                      }}
                      placeholder="e.g. Signal Processing..."
                      className="flex-1 bg-[#151515] border border-white/10 px-3 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                    <button
                      type="button"
                      onClick={addInterest}
                      className="px-3 py-1.5 bg-[#181818] border border-white/20 text-[#F5F5F5] text-xs hover:border-[#A61E2D]"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.researchInterests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#A61E2D]/5 border border-[#A61E2D]/30 text-[10px] text-[#A61E2D] font-mono"
                      >
                        <span>{interest}</span>
                        <button
                          type="button"
                          onClick={() => removeInterest(idx)}
                          className="hover:text-[#F5F5F5]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#A61E2D]/15">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-white/15 text-xs text-[#A0A0A0] hover:text-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow"
                >
                  <Save size={14} />
                  <span>{isCreating ? 'Publish Research Record' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Research List */}
      <div className="space-y-4">
        {data.research.map((item) => (
          <div
            key={item.id}
            className="border border-[#A61E2D]/15 bg-[#0D0D0D] p-6 hover:border-[#A61E2D]/40 transition-all space-y-4 group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-mono font-bold text-[#A61E2D] px-2 py-0.5 border border-[#A61E2D]/30 bg-[#A61E2D]/5 uppercase">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[#A0A0A0]">{item.period}</span>
                  <span className="text-xs text-[#A0A0A0]">Supervisor: {item.supervisor}</span>
                </div>
                <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A0A0A0] max-w-3xl leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="flex items-center gap-1 px-3 py-1.5 border border-white/20 hover:border-[#A61E2D] text-xs text-[#F5F5F5] hover:text-[#A61E2D] bg-[#141414] transition-colors"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                {confirmDeleteId === item.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(item.id)}
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
                    onClick={() => setConfirmDeleteId(item.id)}
                    title="Delete Record"
                    className="p-1.5 border border-white/10 hover:border-red-500/50 text-[#A0A0A0] hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Contributions preview */}
            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#A61E2D] font-bold block">
                Contributions Log ({item.contributions.length})
              </span>
              <ul className="text-xs text-[#8E949D] space-y-1">
                {item.contributions.slice(0, 3).map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A61E2D] select-none">—</span>
                    <span>{c}</span>
                  </li>
                ))}
                {item.contributions.length > 3 && (
                  <li className="text-[10px] text-[#666] font-mono italic">
                    +{item.contributions.length - 3} more contributions...
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
