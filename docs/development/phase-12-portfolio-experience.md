# Healix — Phase 12: Portfolio & Case Studies Experience

## 1. Objective
Establish an evidence-based, premium healthcare case study and portfolio experience (`/portfolio` and `/portfolio/:slug`) demonstrating Healix's clinical deployment capabilities, preventative diagnostics initiatives, continuous telemetry integrations, and interdisciplinary healthcare stewardship.

## 2. Scope & Boundaries
- Strictly informational and evidence-based portfolio showcase.
- **NOT** a project management tool, CRM, client dashboard, or invoice portal.
- All case study placeholders are clearly designated with neutral terminology (`[CLIENT CASE STUDY CHALLENGE]`, `[CLIENT CASE STUDY SOLUTION]`, `[CLIENT METRIC]`) per Content Policy Rules 49 & 59.
- No fabricated patient medical records, confidential hospital data, or unverified claims.

## 3. Public Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/portfolio` | `PortfolioPage.jsx` | Main Portfolio overview with Hero, category tabs, real-time search, featured case study, responsive grid, deployment capabilities, and CTA |
| `/portfolio/:slug` | `PortfolioDetailPage.jsx` | Deep-dive case study with breadcrumbs, structured challenge/approach/solution narrative, measurable outcomes, connected services, and cross-case study links |

## 4. Portfolio Data Model (`client/src/data/projects.js`)
Each case study is structured with the following schema:
- `id` (string): Stable unique identifier (`proj-1`, etc.)
- `slug` (string): SEO-friendly URL identifier
- `title` (string): Case study title
- `category` (string): One of `Corporate Healthcare`, `Clinical Innovation`, `Preventative Diagnostics`, `Longevity Medicine`
- `clientType` (string): Organizational profile (e.g., Technology Enterprise, Regional Medical Group)
- `year` (string): Implementation period
- `isFeatured` (boolean): Flag for flagship editorial presentation
- `tagline` (string): Single-sentence executive summary
- `summary` (string): Narrative overview
- `challenge` (string): Clinical or diagnostic challenge addressed
- `approach` (string): Healix diagnostic & technical methodology
- `solution` (string): Architecture deployed
- `outcomes` (array of strings): Quantifiable / qualitative results
- `image` (string): Primary visual asset
- `gallery` (array of strings): Additional visual assets
- `tags` (array of strings): Discovery hashtags
- `serviceSlugs` (array of strings): Direct relations to Healix services
- `relatedProjectIds` (array of strings): Cross-portfolio discovery relations

## 5. Modular Section Architecture (`client/src/sections/portfolio/`)
- `PortfolioHero.jsx`: Dedicated hero with single `<h1>`, breadcrumbs, category pills, and supporting copy.
- `PortfolioCategoryFilter.jsx`: Accessible category filter tablist (`role="tablist"`, `role="tab"`, `aria-selected`) with search input and filter counter.
- `FeaturedProject.jsx`: Editorial split card for flagship case study (`rapid-cardiac-risk-screening-initiative`).
- `PortfolioGrid.jsx`: Responsive grid of case study cards using `Card` and `Badge` primitives with cover image, category, metrics, tags, and link to `/portfolio/:slug`.
- `PortfolioCapabilities.jsx`: 4 deployment capabilities (*On-Site Diagnostic Pods, Telemetry Integration, Physician Consultation Desks, Interdisciplinary Governance*).
- `PortfolioCTA.jsx`: Bottom conversion block linking to `/contact` and `/services`.
- `PortfolioDetailHero.jsx`: Breadcrumbs, cover image, category badge, single `<h1>`, project logistics sidebar, and dual CTAs.
- `PortfolioCaseNarrative.jsx`: 3 structured cards (Challenge, Approach, Solution).
- `PortfolioOutcomes.jsx`: Measurable impact grid with key metrics.
- `PortfolioConnectedServices.jsx`: Connected Healix clinical services with direct links to `/services/:slug`.
- `RelatedProjects.jsx`: Cross-navigation to other case studies.
- `PortfolioDetailCTA.jsx`: Bottom action card linking to `/contact`.
- `index.js`: Barrel exports for all portfolio sections.

## 6. Accessibility & Responsiveness
- **Semantic Structure**: Proper heading hierarchy (`h1` -> `h2` -> `h3`), `<nav aria-label="Breadcrumb">`, `<div role="tablist">`, and `<button role="tab">`.
- **Keyboard Navigation**: All interactive tabs, search inputs, and cards are fully keyboard accessible with visible focus rings.
- **Empty & Error States**: Graceful handling of empty filter queries and non-existent case study slugs with recovery buttons.
- **Responsive Viewports**: Tested and verified across 320px, 375px, 768px, 1024px, 1440px, and 1920px+.

## 7. Verification & Test Results
- **Client Tests**: 111 passing tests across 10 suites (`vitest run`).
- **Server Tests**: 3 passing tests (`node --test`).
- **Production Build**: Clean bundle compiled in 3.09s (`vite build`).
- **Zero console errors, zero broken links, zero fabricated claims.**
