import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Calendar, User, MapPin, Cpu } from 'lucide-react';

export const Research: React.FC = () => {
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

  const keyContributions = [
    'Designed complete circuit schematics for multi-sensor acquisition nodes',
    'Calibrated ultrasonic transducers and strain gauge amplification circuits',
    'Developed Python-based data processing pipeline for deformation analysis',
    'Maintained detailed calibration logs and hardware documentation',
  ];

  const techStack = [
    'ESP32',
    'Ultrasonic Distance Transducers',
    'BF350 Foil Strain Gauges',
    'Python',
    'Signal Conditioning Circuits',
  ];

  const researchInterests = [
    'IoT and Embedded Systems',
    'Sensor Instrumentation',
    'Wireless Sensing',
    'Feedback Control & Robotics',
    'Signal Processing',
  ];

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

          {/* Research Entry Card — Full Width */}
          <motion.div
            variants={itemVariants}
            className="w-full border border-luxury-gold/10 bg-[#111111]/20 p-8 md:p-12 space-y-10 luxury-card"
          >
            {/* Card Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FlaskConical size={16} className="text-luxury-gold" />
                <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-gold font-bold uppercase">
                  Active Research Project
                </span>
              </div>

              <h3 className="font-sans text-lg md:text-xl uppercase tracking-widest font-bold text-luxury-text leading-tight">
                Low-Cost Smart Monitoring System for Geogrid-Reinforced Sand Layer Analysis
              </h3>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-sans text-luxury-grey tracking-wider uppercase">
                <span className="flex items-center gap-2">
                  <Calendar size={12} className="text-luxury-gold/60" />
                  January 2026 – Present
                </span>
                <span className="flex items-center gap-2">
                  <User size={12} className="text-luxury-gold/60" />
                  Primary Hardware & Instrumentation Lead
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={12} className="text-luxury-gold/60" />
                  Geotech Laboratory, PDEU
                </span>
              </div>

              <div className="font-sans text-[11px] text-luxury-grey tracking-wider uppercase">
                <span className="text-luxury-gold font-bold">Supervisor:</span>{' '}
                Dr. Uma Chaduvula
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
                  Designing and deploying an embedded sensor network for real-time structural health monitoring
                  of geogrid-reinforced sand layers. The system captures deformation and strain data using
                  ultrasonic distance transducers and BF350 foil strain gauges interfaced with ESP32
                  microcontrollers.
                </p>
              </div>

              {/* Key Contributions */}
              <div className="lg:col-span-5 space-y-6">
                <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-gold font-bold">
                  Key Contributions
                </h4>
                <ul className="space-y-4">
                  {keyContributions.map((contribution, i) => (
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
                {techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="font-sans text-[10px] uppercase tracking-[0.15em] text-luxury-grey font-semibold border border-luxury-gold/10 px-4 py-2 bg-luxury-gold/[0.03] hover:border-luxury-gold/25 hover:text-luxury-text transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Research Interests Sub-Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="border-b border-luxury-gold/10 pb-6">
              <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-luxury-text font-bold">
                Research Interests
              </h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {researchInterests.map((interest, i) => (
                <span
                  key={i}
                  className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold border border-luxury-gold/15 px-5 py-3 bg-luxury-gold/[0.04] hover:bg-luxury-gold/[0.08] hover:border-luxury-gold/30 transition-all duration-500 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
