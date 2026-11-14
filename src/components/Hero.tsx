import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const { data } = usePortfolio();
  const profile = data.profile;
  const firstName = data.ui?.heroFirstName || profile.name.split(' ')[0] || 'Hetansh';
  const lastName = data.ui?.heroLastName || profile.name.split(' ').slice(1).join(' ') || 'Patel';

  return (
    <section 
      id="vision" 
      className="relative w-full min-h-screen bg-transparent flex flex-col justify-center items-center overflow-hidden px-8 md:px-16 pt-32 pb-20"
    >
      {/* Grid Overlay lines */}
      <div className="absolute inset-0 tech-grid z-0 opacity-20 pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-5xl w-full text-center z-10 flex flex-col items-center space-y-10">
        
        {/* Availability Status Badge */}
        {profile.availability && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-luxury-gold/30 bg-luxury-gold/5 text-[9px] uppercase tracking-[0.25em] font-mono text-luxury-gold font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <span>{profile.availability}</span>
          </motion.div>
        )}

        {/* Large Luxury Serif Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-serif font-light tracking-wide text-luxury-text uppercase leading-none"
          >
            {firstName} <span className="font-light italic text-transparent text-outline titanium-hero-text">{lastName}</span>
          </motion.h1>

          {/* Subtitle / Professional Spec */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.4em] text-luxury-gold"
          >
            {profile.title}
          </motion.p>
        </div>

        {/* Description: Enlarged for high-end readability */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs md:text-sm font-light tracking-widest text-luxury-grey max-w-2xl leading-loose"
        >
          {profile.bioSummary}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full pt-6"
        >
          {/* Primary View Projects */}
          <a
            href="#projects"
            onMouseEnter={() => setHoveredBtn('projects')}
            onMouseLeave={() => setHoveredBtn(null)}
            className="w-full sm:w-auto px-10 py-4 border border-luxury-gold bg-transparent text-luxury-text font-sans text-[10px] uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-3 hover:bg-luxury-gold hover:text-luxury-bg hover:shadow-gold-glow transition-all duration-500"
          >
            Projects
            <ArrowRight size={12} className={`transition-transform duration-350 ${hoveredBtn === 'projects' ? 'translate-x-1' : ''}`} />
          </a>

          {/* Secondary specs / resume */}
          <a
            href={profile.resumeUrl || '/Hetansh_Patel_Resume.pdf'}
            download={profile.resumeFileName || 'Hetansh_Patel_Resume.pdf'}
            target="_blank"
            rel="noreferrer noopener"
            className="w-full sm:w-auto px-10 py-4 border border-white/10 hover:border-luxury-gold bg-transparent text-luxury-text font-sans text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:text-luxury-gold transition-all duration-500 cursor-pointer"
          >
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll Down telemetries */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-none z-10"
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-luxury-grey mb-3">SCROLL_DOWN</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-grey to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-3 bg-luxury-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};
