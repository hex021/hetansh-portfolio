import React from 'react';
import { motion } from 'framer-motion';
import { SemiconductorGrid } from './BackgroundSystem';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data.profile;
  const creed = data.ui?.creedQuote || '"Translating high-frequency sensor telemetry into deterministic, closed-loop execution pipelines."';
  const showTraces = data.ui?.showPCBTraces !== false;

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

  const focusAreas = [
    {
      num: "01",
      title: "Robotics & Motion Control",
      desc: "Developing kinematic algorithms, closed-loop servo feedback networks, and spatial gesture-controlled micro-motors.",
    },
    {
      num: "02",
      title: "Embedded Hardware Integration",
      desc: "Engineering low-latency microcontrollers (ESP32/Arduino) executing low-overhead P2P wireless telemetry protocols.",
    },
    {
      num: "03",
      title: "IoT Systems Architecture",
      desc: "Designing end-to-end signal pathways linking analog sensor grids (NPK, MPU6050) with automated backend recommendation cores.",
    },
    {
      num: "04",
      title: "Artificial Intelligence Nodes",
      desc: "Integrating predictive machine learning models and large language models for localized decision-making synthesis.",
    },
  ];

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Semiconductor wafer grid alignment backdrop */}
      {showTraces && <SemiconductorGrid />}

      {/* Decorative vertical editorial grid alignments */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-luxury-gold/[0.015]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-luxury-gold/[0.015]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: Vision & Identity */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-36">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
                01 / Background
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text leading-tight">
                Intelligent <br />
                <span className="font-light italic text-transparent text-outline">Hardware</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 font-sans text-sm md:text-base font-normal text-[#C5C5C5] leading-relaxed max-w-lg">
              <p>
                I am {profile.name}, specializing in {profile.title} through {profile.degree} at {profile.university}.
              </p>
              <p>
                I approach hardware design as a medium for physical agency. I build physical structures that acquire real-time telemetry, routing data streams across organic and digital boundaries.
              </p>
              <p className="border-l-2 border-luxury-gold/50 pl-5 py-2.5 text-xs md:text-sm uppercase tracking-wider text-luxury-gold font-medium leading-relaxed">
                {creed}
              </p>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-1.5">
                <div className="font-sans text-3xl font-bold tracking-tight text-luxury-gold">{profile.gpa.split(' ')[0] || profile.gpa}</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9E9E9E] font-semibold">Cumulative GPA</div>
              </div>
              <div className="space-y-1.5">
                <div className="font-sans text-3xl font-bold tracking-tight text-luxury-text">IEEE RAS</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9E9E9E] font-semibold">Robotics Member</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Re-architected domains (Completely font-sans/Inter) */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div variants={itemVariants} className="border-b border-luxury-gold/10 pb-6">
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-luxury-text font-bold">
                Specialized Domains of Execution
              </h3>
            </motion.div>

            <div className="space-y-10">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-luxury-gold/5 last:border-b-0 transition-all duration-500 group"
                >
                  {/* Item index */}
                  <div className="md:col-span-2 text-luxury-gold/30 group-hover:text-luxury-gold font-sans text-xl font-bold transition-colors duration-500">
                    {area.num}
                  </div>
                  
                  {/* Content */}
                  <div className="md:col-span-10 space-y-2">
                    <h4 className="font-sans text-sm uppercase font-bold tracking-wider text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                      {area.title}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-[#A8A8A8] leading-relaxed font-normal">
                      {area.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
