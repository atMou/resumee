// Global type definitions

export interface GalleryImage {
  image: string;
  title: string;
  description: string;
}

export interface TechnicalHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  image: string;
  title: string;
  tech: string;
  desc: string;
  gallery: GalleryImage[];
  video?: string;
  videoUrl?: string;
  keyFeatures: string[];
  technicalHighlights: TechnicalHighlight[];
  developmentPeriod: string;
  github?: string;
  demo?: string;
  aboutProject: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  features: string[];
}

export interface NavItem {
  label: string;
  id: string;
}

export interface Translation {
  nav: {
    about: string;
    projects: string;
    services: string;
    contact: string;
    resume: string;
    devMode: string;
    language: string;
  };
  hero: {
    greeting: string;
    title: string;
    description: string;
    specialization: string;
    cta: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    skillsProject: string;
    skillsFun: string;
  };
  projects: {
    title: string;
    showAll: string;
    showLess: string;
    learnMore: string;
    aboutProject: string;
    keyFeatures: string;
    timeline: string;
    developmentPeriod: string;
    defaultTimeline: string;
    status: string;
    completed: string;
    technicalHighlights: string;
    viewCode: string;
    liveDemo: string;
  };
  services: {
    title: string;
    [key: string]: any;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  terminal: {
    welcome: string;
    helpPrompt: string;
    whoamiPrompt: string;
    commands: {
      [key: string]: string;
    };
    notFound: string;
    helpText: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    close: string;
  };
  footer: {
    rights: string;
    language: string;
    theme: string;
    devMode: string;
  };
}
