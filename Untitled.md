# React Landing Page: Folder Structure Best Practices

A simple, scalable structure for React landing pages (Vite/CRA, JSX). Landing pages are mostly **sections** (Hero, Features, Pricing...), so the structure is organized around that.

---

## Recommended Structure

```
project-root/
├── public/                     # Static files served as-is (favicon, robots.txt, og-image)
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── assets/                 # Global assets imported in code
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── logos/
│   │   │   └── testimonials/
│   │   ├── icons/
│   │   ├── fonts/
│   │   ├── videos/
│   │   └── styles/
│   │       ├── global.css      # Resets, base elements
│   │       ├── variables.css   # Colors, spacing, font sizes (CSS vars)
│   │       └── animations.css
│   │
│   ├── components/
│   │   ├── common/             # Reusable, generic UI (used across sections/pages)
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.js
│   │   │   ├── Modal/
│   │   │   ├── Input/
│   │   │   ├── Container/
│   │   │   └── SectionHeading/
│   │   │
│   │   ├── layout/             # Page chrome
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Navbar/
│   │   │
│   │   ├── Hero/               # One folder per landing page section
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.module.css
│   │   │   └── index.js
│   │   ├── Features/
│   │   ├── HowItWorks/
│   │   ├── Pricing/
│   │   ├── Testimonials/
│   │   ├── FAQ/
│   │   └── CTA/
│   │
│   ├── pages/                  # Route-level components (compose sections)
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── index.js
│   │   ├── About/
│   │   ├── Contact/
│   │   └── NotFound/
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useScrollPosition.js
│   │   └── useMediaQuery.js
│   │
│   ├── utils/                  # Pure helper functions
│   │   ├── formatters.js
│   │   └── validators.js
│   │
│   ├── constants/              # Static content & config (keeps JSX clean)
│   │   ├── navLinks.js
│   │   ├── features.js
│   │   ├── pricingPlans.js
│   │   └── faqs.js
│   │
│   ├── services/               # API calls (contact form, newsletter, etc.)
│   │   └── api.js
│   │
│   ├── context/                # Only if you need global state (theme, etc.)
│   │   └── ThemeContext.jsx
│   │
│   ├── routes/                 # Only if multiple pages
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx                 # Root component: layout + routes
│   └── index.jsx               # Entry point: renders <App /> (main.jsx in Vite)
│
├── .env                        # Environment variables
├── .gitignore
├── index.html                  # HTML shell (Vite keeps this in the root)
├── package.json
└── README.md
```

---

## Where Each Piece Goes

| File / Folder | Purpose |
|---|---|
| `index.jsx` | Entry point. Mounts `<App />` to the DOM, imports global styles. Nothing else. |
| `App.jsx` | Root component. Wraps providers, renders layout (Header/Footer) and routes/pages. |
| `pages/` | One component per route. Pages **compose** sections; they hold little markup of their own. |
| `components/common/` | Generic, reusable UI with no business/content knowledge (Button, Modal, Input). |
| `components/layout/` | Header, Footer, Navbar: shared across all pages. |
| `components/<Section>/` | Landing page sections, each in its own folder. |
| `constants/` | Content as data (features, plans, FAQs), so copy changes don't touch JSX. |
| `assets/` | Files imported by code and processed by the bundler (hashed, optimized). |
| `public/` | Files that must keep their exact URL (favicon, robots.txt, OG image). |

---

## Best Practices

1. **One folder per component.** Keep `.jsx`, styles, tests, and `index.js` together.
2. **Use barrel files (`index.js`)** so imports are `components/Hero`, not `components/Hero/Hero`.
3. **Separate content from markup.** Put repeated data (features, pricing, FAQs) in `constants/` and `.map()` over it.
4. **Keep `common/` generic.** If a component knows about "pricing" or "hero", it belongs in its own section folder, not `common/`.
5. **Pages compose, sections render.** `Home.jsx` should mostly be a list of section components.
6. **Co-locate section-specific parts.** If only Pricing uses `PricingCard`, nest it inside `Pricing/` rather than `common/`. Promote it to `common/` only when a second component needs it.
7. **Name consistently.** `PascalCase` for components/folders, `camelCase` for hooks/utils/constants, hooks prefixed with `use`.
8. **Use path aliases** (`@/components/...`) via `vite.config.js` or `jsconfig.json` to avoid `../../../` imports.
9. **Don't over-engineer.** Skip `context/`, `services/`, and `routes/` until you actually need them. A single-page landing page can omit `pages/` entirely and render sections directly in `App.jsx`.
10. **Optimize assets.** Use WebP/AVIF for images, SVG for icons, and lazy-load below-the-fold sections and images.