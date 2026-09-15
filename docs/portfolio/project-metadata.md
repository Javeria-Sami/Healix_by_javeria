# Healix — Project Metadata & Specifications

## 1. General Project Details
- **Project Name**: Healix
- **Tagline**: Modern Healthcare Digital Brand Platform & Patient Intake System
- **Domain / Vertical**: Healthcare, Clinical Medicine, Medical Practices & Digital Patient Intake
- **Target Audience**: Prospective Patients, Caregivers, Families, Referring Physicians
- **Project Type**: Full-Stack Decoupled Web Application (Client SPA + Headless REST API)
- **Development Model**: 27-Phase Master Sequential Engineering & Verification Workflow
- **Release Year**: 2026

---

## 2. Technical Stack & Dependencies

### Frontend (`/client`)
- **Core Framework**: React 18.3.1
- **Build Tool / Bundler**: Vite 5.2.0
- **Routing**: React Router v6.23.0
- **Styling**: TailwindCSS 3.4.3, PostCSS 8.4.38, Autoprefixer 10.4.19
- **Iconography**: Lucide React 0.378.0
- **Animations / Micro-interactions**: Custom Tailwind animations & CSS transitions
- **Testing**: Vitest 1.6.0, React Testing Library 15.0.7, jsdom 24.0.0

### Backend API (`/server`)
- **Runtime**: Node.js v22.x LTS
- **Framework**: Express 4.19.2
- **Security & Headers**: Helmet 7.1.0, CORS 2.8.5
- **Rate Limiting**: express-rate-limit 7.2.0
- **Data Validation & Sanitization**: Validator.js 13.11.0
- **Environment Management**: dotenv 16.4.5

---

## 3. Architecture & Repository Structure
- **Monorepo Pattern**: Cleanly separated `/client` and `/server` workspaces.
- **Client Architecture**:
  - `src/components/common/`: Design tokens, buttons, inputs, modal dialogs, badges.
  - `src/components/layout/`: Navigation bar, mobile drawer, footer, breadcrumbs.
  - `src/components/features/`: Appointment booking wizard, doctor directory filters, service explorer, cost estimator.
  - `src/pages/`: Route-level views (Home, About, Services, Doctors, Appointments, Patient Portal, Contact, 404).
  - `src/data/`: Structured JSON data files for doctors, services, FAQs, reviews, and clinic locations.
  - `src/hooks/`: Reusable hooks for scroll behavior, media queries, debounce, and form state.
- **Server Architecture**:
  - `controllers/`: Request handling for appointment scheduling, contact inquiry, and health status.
  - `middleware/`: Security headers, rate limiting, error handling, request logging.
  - `routes/`: Modular REST API route definitions.
  - `config/`: Environment configuration and security policy definitions.

---

## 4. Key Performance & Quality Metrics
- **Automated Tests**: 20 test suites, 244 total tests (100% passing).
- **Core Web Vitals**:
  - Largest Contentful Paint (LCP): `~1.2s`
  - Cumulative Layout Shift (CLS): `0.00`
  - Interaction to Next Paint (INP): `~45ms`
  - Time to First Byte (TTFB): `< 120ms`
- **Accessibility Standard**: WCAG 2.1 Level AA Compliant.
- **Initial Bundle Payload**: `< 250 KB` gzipped.
- **Security Posture**: CSP Level 3, HSTS (2-year max-age), zero client-side PHI persistence.
