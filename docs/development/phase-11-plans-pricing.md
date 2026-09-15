# Phase 11: Plans / Pricing Experience

## 1. Objective
The objective of Phase 11 was to design and build a transparent, predictable, and accessible Plans & Pricing experience for Healix that enables prospective patients, corporate clients, and family offices to:
- Understand Healix's 3 care membership tiers (`Essential Care`, `Professional Health`, and `Executive & Enterprise`).
- Compare diagnostic testing frequencies, specialist access intervals, and concierge support features across all tiers without cognitive overload.
- Toggle between annual and monthly billing frequencies with clear savings transparency (-15% on annual billing).
- Review patient billing assurances, including zero surprise administrative fees, HSA/FSA eligibility, and a 30-day satisfaction window.
- Transition seamlessly into the consultation/intake request workflow with pre-selected plan parameters (`/contact?plan=[slug]`).

---

## 2. Scope & Information Architecture
The pricing and membership hierarchy is structured into three distinct tiers:
```
Care Plans & Memberships (/plans)
├── Essential Care (Foundational Health — Annual & Quarterly Baselines)
├── Professional Health (Comprehensive Longevity — Bi-Annual Panels & Continuous CGM)
└── Executive & Enterprise (Bespoke Corporate Care — Private Suites & 24/7 Concierge)
```

---

## 3. Routes Created / Updated
- `/plans`: Main Plans & Pricing overview page featuring the breadcrumb header, billing frequency switch, 3-tier membership grid, feature comparison matrix table, 4-step onboarding continuum, billing transparency standards, membership FAQs accordion, and primary CTA.

---

## 4. Plan Data Architecture
Centralized in `healix/client/src/data/plans.js`:
- `id`: Stable identifier (`plan-essential`, `plan-pro`, `plan-enterprise`).
- `slug`: URL-safe slug (`essential-care`, `professional-health`, `executive-enterprise`).
- `name`: Membership tier name.
- `tier`: Subtitle classification.
- `tagline`: Concise value proposition.
- `description`: Detailed tier description.
- `priceMonthly`: Tagged monthly pricing placeholder (`[CLIENT PRICE: $89]`, `[CLIENT PRICE: $189]`, `[CLIENT CUSTOM PRICING]`).
- `priceAnnual`: Tagged annual pricing placeholder (`[CLIENT PRICE: $890]`, `[CLIENT PRICE: $1,890]`, `[CLIENT CUSTOM PRICING]`).
- `billingPeriod`: Explicit billing interval description.
- `targetAudience`: Specific candidate profile description.
- `isRecommended`: Boolean highlighting the flagship tier (`Professional Health`).
- `ctaText`: Contextually appropriate button label.
- `features`: Array of core bullet inclusions.
- `inclusions`: Categorized inclusions array (`Diagnostic Screenings`, `Physician Consultations`, `Continuity & Support`).
- `exclusions`: Clear statement of tier limits to prevent misleading expectations.
- `serviceSlugs`: Referenced Healix service slugs linking to Phase 9 routes.

---

## 5. Pricing Model & Truthfulness
- **No Fabricated Pricing**: All numerical price displays use clearly marked development placeholders per Content Policy Rules 20, 49 & 59.
- **Transparent Inclusions & Exclusions**: Every tier explicitly lists what is included and what is excluded (e.g. CGM sensor availability, 24/7 dedicated liaison).
- **HSA / FSA Compatibility**: Clear patient guidance regarding itemized superbills for tax-advantaged healthcare reimbursement.

---

## 6. Components Created / Updated (`sections/plans/`)
- `PlansHero.jsx`: Dedicated hero with breadcrumbs, semantic `<h1>`, accessible billing frequency switch (`role="switch"`, `aria-label`), and credential pills.
- `PlansGrid.jsx`: Responsive 3-column card grid rendering `Card` and `Badge` primitives with dynamic pricing, target audience cards, feature checklists, and CTAs.
- `PlanComparisonTable.jsx`: Accessible table with category headers (`scope="colgroup"`), feature rows (`scope="row"`), and responsive horizontal scrolling.
- `PlansHowItWorks.jsx`: 4-step onboarding journey (*Select Your Tier → Baseline Diagnostic Audit → Physician Strategy → Proactive Continuity*).
- `PlansTransparency.jsx`: Patient billing standards (Zero Hidden Charges, HSA & FSA Eligible, 30-Day Satisfaction Window).
- `PlansFAQ.jsx`: Interactive accordion with membership and insurance reimbursement answers.
- `PlansCTA.jsx`: Closing conversion banner linking to `/contact` and `/services`.

---

## 7. Service Integration & Contact Flow
- **Connected Services**: Plans link directly to relevant clinical specializations (`preventive-health-screenings`, `digital-cardiology-suite`, `nutritional-metabolic-medicine`, `executive-health-programs`).
- **Pre-Selected Lead Routing**: Plan CTAs forward selected tier parameters to `/contact?plan=[plan-slug]` for seamless intake coordination.

---

## 8. Accessibility & Responsive Verification
- **WCAG 2.2 AA Compliance**: Single semantic `<h1>`, proper heading hierarchy (`<h2>`/`<h3>`), table markup with row/col headers, accessible switch with high contrast focus rings.
- **Responsive Layout**: Verified across mobile (320px–430px), tablet (768px–1024px), and desktop (1280px–1920px). Zero horizontal page overflow.

---

## 9. Verification Results
- **Automated Tests**: 99 client tests + 3 server tests passing (102 total) with 0 failures (`npm test`).
- **Production Build**: Clean production build in 3.11s (`npm run build`).
- **Strict Phase Gate**: No Phase 12 files created out of sequence.
