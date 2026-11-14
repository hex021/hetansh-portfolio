import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Philosophy } from './components/Philosophy';
import { Expertise } from './components/Expertise';
import { Projects } from './components/Projects';
import { Research } from './components/Research';
import { Dashboard } from './components/Dashboard';
import { TechNetwork } from './components/TechNetwork';
import { Timeline } from './components/Timeline';
import { Achievements } from './components/Achievements';
import { BeyondEngineering } from './components/BeyondEngineering';
import { Contact } from './components/Contact';
import { ECEGlobalBackground } from './components/BackgroundSystem';

const AdminSuite = lazy(() =>
  import('./components/admin/AdminSuite').then((m) => ({ default: m.AdminSuite }))
);

function PortfolioApp() {
  const { data } = usePortfolio();
  const vs = data.ui?.visibleSections;
  const showCanvas = data.ui?.showBackgroundCanvas !== false;

  // Dynamically synchronize theme accent color with CSS variables
  useEffect(() => {
    const accent = data.ui?.accentColor || '#A61E2D';
    document.documentElement.style.setProperty('--color-luxury-gold', accent);
    document.documentElement.style.setProperty('--theme-accent', accent);
  }, [data.ui?.accentColor]);

  const [currentRoute, setCurrentRoute] = useState<'portfolio' | 'admin'>(() => {
    if (typeof window === 'undefined') return 'portfolio';
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path === '/admin' || path.startsWith('/admin') || hash === '#admin' || hash === '#/admin'
      ? 'admin'
      : 'portfolio';
  });

  // Handle browser URL changes (back/forward and hash changes)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isAdmin = path === '/admin' || path.startsWith('/admin') || hash === '#admin' || hash === '#/admin';
      setCurrentRoute(isAdmin ? 'admin' : 'portfolio');
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = useCallback((route: 'portfolio' | 'admin') => {
    setCurrentRoute(route);
    if (route === 'admin') {
      window.history.pushState(null, '', '/admin');
    } else {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (currentRoute === 'admin') {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#A61E2D] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AdminSuite onBackToPortfolio={() => navigateTo('portfolio')} />
      </Suspense>
    );
  }

  return (
    <div className="relative z-0 min-h-screen bg-transparent text-luxury-text select-text">
      {/* Global ECE Background System */}
      {showCanvas && <ECEGlobalBackground />}

      {/* Floating navigation header */}
      <Navbar onNavigateToAdmin={() => navigateTo('admin')} />

      {/* Immersive sections */}
      <main className="relative w-full">
        {/* Section 1: Hero landing & Vision */}
        <Hero />

        {/* Section 2: Bio details & background */}
        {vs?.about !== false && <About />}

        {/* Section 3: Engineering Mindset creed */}
        {vs?.philosophy !== false && <Philosophy />}

        {/* Section 4: Technical skillset & controls dashboard */}
        {vs?.expertise !== false && <Expertise />}

        {/* Section 5: Projects showcased as product launches */}
        {vs?.projects !== false && <Projects />}

        {/* Section 6: Active Research & Sensor Instrumentation */}
        {vs?.research !== false && <Research />}

        {/* Section 7: Operations telemetry dashboard */}
        {vs?.dashboard !== false && <Dashboard />}

        {/* Section 8: Three.js interactive network representation */}
        {vs?.network !== false && <TechNetwork />}

        {/* Section 9: Vertical trajectory timeline */}
        {vs?.timeline !== false && <Timeline />}

        {/* Section 10: Milestones & Key Achievements */}
        {vs?.achievements !== false && <Achievements />}

        {/* Section 11: Beyond Engineering interests */}
        {vs?.beyond !== false && <BeyondEngineering />}

        {/* Section 12: Glassmorphism contact module */}
        {vs?.contact !== false && <Contact onNavigateToAdmin={() => navigateTo('admin')} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
