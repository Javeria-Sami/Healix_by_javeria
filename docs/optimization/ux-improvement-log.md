# Healix Healthcare — Continuous UX Improvement Log & Prioritization

## 1. Prioritization Framework (ICE Scoring)

All proposed optimizations are scored using the **ICE Model**:
- **Impact (1–10)**: Magnitude of improvement on conversion rate, accessibility, or user satisfaction.
- **Confidence (1–10)**: Degree of certainty based on user data, usability heuristics, or clinical requirements.
- **Ease (1–10)**: Engineering simplicity and minimal risk of unintended regression.
- **Score = (Impact × Confidence × Ease) / 10**

---

## 2. Optimization Log & Defect Tracking

| Date | Issue / Opportunity | Evidence / Source | Proposed Change | ICE Score | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2026-09-11** | Generic placeholder domain in contact form | Phase 23 QA Audit | Updated placeholder to `name@domain.com` | 9.0 | **RESOLVED** |
| **2026-09-11** | Mobile form keyboard layout optimization | Mobile Usability Review | Ensure `inputMode="email"` and `inputMode="tel"` on contact fields | 8.5 | **IMPLEMENTED** |
| **2026-09-11** | Billing toggle visual feedback | User Journey Testing | Added badge highlighting 15% annual savings | 8.8 | **IMPLEMENTED** |
| **Post-Launch Q1** | FAQ question search debounce | Real-world telemetry | Add 150ms debounce if FAQ question count exceeds 50 items | 6.5 | **BACKLOG** |
| **Post-Launch Q2** | Telehealth location selector | Regional expansion | Add clinic location selector for hybrid physical/virtual intake | 7.2 | **PLANNED** |
