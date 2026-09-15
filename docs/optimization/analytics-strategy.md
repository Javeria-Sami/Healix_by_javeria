# Healix Healthcare — Post-Launch Analytics Strategy

## 1. Privacy-First Analytics Philosophy
The Healix analytics framework is engineered under strict healthcare privacy standards:
- **Zero-PHI Guarantee**: Protected Health Information (clinical notes, diagnostic requests, symptoms) is never captured or transmitted.
- **Cookie-Free & Consent-Respectful**: Event telemetry utilizes local event dispatching without tracking cookies or cross-site fingerprinting.
- **Actionable Diagnostic Telemetry**: Measures user engagement, friction points, and conversion pathways to inform design iterations.

---

## 2. Event Tracking Taxonomy

| Event Category | Action Name | Trigger / Context | Payload Metadata |
| :--- | :--- | :--- | :--- |
| `cta_click` | `click_navbar_cta` | User clicks primary header CTA | `{ destination: '/contact', location: 'navbar' }` |
| `cta_click` | `click_hero_primary_cta` | User clicks hero primary CTA | `{ destination: '/contact', location: 'hero' }` |
| `cta_click` | `click_service_inquire` | User clicks booking CTA on service detail | `{ serviceSlug: 'preventive-health-screenings' }` |
| `cta_click` | `click_plan_select` | User selects a membership tier on plans page | `{ planName: 'Executive Longevity', billing: 'annual' }` |
| `micro_conversion` | `toggle_billing_frequency` | User toggles monthly/annual switch | `{ billingMode: 'annual', discountApplied: true }` |
| `micro_conversion` | `filter_services` | User selects a specialization category | `{ category: 'Clinical Wellness' }` |
| `journey_step` | `start_contact_form` | User focuses on first input field in contact form | `{ source: 'contact_page' }` |
| `inquiry_intent` | `submit_contact_form` | User successfully submits consultation request | `{ serviceSelected: 'Preventive Health', validationTimeMs: 1420 }` |

---

## 3. Baseline Metric Tracking

| Metric | Pre-Production Value | Target Post-Launch SLA |
| :--- | :--- | :--- |
| **Unique Visitors / Sessions** | *NOT AVAILABLE (Pre-Launch)* | Baseline establishing in Month 1 |
| **Consultation Inquiry Rate** | *NOT AVAILABLE (Pre-Launch)* | Target > 3.5% of unique sessions |
| **Contact Form Completion Rate** | *NOT AVAILABLE (Pre-Launch)* | Target > 75% of form starts |
| **Core Web Vitals Pass Rate** | 100% (Synthetic Labs) | Target > 95% Real User Monitoring |
| **Error Rate (5xx / Uncaught)** | 0% | Target < 0.05% of total requests |
