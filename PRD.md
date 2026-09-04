# Product Requirements Document (PRD)
## Personal Portfolio Website — Umesh Santhusha
### UI/UX Developer Portfolio

---

**Document Version:** 1.0  
**Date:** September 2026  
**Owner:** Umesh Santhusha  
**Tech Stack:** React · Vite · TypeScript · Tailwind CSS · Three.js  

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals & Objectives](#2-goals--objectives)
3. [Target Audience](#3-target-audience)
4. [Tech Stack & Dependencies](#4-tech-stack--dependencies)
5. [Project Structure](#5-project-structure)
6. [Functional Requirements](#6-functional-requirements)
   - 6.1 Navigation Bar
   - 6.2 Hero Section
   - 6.3 About Me
   - 6.4 Experience
   - 6.5 Projects
   - 6.6 Education
   - 6.7 Skills
   - 6.8 Get In Touch (Contact)
   - 6.9 Footer
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Animation & Interaction Specs](#8-animation--interaction-specs)
9. [Routing & Navigation](#9-routing--navigation)
10. [Accessibility Requirements](#10-accessibility-requirements)
11. [SEO Requirements](#11-seo-requirements)
12. [Performance Requirements](#12-performance-requirements)
13. [Out of Scope](#13-out-of-scope)

---

## 1. Overview

This document defines the requirements for building a premium, dark-themed, single-page personal portfolio website for **Umesh Santhusha**, an undergraduate IT student and UI/UX developer. The website is built using **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, with interactive **Three.js** animations to deliver a visually premium and modern experience.

The portfolio showcases Umesh's professional identity, technical skills, past experience, projects, education, and a way for potential employers or collaborators to contact him.

---

## 2. Goals & Objectives

| Goal | Description |
|------|-------------|
| **Brand Presence** | Establish a strong personal brand as a UI/UX developer |
| **Showcase Work** | Present projects, skills, and experience in a compelling visual format |
| **Attract Recruiters** | Make it easy for employers to understand Umesh's capabilities and reach out |
| **Demonstrate Skills** | The portfolio itself acts as a live demonstration of frontend development skills |
| **Premium UX** | Deliver an animated, dark-themed, smooth UI that feels high-end |

---

## 3. Target Audience

- **Primary:** Recruiters, hiring managers, and HR teams in IT/software companies
- **Secondary:** Potential freelance clients, project collaborators
- **Tertiary:** Peers, educators, and the tech community

---

## 4. Tech Stack & Dependencies

### Core

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI rendering |
| `vite` | Build tool and dev server |
| `typescript` | Type safety |
| `tailwindcss` | Utility-first styling |

### Animation & 3D

| Package | Purpose |
|---------|---------|
| `three` + `@types/three` | 3D animation in Hero section |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Three.js helpers (OrbitControls, etc.) |
| `framer-motion` | Page and section animations, transitions |
| `gsap` | Timeline-based scroll animations |

### Utilities

| Package | Purpose |
|---------|---------|
| `react-scroll` | Smooth scroll to sections |
| `react-intersection-observer` | Trigger animations on scroll into view |
| `react-icons` | Icon library (tech stack icons, social icons) |
| `emailjs-com` | Send contact form emails without a backend |
| `react-hot-toast` | Toast notifications for contact form feedback |
| `clsx` | Conditional class merging utility |

---

## 5. Project Structure

```
portfolio/
├── public/
│   ├── favicon.ico
│   ├── resume.pdf               # Downloadable CV
│   └── og-image.png             # Open Graph image for SEO
│
├── src/
│   ├── assets/
│   │   ├── images/              # Profile photo, project screenshots
│   │   └── icons/               # Custom SVG icons if needed
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── three/
│   │   │   └── HeroCanvas.tsx   # Three.js scene component
│   │   │
│   │   └── ui/
│   │       ├── SectionHeading.tsx
│   │       ├── AnimatedCard.tsx
│   │       ├── Badge.tsx
│   │       ├── GlowButton.tsx
│   │       └── ProgressBar.tsx
│   │
│   ├── constants/
│   │   └── data.ts              # All static content (CV data)
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useActiveSection.ts
│   │
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
│   │
│   ├── utils/
│   │   └── helpers.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 6. Functional Requirements

---

### 6.1 Navigation Bar

**Component:** `Navbar.tsx`

#### Description
A fixed top navigation bar that stays visible while scrolling. It collapses into a hamburger menu on mobile. The active section is highlighted as the user scrolls through the page.

#### Requirements

| ID | Requirement |
|----|-------------|
| NAV-01 | The navbar must be **fixed** to the top of the viewport at all times |
| NAV-02 | It must display the **logo/name** on the left: "US" monogram or "Umesh Santhusha" wordmark |
| NAV-03 | Navigation links on the right: `Home`, `About`, `Experience`, `Projects`, `Education`, `Skills`, `Contact` |
| NAV-04 | Clicking any nav link **smoothly scrolls** to the corresponding section |
| NAV-05 | The currently visible section's nav link is **highlighted** with an accent color |
| NAV-06 | On scroll down, the navbar background should apply a **glassmorphism blur** effect (`backdrop-blur`, semi-transparent dark bg) |
| NAV-07 | On **mobile** (< 768px), collapse nav links into a **hamburger menu** that opens a full-screen or drawer menu |
| NAV-08 | Include a **"Download CV"** button (ghost/outline style) that downloads `resume.pdf` |
| NAV-09 | Navbar should animate in on **page load** with a slide-down + fade-in |

#### Content

- Logo text: **"Umesh."** or monogram **"US"**
- Nav links: Home · About · Experience · Projects · Education · Skills · Contact
- CTA: "Download CV" → links to `/public/resume.pdf` with `download` attribute

---

### 6.2 Hero Section

**Component:** `Hero.tsx` + `HeroCanvas.tsx`

#### Description
The first full-screen section that greets visitors. It contains an animated Three.js background canvas, a headline, subheadline, CTA buttons, and social links.

#### Requirements

| ID | Requirement |
|----|-------------|
| HERO-01 | The section must occupy **100vh** (full viewport height) |
| HERO-02 | A **Three.js canvas** must render as the full background of this section |
| HERO-03 | Hero text content is **layered on top** of the canvas with proper z-index |
| HERO-04 | Display a **greeting line**: "Hi, I'm" |
| HERO-05 | Display the **name**: "Umesh Santhusha" in large, bold typography |
| HERO-06 | Display a **typed/animated role line** that cycles through roles: `"UI/UX Developer"`, `"Frontend Developer"`, `"Creative Coder"` |
| HERO-07 | Display a **short bio line**: "Crafting intuitive digital experiences with code and creativity." |
| HERO-08 | Two **CTA buttons**: "View My Work" (primary, scrolls to Projects) and "Contact Me" (outline, scrolls to Contact) |
| HERO-09 | Display **social links** (icons): GitHub, LinkedIn, Email |
| HERO-10 | A subtle **scroll-down indicator** (animated chevron/arrow) at the bottom |
| HERO-11 | Hero text animates in with **staggered fade-up** on load |

#### Three.js Canvas Spec (`HeroCanvas.tsx`)

| ID | Requirement |
|----|-------------|
| THREE-01 | Render an **interactive particle field** — thousands of small points forming a floating mesh or galaxy-like cloud |
| THREE-02 | Particles should have a **subtle parallax effect** responding to mouse movement |
| THREE-03 | Use **accent-colored particles** (e.g., blue/purple/cyan tones) against the dark background |
| THREE-04 | Add a **slowly rotating torus knot or sphere wireframe** as a central focal geometry (optional, behind text) |
| THREE-05 | Canvas must be **non-interactive** (pointer-events: none) so it doesn't block text clicks |
| THREE-06 | On **mobile**, reduce particle count for performance |
| THREE-07 | Camera subtly **drifts/floats** with an idle animation using `requestAnimationFrame` |

#### Content

```
Hi, I'm
UMESH SANTHUSHA
[Typed animation: UI/UX Developer | Frontend Developer | Creative Coder]
Crafting intuitive digital experiences with code and creativity.

[View My Work]  [Contact Me]

[GitHub Icon] [LinkedIn Icon] [Email Icon]
```

---

### 6.3 About Me

**Component:** `About.tsx`

#### Description
A two-column section introducing Umesh with a profile photo on one side and a bio paragraph + highlights on the other.

#### Requirements

| ID | Requirement |
|----|-------------|
| ABOUT-01 | Section must have a **"About Me"** heading with a decorative accent line |
| ABOUT-02 | Left column: **profile photo** in a stylized frame (glowing border / angled clip-path) |
| ABOUT-03 | Right column: **bio paragraphs** and key highlights |
| ABOUT-04 | Display **quick-stat cards**: e.g., "1 Year Experience", "2 Projects", "5+ Tech Skills" |
| ABOUT-05 | Include a **"Download CV"** link within the section |
| ABOUT-06 | Section elements animate in from **left/right** on scroll into view |
| ABOUT-07 | On mobile, columns stack vertically (photo on top, text below) |

#### Content

**Bio Text:**
> Highly motivated IT student and UI/UX developer with a strong foundation in IT systems, frontend development, and creative design. Proficient in building responsive, user-centric web applications. Experienced in real-time ERP systems, database management, and network troubleshooting. Passionate about crafting beautiful digital experiences that blend aesthetics with functionality.

**Quick Stats:**
- 🎓 Undergraduate @ SLIATE Galle
- 💼 1 Year Professional Experience
- 🛠 Full-Stack Capable
- 🎨 Creative Skills: Pencil Sketching, Digital Illustration

---

### 6.4 Experience

**Component:** `Experience.tsx`

#### Description
A vertical timeline showcasing professional experience entries. Each entry includes company, role, date range, and bullet-point responsibilities.

#### Requirements

| ID | Requirement |
|----|-------------|
| EXP-01 | Display a **vertical timeline** layout with a center or left-aligned line |
| EXP-02 | Each timeline node has a **glowing dot** on the timeline line |
| EXP-03 | Each card shows: **Company Name**, **Role**, **Date Range**, **Bullet Points** |
| EXP-04 | Cards alternate left-right on desktop; stack vertically on mobile |
| EXP-05 | Cards animate **slide in from the side** as they enter the viewport |
| EXP-06 | Company name is **highlighted** with accent color |

#### Data

**Entry 1:**
- **Company:** Chathura Enterprises PVT LTD
- **Role:** IT Data Entry Intern
- **Period:** January 2024 – June 2024
- **Responsibilities:**
  - Worked with real-time ERP Systems
  - Developed practical knowledge in database management
  - Handled real-world network infrastructure
  - Diagnosed and resolved network troubleshooting issues
  - Performed Windows system troubleshooting and technical support
  - Identified and resolved hardware-related technical issues

---

### 6.5 Projects

**Component:** `Projects.tsx`

#### Description
A grid or card-based section showcasing featured projects. Each card includes project name, description, tech stack badges, and links.

#### Requirements

| ID | Requirement |
|----|-------------|
| PROJ-01 | Display projects in a **responsive grid** (2 columns on desktop, 1 on mobile) |
| PROJ-02 | Each project card has: **title**, **description**, **tech stack badges**, **GitHub link**, **Live Demo link** (if available) |
| PROJ-03 | Cards have a **glassmorphism style** with a subtle glowing border on hover |
| PROJ-04 | On hover, the card **lifts** with a scale transform and glow effect |
| PROJ-05 | Cards animate in with **staggered fade-up** on scroll |
| PROJ-06 | Include a **"Featured"** badge on highlighted projects |
| PROJ-07 | Tech stack badges are **styled pill/chip** components |
| PROJ-08 | Add a **"View All Projects"** link pointing to GitHub profile |

#### Data

**Project 1 — VIVID VISIONS BY SANTHU**
- **Type:** Art Selling E-Commerce Site
- **Description:** A full e-commerce platform to showcase and sell hand-drawn pencil art, accept custom art commissions, and engage with art enthusiasts.
- **Tech Stack:** HTML5, JavaScript (JSX), CSS
- **Features:** Art showcase gallery, e-commerce purchasing, custom commission requests, social media integration
- **GitHub:** https://github.com/umeshsanthusha

**Project 2 — GradeMe**
- **Type:** Student Exam Management System
- **Description:** A comprehensive web application for managing student information, tracking exams, and monitoring academic performance.
- **Tech Stack:** React (TypeScript), Node.js, Express.js, CSS
- **Features:** Student management, exam tracking, performance analytics dashboard
- **GitHub:** https://github.com/umeshsanthusha

**Research Publication:**
- **Title:** Cross Language Bug Prediction Using Code Smells
- **Context:** Final Project — Higher National Diploma in Information Technology, SLIATE Galle

---

### 6.6 Education

**Component:** `Education.tsx`

#### Description
A timeline or card-based section listing academic qualifications in reverse-chronological order.

#### Requirements

| ID | Requirement |
|----|-------------|
| EDU-01 | Display education entries in a **vertical timeline** or **card stack** |
| EDU-02 | Each entry includes: **Degree/Level**, **Institution**, **Year**, **Details** |
| EDU-03 | The most recent qualification is displayed at the **top** |
| EDU-04 | Use **icon or badge** to differentiate education levels |
| EDU-05 | Cards animate in on **scroll** with fade-up effect |
| EDU-06 | Highlight the current/ongoing qualification with a **"Current"** badge |

#### Data

| Qualification | Institution | Year | Details |
|--------------|-------------|------|---------|
| Higher National Diploma in IT | SLIATE Galle | 2024 – Present | Major: Computer Science · Minor: Advanced Physics, Mathematics & Statistics |
| Advanced Level | Athuraliya National School | 2022 | Commerce Stream — Accounting (S), Business Studies (S), ICT (S) |
| Ordinary Level | Athuraliya National School | 2017 | Results: A-5, B-2, C-1, S-1 |

---

### 6.7 Skills

**Component:** `Skills.tsx`

#### Description
A visually rich section displaying technical and creative skills organized by category.

#### Requirements

| ID | Requirement |
|----|-------------|
| SKILL-01 | Organize skills into **named categories** (Programming Languages, Frontend, Backend, Databases, Tools, Cloud, Other, Creative) |
| SKILL-02 | Display each skill as a **pill/badge chip** with a relevant icon where available |
| SKILL-03 | Categories are displayed in a **responsive grid** (multiple columns) |
| SKILL-04 | Skills chips have a **subtle hover glow** effect |
| SKILL-05 | Animate chips in with **staggered fade-in** on scroll |
| SKILL-06 | Optionally, display **animated radial/bar indicators** for proficiency levels |
| SKILL-07 | Separate **Creative Skills** visually from Technical Skills |

#### Data

**Programming Languages:** Java · JavaScript · C# · PHP

**Frontend:** React.js · HTML5 · CSS3 · Bootstrap · Tailwind CSS · Vite

**Backend:** Node.js · Express.js

**Databases:** MySQL · Supabase · Firebase

**Tools & Platforms:** Git · GitHub · VS Code

**Cloud & Deployment:** Render · Cloudinary

**Other:** JWT Authentication · REST API Design · Responsive UI/UX

**Creative Skills:** Pencil Sketching · Digital Illustration · Drawing · Color Theory

---

### 6.8 Get In Touch (Contact)

**Component:** `Contact.tsx`

#### Description
A contact section with a functional contact form (powered by EmailJS) and direct contact information.

#### Requirements

| ID | Requirement |
|----|-------------|
| CON-01 | Display a **section heading**: "Get In Touch" |
| CON-02 | Display a **subheading/description**: inviting collaborators and employers to reach out |
| CON-03 | Contact form fields: **Name** (text), **Email** (email), **Subject** (text), **Message** (textarea) |
| CON-04 | All fields are **required** with inline validation messages |
| CON-05 | Form submission triggers **EmailJS** to send an email to `santhushaumesh2@gmail.com` |
| CON-06 | Show a **loading state** on the submit button during sending |
| CON-07 | Show a **success toast** ("Message sent! I'll get back to you soon.") on success |
| CON-08 | Show an **error toast** on failure |
| CON-09 | Display **direct contact info** alongside the form: Email, Phone, LinkedIn, GitHub, Location |
| CON-10 | Form and contact info are displayed in a **two-column layout** on desktop, stacked on mobile |
| CON-11 | Form inputs have **glowing focus ring** in accent color |

#### Content

**Direct Contact Info:**
- 📧 Email: santhushaumesh2@gmail.com
- 📞 Phone: 071 5346 057
- 📍 Location: Matara, Sri Lanka
- 💼 LinkedIn: linkedin.com/in/umesh-santhusha
- 🐙 GitHub: github.com/umeshsanthusha

**Form Placeholder Text:**
- Name: "Your full name"
- Email: "your@email.com"
- Subject: "Let's work together"
- Message: "Tell me about your project..."
- Button: "Send Message →"

---

### 6.9 Footer

**Component:** `Footer.tsx`

#### Requirements

| ID | Requirement |
|----|-------------|
| FOOT-01 | Display the **name/logo** centered |
| FOOT-02 | Display **short nav links**: Home · About · Projects · Contact |
| FOOT-03 | Display **social media icons**: GitHub, LinkedIn, Email |
| FOOT-04 | Display a **copyright line**: "© 2026 Umesh Santhusha. Designed & Built with ❤️" |
| FOOT-05 | Include a **"Back to Top"** button (icon/arrow) that scrolls to the top |
| FOOT-06 | Footer background is slightly **different shade** from the main background |
| FOOT-07 | A subtle **animated gradient line** or divider separates footer from the last section |

---

## 7. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Responsiveness | Fully responsive across mobile (≥ 320px), tablet (≥ 768px), desktop (≥ 1280px) |
| NFR-02 | Performance | Lighthouse Performance score ≥ 85 |
| NFR-03 | Accessibility | Lighthouse Accessibility score ≥ 90 |
| NFR-04 | SEO | Lighthouse SEO score ≥ 90 |
| NFR-05 | Load Time | First Contentful Paint < 2.5s on a standard 4G connection |
| NFR-06 | Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| NFR-07 | Code Quality | All components typed with TypeScript, no `any` types |
| NFR-08 | Dark Theme | The entire UI must use a dark color palette; no light mode toggle required |
| NFR-09 | Security | No API keys exposed in frontend; use EmailJS public keys only |
| NFR-10 | Deployment | Deployable to Vercel or Render as a static site |

---

## 8. Animation & Interaction Specs

### Global Animation Principles

- All animations use **Framer Motion** for component-level transitions and **GSAP** for complex scroll-based sequences
- Respect `prefers-reduced-motion` media query — all decorative animations should be disabled for users with motion sensitivity
- Default animation easing: `easeOut` with `duration: 0.6s`

### Section Entrance Animations

| Section | Animation |
|---------|-----------|
| Navbar | Slide down from top + fade-in on load |
| Hero text | Staggered fade-up (each line delayed by 150ms) |
| About | Left column slides from left, right column from right |
| Experience | Each timeline card slides in from its respective side |
| Projects | Cards fade up in a stagger (100ms delay per card) |
| Education | Cards fade-up sequentially |
| Skills | Chip badges fade-in in a stagger |
| Contact | Form slides in from left, info from right |

### Hover States

| Element | Hover Effect |
|---------|-------------|
| Project Cards | Scale(1.03), glow border, shadow lift |
| Skill Chips | Glow pulse in accent color |
| Nav Links | Underline slide-in + accent color |
| CTA Buttons | Background glow spread, slight scale |
| Social Icons | Rotate + scale + color highlight |
| Footer Links | Color transition to accent |

### Scroll Behavior

- **Smooth scroll** is applied globally via CSS `scroll-behavior: smooth`
- Section transitions use `react-intersection-observer` with a `threshold: 0.15`
- Active navbar link updates dynamically based on viewport position using `useActiveSection` hook

---

## 9. Routing & Navigation

The portfolio is a **Single-Page Application (SPA)** with no client-side routing (no React Router needed). Navigation is anchor-based smooth-scroll only.

| Section ID | Anchor |
|------------|--------|
| Home | `#home` |
| About | `#about` |
| Experience | `#experience` |
| Projects | `#projects` |
| Education | `#education` |
| Skills | `#skills` |
| Contact | `#contact` |

---

## 10. Accessibility Requirements

| ID | Requirement |
|----|-------------|
| A11Y-01 | All images must have descriptive `alt` attributes |
| A11Y-02 | Interactive elements (buttons, links) must have visible focus states |
| A11Y-03 | Color contrast ratio must meet WCAG 2.1 AA (≥ 4.5:1 for text) |
| A11Y-04 | Form inputs must have associated `<label>` elements |
| A11Y-05 | Three.js canvas must have `aria-hidden="true"` and a visible text fallback |
| A11Y-06 | Navigation must be accessible via keyboard tab order |
| A11Y-07 | Hamburger menu must have `aria-expanded` and `aria-label` attributes |
| A11Y-08 | All animations must respect `prefers-reduced-motion` |

---

## 11. SEO Requirements

| ID | Requirement |
|----|-------------|
| SEO-01 | Set a meaningful `<title>`: "Umesh Santhusha — UI/UX Developer" |
| SEO-02 | Include `<meta name="description">` tag with a relevant summary |
| SEO-03 | Add Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url` |
| SEO-04 | Add Twitter Card meta tags |
| SEO-05 | Include canonical URL tag |
| SEO-06 | Use semantic HTML elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| SEO-07 | Section headings must follow a logical `h1 → h2 → h3` hierarchy |
| SEO-08 | Add a `robots.txt` and `sitemap.xml` for deployment |

---

## 12. Performance Requirements

| ID | Requirement |
|----|-------------|
| PERF-01 | Three.js canvas must use `devicePixelRatio` capped at `2` to prevent over-rendering on HiDPI screens |
| PERF-02 | All images must be in **WebP** format and lazy-loaded |
| PERF-03 | Particle count in Three.js must be **reduced on mobile** (e.g., 2000 on desktop → 500 on mobile) |
| PERF-04 | Use **code splitting** with Vite's dynamic imports for heavy Three.js components |
| PERF-05 | All third-party fonts loaded via `font-display: swap` |
| PERF-06 | EmailJS SDK loaded **lazily** (only when contact section is visible) |
| PERF-07 | Tailwind must be **purged** of unused classes in production build |

---

## 13. Out of Scope

The following are explicitly **not included** in this version:

- Backend server or API (no Node.js server)
- CMS integration (no Contentful, Sanity, etc.)
- Blog or articles section
- Authentication / user accounts
- Light/dark mode toggle
- Multi-language (i18n) support
- E-commerce or payment integration
- Admin panel or dashboard

---

*End of Document*

---

> **Prepared for:** Umesh Santhusha  
> **Stack:** React + Vite + TypeScript + Tailwind CSS + Three.js  
> **Version:** 1.0 | September 2026