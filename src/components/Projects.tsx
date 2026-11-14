import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { PCBTraceBackground } from './BackgroundSystem';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const projectsData = data.projects;

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const currentProject = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];
  const activeProject = currentProject?.id || '';

  return (
    <section 
      id="projects" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Subtle PCB Traces Background */}
      <PCBTraceBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-24">
          <div className="space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
              04 / Executions
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wide text-luxury-text">
              Case <span className="font-light italic text-transparent text-outline">Studies</span>
            </h2>
          </div>
          <p className="font-sans text-xs text-luxury-grey tracking-widest uppercase max-w-sm font-light">
            EACH CASE STUDY MARKS A DEVELOPMENT THREAT RESOLVED THROUGH SYSTEM INTEGRITY AND CODE EFFICIENCY.
          </p>
        </div>

        {projectsData.length === 0 ? (
          <div className="text-center py-20 border border-luxury-gold/10 bg-[#111111]/20">
            <p className="text-sm uppercase tracking-widest text-luxury-grey">No projects currently logged.</p>
          </div>
        ) : (
          /* Dynamic Project Tabs Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Tabs Column */}
            <div className="lg:col-span-4 space-y-5">
              {projectsData.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left p-7 md:p-8 border transition-all duration-500 relative flex justify-between items-center group cursor-pointer ${
                    activeProject === project.id
                      ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-text shadow-gold-glow'
                      : 'border-luxury-gold/5 text-luxury-grey hover:text-luxury-text hover:border-luxury-gold/20'
                  }`}
                >
                  <div className="space-y-2 font-sans">
                    <span className="text-[10px] tracking-widest text-luxury-gold font-bold uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-sm uppercase tracking-wider font-bold">
                      {project.title}
                    </h3>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-350 ${
                      activeProject === project.id ? 'translate-x-1 text-luxury-gold' : 'text-luxury-grey group-hover:text-luxury-text'
                    }`} 
                  />
                </button>
              ))}
            </div>

            {/* Right Content Column */}
            {currentProject && (
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-stretch"
                  >
                    {/* Details Column */}
                    <div className="md:col-span-7 space-y-10 flex flex-col justify-between">
                      <div className="space-y-6">
                        <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-gold font-bold uppercase block">
                          SPECIFICATIONS
                        </span>
                        
                        {/* Clickable project title linking to GitHub repository */}
                        {currentProject.githubUrl ? (
                          <a
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group/title inline-flex items-center gap-2"
                            title="Click to visit GitHub repository"
                          >
                            <h3 className="font-sans text-lg md:text-xl uppercase tracking-widest font-bold text-luxury-text group-hover/title:text-luxury-gold transition-colors leading-tight">
                              {currentProject.title}
                            </h3>
                            <ExternalLink size={14} className="text-luxury-gold opacity-0 group-hover/title:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <h3 className="font-sans text-lg md:text-xl uppercase tracking-widest font-bold text-luxury-text leading-tight">
                            {currentProject.title}
                          </h3>
                        )}

                        <p className="font-sans text-sm font-semibold uppercase tracking-wider text-luxury-gold leading-relaxed">
                          {currentProject.tagline}
                        </p>

                        {/* Problem, Approach, Outcome */}
                        <div className="space-y-8 pt-8 border-t border-luxury-gold/10 text-sm">
                          <div>
                            <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-text font-bold mb-2">
                              The Problem
                            </h4>
                            <p className="font-sans text-[#B8BCC4] font-normal leading-relaxed tracking-wide">
                              {currentProject.problem}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-text font-bold mb-2">
                              Engineering Approach
                            </h4>
                            <p className="font-sans text-[#B8BCC4] font-normal leading-relaxed tracking-wide">
                              {currentProject.approach}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-gold font-bold mb-2">
                              Outcome
                            </h4>
                            <p className="font-sans text-[#B8BCC4] font-normal leading-relaxed tracking-wide">
                              {currentProject.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specs Column */}
                    <div className="md:col-span-5 flex flex-col justify-between space-y-8">
                      {/* Technical Specifications */}
                      <div className="p-8 border border-luxury-gold/10 bg-[#111111]/20 space-y-6">
                        <span className="font-sans text-sm uppercase tracking-[0.15em] text-luxury-text font-bold block">Specs Blueprint</span>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-[11px] font-mono text-luxury-grey">
                          <div>
                            <div className="font-sans text-xs text-luxury-gold uppercase font-bold tracking-wider">Processor</div>
                            <div className="text-[#B8BCC4] font-semibold uppercase mt-1 text-[11px] leading-relaxed tracking-wide block">{currentProject.techSpecs.mcu}</div>
                          </div>
                          <div>
                            <div className="font-sans text-xs text-luxury-gold uppercase font-bold tracking-wider">Sensors</div>
                            <div className="text-[#B8BCC4] font-semibold uppercase mt-1 text-[11px] leading-relaxed tracking-wide block">{currentProject.techSpecs.sensors}</div>
                          </div>
                          <div>
                            <div className="font-sans text-xs text-luxury-gold uppercase font-bold tracking-wider">Link Bus</div>
                            <div className="text-[#B8BCC4] font-semibold uppercase mt-1 text-[11px] leading-relaxed tracking-wide block">{currentProject.techSpecs.protocol}</div>
                          </div>
                          <div>
                            <div className="font-sans text-xs text-luxury-gold uppercase font-bold tracking-wider">Compilers</div>
                            <div className="text-[#B8BCC4] font-semibold uppercase mt-1 text-[11px] leading-relaxed tracking-wide block">{currentProject.techSpecs.languages}</div>
                          </div>
                        </div>
                      </div>

                      {/* Operational Telemetry Metrics */}
                      {currentProject.metrics && currentProject.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-6">
                          {currentProject.metrics.map((metric, i) => (
                            <div key={i} className="p-6 border border-luxury-gold/10 bg-[#111111]/20 text-center flex flex-col justify-center">
                              <div className="font-sans text-2xl font-bold text-luxury-gold tracking-wide">{metric.value}</div>
                              <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#B8BCC4] mt-2 block">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* GitHub Link */}
                      {currentProject.githubUrl && (
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-3 py-4 border border-luxury-gold/20 bg-transparent text-luxury-text font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-luxury-gold hover:text-luxury-bg transition-all duration-500 shadow-gold-glow"
                        >
                          View on GitHub <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
