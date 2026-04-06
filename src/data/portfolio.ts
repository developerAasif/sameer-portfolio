import portfolioJson from "./portfolio.json";

export interface Personal {
  image: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  objective: string;
  summary: string;
  contact: {
    phone: string;
    email: string;
    location: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  resume: string;
  availability: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface Skills {
  frontend: Skill[];
  backend: Skill[];
  databases: Skill[];
  realtime: Skill[];
  cloud: Skill[];
  ai: Skill[];
  auth: Skill[];
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  gradient?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
  gradient: string;
  highlights?: string[];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface PortfolioData {
  personal: Personal;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education;
  features: Feature[];
}

const portfolioData: PortfolioData = portfolioJson as PortfolioData;

export default portfolioData;
