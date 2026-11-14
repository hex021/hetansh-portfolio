import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const Philosophy: React.FC = () => {
  const { data } = usePortfolio();
  const rawCreed = data.ui?.creedQuote || '';
  const isOldCreed = rawCreed.toLowerCase().includes('compile code') || rawCreed.toLowerCase().includes('electrons') || rawCreed.toLowerCase().includes('manifest');
  const creedQuote = (!isOldCreed && rawCreed)
    ? rawCreed
    : '"Translating high-frequency sensor telemetry into deterministic, closed-loop execution pipelines."';

  const pillars = [
    {
      num: "01",
      title: "Systems Thinking",
      desc: "Hardware is nothing without code, and software is blind without actuators. I view complex platforms as unified cybernetic systems where sensors mimic nerves and microprocessors execute the feedback loops."
    },
    {
      num: "02",
      title: "Obsessive Precision",
      desc: "True luxury is built in the silent margins. Whether calibrating an MPU6050 accelerometer or adjusting PWM duty cycles for servo-targeting, details are not just details; they are the engineering."
    },
    {
      num: "03",
      title: "Curiosity-Driven Growth",
      desc: "The electronics sphere transforms constantly. Fostering continuous learning through rigorous hardware simulations, hackathons, and IEEE active projects is my mechanism for stay-ahead execution."
    }
  ];

  return (
    <section 
      id="philosophy" 
      className="relative w-full min-h-screen bg-luxury-bg py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Bold Statement */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
              02 / Creed
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text leading-tight">
              Engineering <br />
              <span className="font-light italic text-transparent text-outline">With Purpose</span>
            </h2>
            <div className="w-16 h-[1px] bg-luxury-gold/40 my-6" />
            <p className="font-sans text-xs md:text-sm text-[#D5D5D5] tracking-wide uppercase leading-relaxed max-w-sm font-medium">
              {creedQuote}
            </p>
          </div>

          {/* Right Block: Scrolling Pillars */}
          <div className="lg:col-span-8 space-y-16 lg:pl-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-luxury-gold/5 last:border-b-0 group"
              >
                {/* Number (Updated to font-sans / Inter) */}
                <div className="md:col-span-2 font-sans text-xl font-bold tracking-widest text-luxury-gold/30 group-hover:text-luxury-gold transition-colors duration-500">
                  {pillar.num}
                </div>
                
                {/* Pillar Content */}
                <div className="md:col-span-10 space-y-3">
                  <h3 className="font-sans text-sm uppercase font-bold tracking-wider text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-[#B4B4B4] font-normal leading-relaxed tracking-normal">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
