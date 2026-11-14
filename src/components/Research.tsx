import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Calendar, User, MapPin, Cpu, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Research: React.FC = () => {
  const { data } = usePortfolio();
  const researchItems = data.research;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="research"
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Decorative vertical editorial grid alignments */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-luxury-gold/[0.015]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-luxury-gold/[0.015]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
                05 / Research
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text leading-tight">
                Active{' '}
                <span className="font-light italic text-transparent text-outline">Research</span>
              </h2>
            </div>
            <p className="font-sans text-xs text-luxury-grey tracking-widest uppercase max-w-sm font-light">
              ADVANCING THE FRONTIER OF STRUCTURAL HEALTH MONITORING THROUGH EMBEDDED SENSOR INTELLIGENCE.
            </p>
          </motion.div>

          {/* Research Cards */}
          {researchItems.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-20 border border-luxury-gold/10 bg-[#111111]/20 p-8"
            >
              <p className="text-sm uppercase tracking-widest text-luxury-grey">
                No active research projects currently logged.
              </p>
            </motion.div>
          ) : (
            researchItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="w-full border border-luxury-gold/10 bg-[#111111]/20 p-8 md:p-12 space-y-10 luxury-card"
              >
              {/* Card Header */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FlaskConical size={16} className="text-luxury-gold" />
                  <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-gold font-bold uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-sans text-lg md:text-xl uppercase tracking-widest font-bold text-luxury-text leading-tight">
                  {item.title}
                </h3>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-sans text-luxury-grey tracking-wider uppercase">
                  <span className="flex items-center gap-2">
                    <Calendar size={12} className="text-luxury-gold/60" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={12} className="text-luxury-gold/60" />
                    Primary Hardware &amp; Instrumentation Lead
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={12} className="text-luxury-gold/60" />
                    {item.location}
                  </span>
                </div>

                <div className="font-sans text-[11px] text-luxury-grey tracking-wider uppercase">
                  <span className="text-luxury-gold font-bold">Supervisor:</span>{' '}
                  {item.supervisor} ({item.department})
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-luxury-gold/10" />

              {/* Description + Contributions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Description */}
                <div className="lg:col-span-7 space-y-6">
                  <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-text font-bold">
                    Project Overview
                  </h4>
                  <p className="font-sans text-xs md:text-sm font-light text-luxury-grey leading-relaxed tracking-wider">
                    {item.summary}
                  </p>

                  {item.docUrl && (
                    <a
                      href={item.docUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase text-luxury-gold hover:underline pt-2"
                    >
                      <span>Repository Documentation</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* Key Contributions */}
                <div className="lg:col-span-5 space-y-6">
                  <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-gold font-bold">
                    Key Contributions
                  </h4>
                  <ul className="space-y-4">
                    {item.contributions.map((contribution, i) => (
                      <li
                        key={i}
                        className="font-sans text-xs text-[#B8BCC4] leading-relaxed tracking-wide flex items-start gap-3"
                      >
                        <span className="text-luxury-gold/40 font-bold mt-px select-none">—</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-luxury-gold/10" />

              {/* Tech Stack */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Cpu size={14} className="text-luxury-gold/60" />
                  <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-text font-bold">
                    Instrumentation Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {item.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="font-sans text-[10px] uppercase tracking-[0.15em] text-luxury-grey font-semibold border border-luxury-gold/10 px-4 py-2 bg-luxury-gold/[0.03] hover:border-luxury-gold/25 hover:text-luxury-text transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research Interests (if first or main item) */}
              {item.researchInterests && item.researchInterests.length > 0 && (
                <div className="pt-4 border-t border-luxury-gold/10 space-y-4">
                  <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold">
                    Domain / Research Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {item.researchInterests.map((interest, i) => (
                      <span
                        key={i}
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold border border-luxury-gold/15 px-4 py-2 bg-luxury-gold/[0.04] hover:bg-luxury-gold/[0.08] transition-all duration-300 cursor-default"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )))}
        </motion.div>
      </div>
    </section>
  );
};
