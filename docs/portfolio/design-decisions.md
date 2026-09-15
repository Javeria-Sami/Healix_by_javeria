# Healix — Architectural & Design Decision Records (ADR)

This document outlines the key technical, architectural, and design decisions made throughout the 27-phase engineering of Healix, along with the trade-offs and rationale for each choice.

---

## ADR 01: Decoupled Single Page Application (SPA) with Vite + Express
- **Context**: The platform needed instant page transitions, dynamic multi-step booking workflows, interactive doctor/service filters, and high performance.
- **Decision**: Architect Healix as a decoupled frontend React 18 SPA built with Vite 5, served alongside a lightweight Node.js/Express REST API.
- **Rationale**:
  - Vite 5 provides sub-second HMR and optimized Rollup tree-shaking.
  - Decoupling enables independent static edge caching of frontend assets via CDNs while keeping the backend API lean, stateless, and secure.
- **Trade-offs**: Requires client-side SEO hydration techniques (JSON-LD, dynamic metadata injection) rather than monolithic SSR.
- **Status**: Accepted & Verified.

---

## ADR 02: Clinical Soft UI & Color Palette Design System
- **Context**: Healthcare websites frequently suffer from either overly sterile clinical harshness (pure stark white/blue) or outdated institutional styling, causing anxiety.
- **Decision**: Implement a bespoke Clinical Soft UI palette using Deep Clinical Teal (`#0D9488`), Midnight Slate (`#0F172A`), and Warm Alabaster (`#F8FAFC`), elevated with subtle glassmorphic backdrop filters (`backdrop-blur-md bg-white/80`).
- **Rationale**:
  - Clinical Teal communicates medical precision and healing while avoiding cold institutional blue.
  - Warm neutral backgrounds soften screen contrast and reduce visual fatigue.
  - Glassmorphic elevation creates visual hierarchy without heavy drop shadows.
- **Status**: Accepted & Verified.

---

## ADR 03: Editorial & Approachable Typography Pairing
- **Context**: Medical platforms must project both rigorous scientific authority and warm, patient-centered empathy.
- **Decision**: Pair `Plus Jakarta Sans` for clean, highly legible UI elements, navigation, and body copy with `Newsreader` (or `Lora`) for editorial headings, clinical quotes, and trust testimonials.
- **Rationale**:
  - `Plus Jakarta Sans` offers geometric clarity and wide aperture, ensuring readability on low-resolution mobile displays.
  - Serif accents introduce editorial dignity and human warmth, breaking the coldness of purely modern tech layouts.
- **Status**: Accepted & Verified.

---

## ADR 04: Zero-PHI Privacy & Telemetry Model
- **Context**: Healthcare digital platforms face strict data privacy obligations. Analytics and local storage must never leak Protected Health Information (PHI).
- **Decision**: Enforce a strict Zero-PHI client-side persistence rule. No medical reasons for visit, symptom searches, or patient identification details are saved to `localStorage`, `sessionStorage`, or cookies.
- **Rationale**:
  - Eliminates the risk of unauthorized data harvesting or cross-site tracking exposure on shared family computers.
  - All form data exists strictly in volatile React component state and is transmitted over encrypted HTTPS to secure backend controllers.
- **Status**: Accepted & Verified.

---

## ADR 05: 4-Step Progressive Disclosure Appointment Engine
- **Context**: Traditional single-page intake forms with 15+ fields have an abandonment rate exceeding 60%.
- **Decision**: Break the appointment booking experience into 4 focused, progressive steps:
  1. Specialty & Reason
  2. Clinician & Date/Time
  3. Patient Details
  4. Instant Confirmation & Calendar Export
- **Rationale**:
  - Reduces cognitive load by asking only 2-3 decisions per screen.
  - Visual progress bar provides clear completion velocity.
  - Inline debounced validation prevents jarring form error banners.
- **Status**: Accepted & Verified.

---

## ADR 06: Mobile-First Touch Ergonomics & Sticky Conversion Bar
- **Context**: Over 65% of healthcare discovery occurs on mobile devices, often while patients are on the go.
- **Decision**: Engineer all interactive elements with a minimum 48px touch target and implement a sticky mobile bottom conversion bar providing one-tap access to calling the clinic or opening the appointment wizard.
- **Rationale**:
  - Keeps critical conversion actions within natural one-thumb reachability zones.
  - Does not obstruct main content thanks to intelligent scroll-aware reveal behavior.
- **Status**: Accepted & Verified.

---

## ADR 07: Modular JSON Data Architecture
- **Context**: Content management must allow rapid updates to physician rosters, accepted insurance, service pricing, and FAQs without code refactoring.
- **Decision**: Structure core domain content as modular, typed JSON schema files (`doctors.js`, `services.js`, `faqs.js`, `pricing.js`).
- **Rationale**:
  - Enables instant client hydration with zero initial database latency.
  - Facilitates future headless CMS integration (Strapi, Sanity, Contentful) through identical JSON data contracts.
- **Status**: Accepted & Verified.
