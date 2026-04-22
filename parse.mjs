import fs from 'fs';

let html = fs.readFileSync('temp_stitch.html', 'utf8');

function extractTag(tag, attrs='') {
    let startIdx = html.indexOf(`<${tag}${attrs}`);
    if (startIdx === -1) return '';
    
    // We need to match the closing tag. But there might be nested tags with the same name.
    // For our specific sections, they have distinct ids and no nested sections!
    let endIdx = html.indexOf(`</${tag}>`, startIdx) + `</${tag}>`.length;
    return html.substring(startIdx, endIdx);
}

function extractSectionById(id) {
    let startStr = `id="${id}"`;
    let startIdx = html.indexOf(startStr);
    if(startIdx === -1) return '';
    // Go backwards to find the <section opening
    let sectionStart = html.lastIndexOf(`<section`, startIdx);
    let sectionEnd = html.indexOf(`</section>`, startIdx) + `</section>`.length;
    return html.substring(sectionStart, sectionEnd);
}

// 1. global.css
const globalCSS = `@import "tailwindcss";

@theme {
  --color-tertiary-fixed-dim: #5bd5fc;
  --color-on-tertiary: #003543;
  --color-surface-container-high: #302823;
  --color-outline: #a08d80;
  --color-on-error-container: #ffdad6;
  --color-outline-variant: #534439;
  --color-on-tertiary-container: #004d60;
  --color-secondary: #ffb3b1;
  --color-tertiary: #7dddff;
  --color-tertiary-container: #44c3ea;
  --color-on-secondary-fixed: #410007;
  --color-secondary-fixed-dim: #ffb3b1;
  --color-on-error: #690005;
  --color-surface-dim: #18120e;
  --color-surface-container-highest: #3b332e;
  --color-error-container: #93000a;
  --color-primary: #ffc499;
  --color-on-background: #eee0d8;
  --color-on-secondary-fixed-variant: #92001c;
  --color-on-secondary-container: #ffb8b5;
  --color-background: #18120e;
  --color-on-primary-fixed: #2f1400;
  --color-on-primary-container: #6f3800;
  --color-surface-variant: #3b332e;
  --color-surface: #18120e;
  --color-inverse-on-surface: #372f2a;
  --color-error: #ffb4ab;
  --color-primary-fixed-dim: #ffb780;
  --color-primary-fixed: #ffdcc4;
  --color-tertiary-fixed: #b7eaff;
  --color-on-tertiary-fixed-variant: #004e61;
  --color-on-surface: #eee0d8;
  --color-primary-container: #f4a261;
  --color-surface-container-lowest: #130d09;
  --color-surface-container: #251e19;
  --color-on-surface-variant: #d8c2b5;
  --color-inverse-surface: #eee0d8;
  --color-on-tertiary-fixed: #001f28;
  --color-secondary-container: #ad0224;
  --color-surface-tint: #ffb780;
  --color-secondary-fixed: #ffdad8;
  --color-on-primary-fixed-variant: #6f3800;
  --color-on-secondary: #680011;
  --color-on-primary: #4e2600;
  --color-surface-bright: #403832;
  --color-inverse-primary: #8e4e14;
  --color-surface-container-low: #211a15;

  --spacing-margin-xs: 8px;
  --spacing-unit: 8px;
  --spacing-margin-sm: 16px;
  --spacing-gutter: 24px;
  --spacing-margin-lg: 64px;
  --spacing-container-max: 1200px;
  --spacing-margin-md: 32px;

  --font-h3: Space Grotesk, sans-serif;
  --font-h1: Space Grotesk, sans-serif;
  --font-body-md: Inter, sans-serif;
  --font-h2: Space Grotesk, sans-serif;
  --font-body-lg: Inter, sans-serif;
  --font-label-caps: Inter, sans-serif;

  --text-h3: 24px;
  --text-h3--line-height: 1.3;
  --text-h3--font-weight: 600;

  --text-h1: 48px;
  --text-h1--line-height: 1.1;
  --text-h1--letter-spacing: -0.02em;
  --text-h1--font-weight: 700;

  --text-body-md: 16px;
  --text-body-md--line-height: 1.6;
  --text-body-md--font-weight: 400;

  --text-h2: 32px;
  --text-h2--line-height: 1.2;
  --text-h2--font-weight: 700;

  --text-body-lg: 18px;
  --text-body-lg--line-height: 1.6;
  --text-body-lg--font-weight: 400;

  --text-label-caps: 12px;
  --text-label-caps--line-height: 1;
  --text-label-caps--letter-spacing: 0.1em;
  --text-label-caps--font-weight: 700;
}

body {
    background-color: #0a0a12;
    color: #eee0d8;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
}

.clip-path-polygon {
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}
.pixel-border {
    box-shadow: 
        0 -4px 0 0 #12121f,
        0 4px 0 0 #12121f,
        -4px 0 0 0 #12121f,
        4px 0 0 0 #12121f;
}
.gold-glow:hover {
    box-shadow: 0 0 20px rgba(244, 162, 97, 0.4);
}
.red-glow:hover {
    box-shadow: 0 0 20px rgba(230, 57, 70, 0.4);
}
.bg-grid-dots {
    background-image: radial-gradient(#12121f 1px, transparent 1px);
    background-size: 24px 24px;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #0a0a12;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #f4a261;
}

.rendering-pixelated {
    image-rendering: pixelated;
}
`;
fs.writeFileSync('src/styles/global.css', globalCSS);

