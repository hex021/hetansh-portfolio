export interface ProjectTechSpecs {
  mcu: string;
  sensors: string;
  protocol: string;
  languages: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  techSpecs: ProjectTechSpecs;
  metrics: ProjectMetric[];
  githubUrl?: string;
  featured?: boolean;
}

export interface ResearchItem {
  id: string;
  title: string;
  badge: string;
  department: string;
  supervisor: string;
  period: string;
  location: string;
  summary: string;
  contributions: string[];
  techStack: string[];
  researchInterests: string[];
  docUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organizer: string;
  period: string;
  domain: string;
  description: string;
  highlight?: string;
  tags: string[];
}

export interface AchievementCategory {
  id: string;
  label: string;
  categoryNumber: string;
  iconName: 'trophy' | 'wrench' | 'award' | 'sparkles';
  tagline: string;
  items: AchievementItem[];
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  institution: string;
  highlights: string[];
}

export interface CustomLinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  gpa: string;
  degree: string;
  university: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  customLinks?: CustomLinkItem[];
  resumeUrl?: string;
  resumeFileName?: string;
  statusBadge: string;
  availability: string;
  bioHeading: string;
  bioSummary: string;
}

export interface VisibleSections {
  about: boolean;
  philosophy: boolean;
  expertise: boolean;
  projects: boolean;
  research: boolean;
  dashboard: boolean;
  network: boolean;
  timeline: boolean;
  achievements: boolean;
  beyond: boolean;
  contact: boolean;
}

export interface UISettings {
  accentColor: string; // e.g. '#A61E2D'
  themePreset: 'crimson' | 'titanium' | 'gold' | 'emerald' | 'cobalt' | 'custom';
  showBackgroundCanvas: boolean;
  showPCBTraces: boolean;
  directGithubClick: boolean; // whether clicking a project tab navigates directly to GitHub
  heroFirstName?: string;
  heroLastName?: string;
  creedQuote?: string;
  visibleSections: VisibleSections;
}

export interface PortfolioData {
  profile: ProfileData;
  projects: ProjectItem[];
  research: ResearchItem[];
  achievements: AchievementCategory[];
  timeline: TimelineItem[];
  ui: UISettings;
  lastUpdated: string;
}
