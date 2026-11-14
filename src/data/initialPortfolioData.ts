import type { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Hetansh Patel',
    title: 'Robotics • Embedded Systems • AI/ML',
    subtitle: 'Electronics & Communication Engineering Portfolio',
    email: 'hetansh75.hp@gmail.com',
    phone: '+91 87582 96710',
    location: 'Ahmedabad, India',
    timezone: 'GMT +5:30',
    gpa: '8.42 / 10 (till 4th Semester)',
    degree: 'B.Tech in Electronics & Communication Engineering',
    university: 'Pandit Deendayal Energy University (PDEU)',
    githubUrl: 'https://github.com/hex021',
    linkedinUrl: 'https://linkedin.com/in/hetansh-patel-693739326',
    twitterUrl: '',
    customLinks: [],
    resumeUrl: '/Hetansh_Patel_Resume.pdf',
    resumeFileName: 'Hetansh_Patel_Resume.pdf',
    statusBadge: 'Hardware Systems & AI Architect',
    availability: '',
    bioHeading: 'Architecting Systems Where Silicon Meets Code',
    bioSummary: 'Architecting advanced cyber-physical technology. Designing low-latency hardware, embedded firmware networks, and robotic vector controllers with micro-millimeter precision.'
  },
  projects: [
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
      ],
      githubUrl: 'https://github.com/hex021'
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
      ],
      githubUrl: 'https://github.com/hex021'
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
      ],
      githubUrl: 'https://github.com/hex021'
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
      ],
      githubUrl: 'https://github.com/hex021'
    },
    {
      id: 'nagarnetra',
      title: 'NagarNetra — Urban Intelligence Platform',
      category: 'CASE STUDY // COMPUTER VISION AI',
      tagline: 'AI-powered urban surveillance and analytics for Smart India Hackathon 2026.',
      problem: 'Urban traffic management and law enforcement lack real-time, automated intelligence for vehicle identification, crowd density estimation, and incident detection across distributed CCTV networks.',
      approach: 'Led the computer vision pipeline as Technology & CV Lead. Deployed YOLOv8 object detection, ByteTrack multi-object tracking, Lucas-Kanade optical flow for motion estimation, and EasyOCR-based Automatic Number Plate Recognition (ANPR). Built on PyTorch with OpenCV preprocessing.',
      outcome: 'Delivered a unified real-time urban intelligence dashboard capable of simultaneous vehicle tracking, crowd analytics, and automated plate recognition across multiple camera feeds.',
      techSpecs: {
        mcu: 'GPU-Accelerated Server',
        sensors: 'CCTV Camera Feeds',
        protocol: 'REST API / WebSocket Streams',
        languages: 'Python, PyTorch, OpenCV, YOLO'
      },
      metrics: [
        { label: 'Detection Model', value: 'YOLOv8' },
        { label: 'Tracking Pipeline', value: 'ByteTrack' }
      ],
      githubUrl: 'https://github.com/hex021'
    },
    {
      id: 'monte-carlo',
      title: 'Project Monte Carlo — Financial Risk Analytics',
      category: 'CASE STUDY // QUANTITATIVE FINANCE',
      tagline: 'Stochastic simulation engine for multi-asset portfolio risk assessment and optimization.',
      problem: 'Traditional portfolio risk assessment relies on static historical analysis, failing to capture tail risks, correlated market shocks, and dynamic volatility regimes that drive real-world financial losses.',
      approach: 'Built a full-stack analytics platform using Monte Carlo simulation with Cholesky-decomposed correlated asset paths. Integrated Ridge regression forecasting, NLP sentiment scoring from financial news, and Markowitz mean-variance optimization. Backend on FastAPI, frontend in React/TypeScript.',
      outcome: 'Achieved 38ms latency for 5,000 simulation paths over 30 days and 412ms for 50,000 paths over 365 days, with real-time Value-at-Risk (VaR) and Conditional VaR calculations.',
      techSpecs: {
        mcu: 'FastAPI Backend Server',
        sensors: 'Market Data Feeds / NLP Sources',
        protocol: 'REST API / JSON',
        languages: 'Python, NumPy, React, TypeScript'
      },
      metrics: [
        { label: '5K Paths / 30 Days', value: '38ms' },
        { label: '50K Paths / 365 Days', value: '412ms' }
      ],
      githubUrl: 'https://github.com/hex021'
    },
    {
      id: 'wifi-car',
      title: 'Wi-Fi Controlled Smart Car',
      category: 'CASE STUDY // WIRELESS IoT',
      tagline: 'Smartphone-operated robotic vehicle via real-time Wi-Fi command streaming.',
      problem: 'Bluetooth-based remote control solutions suffer from limited range and pairing complexity, restricting operational flexibility for remotely operated ground vehicles.',
      approach: 'Configured an ESP32 as a Wi-Fi access point hosting a lightweight HTTP command server. Developed a smartphone web interface for directional control, with real-time motor driver commands streamed over the local wireless network.',
      outcome: 'Achieved responsive wireless control with seamless smartphone connectivity and no external infrastructure dependency.',
      techSpecs: {
        mcu: 'ESP32 (Wi-Fi AP Mode)',
        sensors: 'Web-Based Touch Interface',
        protocol: 'HTTP / Wi-Fi Direct',
        languages: 'Embedded C++ / HTML/JS'
      },
      metrics: [
        { label: 'Control Interface', value: 'Web UI' },
        { label: 'Wireless Range', value: '30m+' }
      ],
      githubUrl: 'https://github.com/hex021'
    }
  ],
  research: [
    {
      id: 'geogrid-sand-monitoring',
      title: 'Low-Cost Smart Monitoring System for Geogrid-Reinforced Sand Layer Analysis',
      badge: 'Active Research Project',
      department: 'Department of Civil',
      supervisor: 'Dr. Uma Chaduvula',
      period: 'January 2026 – Present',
      location: 'Geotech Laboratory, PDEU',
      summary: 'Designing and deploying an embedded sensor network for real-time structural health monitoring of geogrid-reinforced sand layers. The system captures deformation and strain data using ultrasonic distance transducers and BF350 foil strain gauges interfaced with ESP32 microcontrollers.',
      contributions: [
        'Designed complete circuit schematics for multi-sensor acquisition nodes',
        'Calibrated ultrasonic transducers and strain gauge amplification circuits',
        'Developed Python-based data processing pipeline for deformation analysis',
        'Maintained detailed calibration logs and hardware documentation'
      ],
      techStack: [
        'ESP32 Microcontroller',
        'Ultrasonic Distance Transducers',
        'BF350 Foil Strain Gauges',
        'Python Telemetry Pipeline',
        'Signal Conditioning Circuits'
      ],
      researchInterests: [
        'IoT and Embedded Systems',
        'Sensor Instrumentation',
        'Wireless Sensing',
        'Feedback Control & Robotics',
        'Signal Processing'
      ],
      docUrl: 'https://github.com/hex021'
    }
  ],
  achievements: [
    {
      id: 'hackathons',
      label: 'Hackathons',
      categoryNumber: '01',
      iconName: 'trophy',
      tagline: 'Competitive engineering sprints tackling real-world telemetry & AI challenges.',
      items: [
        {
          id: 'dev-init',
          title: 'DEV:Init Hackathon',
          organizer: 'Google Developer Groups (GDG) PDEU',
          period: '2026',
          domain: 'AI & Smart Urban Infrastructure',
          description: 'Engineered NagarNetra — an edge-compatible computer vision platform for real-time pothole and civic hazard tracking with YOLO, ByteTrack multi-object tracking, and automated coordinate tagging.',
          highlight: 'Featured Urban AI Project',
          tags: ['YOLO', 'ByteTrack', 'OpenCV', 'PyTorch']
        },
        {
          id: 'codeversity',
          title: 'Codeversity National Hackathon',
          organizer: 'National Technical Consortium — Team Trinity',
          period: '2025',
          domain: 'National AI Domain Sprint',
          description: 'Competed nationally in the AI track with Team Trinity, architecting high-efficiency machine learning pipelines and real-time data ingestion models under tight 36-hour sprint constraints.',
          highlight: 'National Finalist Team',
          tags: ['Machine Learning', 'Data Pipelines', 'Python', 'FastAPI']
        },
        {
          id: 'cognivia',
          title: 'COGNIVIA Hackathon',
          organizer: 'IEEE Sampark 2026',
          period: '2026',
          domain: 'Autonomous Systems & Embedded Tech',
          description: 'Engineered rapid-prototype embedded firmware and control logic for automated robotic systems, focusing on low-power telemetry transport and sensor node synchronization.',
          highlight: 'IEEE Flagship Participant',
          tags: ['Embedded Systems', 'Robotics', 'ESP32', 'Firmware']
        }
      ]
    },
    {
      id: 'workshops',
      label: 'Technical Workshops',
      categoryNumber: '02',
      iconName: 'wrench',
      tagline: 'Deep-dive technical training sessions led by IEEE societies and premier institutes.',
      items: [
        {
          id: 'ros2-workshop',
          title: '3-Day Hands-on Workshop on ROS 2',
          organizer: 'IEEE Robotics & Automation Society (RAS) PDEU',
          period: '3-Day Intensive',
          domain: 'Robot Operating System Architecture',
          description: 'Mastered ROS 2 core architecture, distributed nodes, publisher-subscriber communication paradigms, custom message definitions, and robotic motion simulation environments.',
          highlight: 'Certified Hands-on Training',
          tags: ['ROS 2', 'Linux/Ubuntu', 'Python', 'Pub-Sub Nodes', 'URDF']
        },
        {
          id: 'signal-lecture',
          title: 'Distinguished Lecture on Signal Processing',
          organizer: 'IEEE GRSS / SPS / AP-S Joint Chapter',
          period: 'Specialized Lecture',
          domain: 'Signal Conditioning & Sensor Analytics',
          description: 'Attended specialized sessions on digital filter architectures, noise suppression in noisy analog sensor interfaces, Fourier transformations, and high-frequency RF front-end principles.',
          highlight: 'IEEE Joint Society Session',
          tags: ['Signal Processing', 'Filter Design', 'Sensor Interfacing', 'RF Basics']
        },
        {
          id: 'ai-deep-learning',
          title: 'AI & Deep Learning Workshop',
          organizer: 'Indian Institute of Technology (IIT) Gandhinagar',
          period: 'Premier Institute Training',
          domain: 'Neural Architectures & Inference',
          description: 'Immersive training on convolutional neural networks (CNNs), transformer architectures, training optimization, and model compression for real-time edge deployment.',
          highlight: 'IIT Gandhinagar Certification',
          tags: ['Deep Learning', 'PyTorch', 'Edge AI', 'Computer Vision']
        }
      ]
    },
    {
      id: 'credentials',
      label: 'Certifications',
      categoryNumber: '03',
      iconName: 'award',
      tagline: 'Formal credentials validating theoretical foundations and specialized competencies.',
      items: [
        {
          id: 'nptel-robotics',
          title: 'Machine Learning & AI in Robotics',
          organizer: 'NPTEL — Ministry of Education, Govt. of India',
          period: 'In Progress (2026)',
          domain: 'Advanced Academic Specialization',
          description: 'Comprehensive postgraduate-level curriculum covering mathematical foundations of ML, robotic kinematics, state estimation, Kalman filters, perception algorithms, and reinforcement learning control.',
          highlight: 'Continuous Learning Initiative',
          tags: ['NPTEL', 'Robotics Kinematics', 'Reinforcement Learning', 'Kalman Filters']
        },
        {
          id: 'btech-ece',
          title: 'B.Tech in Electronics & Communication (8.42 CGPA)',
          organizer: 'Pandit Deendayal Energy University (PDEU)',
          period: '2024 – 2028',
          domain: 'Core Degree Foundation',
          description: 'Consistent top-tier academic performance in Microcontrollers, Digital Signal Processing, Analog Circuits, Electromagnetic Theory, and Linear Control Systems.',
          highlight: 'Top Tier Cohort Ranking',
          tags: ['ECE Core', 'Embedded Hardware', 'DSP', 'Control Systems']
        }
      ]
    }
  ],
  timeline: [
    {
      id: 'ieee-ras',
      date: '01/2025 - Present',
      title: 'IEEE Robotics And Automation Society (RAS) - Member',
      institution: 'PDEU Chapter',
      highlights: [
        'Contributed to robotics-focused technical activities, workshops, and collaborative projects, enhancing practical skills and teamwork.',
        'Interacted with industry and academic experts to gain insights on emerging technologies in robotics and automation.'
      ]
    },
    {
      id: 'sabar-seva',
      date: '05/2025 - 06/2025',
      title: 'Civic & Social Service Internship',
      institution: 'Sabar Seva Trust',
      highlights: [
        '80 hours of community field service and social outreach.',
        'Contributed to field documentation, project reporting, and grassroots community engagement.'
      ]
    },
    {
      id: 'btech-timeline',
      date: 'Expected 06/2028',
      title: 'B.Tech: Electronics & Communication Engineering',
      institution: 'Pandit Deendayal Energy University (PDEU)',
      highlights: [
        'Cumulative GPA: 8.42 / 10 (till 4th Semester)',
        'Core Focus: Embedded Systems, Signal Processing, Robotics Control, and Circuit Simulations.'
      ]
    },
    {
      id: '12th-grade',
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
      id: '10th-grade',
      date: '06/2022',
      title: 'Secondary Education (10th Grade)',
      institution: 'Shree Narayana Higher Secondary School, Ahmedabad',
      highlights: [
        'State Board Percentage: 97.03% (Outstanding academic distinction)'
      ]
    }
  ],
  ui: {
    accentColor: '#A61E2D',
    themePreset: 'crimson',
    showBackgroundCanvas: true,
    showPCBTraces: true,
    directGithubClick: false,
    heroFirstName: 'Hetansh',
    heroLastName: 'Patel',
    creedQuote: '"Translating high-frequency sensor telemetry into deterministic, closed-loop execution pipelines."',
    visibleSections: {
      about: true,
      philosophy: true,
      expertise: true,
      projects: true,
      research: true,
      dashboard: true,
      network: true,
      timeline: true,
      achievements: true,
      beyond: true,
      contact: true
    }
  },
  lastUpdated: new Date().toISOString()
};
