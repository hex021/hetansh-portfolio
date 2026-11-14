import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Wrench, Award, Sparkles, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Achievements: React.FC = () => {
  const { data } = usePortfolio();
  const categories = data.achievements;

  const [activeTab, setActiveTab] = useState<string>(() => categories[0]?.id || 'hackathons');

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy size={14} className="text-luxury-gold" />;
      case 'wrench':
        return <Wrench size={14} className="text-luxury-gold" />;
      case 'sparkles':
        return <Sparkles size={14} className="text-luxury-gold" />;
      case 'award':
      default:
        return <Award size={14} className="text-luxury-gold" />;
    }
  };

  return (
    <section
      id="achievements"
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-luxury-gold/[0.015]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-luxury-gold/[0.015]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-20">
          <div className="space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
              09 / Milestones
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text leading-tight">
              Key <span className="font-light italic text-transparent text-outline">Achievements</span>
            </h2>
          </div>
          <p className="font-sans text-xs text-luxury-grey tracking-widest uppercase max-w-sm font-light">
            COMPETITIVE SPRINTS, RIGOROUS TECHNICAL WORKSHOPS, AND VERIFIED ACADEMIC CREDENTIALS.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-luxury-gold/10 pb-8">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-6 py-3 border font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-text shadow-gold-glow'
                    : 'border-luxury-gold/10 text-luxury-grey hover:text-luxury-text hover:border-luxury-gold/25 bg-[#111111]/20'
                }`}
              >
                <span className="text-luxury-gold/60 font-mono text-[9px] font-bold">
                  {cat.categoryNumber}
                </span>
                <span>{cat.label}</span>
                {getIcon(cat.iconName)}
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        {currentCategory && (
          <>
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
              <p className="text-xs text-luxury-grey tracking-wider uppercase">
                <span className="text-luxury-gold font-semibold">{currentCategory.label} // </span>
                {currentCategory.tagline}
              </p>
              <span className="text-[10px] tracking-widest uppercase text-luxury-grey/60 font-mono">
                {currentCategory.items.length} {currentCategory.items.length === 1 ? 'RECORD' : 'RECORDS'} LOGGED
              </span>
            </div>

            {/* Milestone Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCategory.items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="luxury-card border border-luxury-gold/10 bg-[#111111]/20 p-8 flex flex-col justify-between space-y-6 group hover:border-luxury-gold/30 hover:bg-[#111111]/40 transition-all duration-500"
                >
                  <div className="space-y-4">
                    {/* Top Row: Year + Highlight Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-luxury-gold/80 font-bold tracking-wider">
                        <Calendar size={11} className="text-luxury-gold" />
                        {item.period}
                      </span>
                      {item.highlight && (
                        <span className="font-sans text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 border border-luxury-gold/25 bg-luxury-gold/5 text-luxury-text font-bold">
                          {item.highlight}
                        </span>
                      )}
                    </div>

                    {/* Title & Organizer */}
                    <div>
                      <h3 className="font-sans text-sm md:text-base font-bold uppercase tracking-wider text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[11px] text-luxury-grey/75 font-normal tracking-wide mt-1">
                        {item.organizer}
                      </p>
                    </div>

                    {/* Domain */}
                    {item.domain && (
                      <div className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold/70 border-b border-luxury-gold/5 pb-3">
                        {item.domain}
                      </div>
                    )}

                    {/* Narrative Description */}
                    <p className="font-sans text-xs font-light text-[#B8BCC4] leading-relaxed tracking-wide">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags footer */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="pt-4 border-t border-luxury-gold/5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-sans text-[9px] uppercase tracking-wider text-luxury-grey/70 bg-[#151515] px-2 py-0.5 border border-luxury-gold/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};
