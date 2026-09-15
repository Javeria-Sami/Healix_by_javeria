# Healix Healthcare Platform — Developer Onboarding & Engineering Handbook

## 1. Technical Architecture Overview

Healix is engineered as a decoupled, high-performance monorepo:

```text
healix/
├── client/                     # Frontend Application (Vite 5 + React 18 SPA)
│   ├── public/                 # Static crawler deliverables (favicon, robots.txt, sitemap.xml)
│   └── src/
│       ├── components/         # Reusable atomic & compound UI components (common, navigation, cards)
│       ├── constants/          # Application routes, layout tokens, and static constraints
│       ├── data/               # Structured data models (services, plans, physicians, articles, faqs)
│       ├── hooks/              # Custom React hooks (scroll, focus, responsive, analytics)
│       ├── layouts/            # Page shell containers and section framing layouts
│       ├── pages/              # Lazy-loaded route view components (14 routes)
│       ├── routes/             # AppRoutes configuration with Suspense boundaries
│       ├── sections/           # Modular section components organized by domain
│       ├── services/           # Privacy-first conversion analytics and API client
│       ├── styles/             # Global CSS tokens, custom properties, and typography imports
│       └── test/               # Vitest test suites (unit, integration, smoke, security)
├── server/                     # Backend API Service (Node.js v22 + Express)
│   └── src/
│       ├── middleware/         # Security headers, rate limiters, error handler, Morgan logger
│       ├── routes/             # REST endpoints (/api/health, /api/contact, /api/newsletter)
│       ├── test/               # Node test runner security & API endpoint tests
│       └── validators/         # Schema validation using express-validator
├── docs/                       # Complete architecture, operations, client, and developer documentation
├── Dockerfile                  # Multi-stage production container definition (Node 22 + Nginx)
├── nginx.conf                  # Production reverse proxy and static asset caching configuration
└── package.json                # Monorepo workspace orchestration
```

---

## 2. Getting Started & Local Development

### Prerequisites
- Node.js version $\ge 20.0.0$ (v22 LTS recommended)
- npm version $\ge 10.0.0$

### Installation & Execution
```bash
# Clone the repository
git clone <repository-url>
cd healix

# Install all workspace dependencies
npm install

# Run full test suite across client & server
npm test

# Start both client and server development servers concurrently
npm run dev
```

- **Client Dev URL**: `http://localhost:5173`
- **Server API URL**: `http://localhost:3001`
- **Server Health Check**: `http://localhost:3001/api/health`

---

## 3. Production Build & Verification Commands

```bash
# Compile client production bundle
npm run build

# Run Vitest test runner with watch mode
npm run test:watch --workspace=client

# Run server test runner
npm run test --workspace=server
```

---

## 4. Key Engineering Standards & Guardrails
1. **Component Token Reuse**: Never write arbitrary pixel colors or custom fonts inline. Always consume semantic tokens from `src/styles/variables.css` or Tailwind utilities.
2. **Accessibility First**: Every interactive control must have an accessible name (`aria-label` or visible text), visible focus ring (`focus-visible:ring-2 focus-visible:ring-primary`), and keyboard listener.
3. **Zero Secrets in Code**: Never commit API keys or private certificates to Git. All environment configurations must utilize `.env` files matching `.env.example`.
4. **Code-Split Routes**: Every top-level page component must be lazy loaded via `React.lazy()` in `src/routes/AppRoutes.jsx` to preserve sub-2.5s LCP.
