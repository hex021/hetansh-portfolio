import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const Timeline: React.FC = () => {
  const { data } = usePortfolio();
  const timelineData = data.timeline;

  return (
    <section 
      id="timeline" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-luxury-gold/[0.015]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-luxury-gold/[0.015]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-24">
          <div className="space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
              08 / Progression
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text">
              Academic &amp; Professional <span className="font-light italic text-transparent text-outline">Trajectory</span>
            </h2>
          </div>
          <p className="font-sans text-xs text-luxury-grey tracking-widest uppercase max-w-sm font-light">
            CHRONOLOGICAL OVERVIEW OF FORMAL EDUCATION, SOCIETY RESPONSIBILITIES, AND ENGINEERING LEADERSHIP.
          </p>
        </div>

        {/* Timeline Items Vertical Track */}
        {timelineData.length === 0 ? (
          <div className="text-center py-20 border border-luxury-gold/10 bg-[#111111]/20 p-8">
            <p className="text-sm uppercase tracking-widest text-luxury-grey">
              No trajectory milestones currently logged.
            </p>
          </div>
        ) : (
          <div className="relative border-l border-luxury-gold/15 ml-4 md:ml-32 pl-8 md:pl-16 space-y-16">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Indicator Dot */}
                <div className="absolute -left-[39px] md:-left-[71px] top-1.5 w-3.5 h-3.5 rounded-full border border-luxury-gold bg-luxury-bg group-hover:scale-125 group-hover:bg-luxury-gold transition-all duration-300 shadow-gold-glow" />

                {/* Trajectory content */}
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-luxury-gold font-mono">
                      {item.date}
                    </span>
                    <span className="text-xs text-luxury-grey uppercase tracking-wider font-light">
                      // {item.institution}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                    {item.title}
                  </h3>

                  <ul className="space-y-2 pt-2 text-xs md:text-sm font-light text-[#B8BCC4] leading-relaxed tracking-wide">
                    {item.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-3">
                        <span className="text-luxury-gold/50 font-bold select-none mt-0.5">—</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
