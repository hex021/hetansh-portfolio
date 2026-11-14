import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Lock } from 'lucide-react';

interface NavbarProps {
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Vision', href: '#vision' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Milestones', href: '#achievements' },
    { name: 'Beyond', href: '#beyond' },
  ];

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    } else {
      window.history.pushState(null, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-5 bg-luxury-bg/90 backdrop-blur-xl border-b border-luxury-gold/5' 
            : 'py-9 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand Name using Luxury Serif styling */}
          <a 
            href="#vision" 
            className="flex items-center space-x-3 text-luxury-text hover:text-luxury-gold transition-colors duration-300"
          >
            <div className="relative w-8 h-8 flex items-center justify-center border border-luxury-gold/20 rounded-full">
              <Cpu size={13} className="text-luxury-gold" />
            </div>
            <span className="font-sans text-sm font-bold tracking-[0.3em] uppercase">
              Hetansh <span className="font-medium text-luxury-gold">Patel</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-sans text-[10px] uppercase tracking-[0.25em] text-luxury-grey hover:text-luxury-text transition-colors duration-350 py-2 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-350 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {/* Premium CTA Button */}
              <a
                href="#contact"
                className="px-6 py-2.5 border border-luxury-gold/30 hover:border-luxury-gold bg-transparent font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-text hover:bg-luxury-gold hover:text-luxury-bg transition-all duration-500"
              >
                Let's Build
              </a>

              {/* Discreet Admin Lock Button */}
              <a
                href="/admin"
                onClick={handleAdminClick}
                title="Management Suite"
                className="p-2.5 border border-luxury-gold/15 hover:border-luxury-gold/50 text-luxury-grey hover:text-luxury-gold transition-all duration-300"
              >
                <Lock size={12} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="/admin"
              onClick={handleAdminClick}
              title="Admin Suite"
              className="p-2 border border-luxury-gold/20 text-luxury-grey hover:text-luxury-gold"
            >
              <Lock size={14} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-luxury-text hover:text-luxury-gold transition-colors duration-300 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-luxury-bg/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-lg uppercase tracking-[0.25em] text-luxury-text hover:text-luxury-gold transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 mx-auto px-8 py-3 border border-luxury-gold text-luxury-text bg-transparent hover:bg-luxury-gold hover:text-luxury-bg font-sans text-xs uppercase tracking-[0.2em] transition-all"
              >
                Let's Build
              </a>
              <a
                href="/admin"
                onClick={handleAdminClick}
                className="mx-auto flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-gold pt-4 border-t border-luxury-gold/15"
              >
                <Lock size={12} />
                <span>Admin Console</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
