import React from 'react';
import { motion } from 'framer-motion';

interface MetricModule {
  num: string;
  label: string;
  value: string;
  desc: string;
}

export const Dashboard: React.FC = () => {
  const metrics: MetricModule[] = [
    {
      num: "01",
      label: "Execution Builds",
      value: "05+",
      desc: "Microcontroller telemetry rigs, gesture controls, and autonomous robotic models constructed."
    },
    {
      num: "02",
      label: "Active Protocols",
      value: "04+",
      desc: "Interfacing serial UART, I2C, SPI, and proprietary ESP-NOW wireless framing paths."
    },
    {
      num: "03",
      label: "Academic Standing",
      value: "8.5/10",
      desc: "Cumulative GPA maintained in Electronics & Communication at PDEU."
    }
  ];

  return (
    <section 
      id="dashboard" 
      className="relative w-full py-36 px-8 md:px-16 bg-transparent border-t border-luxury-gold/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title */}
        <div className="text-center mb-24">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-luxury-gold font-bold">
            05 / Live Dashboard
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light uppercase tracking-widest text-luxury-text mt-3">
            Engineering <span className="font-light italic text-transparent text-outline">Telemetry</span>
          </h2>
        </div>

        {/* Rebuilt Dashboard Grid (Completely card-free, balanced 3-column reflow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 lg:gap-8 items-stretch">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="pb-8 border-b border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-500 flex flex-col justify-between relative group"
            >
              <div className="space-y-6">
                <div>
                  <div className="font-sans text-5xl font-light text-luxury-text tracking-wide group-hover:text-luxury-gold transition-colors duration-500">
                    {m.value}
                  </div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-text font-bold mt-2">
                    {m.label}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-sans text-xs text-luxury-grey leading-relaxed tracking-wider font-light">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
