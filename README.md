# Keerthika Sai — Herbal Products Website

An animated, nature-inspired marketing website for **Keerthika Sai Herbal Products**
(Herbal Bath Podi · Herbal Hair Oil · Seekakai Podi · Herbal Hair Pack), built with
**React + Vite** and **Framer Motion**. Every order button opens WhatsApp with a
pre-filled message, so the site works as a live storefront with no backend.

---

## Quick start

```bash
npm install      # first time only
npm run dev      # start dev server (opens http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requirements: Node 18+ (tested on Node 26) and npm.

---

## What is on the page

| Section | Highlights |
| --- | --- |
| Preloader | Cinematic forest splash: gold **KS** seal, herbal still-life flanks, drifting leaves, gold progress capsule, fade-out reveal |
| Navbar | Glass blur on scroll, animated active-section dot, mobile drawer |
| Hero | Parallax layers, floating leaves, blurred headline reveal, real photograph of the four products with floating labels, seal badge |
| Marquee | Endless ribbon: 100% Natural · Chemical Free · Organic · Homemade |
| Products | 4 tilt-on-hover cards, floating SVG artwork, detail modal, WhatsApp order per product |
| Showcase | The real printed posters, full width, switched with product pills |
| Ingredients | Infinite marquee of 8 botanicals with hand-drawn SVG glyphs |
| Why Us | Dark forest band, glowing icons with pulse rings |
| How To Use | 3-step ritual with a scroll-driven vine and travelling leaf |
| Tamil band | Bilingual (தமிழ் + English) benefits matching the printed posters |
| Reviews | Auto-playing carousel (pause on hover) |
| Order | Quick-order form that builds a WhatsApp message, plus one-tap product links |
| Footer | Gold marquee, sitemap, WhatsApp contact, back-to-top |
| Extras | Custom glowing cursor (desktop only), scroll progress bar, floating WhatsApp button |

Motion is fully disabled for visitors who have **reduced motion** enabled
(`prefers-reduced-motion`), and the layout is responsive down to small phones.

---

## Where to change things

| What | File |
| --- | --- |
| Phone / WhatsApp number, brand name, nav links | `src/data/site.js` |
| Products (name, price text, benefits, herbs) | `src/data/products.js` |
| Product posters (one PNG per product) | `src/assets/`, imported as `banner` in `src/data/products.js` |
| Hero photograph (all 4 products on one platter) | `src/assets/hero-stage.jpg`, used by `src/sections/HeroStage.jsx` — regenerate with `_tmp_build/build.ps1` |
| Position of the floating labels over the hero photo | `LABELS` list in `src/sections/HeroStage.jsx` (x/y in % of the photo) |
| Herb photos in the ingredient marquee | `src/assets/herbs/` (480x480 JPEGs), imported as `image` in `src/data/content.js` |
| Ingredients, why-us cards, how-to-use steps, stats | `src/data/content.js` |
| Reviews (currently placeholders) | `src/data/testimonials` list inside `src/data/content.js` |
| Colours, fonts, spacing, animations | `src/styles/index.css` (CSS variables at the top) |
| SVG artwork (bowls, oil bottle, leaves, seal) | `src/components/art/ProductArt.jsx`, `src/components/art/Ornaments.jsx` |

### WhatsApp number
`src/data/site.js` → `whatsappNumber: '917708258647'` (country code + number, no `+`).
Change it once and every button on the site updates.

---

## Project structure

```
src/
  App.jsx                  page composition + Lenis smooth scrolling
  main.jsx                 entry point
  components/
    Preloader.jsx  Navbar.jsx  Cursor.jsx  ScrollProgress.jsx
    Marquee.jsx    LeafRain.jsx
    art/           Ornaments.jsx (seal, leaves, vines), SplashArt.jsx (splash seal + herbal flanks), ProductArt.jsx (product drawings)
    ui/            Reveal.jsx, SectionHeading.jsx, TiltCard.jsx, Counter.jsx, WhatsAppIcon.jsx
  sections/        Hero, HeroStage, Products, ProductModal, Showcase, Ingredients,
                   Benefits, Ritual, TamilBand, Testimonials, Order, Footer
  data/            site.js, products.js, content.js
  assets/          product posters (one PNG per product, Showcase band) + hero-stage.jpg
  lib/             links.js (WhatsApp deep links + smooth scroll helper)
  styles/          index.css (single stylesheet, sectioned + commented)
public/leaf.svg    favicon
_tmp_build/        offline tooling for the hero photograph (see notes below)
```

## Notes / assumptions
- Prices and pack sizes are **not** shown because they were not supplied — the site asks
  the customer to confirm them on WhatsApp instead.
- Reviews are placeholder text; replace them in `src/data/content.js`.
- No backend: the order form composes a WhatsApp message client-side (`wa.me` deep link).
- The product grid and the detail sheet use original SVG illustrations, so the cards
  stay crisp and light. The printed posters (one PNG per product, ~1672x940) live in
  `src/assets/`, are imported as `banner` in `src/data/products.js` and are shown at
  full width in the Showcase band - that is where the fine print on a poster stays
  readable. To swap a poster, overwrite the PNG using the same file name; no code
  change is needed.
- The poster PNGs are ~2 MB each. Compress them (TinyPNG, Squoosh - aim for 200-300 KB)
  before going live; the Showcase band lazy-loads them one poster at a time.
- The hero shows **one real photograph** of all four products staged together on a wooden
  platter (`src/assets/hero-stage.jpg`, 1600x1466, already ~270 KB). It was composited
  offline out of the four posters - `_tmp_build/build.ps1` (PowerShell +
  `System.Drawing`, nothing else installed) cut each product out, placed it on the
  platter, added the table, bokeh, herbs, light and grain, and wrote the JPEG straight
  into `src/assets/`. Re-run `powershell -ExecutionPolicy Bypass -File _tmp_build\build.ps1`
  after a poster changes; every placement is a line you can tweak. `_tmp_build\KB.cs` is
  the image helper it uses, `_tmp_build\markers.ps1` stamps the label anchor points onto
  the photo (so the percentages below can be checked by eye) and
  `_tmp_build\preview-hero.html` renders the hero standalone in a browser (open it with
  the CSS copied next to it, or just run `_tmp_build\preview.ps1` after a build) for a
  quick look without the intro animation. `_tmp_build\preview-phone.html` shows the same
  hero in 360 / 390 / 768 px iframes for the phone breakpoints.
- The floating labels are glued to the photo with percentages — `LABELS` in
  `src/sections/HeroStage.jsx` (x/y of the 1600x1466 composite, `dir` = side the chip
  sits on). Keep the photo at that aspect ratio (or re-measure the four points) when
  swapping it, and shorten the chip text under 860px if you change a product name.
- The circular herb photos in the ingredient marquee live in `src/assets/herbs/`
  (480x480 JPEGs, imported as `image` in `src/data/content.js`). They come from
  Wikimedia Commons - see `src/assets/herbs/CREDITS.md`. The CC BY / CC BY-SA ones
  need that credit line to stay visible while they are in use; CC0 / public-domain
  ones need nothing. To use your own photo, overwrite the JPEG with the same file
  name, or delete the `image` key to fall back to the drawn glyph.
