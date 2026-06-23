import React from 'react';
import { motion } from 'framer-motion';

interface Interest {
  num: string;
  name: string;
  tag: string;
  details: string;
}

export const BeyondEngineering: React.FC = () => {
  const interests: Interest[] = [
    {
      num: "01",
      name: "Gym & Fitness",
      tag: "DISCIPLINE",
      details: "Training for strength, conditioning, and physical resilience, optimizing health and mental clarity."
    },
    {
      num: "02",
      name: "Video Editing",
      tag: "PRODUCTION",
      details: "Crafting narratives through pacing, visual effects, color grading, and dynamic sequence design."
    },
    {
      num: "03",
      name: "Photo Editing",
      tag: "COMPOSITION",
      details: "Refining visual balance, grading tones, and manipulating light to convey professional intent."
    },
    {
      num: "04",
      name: "Aviation Enthusiast",
      tag: "AERODYNAMICS",
      details: "Following aeronautical engineering design, propulsion system mechanics, and flight dynamics."
    },
    {
      num: "05",
      name: "Trekking & Exploration",
      tag: "ALTITUDE",
      details: "Navigating mountain trails, testing endurance, and finding inspiration in natural geometries."
    },
    {
      num: "06",
      name: "Traveling",
      tag: "PERSPECTIVE",
      details: "Exploring cultural architectures, minimal landscapes, and urban spaces across different regions."
    },
    {
      num: "07",
      name: "Photography",
      tag: "DOCUMENTATION",
      details: "Capturing minimal geometries, architectural layouts, and high-contrast urban scenery."
    },
    {
      num: "08",
      name: "Movies & Music",
      tag: "CINEMATICS",
      details: "Drawing creative ideas from atmospheric synth scores, sound design, and cinematic direction."
    }
  ];

  return (
    <section 
      id="beyond" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Editorial layout thin background lines */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-luxury-gold/[0.02]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-luxury-gold/[0.02]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Double-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Heading and intro (sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
              08 / Perspective
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wider text-luxury-text leading-tight">
              Beyond <br />
              <span className="font-light italic text-transparent text-outline">Engineering</span>
            </h2>
            <div className="w-12 h-[1px] bg-luxury-gold/40 my-6" />
            <p className="font-sans text-xs text-luxury-grey tracking-widest uppercase leading-loose max-w-xs font-light">
              ENGINEERING IS A CORE DRIFT, BUT CURIOSITY EXTENDS BEYOND CIRCUIT RAILS AND FIRMWARE EMULATORS.
            </p>
          </div>

          {/* Right Column: Premium Editorial List */}
          <div className="lg:col-span-8 space-y-12 lg:pl-12">
            {interests.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-10 border-b border-luxury-gold/10 last:border-b-0 group"
              >
                {/* Num + Tag (Updated to Inter) */}
                <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start items-center md:items-start gap-2">
                  <span className="font-sans text-[10px] font-bold text-luxury-gold/50 group-hover:text-luxury-gold transition-colors duration-500 font-mono">
                    {item.num}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-luxury-grey font-semibold px-2.5 py-1 border border-luxury-gold/10 bg-luxury-gold/[0.01]">
                    {item.tag}
                  </span>
                </div>
                
                {/* Interest Title & Description (Updated to Inter) */}
                <div className="md:col-span-9 space-y-3">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-luxury-grey leading-relaxed tracking-wider font-light">
                    {item.details}
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
