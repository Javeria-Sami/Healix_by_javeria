# Healix — Phase 14: FAQ Experience

## 1. Objective
Build an authoritative, accessible, and comprehensive FAQ experience (`/faq`) answering prospective and current patient inquiries regarding Healix's clinical care model, preventative diagnostic screenings, membership billing/insurance, physician access, and patient health data security.

## 2. Scope & Boundaries
- Operational and clinical model clarifications.
- **NOT** a replacement for direct medical diagnosis or emergency care.
- Shared single source of truth (`client/src/data/faqs.js`) used by both `/faq` and the homepage `FAQSection.jsx`.
- Strict truthfulness: No fabricated insurance guarantees, prices, or clinical claims.

## 3. Route
| Route | Component | Description |
| :--- | :--- | :--- |
| `/faq` | `FaqPage.jsx` | Dedicated FAQ Center with Hero, category topic filtering, real-time search, accessible accordion list, supportive concierge contact card, and bottom CTA |

## 4. FAQ Data Model (`client/src/data/faqs.js`)
Each FAQ item is structured with the following schema:
- `id` (string): Stable unique identifier (`faq-1`, etc.)
- `question` (string): The user question
- `answer` (string): Concise, direct, and factual answer
- `category` (string): One of `General & Model`, `Services & Diagnostics`, `Care Plans & Billing`, `Physicians & Appointments`, `Privacy & Security`
- `tags` (array of strings): Search keyword tags
- `isPriority` (boolean): Flag for homepage quick FAQ selection
- `relatedLink` (optional object: `{ text, url }`): Contextual internal link to services, plans, professionals, or policies

## 5. Modular Section Architecture (`client/src/sections/faq/`)
- `FaqHero.jsx`: Semantic `<h1>`, breadcrumbs, category pills, and supporting copy.
- `FaqCategoryFilter.jsx`: Accessible category tablist (`role="tablist"`, `role="tab"`) with real-time text query search and active filter reset.
- `FaqAccordionList.jsx`: Accessible interactive accordion leveraging Phase 4 `Accordion` primitive, displaying category badges, expandable answers, contextual internal links, and `EmptyState` when 0 results match.
- `FaqQuickContact.jsx`: "Still Have Questions?" supportive card with clear paths to `/contact` and `/services`.
- `FaqCTA.jsx`: Bottom conversion block linking to `/contact` and `/plans`.
- `index.js`: Barrel exports.

## 6. Homepage Integration & Regression Safety
- The homepage `FAQSection.jsx` now filters `FAQS.filter(f => f.isPriority)` to maintain a focused 5-item preview without duplicating data or creating contradictory answers.

## 7. Accessibility & Responsiveness
- **Semantic Structure**: Proper heading hierarchy (`h1` -> `h2`), `<nav aria-label="Breadcrumb">`, `<div role="tablist">`, `<button role="tab">`, and accessible accordion buttons with `aria-expanded` and `aria-controls`.
- **Keyboard Navigation**: Full keyboard support (Enter/Space to toggle questions), visible focus rings, and no keyboard traps.
- **Empty States**: Clear messaging when searches yield 0 results with single-click "Reset All Filters".
- **Responsive Viewports**: Tested and verified across 320px, 375px, 768px, 1024px, 1440px, and 1920px+.

## 8. Verification & Test Results
- **Client Tests**: 134 passing tests across 12 suites (`vitest run`).
- **Server Tests**: 3 passing tests (`node --test`).
- **Production Build**: Clean bundle compiled in 10.88s (`vite build`).
- **Zero console errors, zero broken links, zero unverified claims.**
