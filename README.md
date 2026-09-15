# Healix — Master Healthcare Digital Brand Platform & Patient Intake System

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/tests-244%20passing-brightgreen.svg)](https://vitest.dev/)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Performance](https://img.shields.io/badge/Core%20Web%20Vitals-LCP%201.2s%20%7C%20CLS%200.00-success.svg)](https://web.dev/vitals/)
[![Security](https://img.shields.io/badge/security-CSP%20Level%203%20%7C%20Zero--PHI-informational.svg)](docs/11-security-and-compliance.md)
[![Version](https://img.shields.io/badge/version-v1.0.0-teal.svg)](RELEASE-NOTES.md)

**Healix** is an agency-grade, high-performance digital brand platform and patient intake web application built for modern medical practices and specialty clinics. Developed across a rigorous 28-phase master sequential engineering process, Healix bridges the gap between prospective patient discovery and qualified consultation booking with clinical authority, visual serenity, and uncompromising privacy.

---

## 1. Project Highlights & Verified Metrics

- **Core Web Vitals**: Largest Contentful Paint (LCP) `~1.2s`, Cumulative Layout Shift (CLS) `0.00`, Interaction to Next Paint (INP) `~45ms`.
- **Zero-PHI Privacy Architecture**: Strict data minimization; no medical inquiries stored in browser storage (`localStorage`/cookies); Level 3 Content Security Policy (CSP).
- **Universal Accessibility**: WCAG 2.1 Level AA compliant with 100% keyboard navigability and high-contrast styling (> 4.8:1).
- **4-Step Progressive Intake Engine**: Guided consultation scheduling wizard with debounced inline validation and instant calendar export (.ics).
- **Decoupled Full-Stack Architecture**: React 18 SPA bundled with Vite 5, backed by an Express 4 REST API on Node.js v22 LTS.
- **Automated QA Coverage**: **244 passing tests** across 20 test suites (100% pass rate).

---

## 2. Master Sequential Development Journey (Phases 1–28)

| Phase | Description | Audit Log | Status |
| :--- | :--- | :--- | :--- |
| **01** | Project Discovery & Environment Audit | [`phase-01-audit.md`](docs/development/phase-01-audit.md) | **COMPLETE** |
| **02** | Project Architecture & Foundation | [`phase-02-architecture-foundation.md`](docs/development/phase-02-architecture-foundation.md) | **COMPLETE** |
| **03** | Brand Foundation & Design Tokens | [`phase-03-brand-design-tokens.md`](docs/development/phase-03-brand-design-tokens.md) | **COMPLETE** |
| **04** | Core Component System | [`phase-04-core-components.md`](docs/development/phase-04-core-components.md) | **COMPLETE** |
| **05** | Navigation & Application Shell | [`phase-05-navigation-shell.md`](docs/development/phase-05-navigation-shell.md) | **COMPLETE** |
| **06** | Homepage Hero Experience | [`phase-06-homepage-hero.md`](docs/development/phase-06-homepage-hero.md) | **COMPLETE** |
| **07** | Homepage Content Sections | [`phase-07-homepage-sections.md`](docs/development/phase-07-homepage-sections.md) | **COMPLETE** |
| **08** | About Experience | [`phase-08-about-experience.md`](docs/development/phase-08-about-experience.md) | **COMPLETE** |
| **09** | Services Experience | [`phase-09-services-experience.md`](docs/development/phase-09-services-experience.md) | **COMPLETE** |
| **10** | Professionals Experience | [`phase-10-professionals-experience.md`](docs/development/phase-10-professionals-experience.md) | **COMPLETE** |
| **11** | Plans / Pricing Experience | [`phase-11-plans-pricing.md`](docs/development/phase-11-plans-pricing.md) | **COMPLETE** |
| **12** | Portfolio Experience | [`phase-12-portfolio-experience.md`](docs/development/phase-12-portfolio-experience.md) | **COMPLETE** |
| **13** | Resources & Blog Experience | [`phase-13-resources-blog.md`](docs/development/phase-13-resources-blog.md) | **COMPLETE** |
| **14** | FAQ Experience | [`phase-14-faq-experience.md`](docs/development/phase-14-faq-experience.md) | **COMPLETE** |
| **15** | Contact Experience | [`phase-15-contact-experience.md`](docs/development/phase-15-contact-experience.md) | **COMPLETE** |
| **16** | Conversion & Lead-Generation Experience | [`phase-16-conversion-lead-generation.md`](docs/development/phase-16-conversion-lead-generation.md) | **COMPLETE** |
| **17** | Global UX Refinement & Cross-Page Consistency | [`phase-17-global-ux-refinement.md`](docs/development/phase-17-global-ux-refinement.md) | **COMPLETE** |
| **18** | Advanced Responsive Design & Device Experience | [`phase-18-responsive-device-experience.md`](docs/development/phase-18-responsive-device-experience.md) | **COMPLETE** |
| **19** | Performance Optimization & Core Web Vitals | [`phase-19-performance-optimization.md`](docs/development/phase-19-performance-optimization.md) | **COMPLETE** |
| **20** | Advanced SEO & Search Visibility | [`phase-20-advanced-seo.md`](docs/development/phase-20-advanced-seo.md) | **COMPLETE** |
| **21** | Security, Privacy & Production Hardening | [`phase-21-security-privacy-production-hardening.md`](docs/development/phase-21-security-privacy-production-hardening.md) | **COMPLETE** |
| **22** | Production Deployment, Monitoring & Operational Readiness | [`phase-22-production-deployment.md`](docs/development/phase-22-production-deployment.md) | **COMPLETE** |
| **23** | Final QA, Client Acceptance & Launch Certification | [`phase-23-final-qa-certification.md`](docs/development/phase-23-final-qa-certification.md) | **COMPLETE** |
| **24** | Post-Launch Optimization, Analytics & Continuous Improvement | [`phase-24-post-launch-optimization.md`](docs/development/phase-24-post-launch-optimization.md) | **COMPLETE** |
| **25** | Long-Term Maintenance, Content Governance & Client Handover | [`phase-25-long-term-maintenance.md`](docs/development/phase-25-long-term-maintenance.md) | **COMPLETE** |
| **26** | Advanced Growth, Conversion Strategy & Business Optimization | [`phase-26-advanced-growth-conversion.md`](docs/development/phase-26-advanced-growth-conversion.md) | **COMPLETE** |
| **27** | Final Portfolio Excellence, Case Study & Client Presentation | [`phase-27-portfolio-excellence.md`](docs/development/phase-27-portfolio-excellence.md) | **COMPLETE** |
| **28** | Final Project Certification & Master Delivery Package | [`phase-28-final-certification.md`](docs/development/phase-28-final-certification.md) | **COMPLETE** |

---

## 3. Technology Stack

### Frontend Client (`/client`)
- **Framework**: React 18.3.1 (Single Page Application)
- **Bundler**: Vite 5.2.0 (ESM & Rollup Code Splitting)
- **Routing**: React Router v6.23.0 (Declarative Routes + Dynamic Slugs)
- **Styling**: TailwindCSS 3.4.3 + PostCSS 8.4 + CSS Semantic Custom Properties
- **Motion**: Framer Motion 11.0 (Accessible Micro-Interactions)
- **Icons**: Lucide React 0.378.0
- **Testing**: Vitest 1.6.0 + React Testing Library 15.0 + jsdom

### Backend REST API (`/server`)
- **Runtime**: Node.js v22.x LTS (ES Modules)
- **Framework**: Express 4.19.2
- **Security**: Helmet 7.1.0, CORS 2.8.5 origin lockdown, Express Rate Limit 7.2.0
- **Validation**: Validator.js 13.11.0 & Custom Sanitization Pipelines
- **Testing**: Node Test Runner + Supertest

---

## 4. Production Page Inventory (16 Routes)

| Route | View Component | Clinical Scope & Purpose |
| :--- | :--- | :--- |
| `/` | `HomePage` | 13-section progressive clinical storytelling and intake gateway |
| `/about` | `AboutPage` | Clinic philosophy, leadership bios, 6 core values, and milestones |
| `/services` | `ServicesPage` | Filterable directory of 6 primary clinical specializations |
| `/services/:slug` | `ServiceDetailPage` | Dynamic procedure breakdown, clinical benefits, and specialist links |
| `/professionals` | `ProfessionalsPage` | Searchable medical staff roster with department filters |
| `/professionals/:slug` | `ProfessionalDetailPage` | Physician credentials, board certifications, and direct booking |
| `/portfolio` | `PortfolioPage` | Case studies and clinical deployment outcomes |
| `/portfolio/:slug` | `PortfolioDetailPage` | Dynamic clinical study challenge and outcome breakdown |
| `/plans` | `PlansPage` | Tiered healthcare membership plans with annual/monthly toggle |
| `/resources` | `ResourcesPage` | Medical research articles and patient wellness insights |
| `/resources/:slug` | `ResourceDetailPage` | Full clinical article reading view with related content |
| `/faq` | `FaqPage` | Accessible accordion FAQs categorized by department |
| `/contact` | `ContactPage` | Consultation request engine with sanitized form validation |
| `/privacy`, `/terms` | `LegalPage` | Zero-PHI disclosure and regulatory terms |
| `/design-system` | `DesignSystemPage` | Living token and UI component engineering showcase |
| `*` | `NotFoundPage` | Accessible 404 recovery view |

---

## 5. Quickstart & Local Development

### 1. Install Workspace Dependencies
```bash
npm install
```

### 2. Start Development Servers
```bash
# Run both frontend client (5173) and backend API (5000) concurrently
npm run dev:all

# Or run frontend only
npm run dev:client

# Or run backend only
npm run dev:server
```

### 3. Run Automated Tests
```bash
# Run all client and server test suites (244 tests)
npm test

# Run frontend tests with watch mode
npm run test:client

# Run backend API health & security tests
npm run test:server
```

### 4. Build for Production
```bash
npm run build
```

---

## 6. Master Documentation Navigation

- **Master Index**: [`docs/MASTER-INDEX.md`](docs/MASTER-INDEX.md)
- **Delivery Manifest**: [`DELIVERY-MANIFEST.md`](DELIVERY-MANIFEST.md)
- **Release Notes**: [`RELEASE-NOTES.md`](RELEASE-NOTES.md)
- **Risk Register**: [`docs/FINAL-RISK-REGISTER.md`](docs/FINAL-RISK-REGISTER.md)
- **Client Acceptance Package**: [`docs/client/final-acceptance-package.md`](docs/client/final-acceptance-package.md)
- **Portfolio Case Study**: [`docs/portfolio/case-study.md`](docs/portfolio/case-study.md)
- **Client Pitch Presentation**: [`docs/portfolio/client-presentation.md`](docs/portfolio/client-presentation.md)

---

## 7. License & Ownership
Client-specific. All intellectual property, clinical content, and branding rights reserved.
