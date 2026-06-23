import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Philosophy } from './components/Philosophy';
import { Expertise } from './components/Expertise';
import { Projects } from './components/Projects';
import { Dashboard } from './components/Dashboard';
import { TechNetwork } from './components/TechNetwork';
import { Timeline } from './components/Timeline';
import { BeyondEngineering } from './components/BeyondEngineering';
import { Contact } from './components/Contact';
import { ECEGlobalBackground } from './components/BackgroundSystem';

function App() {
  return (
    <div className="relative z-0 min-h-screen bg-transparent text-luxury-text select-text">
      {/* Global ECE Background System */}
      <ECEGlobalBackground />

      {/* Floating navigation header */}
      <Navbar />

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

        {/* Section 6: Operations telemetry dashboard */}
        <Dashboard />

        {/* Section 7: Three.js interactive network representation */}
        <TechNetwork />

        {/* Section 8: Vertical trajectory timeline */}
        <Timeline />

        {/* Section 9: Beyond Engineering interests */}
        <BeyondEngineering />

        {/* Section 10: Glassmorphism contact module */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
