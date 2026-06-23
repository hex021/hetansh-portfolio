import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { OscilloscopeBackground } from './BackgroundSystem';

export const Contact: React.FC = () => {
  const socials = [
    { 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ), 
      url: 'https://linkedin.com/in/hetansh-patel-693739326', 
      label: 'LinkedIn' 
    },
    { 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ), 
      url: 'https://github.com/hex021', 
      label: 'GitHub' 
    },
    { icon: <Mail size={18} />, url: 'mailto:hetansh75.hp@gmail.com', label: 'Email' }
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-screen bg-transparent py-36 px-8 md:px-16 flex flex-col justify-center overflow-hidden border-t border-luxury-gold/5"
    >
      <OscilloscopeBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Get in touch copy */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-bold">
                09 / Connection
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wider text-luxury-text leading-tight animate-fade-in">
                Let's Build <br />
                <span className="font-light italic text-transparent text-outline">Something Meaningful.</span>
              </h2>
            </div>

            <p className="font-sans text-xs md:text-sm text-luxury-grey font-light leading-relaxed max-w-sm tracking-wider">
              I am open to discussions on robotics control design, microcontroller integrations, research proposals, or collaborative software-hardware builds. Reach out via email or connect on professional nodes.
            </p>

            {/* Social connection icons */}
            <div className="space-y-4">
              <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-luxury-text font-bold block">Digital Anchors</span>
              <div className="flex gap-4">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-luxury-gold/10 bg-luxury-gold/[0.01] hover:border-luxury-gold hover:bg-luxury-gold/5 flex items-center justify-center text-luxury-grey hover:text-luxury-gold transition-all duration-300"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Info (Completely clean, functional and professional) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              
              {/* Email Card */}
              <a 
                href="mailto:hetansh75.hp@gmail.com" 
                className="luxury-card p-8 border border-luxury-gold/10 hover:border-luxury-gold/30 bg-[#111111]/10 hover:bg-luxury-gold/[0.02] transition-all duration-500 group flex flex-col justify-between space-y-8"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-bold block">
                      Direct Email
                    </span>
                    <h3 className="font-sans text-lg md:text-2xl font-light tracking-wide text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                      hetansh75.hp@gmail.com
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-luxury-gold/10 flex items-center justify-center text-luxury-grey group-hover:text-luxury-gold group-hover:border-luxury-gold transition-all duration-500">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-luxury-grey/75 font-light">
                  Primary contact channel. Response expected within 24 hours.
                </div>
              </a>

              {/* Location Card */}
              <div 
                className="luxury-card p-8 border border-luxury-gold/10 bg-[#111111]/10 transition-all duration-500 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-1.5">
                  <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-bold block">
                    Locator
                  </span>
                  <h3 className="font-sans text-lg md:text-2xl font-light tracking-wide text-luxury-text">
                    Ahmedabad, India
                  </h3>
                </div>
                <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-luxury-grey/75 font-light">
                  Active Timezone // GMT +5:30
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-36 pt-8 border-t border-luxury-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-[8px] uppercase tracking-[0.25em] text-luxury-grey/70">
          <div>© 2026 Hetansh Patel. All rights reserved.</div>
          <div className="flex gap-2">
            <span className="text-luxury-gold font-semibold">Precision Designed.</span>
            <span>Made with React &amp; HTML5 Canvas</span>
          </div>
        </div>

      </div>
    </section>
  );
};
