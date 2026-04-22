import re
from bs4 import BeautifulSoup
import os

with open('temp_stitch.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

styles = soup.find('style').string
tailwind_script = soup.find('script', id='tailwind-config').string

import json
json_str = tailwind_script.split('tailwind.config = ')[1].split('}')[0] + '}' # it's roughly json but has keys without quotes? No, it looks like valid JSON actually except for trailing commas.
# Let's just generate the css variables exactly. Actually let's just write global.css manually in my python script since I already see the config.

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# We will just write global.css with the exact required rules
global_css = """@import "tailwindcss";

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
"""
write_file('src/styles/global.css', global_css)

# Update Layout.astro
layout = f"""---
import '../styles/global.css';

interface Props {{
  title?: string;
}}

const {{ title = "Juan Tobar | Portfolio" }} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
  </head>
  <body class="bg-[#0a0a12] text-[#eee0d8] font-body-md custom-scrollbar overflow-x-hidden">
    <slot />
  </body>
</html>
"""
write_file('src/layouts/Layout.astro', layout)

def to_astro(soup_elem):
    # We strip outer tag if needed or just return str(soup_elem)
    return str(soup_elem)

# Main navs
top_nav = soup.find('nav', class_=lambda c: c and 'docked' in c)
side_nav = soup.find('aside')
bottom_nav = soup.find('nav', class_=lambda c: c and 'bottom-0' in c)

hero = soup.find('section', class_=lambda c: c and 'h-screen' in c)
about = soup.find('section', id='about')
armory = soup.find('section', id='armory')
quests = soup.find('section', id='quests')
journey = soup.find('section', id='journey')
contact = soup.find('section', id='contact')
footer = soup.find('footer')

write_file('src/components/Navbar.astro', "---\n---\n" + to_astro(top_nav) + "\\n" + to_astro(side_nav) + "\\n" + to_astro(bottom_nav))
write_file('src/components/Hero.astro', "---\n---\n" + to_astro(hero))
write_file('src/components/About.astro', "---\n---\n" + to_astro(about))
write_file('src/components/Skills.astro', "---\n---\n" + to_astro(armory))
write_file('src/components/Projects.astro', "---\n---\n" + to_astro(quests))
write_file('src/components/Experience.astro', "---\n---\n" + to_astro(journey))
write_file('src/components/Contact.astro', "---\n---\n" + to_astro(contact) + "\\n" + to_astro(footer))

# Update index.astro
index = \"\"\"---
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
\"\"\"
write_file('src/pages/index.astro', index)

print("Done generating all Astro files from Stitch HTML!")
