# 🌌 Umesh Santhusha — Portfolio

A premium, dark-themed, single-page portfolio website for **Umesh Santhusha**, an IT undergraduate and UI/UX developer based in Matara, Sri Lanka. Built with **React + Vite + TypeScript + Tailwind CSS**, featuring an interactive **Three.js** particle field in the hero section.

> The site itself is the portfolio: animated, responsive, accessible, and typed end-to-end.

## ✨ Features

- 🌠 **Hero with 3D canvas** — galaxy-like particle field with a rotating torus-knot wireframe, mouse parallax, and idle camera drift (`@react-three/fiber` + `three`)
- 🧭 **Seven anchor-navigated sections** — Hero, About, Experience, Projects, Education, Skills, Contact — as a pure SPA (no client-side routing)
- 🎯 **Active-section navbar** — fixed glassmorphism navbar that highlights the section currently in view via `IntersectionObserver`, collapsing to a hamburger menu on mobile
- 🕰️ **Timeline layouts** — alternating left/right cards for Experience and Education with glowing nodes
- 🧩 **Skills grid** — categorized chips with per-skill icons from `react-icons`
- 📮 **Working contact form** — powered by [EmailJS](https://www.emailjs.com/) with inline validation, loading state, and success/error toasts (`react-hot-toast`)
- ⌨️ **Animated typeface roles** — typewriter effect cycling through "UI/UX Developer", "Frontend Developer", "Creative Coder"
- 🪄 **Scroll-reveal animations** — `framer-motion` / `react-intersection-observer` driven entrance animations across sections
- 🔍 **SEO & a11y** — Open Graph / Twitter meta, JSON-LD Person schema, `robots.txt`, `sitemap.xml`, semantic HTML, skip-to-content link, focus-visible styles
- ⚡ **Performance-minded** — Three.js isolated into its own chunk via `manualChunks`, reduced particle count on mobile, capped device pixel ratio

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| 🧱 Core | React 19, Vite, TypeScript, Tailwind CSS v4 |
| 🌐 3D | three, @react-three/fiber, @react-three/drei |
| 🎞️ Animation | framer-motion, gsap, react-intersection-observer |
| 🧰 UX | react-hot-toast, react-icons, emailjs, clsx |

## 📂 Project Structure

```
├── public/                  # favicon.svg, og-image.png, resume.pdf, robots.txt, sitemap.xml
├── scripts/                 # Local verification & build helpers (see below)
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, About, Experience, Projects, Education, Skills, Contact
│   │   ├── three/           # HeroCanvas — the Three.js particle scene
│   │   └── ui/              # SectionHeading, AnimatedCard, Badge, GlowButton, ProgressBar
│   ├── constants/data.ts    # All static content (profile, projects, skills, socials…)
│   ├── hooks/               # useActiveSection, useScrollAnimation, useTypewriter, useContactForm
│   ├── types/               # Shared TypeScript interfaces
│   ├── utils/helpers.ts
│   ├── App.tsx              # Page composition + global Toaster
│   ├── main.tsx
│   └── index.css            # Tailwind v4 @theme tokens, aurora gradients, base styles
├── index.html               # SEO meta, Open Graph, JSON-LD
├── vite.config.ts           # React + Tailwind plugins, "@" alias, three.js chunking
└── PRD.md                   # Product requirements document
```

All content (bio, projects, skills, contact details) lives in `src/constants/data.ts` — edit there to update the site.

## 🚀 Getting Started

**Prerequisites:** Node.js 20.19+ (Vite 8 requirement) and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev
```

### 🔐 Environment Variables

The contact form uses EmailJS (public keys only — safe for the browser). Create a `.env.local` in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get the values from the [EmailJS dashboard](https://dashboard.emailjs.com). Without them, form submission shows a descriptive error toast instead of sending.

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

### 🧰 Helper Scripts (`scripts/`)

| Script | Description |
|--------|-------------|
| `make-resume.mjs` | Generates `public/resume.pdf` |
| `verify-hero-canvas.mjs` | Playwright-based check that the hero WebGL canvas renders and animates (diffs two screenshots). Requires a running preview server; uses local Edge via `playwright-core` |
| `verify-typewriter.mjs` | Verifies the hero typewriter animation |

> The `verify-*` scripts are local QA tooling and are gitignored.

## ⚙️ Configuration Notes

- **Path alias:** `@` → `./src` (configured in both `vite.config.ts` and `tsconfig.app.json`)
- **Tailwind v4:** theme tokens (colors, fonts, easing) are defined in CSS via `@theme` in `src/index.css` — there is no `tailwind.config.ts`
- **Typeface:** [Newsreader](https://fonts.google.com/specimen/Newsreader) serif, loaded with `display=swap`
- **Three.js performance:** all `three` / `react-three` modules are bundled into a single `three` chunk via Rollup `manualChunks` in `vite.config.ts`

## 📦 Deployment

The site is a fully static SPA — deployable to Vercel, Netlify, Render, or any static host:

```bash
npm run build
```

Upload/serve the `dist/` directory. Remember to set the three `VITE_EMAILJS_*` variables in your host's environment settings.

## 📄 License

Personal project © 2026 Umesh Santhusha. Designed & built with ❤️.
