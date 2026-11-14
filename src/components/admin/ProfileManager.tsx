import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin, GraduationCap, Globe, Share2, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ProfileData } from '../../types/portfolio';

export const ProfileManager: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState<ProfileData>(data.profile);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setStatusMessage('Profile & Resume identity updated successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="pb-6 border-b border-[#A61E2D]/15">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A61E2D] font-bold block">
          Personal Identity &amp; Contact Anchor
        </span>
        <h2 className="text-2xl font-serif text-[#F5F5F5] uppercase tracking-wide">
          Profile <span className="font-light italic text-[#8E949D]">&amp; Credentials</span>
        </h2>
        <p className="text-xs text-[#A0A0A0] mt-1">
          Update primary portfolio meta-information, bio, telephone lines, and verified GPA metrics.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#A61E2D]/10 border border-[#A61E2D]/40 text-[#F5F5F5] text-xs flex items-center gap-2">
          <Check size={14} className="text-[#A61E2D]" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Identity */}
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

        {/* Academic & Degree */}
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

        {/* Contact Wire & Digital Anchors */}
        <div className="border border-[#A61E2D]/20 bg-[#0E0E0E] p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Mail size={16} className="text-[#A61E2D]" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#F5F5F5]">
              Communications &amp; Online Repositories
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                <Globe size={12} className="text-[#A61E2D]" />
                <span>GitHub Profile URL</span>
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-[#A0A0A0] font-bold flex items-center gap-1.5">
                <Share2 size={12} className="text-[#A61E2D]" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full bg-[#151515] border border-[#A61E2D]/20 px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#A61E2D]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#A61E2D] hover:bg-[#C1273D] text-[#F5F5F5] text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-gold-glow"
          >
            <Save size={15} />
            <span>Update Portfolio Identity</span>
          </button>
        </div>
      </form>
    </div>
  );
};
