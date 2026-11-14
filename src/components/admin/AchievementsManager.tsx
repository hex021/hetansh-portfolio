import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Trophy, Wrench, Award, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { AchievementItem, AchievementCategory } from '../../types/portfolio';

export const AchievementsManager: React.FC = () => {
  const { data, addAchievementItem, updateAchievementItem, deleteAchievementItem } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('hackathons');
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const initialFormState: AchievementItem = {
    id: '',
    title: '',
    organizer: '',
    period: '2026',
    domain: '',
    description: '',
    highlight: '',
    tags: []
  };

  const [formData, setFormData] = useState<AchievementItem>(initialFormState);
  const [newTag, setNewTag] = useState('');

  const currentCat = data.achievements.find((c) => c.id === selectedCategory) || data.achievements[0];

  const startCreate = () => {
    setFormData({
      ...initialFormState,
      id: 'ach-' + Date.now().toString(36)
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const startEdit = (item: AchievementItem) => {
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
      const generatedId = formData.id || 'ach-' + Date.now().toString(36);
      await addAchievementItem(selectedCategory, { ...formData, id: generatedId });
      setStatusMessage(`Added milestone "${formData.title}"`);
    } else if (editingItem) {
      await updateAchievementItem(selectedCategory, editingItem.id, formData);
      setStatusMessage(`Updated milestone "${formData.title}"`);
    }

    setTimeout(() => setStatusMessage(null), 3000);
    handleCancel();
  };

  const handleDelete = async (itemId: string) => {
    await deleteAchievementItem(selectedCategory, itemId);
    setConfirmDeleteId(null);
    setStatusMessage('Milestone record deleted.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    setFormData({
      ...formData,
      tags: [...formData.tags, newTag.trim()]
    });
    setNewTag('');
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy size={14} className="text-[#A61E2D]" />;
      case 'wrench':
        return <Wrench size={14} className="text-[#A61E2D]" />;
      case 'award':
      default:
        return <Award size={14} className="text-[#A61E2D]" />;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#A61E2D]/15">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
            Competitive &amp; Credential Milestones
          </span>
          <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
            Achievements <span className="font-light italic text-[#8E949D]">Manager</span>
          </h2>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Configure hackathons, technical workshops, and formal institutional certifications.
          </p>
        </div>

        {!isCreating && !editingItem && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-gold-glow cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Milestone</span>
          </button>
        )}
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
        {data.achievements.map((cat: AchievementCategory) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                handleCancel();
              }}
              className={`flex items-center gap-2.5 px-4 py-2 border text-xs uppercase tracking-wider transition-all ${
                isActive
                  ? 'border-[#A61E2D] bg-[#A61E2D]/15 text-[#F5F5F5] font-bold shadow-gold-glow'
                  : 'border-white/10 text-[#A0A0A0] hover:text-[#F5F5F5] hover:border-white/25 bg-[#111111]/40'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono text-[#8E949D]">({cat.items.length})</span>
            </button>
          );
        })}
      </div>

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
                {getCategoryIcon(currentCat?.iconName || 'award')}
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F5F5]">
                  {isCreating ? `Add to ${currentCat?.label}` : `Edit: ${editingItem?.title}`}
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
              {/* Row 1: Title, Organizer, Period */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. DEV:Init Hackathon"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Organizer / Entity
                  </label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    placeholder="e.g. Google Developer Groups (GDG)"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Timeframe / Year
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2026 or 3-Day Intensive"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>

              {/* Row 2: Domain & Highlight Badge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Domain / Track
                  </label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="e.g. AI & Smart Urban Infrastructure"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                    Highlight Pill Badge
                  </label>
                  <input
                    type="text"
                    value={formData.highlight || ''}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                    placeholder="e.g. Featured Urban AI Project"
                    className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                  Achievement Narrative / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the technical contribution, architecture, or competitive standing achieved..."
                  className="w-full bg-[#151515] border border-[#A61E2D]/20 p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] leading-relaxed resize-y"
                />
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                  Technology / Topic Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add tag (e.g. PyTorch, YOLO, ROS 2)..."
                    className="flex-1 bg-[#151515] border border-white/10 px-3 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-1.5 bg-[#181818] border border-white/20 text-[#F5F5F5] text-xs hover:border-[#A61E2D]"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#151515] border border-[#A61E2D]/20 text-[10px] text-[#8E949D] font-mono"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className="hover:text-[#A61E2D]"
                      >
                        ×
                      </button>
                    </span>
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
                  <span>{isCreating ? 'Publish Milestone' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      <div className="space-y-4">
        {currentCat?.items.map((item: AchievementItem) => (
          <div
            key={item.id}
            className="border border-[#A61E2D]/15 bg-[#0D0D0D] p-5 hover:border-[#A61E2D]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-5 group"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono text-[#A61E2D] font-bold">
                  {item.period}
                </span>
                <span className="text-xs text-[#A0A0A0] font-semibold">{item.organizer}</span>
                {item.highlight && (
                  <span className="text-[9px] font-mono text-[#F5F5F5] px-2 py-0.5 border border-[#A61E2D]/40 bg-[#A61E2D]/10">
                    {item.highlight}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#F5F5F5] tracking-wide uppercase">
                {item.title}
              </h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] font-mono text-[#8E949D] px-2 py-0.5 bg-[#151515] border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
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
                  title="Delete Milestone"
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
