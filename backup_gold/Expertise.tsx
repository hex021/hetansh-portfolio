import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinimalGridBackground } from './BackgroundSystem';

interface Skill {
  name: string;
  detail: string;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export const Expertise: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('hardware');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'hardware',
      title: 'Hardware & Circuits',
      skills: [
        { name: 'Microcontrollers', detail: 'Advanced firmware design on ESP32 & Arduino platforms. Low-latency embedded programming and static memory allocation.' },
        { name: 'Sensor Interfacing', detail: 'Interfaced optical NPK sensors, MPU6050 gyroscopic systems, and multiplexed IR arrays.' },
        { name: 'Communication Protocols', detail: 'Register-level bus configurations for I2C, SPI, UART, and proprietary ESP-NOW wireless links.' },
        { name: 'Circuit Design & Sim', detail: 'Analog filter designs, LTSpice rail analysis, and single-layer PCB routing blueprints.' }
      ]
    },
    {
      id: 'software',
      title: 'Software & Logic',
      skills: [
        { name: 'Embedded C / C++', detail: 'Production-grade firmware, direct port registers manipulation, and hardware interrupts.' },
        { name: 'Python Core', detail: 'Automated telemetry logs parsing, local scripting, and data pipelines.' },
        { name: 'Predictive ML', detail: 'Training and deploying random forest algorithms for agricultural soil classification.' },
        { name: 'AI Integrations', detail: 'Connecting hardware edge processors with Gemini API endpoints for custom advising synthesis.' }
      ]
    },
    {
      id: 'systems',
      title: 'Systems & Testing',
      skills: [
        { name: 'Robotics Control', detail: 'Feedback servo hunting algorithms, differential steering coordination, and PID control loops.' },
        { name: 'IoT Telemetry Paths', detail: 'Configuring node-to-cloud interfaces matching analog rails with web analytics endpoints.' },
        { name: 'Hardware Debugging', detail: 'Logic analyzer tracing, oscilloscope measurements, and logic level signal conditioning.' },
        { name: 'LabVIEW & MATLAB', detail: 'Configuring virtual instrumentation panels and signal-processing math arrays.' }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory) || categories[0];
  const displaySkill = hoveredSkill || currentCategory.skills[0];

  return (
    <section 
      id="expertise" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Subtle nodes animation backdrop */}
      <MinimalGridBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="space-y-4 mb-24 text-center lg:text-left">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
            03 / Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text">
            Technical <span className="font-light italic text-transparent text-outline">Expertise</span>
          </h2>
        </div>

        {/* Editorial Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Category Selector & Dynamic Skill Telemetry (Sticky) */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-36">
            
            {/* Category tabs (Updated to font-sans Inter) */}
            <div className="flex flex-col space-y-3 border-l border-luxury-gold/10 pl-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setHoveredSkill(null);
                  }}
                  className={`text-left font-sans text-xs uppercase font-bold tracking-widest transition-all duration-300 py-2.5 ${
                    activeCategory === cat.id
                      ? 'text-luxury-gold pl-2'
                      : 'text-luxury-grey hover:text-luxury-text'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Dynamic Telemetry Display Block */}
            <div className="pt-8 border-t border-luxury-gold/10 space-y-4">
              <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-luxury-gold font-bold block">
                TECHNICAL DETAIL
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={displaySkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-luxury-text">
                    {displaySkill.name}
                  </h4>
                  <p className="font-sans text-xs text-luxury-grey leading-relaxed tracking-wider font-light">
                    {displaySkill.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Skill Rows List (No cards, pure editorial layout) */}
          <div className="lg:col-span-7 space-y-2 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="divide-y divide-luxury-gold/10"
              >
                {currentCategory.skills.map((skill, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="py-6 flex items-center justify-between cursor-pointer group transition-all duration-300"
                  >
                    <div className="flex items-center space-x-6">
                      <span className="font-sans text-[10px] font-bold text-luxury-gold/40 group-hover:text-luxury-gold transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-xs uppercase font-bold tracking-widest text-luxury-text group-hover:text-luxury-gold transition-all duration-300 group-hover:translate-x-1">
                        {skill.name}
                      </span>
                    </div>

                    {/* Small Champagne Dot indicators */}
                    <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-luxury-gold transition-all duration-500 group-hover:shadow-[0_0_8px_#C5A880]" />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
