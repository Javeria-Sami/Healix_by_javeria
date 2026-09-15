# Healix — Phase 15: Contact Experience

## 1. Objective
Build an accessible, calm, professional, and trustworthy Contact & Consultation Inquiry experience (`/contact`) that enables prospective patients and corporate partners to initiate physician-guided consultations, ask care questions, and access direct clinical channels with robust client-side validation and healthcare privacy safeguards.

## 2. Scope & Boundaries
- Public-facing consultation inquiry and communication channels.
- **NOT** a CRM, marketing automation pipeline, patient portal, medical record submission repository, or appointment booking backend.
- Clear medical privacy notices instructing users not to submit sensitive Protected Health Information (PHI) or emergency requests via the public form.
- Direct authentic communication channels with semantic `mailto:` and `tel:` links.

## 3. Route
| Route | Component | Description |
| :--- | :--- | :--- |
| `/contact` | `ContactPage.jsx` | Full Contact & Consultation experience with Hero, direct clinical channels, medical privacy notice, consultation form with contextual prefill, and contact FAQs |

## 4. Contact Information
- **Email Inquiries**: `care@healixhealth.com` (semantic `mailto:`)
- **Concierge Telephone**: `+1 (800) 555-HEAL` / `+1 (800) 555-4325` (semantic `tel:`)
- **Clinical Center Address**: `450 Medical Plaza Way, Suite 800, San Francisco, CA 94115`
- **Operating Hours**: `Monday – Friday: 8:00 AM – 6:00 PM PST` (Weekend urgent concierge available for enrolled members)

## 5. Form Fields & Validation Rules
- **Full Name** (`name`): Required, minimum 2 characters.
- **Email Address** (`email`): Required, validated using standard email regular expression.
- **Telephone Number** (`phone`): Optional for callback, validated for length if provided.
- **Inquiry Topic / Service** (`service`): Required select dropdown supporting contextual prefill from URL parameters (`?service=...`, `?plan=...`, `?type=...`).
- **Clinical or Consultation Inquiries** (`message`): Required textarea, minimum 10 characters.
- **Honeypot Trap** (`honeypot`): Hidden input field to silently mitigate automated spam bots.

## 6. Modular Section Architecture (`client/src/sections/contact/`)
- `ContactHero.jsx`: Semantic `<h1>`, breadcrumbs, trust pills.
- `ContactInfoCards.jsx`: Direct communication channels (Email, Phone, Clinical Center Address, Operating Hours) with semantic `tel:` and `mailto:` links, icon containers, and clean card styling.
- `ContactForm.jsx`: Reusable accessible consultation inquiry form with client validation, contextual prefill from search params (`service`, `plan`, `topic`), error messaging, submitting progress state, success confirmation state, and input reset.
- `ContactPrivacyNotice.jsx`: Dedicated medical privacy & confidentiality advisory card.
- `ContactFAQ.jsx`: 3 concise quick contact-related FAQs.
- `index.js`: Barrel exports.

## 7. Accessibility & Responsiveness
- **Semantic HTML**: Proper `<label>` associations via `htmlFor` and `id`, `<form noValidate>`, `<input>`, `<select>`, `<textarea>`, and `<button type="submit">`.
- **Assistive Technology Announcements**: Form error messages linked via `aria-describedby` and `role="alert"`.
- **Keyboard Navigation**: Full keyboard tab order and visible focus states across all interactive form controls.
- **Responsive Viewports**: Single-column layout on mobile (320px–430px) transitioning into balanced 5/7 column desktop composition (1024px+).

## 8. Verification & Test Results
- **Client Tests**: 143 passing tests across 13 suites (`vitest run`).
- **Server Tests**: 3 passing tests (`node --test`).
- **Production Build**: Clean bundle compiled in 4.12s (`vite build`).
- **Zero console errors, zero broken links, zero exposed credentials.**
