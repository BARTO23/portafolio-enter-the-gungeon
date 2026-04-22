# AGENTS.md

## Commands

```bash
npm run dev      # Start dev server
npm run build   # Production build
npm run preview # Preview build
```

## Tech Stack

- **Astro** v6 + React + Tailwind CSS v4 + GSAP
- Node >=22.12.0

## Project Structure

```
src/
├── components/    # 7 Astro components (Hero, Navbar, About, Skills, Projects, Experience, Contact)
├── layouts/    # Base layout
├── pages/      # index.astro entry
└── styles/    # global.css with Tailwind v4
public/assets/ # Static images
```

## Important Notes

- Tailwind CSS v4 uses `@import "tailwindcss"` in global.css, NOT `@tailwind` directives
- GSAP requires importing in client scripts: `import { gsap } from "gsap"`
- For ScrollTrigger: `import { ScrollTrigger } from "gsap/ScrollTrigger"` + `gsap.registerPlugin(ScrollTrigger)`
- Sections need explicit centering: `width: 100%; margin: 0 auto; max-width: ...rem;`
- Parallax uses GSAP ScrollTrigger with `data-speed` attribute on layers
- Images go in `public/assets/`, referenced as `/assets/filename.ext`

## Build Output

Production build outputs to `dist/` folder.