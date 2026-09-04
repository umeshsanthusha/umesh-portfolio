import type { IconType } from "react-icons";

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "contact";

export interface NavLink {
  id: SectionId;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface QuickStat {
  value: string;
  label: string;
  icon: IconType;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  featured?: boolean;
}

export interface Publication {
  title: string;
  context: string;
}

export interface EducationEntry {
  level: string;
  qualification: string;
  institution: string;
  period: string;
  details: string;
  current?: boolean;
}

export interface Skill {
  name: string;
  icon?: IconType;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface ContactChannel {
  label: string;
  value: string;
  href?: string;
  icon: IconType;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
