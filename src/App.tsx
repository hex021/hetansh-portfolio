import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
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
      <ECEGlobalBackground />

      {/* Floating navigation header */}
      <Navbar onNavigateToAdmin={() => navigateTo('admin')} />

      {/* Immersive sections */}
      <main className="relative w-full">
        {/* Section 1: Hero landing & Vision */}
        <Hero />

        {/* Section 2: Bio details & background */}
        <About />

        {/* Section 3: Engineering Mindset creed */}
        <Philosophy />

        {/* Section 4: Technical skillset & controls dashboard */}
        <Expertise />

        {/* Section 5: Projects showcased as product launches */}
        <Projects />

        {/* Section 6: Active Research & Sensor Instrumentation */}
        <Research />

        {/* Section 7: Operations telemetry dashboard */}
        <Dashboard />

        {/* Section 8: Three.js interactive network representation */}
        <TechNetwork />

        {/* Section 9: Vertical trajectory timeline */}
        <Timeline />

        {/* Section 10: Milestones & Key Achievements */}
        <Achievements />

        {/* Section 11: Beyond Engineering interests */}
        <BeyondEngineering />

        {/* Section 12: Glassmorphism contact module */}
        <Contact onNavigateToAdmin={() => navigateTo('admin')} />
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