// 2. Layout
const layout = `---
import '../styles/global.css';

interface Props {
  title?: string;
}

const { title = "JUAN_TOBAR.HUD | MASTER ARCHITECT" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
  </head>
  <body class="bg-[#0a0a12] text-[#eee0d8] font-body-md custom-scrollbar overflow-x-hidden">
    <slot />
  </body>
</html>
`;
fs.writeFileSync('src/layouts/Layout.astro', layout);

// 3. Components
// Navbars
let nav1 = html.substring(html.indexOf('<nav class="bg-[#0a0a12]'), html.indexOf('</nav>') + 6);
let asideStr = '<aside';
let asideStart = html.indexOf(asideStr);
let asideEnd = html.indexOf('</aside>', asideStart) + '</aside>'.length;
let aside = html.substring(asideStart, asideEnd);

let navMobileStart = html.lastIndexOf('<nav class="fixed bottom-0');
let navMobileEnd = html.indexOf('</nav>', navMobileStart) + 6;
let navMobile = html.substring(navMobileStart, navMobileEnd);

fs.writeFileSync('src/components/Navbar.astro', `---
---
${nav1}
${aside}
${navMobile}`);

// Sections
let heroStart = html.indexOf('<section class="h-screen');
let heroEnd = html.indexOf('</section>', heroStart) + '</section>'.length;
fs.writeFileSync('src/components/Hero.astro', `---
---
${html.substring(heroStart, heroEnd)}`);

fs.writeFileSync('src/components/About.astro', `---
---
${extractSectionById('about')}`);

fs.writeFileSync('src/components/Skills.astro', `---
---
${extractSectionById('armory')}`);

fs.writeFileSync('src/components/Projects.astro', `---
---
${extractSectionById('quests')}`);

fs.writeFileSync('src/components/Experience.astro', `---
---
${extractSectionById('journey')}`);

let contactStr = extractSectionById('contact');
let footerStart = html.indexOf('<footer');
let footerEnd = html.indexOf('</footer>') + 9;
fs.writeFileSync('src/components/Contact.astro', `---
---
${contactStr}
${html.substring(footerStart, footerEnd)}`);

// 4. index.astro
const index = `---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Experience from '../components/Experience.astro';
import Contact from '../components/Contact.astro';
---

<Layout title="JUAN_TOBAR.HUD | MASTER ARCHITECT">
  <Navbar />
  <main class="lg:ml-64 min-h-screen relative bg-grid-dots">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Contact />
  </main>
</Layout>
`;
fs.writeFileSync('src/pages/index.astro', index);

console.log("SUCCESS");
