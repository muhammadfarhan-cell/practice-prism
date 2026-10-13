# Practice Prism landing page

React, TypeScript, Vite, and Motion landing page with two independent design versions.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

Open `/v1` for the original design or `/v2` for the updated space and spectrum design. The root URL redirects to `/v1`.

## Build and preview

```bash
npm run build
npm run preview
```

The build writes the static site to `dist/`. When deploying to a static host, configure it to serve `index.html` for direct requests to `/v1` and `/v2`.

## Project structure

- `src/pages/v1/` — original landing page and its components
- `src/pages/v2/` — updated landing page and its separate components
- `src/App.tsx` — route selection
- `public/` — image and logo assets
