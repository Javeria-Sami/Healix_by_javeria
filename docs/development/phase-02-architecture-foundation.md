# Phase 02 — Project Architecture & Foundation

## 1. Phase Objective
Establish a complete, scalable, and maintainable technical foundation for **Healix**, encompassing a modern React + Vite + Tailwind CSS frontend architecture, an Express.js backend API shell with security middlewares, a unified npm workspaces monorepo structure, dynamic routing, error boundaries, accessible layout primitives, and automated test foundations.

---

## 2. Starting Condition
- Repository possessed 18 core design and architecture documentation files.
- Placeholder directories existed without functioning dependencies, scripts, or operational build pipelines.
- Root `package.json` had a quote parsing issue (resolved in Phase 1).
- Git repository had not yet been initialized.

---

## 3. Architecture Decisions
1. **npm Workspaces Monorepo**: Configured root `package.json` to manage `client/` and `server/` packages seamlessly while providing unified orchestration scripts (`dev`, `dev:all`, `dev:client`, `dev:server`, `build`, `test`, `preview`).
2. **Client-Side Framework**: React 18 + Vite 5 + React Router 6 + Tailwind CSS + Framer Motion.
3. **Backend Framework**: Node.js + Express.js configured with Helmet, CORS, Rate Limiting, JSON body parser, and centralized error handling.
4. **Data Sourcing Layer**: Initialized structured static datasets in `client/src/data/` with a unified `dataService` abstraction allowing instant future migration to REST/database endpoints without component rewrites.
5. **No Premature 3D/Bloat**: Deferred Three.js/React Three Fiber until explicitly justified in Phase 19, keeping initial bundles minimal and performant.

---

