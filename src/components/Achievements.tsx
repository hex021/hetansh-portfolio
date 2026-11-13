import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Wrench, Award, Calendar, Sparkles } from 'lucide-react';

interface MilestoneItem {
  title: string;
  organizer: string;
  period: string;
  domain: string;
  description: string;
  highlight?: string;
  tags: string[];
}

interface MilestoneCategory {
  id: string;
  label: string;
  categoryNumber: string;
  icon: React.ReactNode;
  tagline: string;
  items: MilestoneItem[];
}

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('hackathons');

  const categories: MilestoneCategory[] = [
    {
      id: 'hackathons',
      label: 'Hackathons',
      categoryNumber: '01',
      icon: <Trophy size={14} className="text-luxury-gold" />,
      tagline: 'Competitive engineering sprints tackling real-world telemetry & AI challenges.',
      items: [
        {
          title: 'DEV:Init Hackathon',
          organizer: 'Google Developer Groups (GDG) PDEU',
          period: '2026',
          domain: 'AI & Smart Urban Infrastructure',
          description:
            'Engineered NagarNetra — an edge-compatible computer vision platform for real-time pothole and civic hazard tracking with YOLO, ByteTrack multi-object tracking, and automated coordinate tagging.',
          highlight: 'Featured Urban AI Project',
          tags: ['YOLO', 'ByteTrack', 'OpenCV', 'PyTorch']
        },
        {
          title: 'Codeversity National Hackathon',
          organizer: 'National Technical Consortium — Team Trinity',
          period: '2025',
          domain: 'National AI Domain Sprint',
          description:
            'Competed nationally in the AI track with Team Trinity, architecting high-efficiency machine learning pipelines and real-time data ingestion models under tight 36-hour sprint constraints.',
          highlight: 'National Finalist Team',
          tags: ['Machine Learning', 'Data Pipelines', 'Python', 'FastAPI']
        },
        {
          title: 'COGNIVIA Hackathon',
          organizer: 'IEEE Sampark 2026',
          period: '2026',
          domain: 'Autonomous Systems & Embedded Tech',
          description:
            'Engineered rapid-prototype embedded firmware and control logic for automated robotic systems, focusing on low-power telemetry transport and sensor node synchronization.',
          highlight: 'IEEE Flagship Participant',
          tags: ['Embedded Systems', 'Robotics', 'ESP32', 'Firmware']
        }
      ]
    },
    {
      id: 'workshops',
      label: 'Technical Workshops',
      categoryNumber: '02',
      icon: <Wrench size={14} className="text-luxury-gold" />,
      tagline: 'Deep-dive technical training sessions led by IEEE societies and premier institutes.',
      items: [
        {
          title: '3-Day Hands-on Workshop on ROS 2',
          organizer: 'IEEE Robotics & Automation Society (RAS) PDEU',
          period: '3-Day Intensive',
          domain: 'Robot Operating System Architecture',
          description:
            'Mastered ROS 2 core architecture, distributed nodes, publisher-subscriber communication paradigms, custom message definitions, and robotic motion simulation environments.',
          highlight: 'Certified Hands-on Training',
          tags: ['ROS 2', 'Linux/Ubuntu', 'Python', 'Pub-Sub Nodes', 'URDF']
        },
        {
          title: 'Distinguished Lecture on Signal Processing',
          organizer: 'IEEE GRSS / SPS / AP-S Joint Chapter',
          period: 'Specialized Lecture',
          domain: 'Signal Conditioning & Sensor Analytics',
          description:
            'Attended specialized sessions on digital filter architectures, noise suppression in noisy analog sensor interfaces, Fourier transformations, and high-frequency RF front-end principles.',
          highlight: 'IEEE Joint Society Session',
          tags: ['Signal Processing', 'Filter Design', 'Sensor Interfacing', 'RF Basics']
        },
        {
          title: 'AI & Deep Learning Workshop',
          organizer: 'Indian Institute of Technology (IIT) Gandhinagar',
          period: 'Premier Institute Training',
          domain: 'Neural Architectures & Inference',
          description:
            'Immersive training on convolutional neural networks (CNNs), transformer architectures, training optimization, and model compression for real-time edge deployment.',
          highlight: 'IIT Gandhinagar Certification',
          tags: ['Deep Learning', 'PyTorch', 'Edge AI', 'Computer Vision']
        }
      ]
    },
    {
      id: 'credentials',
      label: 'Certifications',
      categoryNumber: '03',
      icon: <Award size={14} className="text-luxury-gold" />,
      tagline: 'Formal credentials validating theoretical foundations and specialized competencies.',
      items: [
        {
          title: 'Machine Learning & AI in Robotics',
          organizer: 'NPTEL — Ministry of Education, Govt. of India',
          period: 'In Progress (2026)',
          domain: 'Advanced Academic Specialization',
          description:
            'Comprehensive postgraduate-level curriculum covering mathematical foundations of ML, robotic kinematics, state estimation, Kalman filters, perception algorithms, and reinforcement learning control.',
          highlight: 'Continuous Learning Initiative',
          tags: ['NPTEL', 'Robotics Kinematics', 'Reinforcement Learning', 'Kalman Filters']
        },
        {
          title: 'B.Tech in Electronics & Communication (8.42 CGPA)',
          organizer: 'Pandit Deendayal Energy University (PDEU)',
          period: '2024 – 2028',
          domain: 'Core Degree Foundation',
          description:
            'Consistent top-tier academic performance in Microcontrollers, Digital Signal Processing, Analog Circuits, Electromagnetic Theory, and Linear Control Systems.',
          highlight: 'Top Tier Cohort Ranking',
          tags: ['ECE Core', 'Embedded Hardware', 'DSP', 'Control Systems']
        }
      ]
    }
  ];

  const currentCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section
      id="achievements"
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-luxury-gold/[0.015]" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-luxury-gold/[0.015]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-20">
          <div className="space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
              09 / Milestones
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text leading-tight">
              Key <span className="font-light italic text-transparent text-outline">Achievements</span>
            </h2>
          </div>
          <p className="font-sans text-xs text-luxury-grey tracking-widest uppercase max-w-sm font-light">
            COMPETITIVE SPRINTS, RIGOROUS TECHNICAL WORKSHOPS, AND VERIFIED ACADEMIC CREDENTIALS.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-luxury-gold/10 pb-8">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-6 py-3 border font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-text shadow-gold-glow'
                    : 'border-luxury-gold/10 text-luxury-grey hover:text-luxury-text hover:border-luxury-gold/25 bg-[#111111]/20'
                }`}
              >
                <span className="text-luxury-gold/60 font-mono text-[9px] font-bold">
                  {cat.categoryNumber}
                </span>
                <span>{cat.label}</span>
                {cat.icon}
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
          <p className="text-xs text-luxury-grey tracking-wider uppercase">
            <span className="text-luxury-gold font-semibold">{currentCategory.label} // </span>
            {currentCategory.tagline}
          </p>
          <span className="text-[10px] tracking-widest uppercase text-luxury-grey/60 font-mono">
            {currentCategory.items.length} {currentCategory.items.length === 1 ? 'RECORD' : 'RECORDS'} LOGGED
          </span>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCategory.items.map((item, index) => (
            <motion.div
              key={`${currentCategory.id}-${index}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1
              }}
              className="luxury-card border border-luxury-gold/10 bg-[#111111]/30 hover:border-luxury-gold/30 p-8 flex flex-col justify-between space-y-6 group transition-all duration-500"
            >
              {/* Card Top: Domain & Period */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-gold font-bold">
                    {item.domain}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans text-[10px] text-luxury-grey/75 font-mono">
                    <Calendar size={11} className="text-luxury-gold/50" />
                    {item.period}
                  </span>
                </div>

                {/* Title & Organizer */}
                <div>
                  <h3 className="font-sans text-base uppercase tracking-wider font-bold text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-luxury-grey/80 tracking-wide mt-1">
                    {item.organizer}
                  </p>
                </div>

                {/* Highlight Badge if exists */}
                {item.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-luxury-gold/[0.06] border border-luxury-gold/20 text-[9px] uppercase tracking-[0.15em] text-luxury-gold font-semibold">
                    <Sparkles size={10} />
                    <span>{item.highlight}</span>
                  </div>
                )}

                {/* Description */}
                <p className="font-sans text-xs font-light text-luxury-grey leading-relaxed tracking-wider">
                  {item.description}
                </p>
              </div>

              {/* Tags footer */}
              <div className="pt-4 border-t border-luxury-gold/5 flex flex-wrap gap-2">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-sans text-[9px] uppercase tracking-[0.1em] text-luxury-grey/80 px-2.5 py-1 bg-[#161616] border border-luxury-gold/5 group-hover:border-luxury-gold/15 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
