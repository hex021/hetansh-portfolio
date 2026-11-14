import React from 'react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { OscilloscopeBackground } from './BackgroundSystem';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data.profile;

  const socials = [
    { 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ), 
      url: profile.linkedinUrl || 'https://linkedin.com/in/hetansh-patel-693739326', 
      label: 'LinkedIn' 
    },
    { 
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ), 
      url: profile.githubUrl || 'https://github.com/hex021', 
      label: 'GitHub' 
    },
    { icon: <Mail size={18} />, url: `mailto:${profile.email}`, label: 'Email' }
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
                11 / Connection
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light uppercase tracking-wider text-luxury-text leading-tight animate-fade-in">
                Let's Build <br />
                <span className="font-light italic text-transparent text-outline">Something Meaningful.</span>
              </h2>
            </div>

            <p className="font-sans text-xs md:text-sm text-luxury-grey font-light leading-relaxed max-w-sm tracking-wider">
              I am open to discussions on robotics control design, microcontroller integrations, research proposals, or collaborative software-hardware builds. Reach out via email, phone, or connect on professional nodes.
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
                    aria-label={s.label}
                    className="w-12 h-12 border border-luxury-gold/10 flex items-center justify-center text-luxury-grey hover:text-luxury-gold hover:border-luxury-gold transition-all duration-500 bg-[#111111]/10 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Details */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Direct Mail Card */}
              <a 
                href={`mailto:${profile.email}`}
                className="luxury-card p-8 border border-luxury-gold/10 bg-[#111111]/10 hover:border-luxury-gold/30 hover:bg-[#111111]/30 transition-all duration-500 flex flex-col justify-between space-y-8 group block"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-bold block">
                      Direct Email Line
                    </span>
                    <h3 className="font-sans text-lg md:text-xl font-light tracking-wide text-luxury-text group-hover:text-luxury-gold transition-colors duration-300 break-all">
                      {profile.email}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-luxury-gold/10 flex items-center justify-center text-luxury-grey group-hover:text-luxury-gold group-hover:border-luxury-gold transition-all duration-500">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
                <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-luxury-grey/75 font-light">
                  Standard encryption / 24h operational response.
                </div>
              </a>

              {/* Direct Phone Card */}
              <a 
                href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                className="luxury-card p-8 border border-luxury-gold/10 bg-[#111111]/10 hover:border-luxury-gold/30 hover:bg-[#111111]/30 transition-all duration-500 flex flex-col justify-between space-y-8 group block"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-bold block">
                      Direct Wire / Voice
                    </span>
                    <h3 className="font-sans text-lg md:text-2xl font-light tracking-wide text-luxury-text group-hover:text-luxury-gold transition-colors duration-300">
                      {profile.phone}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-luxury-gold/10 flex items-center justify-center text-luxury-grey group-hover:text-luxury-gold group-hover:border-luxury-gold transition-all duration-500">
                    <Phone size={15} />
                  </div>
                </div>
                <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-luxury-grey/75 font-light">
                  Direct telephone &amp; WhatsApp communication line.
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
                    {profile.location}
                  </h3>
                </div>
                <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-luxury-grey/75 font-light">
                  Active Timezone // {profile.timezone}
                </div>
              </div>

              {/* Academic Credentials Card */}
              <div 
                className="luxury-card p-8 border border-luxury-gold/10 bg-[#111111]/10 transition-all duration-500 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-1.5">
                  <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-bold block">
                    Academic Standard
                  </span>
                  <h3 className="font-sans text-base md:text-xl font-light tracking-wide text-luxury-text">
                    GPA: <span className="font-bold text-luxury-gold font-mono">{profile.gpa}</span>
                  </h3>
                </div>
                <div className="font-sans text-[9px] uppercase tracking-[0.15em] text-luxury-grey/75 font-light">
                  {profile.university}
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
            <span>Made with React &amp; Three.js</span>
          </div>
        </div>

      </div>
    </section>
  );
};