## 4. Frontend Structure
```text
client/
├── public/
│   └── favicon.svg
├── src/
│   ├── animations/
│   │   └── variants.js              # Reusable Framer Motion transitions
│   ├── components/
│   │   └── common/
│   │       ├── ErrorBoundary.jsx    # React error boundary with reload trigger
│   │       └── ScrollToTop.jsx      # Route transition scroll restoration
│   ├── constants/
│   │   └── routes.js                # Centralized route strings & navigation links
│   ├── data/
│   │   ├── services.js              # Clinical services models
│   │   ├── professionals.js         # Physician profiles & credentials
│   │   ├── projects.js              # Portfolio & case studies
│   │   ├── plans.js                 # Membership tiers & pricing
│   │   ├── articles.js              # Clinical research articles
│   │   ├── faqs.js                  # Accessible FAQ data
│   │   ├── testimonials.js          # Patient/partner testimonials
│   │   └── index.js                 # Barrel export
│   ├── layouts/
│   │   ├── RootLayout.jsx           # Global shell with skip link
│   │   ├── Header.jsx               # Responsive navigation & mobile drawer
│   │   ├── Footer.jsx               # Semantic footer with legal links
│   │   └── PageContainer.jsx        # Responsive 1280px max-width boundary
│   ├── pages/
│   │   ├── HomePage.jsx             # Home overview & route verification matrix
│   │   ├── AboutPage.jsx            # Mission, vision, approach & team anchor
│   │   ├── ServicesPage.jsx         # Clinical services directory
│   │   ├── ServiceDetailPage.jsx    # Dynamic service slug resolver
│   │   ├── ProfessionalsPage.jsx    # Medical team roster
│   │   ├── ProfessionalDetailPage.jsx # Physician profile slug resolver
│   │   ├── PortfolioPage.jsx        # Case studies & deployments
│   │   ├── PortfolioDetailPage.jsx  # Case study slug resolver
│   │   ├── PlansPage.jsx            # Care plans & billing toggle
│   │   ├── ResourcesPage.jsx        # Insights & articles directory
│   │   ├── ResourceDetailPage.jsx   # Article slug resolver
│   │   ├── FaqPage.jsx              # Accordion FAQ
│   │   ├── ContactPage.jsx          # Lead intake form with validation
│   │   ├── LegalPage.jsx            # Privacy, Terms & Cookie policies
│   │   └── NotFoundPage.jsx         # 404 error recovery view
│   ├── routes/
│   │   └── AppRoutes.jsx            # React Router 6 route declarations
│   ├── services/
│   │   ├── api.js                   # Fetch wrapper with timeout & error typing
│   │   ├── dataService.js           # Decoupled data model accessor
│   │   └── contactService.js        # Lead submission API client
│   ├── styles/
│   │   ├── index.css                # Tailwind directives & focus styles
│   │   └── variables.css            # CSS custom properties matching tokens
│   ├── test/
│   │   ├── routes.test.jsx          # Vitest route smoke tests
│   │   └── setup.js                 # Testing library setup
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 5. Backend Structure
```text
server/
├── config/
│   └── environment.js               # Centralized env loader & validator
├── middleware/
│   ├── errorHandler.js              # Centralized JSON error response
│   └── notFoundHandler.js           # 404 handler for undefined API routes
├── routes/
│   ├── api.js                       # Master API router
│   └── health.routes.js             # GET /api/health endpoint
├── test/
│   └── health.test.js               # Node test runner + supertest suite
├── app.js                           # Express application configuration
├── package.json
└── server.js                        # Node server bootstrap with graceful shutdown
```

---

## 6. Routing Architecture
| Route | Page Component | Description |
|---|---|---|
| `/` | `HomePage` | Platform overview and quick navigation matrix |
| `/about` | `AboutPage` | Organization mission, vision, values, and leadership |
| `/services` | `ServicesPage` | Directory of clinical specializations |
| `/services/:slug` | `ServiceDetailPage` | Dynamic service view with benefits & duration |
| `/professionals` | `ProfessionalsPage` | Roster of board-certified clinicians |
| `/professionals/:slug` | `ProfessionalDetailPage` | Dynamic physician bio and specialty profile |
| `/portfolio` | `PortfolioPage` | Enterprise case studies and deployments |
| `/portfolio/:slug` | `PortfolioDetailPage` | Dynamic case study with challenge/solution/outcomes |
| `/plans` | `PlansPage` | Care memberships with annual/monthly toggle |
| `/resources` | `ResourcesPage` | Medical research articles and insights |
| `/resources/:slug` | `ResourceDetailPage` | Dynamic article reading view with author metadata |
| `/faq` | `FaqPage` | Accessible accordion FAQs |
| `/contact` | `ContactPage` | Consultation request form with client-side validation |
| `/privacy`, `/terms`, `/cookies` | `LegalPage` | HIPAA disclosure, terms of service, cookies |
| `*` | `NotFoundPage` | 404 error catch-all with recovery navigation |

---

## 7. Environment Strategy
- Defined in `.env.example` at repository root.
- Environment loader (`server/config/environment.js`) safely defaults to development values when absent.
- Production environment masks error stack traces and internal details.
- `.gitignore` strictly protects `.env`, `.env.local`, and build directories.

---

## 8. API Strategy
- Prefix: `/api`
- Operational Health Check: `GET /api/health` returning system uptime, status, and ISO timestamp.
- Foundation Contact Endpoint: `POST /api/contact` structured for Phase 16 complete backend validation.
- JSON body limits (100kb) and rate limiting (200 requests / 15 min per IP) enforced.

---

## 9. Data Strategy
- Structured JavaScript models in `client/src/data/` representing realistic healthcare information entities.
- Clear development placeholders (`[CLIENT SERVICE DESCRIPTION]`, `[CLIENT PROFESSIONAL BIO]`, `[CLIENT PRICE]`) per Content Policy Rule 49 & 59.
- Decoupled from UI via `dataService.js`.

---

## 10. State Management Decision
- State is managed via local React hooks (`useState`, `useEffect`) and URL parameters (`useParams`, `useLocation`).
- No bulky global state libraries (Redux, Zustand) are necessary at this stage.

---

## 11. Error Handling
- **Frontend**: React `ErrorBoundary` component wraps the entire component tree to catch unexpected rendering exceptions and present a clean recovery button.
- **Backend**: Centralized `errorHandler` middleware standardizes API error payloads into `{ success: false, error: { message, statusCode } }`.

---

## 12. Accessibility Foundation
- Semantic HTML landmarks (`<header>`, `<main id="main-content">`, `<footer>`, `<nav>`).
- Dedicated `.skip-to-content` link for keyboard users.
- Visible `:focus-visible` styling using primary brand ring.
- `aria-expanded` and semantic button controls for mobile navigation and accordion components.
- Automatic support for `prefers-reduced-motion` in global CSS.

---

## 13. Responsive Foundation
- Mobile-first CSS configured with responsive breakpoints:
  - 320px, 375px, 390px, 430px (Mobile)
  - 768px (Tablet)
  - 1024px (Laptop)
  - 1280px (Desktop Container Constraint)
  - 1440px / 1920px+ (Large screens)
- Reusable `PageContainer` component enforcing 1280px max content width.

---

## 14. Animation Foundation
- Installed Framer Motion.
- Created reusable animation definitions in `client/src/animations/variants.js` (`fadeIn`, `fadeUp`, `fadeInScale`, `staggerContainer`, `pageTransitionVariants`).
- Reduced-motion media query globally neutralizes long transitions for sensitive users.

---

## 15. Testing Foundation
- **Client**: Vitest + React Testing Library testing all primary routes, dynamic slug resolutions, and 404 catch-all.
- **Server**: Node.js built-in test runner + Supertest validating `GET /api/health` and 404 endpoint behaviors.

---

## 16. Git / Development Workflow
- Git repository initialized with comprehensive `.gitignore`.
- Root scripts orchestrate child workspaces.

---

## 17. Dependencies Added
- **Client**: `react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- **Server**: `express`, `cors`, `helmet`, `dotenv`, `express-rate-limit`, `express-validator`, `morgan`, `supertest`.

---

## 18. Dependencies Removed
- None (clean scaffold initialization).

---

## 19. Important Technical Decisions
- Configured Vite proxy to forward `/api` requests to Express backend during local development.
- Built `ScrollToTop` utility component to ensure proper UX on route changes.

---

## 20. Problems Encountered
- None during Phase 02 implementation.

---

## 21. Problems Resolved
- All dependencies installed cleanly with zero missing imports or conflicting workspace rules.

---

## 22. Remaining Limitations
- Detailed visual brand tokens, custom iconography, and micro-interactions belong to Phase 03 and Phase 04.
- Full server-side email notifications and contact DB persistence belong to Phase 16 & 17.

---

## 23. Verification Results
- **Development Server**: PASS (Vite & Express operational)
- **Production Build**: PASS (`npm run build` generates clean client bundle)
- **Test Suite**: PASS (Vitest client route tests & Node server health tests passed 100%)
