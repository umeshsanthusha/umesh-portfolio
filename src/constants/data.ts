import {
  FaBootstrap,
  FaCss3Alt,
  FaGithub,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaLinkedin,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiJsonwebtokens,
  SiMysql,
  SiSharp,
  SiSupabase,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { FiDownload, FiLayers, FiMail, FiMapPin, FiPenTool, FiPhone } from "react-icons/fi";
import type {
  ContactChannel,
  EducationEntry,
  ExperienceEntry,
  NavLink,
  Project,
  Publication,
  QuickStat,
  SkillGroup,
  SocialLink,
} from "@/types";

const EMAIL = "santhushaumesh2@gmail.com";
const GITHUB = "https://github.com/umeshsanthusha";
const LINKEDIN = "https://linkedin.com/in/umesh-santhusha";

export const profile = {
  name: "Umesh Santhusha",
  firstName: "Umesh",
  greeting: "Hi, I’m",
  roles: ["UI/UX Developer", "Frontend Developer", "Creative Coder"],
  tagline: "Crafting intuitive digital experiences with code and creativity.",
  location: "Matara, Sri Lanka",
  email: EMAIL,
  phone: "071 5346 057",
  github: GITHUB,
  linkedin: LINKEDIN,
  resumePath: "/resume.pdf",
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: GITHUB, icon: FaGithub },
  { label: "LinkedIn", href: LINKEDIN, icon: FaLinkedin },
  { label: "Email", href: `mailto:${EMAIL}`, icon: FiMail },
];

export const quickStats: QuickStat[] = [
  { value: "SLIATE Galle", label: "IT Undergraduate", icon: FiPenTool },
  { value: "1 year", label: "Professional experience", icon: FiDownload },
  { value: "Full-stack", label: "Frontend-leaning", icon: FiLayers },
  { value: "Sketching", label: "Pencil & digital art", icon: FiPenTool },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Chathura Enterprises PVT LTD",
    role: "IT Data Entry Intern",
    period: "January 2024 – June 2024",
    points: [
      "Worked with real-time ERP systems",
      "Developed practical knowledge in database management",
      "Handled real-world network infrastructure",
      "Diagnosed and resolved network troubleshooting issues",
      "Performed Windows system troubleshooting and technical support",
      "Identified and resolved hardware-related technical issues",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "VIVID VISIONS BY SANTHU",
    tagline: "Art selling e-commerce site",
    description:
      "A full e-commerce platform to showcase and sell hand-drawn pencil art, accept custom art commissions, and engage with art enthusiasts.",
    tech: ["HTML5", "JavaScript", "CSS"],
    github: GITHUB,
    featured: true,
  },
  {
    title: "GradeMe",
    tagline: "Student exam management system",
    description:
      "A comprehensive web application for managing student information, tracking exams, and monitoring academic performance.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "CSS"],
    github: GITHUB,
    featured: true,
  },
];

export const publication: Publication = {
  title: "Cross Language Bug Prediction Using Code Smells",
  context:
    "Research publication — final project, Higher National Diploma in Information Technology, SLIATE Galle",
};

export const education: EducationEntry[] = [
  {
    level: "HND",
    qualification: "Higher National Diploma in Information Technology",
    institution: "SLIATE Galle",
    period: "2024 – Present",
    details: "Major in Computer Science · Minors in Advanced Physics, Mathematics & Statistics",
    current: true,
  },
  {
    level: "A/L",
    qualification: "Advanced Level",
    institution: "Athuraliya National School",
    period: "2022",
    details: "Commerce stream — Accounting (S), Business Studies (S), ICT (S)",
  },
  {
    level: "O/L",
    qualification: "Ordinary Level",
    institution: "Athuraliya National School",
    period: "2017",
    details: "Results: 5A, 2B, 1C, 1S",
  },
];

export const technicalSkills: SkillGroup[] = [
  {
    title: "Programming languages",
    skills: [
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C#", icon: SiSharp },
      { name: "PHP", icon: FaPhp },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: FaReact },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Bootstrap", icon: FaBootstrap },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    title: "Tools & platforms",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "VS Code", icon: VscCode },
    ],
  },
  {
    title: "Cloud & deployment",
    skills: [
      { name: "Render" },
      { name: "Cloudinary" },
    ],
  },
  {
    title: "Practices",
    skills: [
      { name: "JWT Authentication", icon: SiJsonwebtokens },
      { name: "REST API Design" },
      { name: "Responsive UI/UX" },
    ],
  },
];

export const creativeSkills: SkillGroup = {
  title: "Creative skills",
  skills: [
    { name: "Pencil Sketching" },
    { name: "Digital Illustration" },
    { name: "Drawing" },
    { name: "Color Theory" },
  ],
};

export const contactChannels: ContactChannel[] = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: FiMail },
  { label: "Phone", value: "071 5346 057", href: "tel:+94715346057", icon: FiPhone },
  { label: "LinkedIn", value: "in/umesh-santhusha", href: LINKEDIN, icon: FaLinkedin },
  { label: "GitHub", value: "umeshsanthusha", href: GITHUB, icon: FaGithub },
  { label: "Location", value: "Matara, Sri Lanka", icon: FiMapPin },
];
