import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Calendar, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { TimelineItem } from '../../types/portfolio';

export const TimelineManager: React.FC = () => {
  const { data, addTimelineItem, updateTimelineItem, deleteTimelineItem } = usePortfolio();
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const initialFormState: TimelineItem = {
    id: '',
    date: '2026',
    title: '',
    institution: '',
    highlights: ['Key responsibility or educational milestone']
  };

  const [formData, setFormData] = useState<TimelineItem>(initialFormState);
  const [newHighlight, setNewHighlight] = useState('');

  const startCreate = () => {
    setFormData({
      ...initialFormState,
      id: 'time-' + Date.now().toString(36)
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const startEdit = (item: TimelineItem) => {
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
      const generatedId = formData.id || 'time-' + Date.now().toString(36);
      await addTimelineItem({ ...formData, id: generatedId });
      setStatusMessage(`Added timeline milestone "${formData.title}"`);
    } else if (editingItem) {
      await updateTimelineItem(editingItem.id, formData);
      setStatusMessage(`Updated timeline milestone "${formData.title}"`);
    }

    setTimeout(() => setStatusMessage(null), 3000);
    handleCancel();
  };

  const handleDelete = async (itemId: string) => {
    await deleteTimelineItem(itemId);
    setConfirmDeleteId(null);
    setStatusMessage('Timeline entry removed.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setFormData({
      ...formData,
      highlights: [...formData.highlights, newHighlight.trim()]
    });
    setNewHighlight('');
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#A61E2D]/15">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
            Academic &amp; Professional Trajectory
          </span>
          <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
            Timeline <span className="font-light italic text-[#8E949D]">Manager</span>
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Configure chronological trajectory nodes: degrees, society roles, internships, and academic records.
          </p>
        </div>

        {!isCreating && !editingItem && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-gold-glow cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Trajectory Node</span>
          </button>
        )}
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Editor Modal */}
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
                <Calendar size={18} className="text-[#A61E2D]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F5F5]">
                  {isCreating ? 'Initialize Trajectory Node' : `Edit: ${editingItem?.title}`}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Timeframe / Date Span *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. 01/2025 - Present or Expected 06/2028"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Role / Degree / Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. B.Tech: Electronics & Communication Engineering"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Institution / Chapter
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Pandit Deendayal Energy University (PDEU)"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                  Milestone Highlights &amp; Accomplishments
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addHighlight();
                      }
                    }}
                    placeholder="Add highlight (e.g. Cumulative GPA: 8.42 / 10)..."
                    className="flex-1 bg-[#151515] border border-white/10 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="px-4 py-2 bg-[#A61E2D] text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C1273D]"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-2 bg-[#151515] border border-white/10 text-xs text-[#B8BCC4]"
                    >
                      <span className="flex-1">— {h}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(idx)}
                        className="text-[#666] hover:text-[#A61E2D] p-1"
                      >
                        <X size={14} />
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
                  className="px-4 py-2 border border-white/15 text-xs text-[#A0A0A0] hover:text-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow"
                >
                  <Save size={14} />
                  <span>{isCreating ? 'Publish Node' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trajectory List */}
      <div className="space-y-4">
        {data.timeline.map((item) => (
          <div
            key={item.id}
            className="border border-[#A61E2D]/15 bg-[#0D0D0D] p-5 hover:border-[#A61E2D]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-5 group"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono text-[#A61E2D] font-bold px-2 py-0.5 border border-[#A61E2D]/30 bg-[#A61E2D]/5">
                  {item.date}
                </span>
                <span className="text-xs text-[#A0A0A0] font-semibold">{item.institution}</span>
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5] tracking-wide uppercase">
                {item.title}
              </h3>
              <ul className="text-xs text-[#8E949D] space-y-1 pt-1">
                {item.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <span className="text-[#A61E2D] select-none">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
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
                  title="Delete Trajectory Node"
                  className="p-1.5 border border-white/10 hover:border-red-500/50 text-[#A0A0A0] hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
