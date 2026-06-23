import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PCBTraceBackground } from './BackgroundSystem';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  techSpecs: {
    mcu: string;
    sensors: string;
    protocol: string;
    languages: string;
  };
  metrics: { label: string; value: string }[];
}

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>('crop-advisor');

  const projectsData: CaseStudy[] = [
    {
      id: 'crop-advisor',
      title: 'Smart Crop & Scheme Advisor',
      category: 'CASE STUDY // AGRICULTURAL AI',
      tagline: 'Translating environmental telemetry logs into intelligent agricultural recommendations.',
      problem: 'Farmers navigate highly volatile soil and weather patterns without telemetry data, relying on historical assumptions that lead to crop failure, under-utilized land, and lost eligibility for government subsidies.',
      approach: 'Constructed an ESP32 sensor node to capture real-time soil NPK, moisture, and temperature. Configured a Python Flask server to parse coordinates, call live weather forecasts, evaluate a predictive ML model, and call Gemini AI to produce tailored multilingual advisors.',
      outcome: 'Achieved 94.2% crop recommendation accuracy and reduced subsidy profile evaluations to sub-2.1 seconds.',
      techSpecs: {
        mcu: 'ESP32 (NodeMCU) Board',
        sensors: 'Optical NPK, DHT22 Temp-Humidity, Soil Probe',
        protocol: 'RESTful API / JSON Payload',
        languages: 'C++, Python (Flask), Gemini AI SDK'
      },
      metrics: [
        { label: 'ML Recommendation Accuracy', value: '94.2%' },
        { label: 'Subsidy Matching Time', value: '< 2.1s' }
      ]
    },
    {
      id: 'gesture-car',
      title: 'Gesture Controlled Smart Car',
      category: 'CASE STUDY // WIRELESS ROBOTICS',
      tagline: 'High-speed gesture vector translation over peer-to-peer radio connections.',
      problem: 'Mechanical joystick controllers suffer from mechanical wear and lack natural physical feedback, adding mental delay during critical, high-speed robotics maneuvering.',
      approach: 'Integrated an MPU6050 accelerometer to map pitch and roll vectors. Configured a dual-core ESP32 transmitter to read data at 120Hz and pipe control frames via peer-to-peer ESP-NOW radio protocols directly to a motor driver receiver.',
      outcome: 'Secured a lag-free 8ms wireless communication cycle, achieving highly responsive gesture-based navigation.',
      techSpecs: {
        mcu: 'Dual ESP32 NodeMCU units',
        sensors: 'MPU6050 Six-Axis Accelerometer/Gyro',
        protocol: 'ESP-NOW (Direct 2.4GHz Link)',
        languages: 'Embedded C / C++ (PlatformIO)'
      },
      metrics: [
        { label: 'Wireless Processing Latency', value: '8ms' },
        { label: 'Transmission Frame Rate', value: '120 FPS' }
      ]
    },
    {
      id: 'targeting-system',
      title: 'Fire Detection & Targeting System',
      category: 'CASE STUDY // AUTOMATED CONTROL',
      tagline: 'Closed-loop spatial thermal hunting using pan-tilt gimbals.',
      problem: 'Static fire suppression fails to trace and lock onto dynamic heat sources, leading to delayed containment and unnecessary damage.',
      approach: 'Constructed a dual-axis pan-tilt gimbal powered by servo motors. Programmed a spatial tracking algorithm in C++ to read raw voltages from a 5-channel flame phototransistor array, adjust angular gimbals, and lock onto combustion sources.',
      outcome: 'Targeted and locked onto dynamic heat vectors within 45 milliseconds of sensor signal registration.',
      techSpecs: {
        mcu: 'ESP32 / Arduino Core',
        sensors: '5-Channel IR Flame Sensor Array',
        protocol: 'ADC Multiplexing / PWM Servo Loops',
        languages: 'C / C++ (PlatformIO)'
      },
      metrics: [
        { label: 'Correction Hunt Time', value: '45ms' },
        { label: 'Sensor Detection Arc', value: '120 deg' }
      ]
    },
    {
      id: 'autonomous-follower',
      title: 'Autonomous Line Following Robot',
      category: 'CASE STUDY // PID ROBOTICS',
      tagline: 'High-speed ground vehicle alignment using infrared reflectance arrays.',
      problem: 'Ground robots wobble and deviate along sharp curves, failing to maintain high path velocities due to slow steering feedback loops.',
      approach: 'Configured a ground vehicle with a 5-sensor IR array. Configured direct register polling for high-frequency ADC tracking, and programmed closed-loop path corrections to smoothly scale motor outputs.',
      outcome: 'Maintained path tracking alignment at velocities up to 1.2 m/s over dynamic path layouts.',
      techSpecs: {
        mcu: 'ATmega328P Microcontroller',
        sensors: '5-Channel IR Reflectance Array',
        protocol: 'ADC Polling / PWM Motor Outputs',
        languages: 'Embedded C'
      },
      metrics: [
        { label: 'IR Array Polling Freq', value: '400 Hz' },
        { label: 'Track Tracking Duty', value: '99.1%' }
      ]
    }
  ];

  const currentProject = projectsData.find(p => p.id === activeProject) || projectsData[0];

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

        {/* Dynamic Project Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Tabs Column (Updated to font-sans / Inter) */}
          <div className="lg:col-span-4 space-y-4">
            {projectsData.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={`w-full text-left p-6 border transition-all duration-500 relative flex justify-between items-center group ${
                  activeProject === project.id
                    ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-text shadow-gold-glow'
                    : 'border-luxury-gold/5 text-luxury-grey hover:text-luxury-text hover:border-luxury-gold/20'
                }`}
              >
                <div className="space-y-1.5 font-sans">
                  <span className="text-[8px] tracking-widest text-luxury-gold font-bold">
                    {project.category}
                  </span>
                  <h3 className="text-xs uppercase tracking-wider font-bold">
                    {project.title}
                  </h3>
                </div>
                <ChevronRight 
                  size={14} 
                  className={`transition-transform duration-350 ${
                    activeProject === project.id ? 'translate-x-1 text-luxury-gold' : 'text-luxury-grey group-hover:text-luxury-text'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
              >
                {/* Details Column */}
                <div className="md:col-span-7 space-y-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <span className="font-sans text-[8px] tracking-[0.25em] text-luxury-gold font-bold uppercase block">
                      SPECIFICATIONS
                    </span>
                    <h3 className="font-sans text-sm uppercase tracking-widest font-bold text-luxury-text leading-tight">
                      {currentProject.title}
                    </h3>
                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-luxury-gold">
                      {currentProject.tagline}
                    </p>

                    {/* Problem, Approach, Outcome */}
                    <div className="space-y-6 pt-6 border-t border-luxury-gold/10 text-xs">
                      <div>
                        <h4 className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-text font-bold mb-1">
                          The Problem
                        </h4>
                        <p className="font-sans text-luxury-grey font-light leading-relaxed tracking-wide">
                          {currentProject.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-text font-bold mb-1">
                          Engineering Approach
                        </h4>
                        <p className="font-sans text-luxury-grey font-light leading-relaxed tracking-wide">
                          {currentProject.approach}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-gold font-bold mb-1">
                          Outcome
                        </h4>
                        <p className="font-sans text-luxury-grey font-light leading-relaxed tracking-wide">
                          {currentProject.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specs Column */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                  {/* Technical Specifications */}
                  <div className="p-6 border border-luxury-gold/10 bg-[#141313]/20 space-y-4">
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-text font-bold">Specs Blueprint</span>
                    <div className="grid grid-cols-2 gap-4 text-[9px] font-mono text-luxury-grey">
                      <div>
                        <div className="font-sans text-[8px] text-luxury-gold uppercase font-bold">Processor</div>
                        <div className="text-luxury-text font-semibold uppercase mt-0.5">{currentProject.techSpecs.mcu}</div>
                      </div>
                      <div>
                        <div className="font-sans text-[8px] text-luxury-gold uppercase font-bold">Sensors</div>
                        <div className="text-luxury-text font-semibold uppercase mt-0.5">{currentProject.techSpecs.sensors}</div>
                      </div>
                      <div>
                        <div className="font-sans text-[8px] text-luxury-gold uppercase font-bold">Link Bus</div>
                        <div className="text-luxury-text font-semibold uppercase mt-0.5">{currentProject.techSpecs.protocol}</div>
                      </div>
                      <div>
                        <div className="font-sans text-[8px] text-luxury-gold uppercase font-bold">Compilers</div>
                        <div className="text-luxury-text font-semibold uppercase mt-0.5">{currentProject.techSpecs.languages}</div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Telemetry Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {currentProject.metrics.map((metric, i) => (
                      <div key={i} className="p-4 border border-luxury-gold/10 bg-[#141313]/20 text-center">
                        <div className="font-sans text-xl font-bold text-luxury-gold tracking-wide">{metric.value}</div>
                        <div className="font-sans text-[8px] uppercase tracking-[0.25em] text-luxury-grey mt-1.5">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
