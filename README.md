# PSC Website Sample

A modern, responsive recreation of the **Public Service Commission Kenya (PSC)** public-facing website, built with React, Vite and TypeScript.

**Live Demo:** [https://psc-sample.vercel.app/](https://psc-sample.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Project Objectives](#project-objectives)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Theming and Design System](#theming-and-design-system)
- [Browser and Device Compatibility](#browser-and-device-compatibility)
- [WordPress News Integration](#wordpress-news-integration)
- [Accessibility](#accessibility)
- [Production Build and Deployment](#production-build-and-deployment)
- [Available Scripts](#available-scripts)
- [Known Limitations](#known-limitations)
- [Project Information](#project-information)
- [License](#license)

---

## Overview

The PSC Website Sample is a modern React single-page application that recreates the public-facing website of the [Public Service Commission Kenya](https://www.publicservice.go.ke/).

The project was developed as part of an industrial attachment at the Public Service Commission Kenya, with an emphasis on demonstrating how an established government website can be modernised while maintaining its institutional identity, accessibility and usability across different devices and browser generations.

The implementation combines a component-based frontend architecture with a reusable design system, responsive layouts, theme management and progressive web application capabilities.

## Project Objectives

The project focuses on:

- Modernising the presentation and user experience of the existing PSC website.
- Maintaining consistency with the Public Service Commission's visual identity.
- Providing responsive layouts across desktop, tablet and mobile devices.
- Supporting both light and dark appearance preferences.
- Improving accessibility and keyboard navigation.
- Maintaining compatibility with older browsers and mobile devices.
- Establishing a maintainable and scalable frontend architecture.

## Features

### User Interface and Experience
- Responsive layouts for desktop, tablet and mobile devices.
- Reusable React components and page sections.
- PSC-inspired institutional branding and design system.
- Light and dark themes with system preference detection.
- Smooth interface transitions and animations.
- Route-level code splitting and lazy-loaded pages.

### Compatibility
- Legacy browser build through Vite's legacy plugin.
- Polyfills for older JavaScript environments.
- iOS Safari viewport handling.
- Mobile safe-area support.
- Responsive navigation and layout behaviour.

### Progressive Web Application
- Web app manifests for light and dark themes.
- Theme-aware installation icons.
- Service worker integration.
- iOS splash screen assets.
- Offline storage support through IndexedDB.

### Search Engine Optimisation
- Page-level SEO metadata.
- Open Graph metadata for social sharing.
- Twitter Cards.
- JSON-LD structured data.
- Canonical URLs and theme-aware metadata.

### Integrations
- WordPress REST API news integration during development.
- Google reCAPTCHA integration.
- OpenTelemetry Web SDK instrumentation.

---

## Technology Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite 5 |
| Programming Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 6 |
| Animations | GSAP 3.14 |
| SEO Management | react-helmet-async |
| Analytics and Observability | OpenTelemetry Web SDK |
| CAPTCHA | Google reCAPTCHA |
| PWA | Workbox Window |
| Offline Storage | IndexedDB (idb) |
| Legacy Compatibility | @vitejs/plugin-legacy |
| Deployment | Vercel |

---

## Project Structure

```text
psc_sample/
│
├── public/
│   ├── assets/                 # Images, logos and banners
│   ├── dark-mode-favicon/      # Dark theme icons and manifest
│   ├── light-mode-favicon/     # Light theme icons and manifest
│   ├── splash/                 # iOS splash screen assets
│   └── sw.js                   # Service worker
│
├── scripts/
│   └── generateContentTypes.js # Content type generation script
│
├── src/
│   ├── components/             # Reusable UI components
│   ├── content/                # Content provider and schemas
│   ├── context/                # Application context providers
│   ├── data/                   # Navigation and static data
│   ├── pages/                  # Application route pages
│   ├── polyfills/              # Legacy browser polyfills
│   ├── sections/               # Reusable page sections
│   ├── services/               # API clients and integrations
│   ├── stores/                 # Application settings store
│   ├── types/                  # Shared TypeScript definitions
│   ├── utils/                  # Utility functions
│   │
│   ├── App.tsx                 # Application routes and providers
│   ├── index.css               # Global styles and design tokens
│   └── main.tsx                # Application entry point
│
├── index.html                  # HTML entry point and SEO metadata
├── vite.config.js              # Vite and build configuration
├── package.json                # Dependencies and scripts
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/) 18 or later
- npm 9 or later
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd psc_sample
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

[http://localhost:5173](http://localhost:5173)

### 5. Build for production

```bash
npm run build
```

The production build is generated in the `dist/` directory.

### 6. Preview the production build

```bash
npm run preview
```

---

## Environment Configuration

Create a `.env.local` file in the project root for local environment overrides.

Example:

```env
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

The project also uses `.env.development` and `.env.production` for environment-specific defaults.

**Important:** 

- Replace placeholder values with valid configuration before deployment.
- Never expose private API keys, secret tokens or backend credentials through Vite environment variables.
- Variables prefixed with `VITE_` are exposed to the client-side application.

---

## Theming and Design System

The application uses CSS custom properties to maintain a consistent design system across components.

The primary theme tokens are defined in:

```text
src/index.css
```

### Light Theme

```css
:root {
  --psc-primary: #895100;
  --psc-primary-container: #e68c00;
  --psc-surface: #f9f7f0;
  --psc-on-surface: #1a1a1a;
}
```

### Dark Theme

```css
.dark {
  --psc-primary: #f29a00;
  --psc-surface: #121212;
}
```

The complete token system includes additional surface, text, border, interaction and component-level variables.

To adjust the primary brand colours, update:

- `--psc-primary`
- `--psc-primary-container`

Components referencing these variables inherit the updated values automatically.

### Theme Initialisation

Theme initialisation takes place before React renders.

An inline script in `index.html`:

1. Reads the user's saved theme preference from `localStorage`.
2. Falls back to the operating system preference when no saved preference exists.
3. Applies the appropriate theme class before the first paint.

This approach minimises the flash of incorrectly themed content during page loading.

### Theme-Aware PWA Manifest

The application switches between two web app manifests depending on the selected theme:

- `public/light-mode-favicon/site.webmanifest`
- `public/dark-mode-favicon/site.webmanifest`

This allows the installed application's icon to correspond with the active appearance preference.

---

## Browser and Device Compatibility

An important design consideration is maintaining usability across newer and older devices, particularly devices running older versions of iOS Safari and Android browsers.

### Legacy JavaScript Support

The project uses `@vitejs/plugin-legacy` to generate modern and legacy JavaScript bundles.

The build process provides:

- A modern bundle for supported evergreen browsers.
- A transpiled legacy bundle for older browsers.
- Additional polyfills for JavaScript APIs unavailable in older environments.

Polyfills include:

| Package | Purpose |
|---|---|
| `core-js` | JavaScript built-in and standard library polyfills |
| `regenerator-runtime` | Generator and async function runtime support |
| `whatwg-fetch` | Fetch API compatibility |
| Targeted ES polyfills | Support for APIs such as Promise, Map, Set, Array.includes and Object.assign |

The actual browser support depends on the configured build targets, available browser APIs and third-party dependencies.

### Viewport Handling for Older iOS Safari

Older mobile browsers can calculate `100vh` incorrectly when browser interface elements expand or collapse.

To address this, the application uses a layered viewport-height strategy:

```css
.hero-viewport {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  height: 100dvh;
}
```

The `--vh` custom property is calculated through an inline script in `index.html`:

```javascript
function setVh() {
  document.documentElement.style.setProperty(
    '--vh',
    (window.innerHeight * 0.01) + 'px'
  );
}

setVh();

window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
```

This provides a fallback for browsers that do not support newer dynamic viewport units.

### Updating Browser Targets

To adjust browser compatibility targets, update the `targets` configuration in `vite.config.js`.

When changing targets, also verify:

- JavaScript syntax transpilation.
- CSS feature compatibility.
- Third-party library browser requirements.
- Polyfill coverage.
- Actual behaviour on target devices.

**Note:** A legacy JavaScript bundle does not automatically guarantee complete compatibility with every older browser. CSS features, browser APIs and dependencies must also be tested.

---

## WordPress News Integration

The development server includes a custom Vite middleware plugin named `pscNewsCachePlugin`.

It proxies requests to the WordPress REST API:

[PSC WordPress REST API](https://www.publicservice.go.ke/wp-json/wp/v2/posts)

The middleware exposes the following local endpoints:

```text
/api/psc-news
/api/psc-news-post
```

### Middleware Capabilities

- Retrieves lists of WordPress news posts.
- Retrieves individual posts using numeric IDs or slugs.
- Caches upstream responses for 10 minutes.
- Reduces unnecessary requests to the WordPress API.

### Production Behaviour

The middleware currently runs only during local development through:

```bash
npm run dev
```

On Vercel, the development middleware is unavailable. Consequently, the news section falls back to locally bundled content defined in `defaultContent.ts`.

A production-compatible serverless API integration is a planned improvement.

---

## Accessibility

Accessibility is considered throughout the application's interface and interaction design.

Implemented measures include:

- Skip-to-content navigation.
- Visible keyboard focus indicators.
- ARIA attributes for interactive controls.
- Accessible navigation drawers and toggles.
- Reduced-motion support through `prefers-reduced-motion`.
- Colour contrast considerations across light and dark themes.
- Responsive layouts that accommodate different screen sizes.

The project targets **WCAG 2.1 Level AA** accessibility requirements.

---

## Production Build and Deployment

### Vercel Deployment

The application is deployed using [Vercel](https://vercel.com/).

To deploy your own instance:

1. Push the project to a GitHub repository.
2. Sign in to Vercel.
3. Import the GitHub repository.
4. Allow Vercel to detect the Vite configuration.
5. Configure the required environment variables.
6. Deploy the application.

The deployment configuration uses `vercel.json` for SPA routing and rewrite rules.

### Build Configuration

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Development Command | `npm run dev` |
| Preview Command | `npm run preview` |

### Manual Deployment

The application can also be deployed to other static hosting providers, including:

- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- Amazon S3 with static website hosting

Build the application:

```bash
npm run build
```

Upload the contents of `dist/` to your hosting provider.

**Important:** The application uses React Router's `BrowserRouter`. Configure your hosting provider to rewrite application routes to `index.html` while allowing existing static assets to resolve normally.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with hot module replacement. |
| `npm run build` | Generates the production build, including legacy bundles. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint against the project. |
| `npm run generate:content` | Regenerates content types from the JSON schema. |

### Content Type Generation

Run:

```bash
npm run generate:content
```

The script reads the JSON schema in `src/content/` and regenerates the relevant TypeScript content definitions and default content files.

---

## Known Limitations

The current implementation has several areas identified for future development.

| Area | Current Status |
|---|---|
| WordPress News | Development uses the Vite proxy; production falls back to bundled content. |
| Backend API | The backend API integration at `/api/v1` is not yet fully implemented. |
| Page Content | Most page content is currently defined locally within the application. |
| Contact Form | reCAPTCHA integration is present, but server-side token verification is not yet implemented. |
| Production News API | A production-compatible serverless integration is still required. |

These limitations are recognised as areas for further development and testing following the initial deployment.

---

## Project Information

**Project:** PSC Website Sample  
**Institution:** Public Service Commission Kenya  
**Developer:** Hillary Oduor  
**Development Context:** Industrial Attachment  
**Deployment:** [Vercel Live Demo](https://psc-sample.vercel.app/)

### Reference

The original institutional website:

[Public Service Commission Kenya](https://www.publicservice.go.ke/)

---

## License

This project is an internal demonstration and educational project developed during an industrial attachment at the Public Service Commission Kenya.

It is not licensed for redistribution or commercial reuse without the appropriate authorisation.

---

*Developed by Hillary Oduor | Public Service Commission Kenya*