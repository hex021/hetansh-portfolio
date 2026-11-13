import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  date: string;
  title: string;
  institution: string;
  highlights: string[];
}

export const Timeline: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      date: '01/2025 - Present',
      title: 'IEEE Robotics And Automation Society (RAS) - Member',
      institution: 'PDEU Chapter',
      highlights: [
        'Contributed to robotics-focused technical activities, workshops, and collaborative projects, enhancing practical skills and teamwork.',
        'Interacted with industry and academic experts to gain insights on emerging technologies in robotics and automation.'
      ]
    },
    {
      date: '05/2025 - 06/2025',
      title: 'Civic & Social Service Internship',
      institution: 'Sabar Seva Trust',
      highlights: [
        '80 hours of community field service and social outreach.',
        'Contributed to field documentation, project reporting, and grassroots community engagement.'
      ]
    },
    {
      date: 'Expected 06/2028',
      title: 'B.Tech: Electronics & Communication Engineering',
      institution: 'Pandit Deendayal Energy University (PDEU)',
      highlights: [
        'Cumulative GPA: 8.42 / 10 (till 4th Semester)',
        'Core Focus: Embedded Systems, Signal Processing, Robotics Control, and Circuit Simulations.'
      ]
    },
    {
      date: '05/2024',
      title: 'Higher Secondary Education (12th Grade)',
      institution: 'Shree Gayatri Vidhyalaya, Ahmedabad',
      highlights: [
        'GUJCET Percentile: 95.61%ile',
        'JEE Main Percentile: 88.49%ile',
        'State Board Percentage: 85.32%'
      ]
    },
    {
      date: '06/2022',
      title: 'Secondary Education (10th Grade)',
      institution: 'Shree Narayana Higher Secondary School, Ahmedabad',
      highlights: [
        'State Board Percentage: 97.03% (Outstanding academic distinction)'
      ]
    }
  ];

  return (
    <section 
      id="timeline" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="space-y-4 mb-24 text-center lg:text-left">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
            08 / Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wider text-luxury-text">
            Experience &amp; <span className="font-light italic text-transparent text-outline">Trajectory</span>
          </h2>
        </div>

        {/* Timeline representation (Completely card-free, line-guided) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central tracking line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/15" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row items-stretch w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Outer column */}
                  <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-12 flex justify-start md:justify-end">
                    <div className={`w-full max-w-md pb-6 border-b border-luxury-gold/5 hover:border-luxury-gold/30 transition-all duration-500 relative group ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}>
                      
                      <span className="font-sans text-xs md:text-sm font-bold tracking-wider text-luxury-gold uppercase block mb-3">
                        {item.date}
                      </span>
                      <h3 className="font-sans text-xs uppercase font-bold tracking-widest text-luxury-text mb-1.5 group-hover:text-luxury-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <h4 className="font-sans text-[10px] uppercase tracking-wider text-luxury-grey/90 mb-4">
                        {item.institution}
                      </h4>
                      <ul className={`space-y-2 font-sans text-xs text-luxury-grey font-light leading-relaxed flex flex-col ${
                        isEven ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right'
                      }`}>
                        {item.highlights.map((hl, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-luxury-gold font-bold">•</span>
                            <span className="tracking-wide">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bullet center point */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border border-luxury-gold/20 bg-luxury-bg flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                  </div>

                  {/* Empty side filler for desktop */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
