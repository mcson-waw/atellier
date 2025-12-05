# Atellier - Mindfulness & Stress Reduction Website

A high-end static website built with Astro, featuring a nature-based mindfulness aesthetic with smooth scrolling, parallax effects, and GSAP animations.

## 🌿 Features

- **Static Export** - No backend required, deploy anywhere
- **Smooth Scrolling** - Powered by Lenis for buttery-smooth navigation
- **GSAP Animations** - Scroll-triggered animations with ScrollTrigger
- **Parallax Effects** - Layered depth on hero and image sections
- **Content Collections** - MDX-based "micro-CMS" for easy content updates
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessible** - Semantic HTML, ARIA labels, keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Navigate to project directory
cd atellier

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
# Create static build
npm run build

# Preview production build locally
npm run preview
```

The static files will be in the `dist/` folder.

## 📁 Project Structure

```
/
├── public/
│   ├── images/           # Your nature photography
│   │   └── .gitkeep      # Image guidelines inside
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── SectionWrapper.astro
│   │   ├── SmoothScrollWrapper.astro
│   │   ├── ParallaxImage.astro
│   │   ├── BlobAmbientBackground.astro
│   │   ├── WhySection.astro
│   │   ├── HowSection.astro
│   │   ├── ProcessSection.astro
│   │   ├── PricingSection.astro
│   │   ├── FAQSection.astro
│   │   └── RegulationsSection.astro
│   ├── content/
│   │   ├── config.ts     # Content collection schemas
│   │   ├── hero/
│   │   ├── why/
│   │   ├── how/
│   │   ├── process/
│   │   ├── pricing/
│   │   ├── faq/
│   │   └── regulations/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   ├── gsap-init.js
│   │   └── lenis.js
│   └── styles/
│       ├── globals.css
│       └── animations.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## 📝 Editing Content

All content is stored in MDX files within `/src/content/`. Each section has its own folder:

### Content Structure

```yaml
---
title: "Section Title"
subtitle: "Optional subtitle"
order: 1                    # Controls section order
visible: true               # Toggle section visibility
background: "light"         # light | dark | mist | forest
---

Your markdown content here...
```

### Section-Specific Fields

**Hero** (`/content/hero/main.mdx`):
- `backgroundImage`: Path to hero background
- `ctaText`: Button text
- `ctaHref`: Button anchor link

**Why** (`/content/why/main.mdx`):
- `painPoints`: Array of {title, description, icon}

**How** (`/content/how/main.mdx`):
- `approaches`: Array of {title, description, icon}

**Process** (`/content/process/main.mdx`):
- `steps`: Array of {number, title, description}

**Pricing** (`/content/pricing/main.mdx`):
- `packages`: Array of pricing tiers
- `note`: Footer note text

**FAQ** (`/content/faq/main.mdx`):
- `questions`: Array of {question, answer}

**Regulations** (`/content/regulations/main.mdx`):
- `sections`: Array of {title, content}

## 🖼️ Adding Your Photos

### Required Images

1. **Hero Background** (`/public/images/hero-forest.jpg`)
   - Size: 2560x1440px minimum
   - Content: Forest, misty woodland, nature scene

2. **Section Image** (`/public/images/forest-path.jpg`)
   - Size: 1200x1600px (portrait)
   - Content: Forest path, trail, natural progression

3. **OG Image** (`/public/images/og-image.jpg`)
   - Size: 1200x630px
   - For social media previews

### Image Guidelines

- **Format**: WebP preferred, JPG fallback
- **Quality**: 80-85% compression
- **Max Size**: Hero <500KB, others <200KB
- **Color**: Complement the forest green palette
- **Mood**: Soft, natural lighting preferred

### Optimization Tools

- [Squoosh](https://squoosh.app) - Browser-based
- [ImageOptim](https://imageoptim.com) - macOS
- [TinyPNG](https://tinypng.com) - Web service

## 🎨 Customizing Design

### Color Palette

Edit `tailwind.config.mjs` to modify colors:

```js
colors: {
  forest: {
    600: '#3E5E42',  // Primary green
    // ...
  },
  moss: {
    DEFAULT: '#A8C2A5',  // Accent
  },
  // ...
}
```

### Typography

Fonts are loaded from Google Fonts in `BaseLayout.astro`:
- Headlines: Work Sans
- Body: Inter
- Accents: Lora (serif)

### Animations

Modify timing and easing in:
- `src/scripts/gsap-init.js` - Scroll animations
- `src/scripts/lenis.js` - Smooth scroll settings
- `src/styles/animations.css` - CSS keyframes

## 🌐 Deployment

### Static Hosting (Recommended)

The `dist/` folder can be deployed to:

**Netlify**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Vercel**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages**:
1. Push `dist/` contents to `gh-pages` branch
2. Or use GitHub Actions for automatic deployment

**Cloudflare Pages**:
1. Connect repository
2. Build command: `npm run build`
3. Output directory: `dist`

### Manual Upload

Simply upload the contents of `dist/` to any static hosting:
- Traditional web hosting (FTP)
- Amazon S3 + CloudFront
- Google Cloud Storage
- Any CDN

## 🔧 Reordering Sections

1. Open `/src/pages/index.astro`
2. Rearrange the component order:

```astro
<main>
  <Hero />
  <WhySection />      <!-- Move these -->
  <HowSection />      <!-- in any order -->
  <ProcessSection />
  <!-- ... -->
</main>
```

3. Update navigation in `/src/components/Nav.astro` to match

## ➕ Adding New Sections

1. Create content file: `/src/content/[name]/main.mdx`
2. Create component: `/src/components/[Name]Section.astro`
3. Add to index page: `/src/pages/index.astro`
4. Add to navigation: `/src/components/Nav.astro`

## 🐛 Troubleshooting

**Images not loading**:
- Check file paths start with `/images/`
- Ensure files exist in `/public/images/`

**Animations not working**:
- Check browser console for errors
- Ensure GSAP/Lenis scripts are loaded

**Build errors**:
- Run `npm install` again
- Check Node.js version (18+)
- Clear `.astro` cache folder

## 📄 License

Private project. All rights reserved.

---

Built with 🌲 using [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), [GSAP](https://greensock.com), and [Lenis](https://lenis.studiofreight.com).
