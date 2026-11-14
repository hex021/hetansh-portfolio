import React, { useState } from 'react';
import {
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Globe,
  Share2,
  Check,
  FileText,
  UploadCloud,
  ExternalLink,
  Plus,
  Trash2,
  RotateCcw,
  FileCheck
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ProfileData, CustomLinkItem } from '../../types/portfolio';

export const ProfileManager: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState<ProfileData>(data.profile);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setStatusMessage('Profile, hyperlinks, and resume credentials updated successfully.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // PDF File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Please select a valid PDF document (.pdf).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB. For larger documents, consider using an external Google Drive link.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        resumeUrl: base64Data,
        resumeFileName: file.name
      }));
      setUploadFeedback(`Loaded "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Click "Save Changes" to publish.`);
    };
    reader.onerror = () => {
      alert('Failed to read PDF file. Please try again or provide an external URL.');
    };
    reader.readAsDataURL(file);
  };

  const handleResetResume = () => {
    setFormData(prev => ({
      ...prev,
      resumeUrl: '/Hetansh_Patel_Resume.pdf',
      resumeFileName: 'Hetansh_Patel_Resume.pdf'
    }));
    setUploadFeedback('Reset resume to default repository PDF.');
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  // Custom links handlers
  const handleAddCustomLink = () => {
    const newLink: CustomLinkItem = {
      id: `link-${Date.now()}`,
      label: 'New Link',
      url: 'https://'
    };
    setFormData(prev => ({
      ...prev,
      customLinks: [...(prev.customLinks || []), newLink]
    }));
  };

  const handleUpdateCustomLink = (id: string, field: 'label' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      customLinks: (prev.customLinks || []).map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleDeleteCustomLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customLinks: (prev.customLinks || []).filter(link => link.id !== id)
    }));
  };

  const getResumeBadge = () => {
    if (formData.resumeUrl?.startsWith('data:application/pdf')) {
      return { label: 'Direct Uploaded PDF (Base64)', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    }
    if (formData.resumeUrl?.startsWith('http')) {
      return { label: 'External Cloud Link', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' };
    }
    return { label: 'Repository Default PDF', color: 'text-luxury-gold border-luxury-gold/30 bg-luxury-gold/10' };
  };

  const badge = getResumeBadge();

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="pb-6 border-b border-[#A61E2D]/15">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
          Personal Identity &amp; Contact Anchor
        </span>
        <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
          Profile, Hyperlinks <span className="font-light italic text-[#8E949D]">&amp; Resume</span>
        </h2>
        <p className="text-xs text-[#A0A0A0] mt-1">
          Manage your executive bio, LinkedIn &amp; custom hyperlinks, contact channels, and publish new PDF resume documents live.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2 animate-fade-in">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* RESUME & CREDENTIALS VAULT */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#A61E2D]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Resume &amp; Document Management
              </h3>
            </div>
            <div className={`px-2.5 py-1 border text-[9px] font-mono uppercase tracking-wider ${badge.color}`}>
              {badge.label}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-[#151515] border border-[#A61E2D]/15">
              <div className="flex items-center gap-3">
                <FileCheck size={24} className="text-[#A61E2D] shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#F5F5F5]">
                    {formData.resumeFileName || 'Hetansh_Patel_Resume.pdf'}
                  </div>
                  <div className="text-[10px] text-[#8E949D] font-mono mt-0.5 break-all max-w-md">
                    Target: {formData.resumeUrl?.startsWith('data:') ? 'Embedded Base64 Document' : (formData.resumeUrl || '/Hetansh_Patel_Resume.pdf')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto">
                {formData.resumeUrl && (
                  <a
                    href={formData.resumeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-3.5 py-2 border border-white/10 hover:border-luxury-gold text-xs text-[#F5F5F5] hover:text-luxury-gold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span>Test Preview</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleResetResume}
                  className="px-3.5 py-2 border border-white/10 hover:border-red-500/40 text-xs text-[#8E949D] hover:text-red-400 flex items-center gap-1.5 transition-colors"
                  title="Reset to default repository resume"
                >
                  <RotateCcw size={12} />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            {uploadFeedback && (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check size={13} />
                <span>{uploadFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Option A: Direct File Upload */}
              <div className="space-y-2 p-4 bg-[#121212] border border-white/5 flex flex-col justify-between">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#F5F5F5] font-bold flex items-center gap-1.5 mb-1">
                    <UploadCloud size={14} className="text-[#A61E2D]" />
                    <span>Upload New Resume PDF</span>
                  </label>
                  <p className="text-[10px] text-[#8E949D] leading-relaxed mb-4">
                    Upload your latest CV/Resume directly (.pdf). It will be saved instantly and attached to the public "Resume" button.
                  </p>
                </div>

                <label className="cursor-pointer w-full py-2.5 px-4 bg-[#1B1B1B] hover:bg-[#252525] border border-[#A61E2D]/40 text-xs text-[#F5F5F5] font-semibold text-center flex items-center justify-center gap-2 transition-all">
                  <UploadCloud size={14} className="text-[#A61E2D]" />
                  <span>Choose PDF File...</span>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option B: External URL */}
              <div className="space-y-3 p-4 bg-[#121212] border border-white/5">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#F5F5F5] font-bold flex items-center gap-1.5 mb-1">
                    <Globe size={14} className="text-[#A61E2D]" />
                    <span>Or External Cloud Document URL</span>
                  </label>
                  <p className="text-[10px] text-[#8E949D] leading-relaxed">
                    Paste a public Google Drive view link, Dropbox share link, or self-hosted PDF URL.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.resumeUrl?.startsWith('data:') ? '' : (formData.resumeUrl || '')}
                    onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/... or /Hetansh_Patel_Resume.pdf"
                    className="w-full bg-[#181818] border border-[#A61E2D]/20 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
                  />
                  <input
                    type="text"
                    value={formData.resumeFileName || ''}
                    onChange={(e) => setFormData({ ...formData, resumeFileName: e.target.value })}
                    placeholder="Download filename (e.g. Hetansh_Resume_2026.pdf)"
                    className="w-full bg-[#181818] border border-[#A61E2D]/20 px-3 py-1.5 text-xs text-[#8E949D] focus:outline-none focus:border-[#A61E2D]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIGITAL ANCHORS & HYPERLINKS */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Share2 size={16} className="text-[#A61E2D]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
                Digital Anchors &amp; Hyperlinks
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddCustomLink}
              className="px-2.5 py-1 border border-[#A61E2D]/40 hover:border-[#A61E2D] text-[10px] uppercase tracking-wider text-[#F5F5F5] flex items-center gap-1.5 bg-[#A61E2D]/10 hover:bg-[#A61E2D]/20 transition-all"
            >
              <Plus size={11} className="text-[#A61E2D]" />
              <span>Add Custom Link</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* LinkedIn */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                  <Share2 size={12} className="text-[#A61E2D]" />
                  <span>LinkedIn Profile URL</span>
                </label>
                {formData.linkedinUrl && (
                  <a
                    href={formData.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[10px] text-[#A61E2D] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Test Node</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/hetansh-patel-693739326"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            {/* GitHub */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                  <Globe size={12} className="text-[#A61E2D]" />
                  <span>GitHub Profile URL</span>
                </label>
                {formData.githubUrl && (
                  <a
                    href={formData.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[10px] text-[#A61E2D] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Test</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/hex021"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            {/* Twitter / X */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                  <Globe size={12} className="text-[#A61E2D]" />
                  <span>Twitter / X URL (Optional)</span>
                </label>
                {formData.twitterUrl && (
                  <a
                    href={formData.twitterUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[10px] text-[#A61E2D] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Test</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <input
                type="url"
                value={formData.twitterUrl || ''}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                placeholder="https://x.com/yourhandle"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>
          </div>

          {/* Dynamic Custom Links List */}
          <div className="pt-4 border-t border-white/5 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#8E949D] font-mono block">
              Additional Hyperlinks (Kaggle, Medium, LeetCode, Lab, Portfolio, etc.)
            </span>

            {(!formData.customLinks || formData.customLinks.length === 0) ? (
              <div className="p-4 border border-dashed border-white/10 text-center text-[#8E949D] text-xs">
                No custom hyperlinks added yet. Click "+ Add Custom Link" above to add research profiles, blogs, or platforms.
              </div>
            ) : (
              <div className="space-y-2.5">
                {formData.customLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-2 bg-[#141414] border border-[#A61E2D]/15 p-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleUpdateCustomLink(link.id, 'label', e.target.value)}
                      placeholder="Label (e.g. Kaggle)"
                      className="w-1/3 bg-[#1B1B1B] border border-white/10 px-2.5 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleUpdateCustomLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-[#1B1B1B] border border-white/10 px-2.5 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
                    />
                    {link.url && (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2 border border-white/10 hover:border-luxury-gold text-[#8E949D] hover:text-luxury-gold transition-colors"
                        title="Test link"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomLink(link.id)}
                      className="p-2 border border-white/10 hover:border-red-500/40 text-[#8E949D] hover:text-red-400 transition-colors"
                      title="Remove link"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CORE IDENTITY */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <User size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Executive Identity &amp; Headings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                Full Legal Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                Hero Subtitle (Specializations)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ROBOTICS • EMBEDDED SYSTEMS • AI"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
              Bio Overview Narrative
            </label>
            <textarea
              rows={3}
              value={formData.bioSummary}
              onChange={(e) => setFormData({ ...formData, bioSummary: e.target.value })}
              className="w-full bg-[#151515] border border-[#A61E2D]/20 p-3 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] leading-relaxed resize-y"
            />
          </div>
        </div>

        {/* ACADEMIC & DEGREE */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <GraduationCap size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Academic Standing &amp; Institute
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                Cumulative GPA / Scale
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="8.42 / 10 (till 4th Semester)"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                Enrolled Degree
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="B.Tech in Electronics & Communication Engineering"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold block">
                University Name
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                placeholder="Pandit Deendayal Energy University (PDEU)"
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>
          </div>
        </div>

        {/* COMMUNICATIONS & WIRES */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Mail size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Communications &amp; Geographic Wire
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                <Mail size={12} className="text-[#A61E2D]" />
                <span>Primary Email Address</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                <Phone size={12} className="text-[#A61E2D]" />
                <span>Telephone / WhatsApp Wire</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D] font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                <MapPin size={12} className="text-[#A61E2D]" />
                <span>Geographic Location</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-gold-glow transition-all"
          >
            <Save size={15} />
            <span>Save Profile &amp; Documents</span>
          </button>
        </div>
      </form>
    </div>
  );
};
