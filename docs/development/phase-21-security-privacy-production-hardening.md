# Healix — Phase 21: Security, Privacy & Production Hardening

## 1. Security Objectives & Threat Model

### Security Objectives
1. **Minimize Attack Surface**: Implement strict defensive boundaries across client, API, middleware, headers, and dependency supply chains.
2. **Protect User & Consultation Information**: Ensure contact inquiries are validated, sanitized, and handled under data-minimization principles with explicit health disclosures.
3. **Prevent Web Vulnerabilities**: Safeguard against XSS, injection, CSRF, clickjacking, MIME sniffing, and open redirects.
4. **Resilience & Abuse Prevention**: Protect API resources from flooding and spam using layered rate-limiting and anti-spam honeypot traps.
5. **No False Compliance Claims**: Maintain authentic, accurate representation of platform scope without claiming unverified third-party certifications.

### Realistic Threat Model

| Threat Actor / Vector | Description | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|---|
| **Anonymous / Malicious Visitor** | Attempting XSS injection or parameter tampering via forms or routes | Medium | Moderate | Server-side validation via `express-validator`, input sanitization stripping `<>`, React data binding, strict CSP |
| **Automated Bot / Spammer** | Bulk automated submission to `/api/contact` | High | Moderate | Hidden anti-spam honeypot trap, dedicated IP rate limiter (10 requests / 15 mins) |
| **API Flooding / DoS** | Attempting resource exhaustion on API endpoints | Medium | High | Express rate limiter (200 requests / 15 mins globally, 10 / 15 mins for forms), 100kb payload limits |
| **Cross-Origin Abuse** | Malicious third-party domains attempting to read private API data | Medium | High | Strict CORS origin allowlisting (`CORS_ORIGIN`), disallowing wildcard origins with credentials |
| **Information Disclosure** | Internal stack traces, system paths, or environment details leaked in errors | Low | High | `x-powered-by` disabled, production error handler stripping stack traces and details, sanitized logging |
| **Sensitive Health Data Ingestion** | Users submitting confidential medical history through public web forms | High | High | Data minimization (no medical record upload or PHI fields), explicit medical privacy warning microcopy |

---

## 2. Asset Inventory & Data Classification

| Asset | Classification | Storage Location | Protection Controls |
|---|---|---|---|
| **Platform Source Code & UI Assets** | `PUBLIC` | Static bundle / CDN | Public distribution, minified production builds |
| **Physician & Service Metadata** | `PUBLIC` | Client repository data | Public read-only catalog |
| **Contact Form Submissions** | `SENSITIVE` | Ephemeral / API request | TLS in transit, server validation, sanitized logging |
| **Server Environment Variables** | `INTERNAL` | Server host runtime | Excluded from git, never exposed to client bundles |
| **API Endpoints (`/api/*`)** | `INTERNAL` | Backend service | Helmet, CSP, Rate Limiters, CORS allowlisting |

---

## 3. Secret & Environment Variable Management
- **Audit Findings**: Zero hardcoded secrets, tokens, or credentials exist in the codebase.
- **`.gitignore` Hygiene**: Verified `.env`, `.env.*`, `coverage/`, and `node_modules/` are strictly ignored.
- **Environment Template**: Created `.env.example` documenting public (`VITE_*`) vs server-only (`PORT`, `CORS_ORIGIN`, `NODE_ENV`) variables.

---

## 4. Input Trust Model & Form Security
- **Validation Engine**: Implemented `healix/server/validators/contact.validator.js` with `express-validator`.
- **Field Constraints**:
  - `name`: 2–100 characters, trimmed, angle brackets `<>` stripped.
  - `email`: RFC 5322 format validation, length $\le 255$, normalized.
  - `phone`: optional, validated format with 7–25 character length boundary.
  - `service`: strict allowlist matching configured clinical programs.
  - `message`: 10–2000 characters, trimmed, stripped of HTML/script tags.
  - `honeypot`: anti-spam field; if populated, request is rejected with 400.
- **Payload Limits**: Express JSON and URL-encoded parsers constrained to `100kb`.

---

## 5. Security HTTP Headers & Browser Policies
Configured via `helmet` in `server/app.js`:

| Header | Configured Value / Policy | Purpose |
|---|---|---|
| **Content-Security-Policy** | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com data:; img-src 'self' data: images.unsplash.com healix.health; connect-src 'self' healix.health; frame-ancestors 'none'; object-src 'none';` | Mitigates XSS, data injection, and unauthorized embeds |
| **X-Content-Type-Options** | `nosniff` | Prevents MIME-type sniffing |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Protects sensitive URL paths on cross-origin requests |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | Disables unnecessary browser hardware APIs |
| **Strict-Transport-Security (HSTS)**| `max-age=31536000; includeSubDomains` | Enforces HTTPS connections in production |
| **X-Frame-Options** | `DENY` (`frame-ancestors 'none'`) | Eliminates Clickjacking risks |
| **X-Powered-By** | *Disabled* (`app.disable('x-powered-by')`) | Prevents server framework fingerprinting |

---

## 6. Privacy & Data Minimization
- **Healthcare Microcopy**: Added clear microcopy to `ContactForm.jsx` and `ContactPrivacyNotice.jsx`:
  > *"This general contact form is designed for introductory consultations and program inquiries. For your personal privacy and safety, please do not include protected health information (PHI), clinical history, or detailed laboratory reports in this submission."*
- **Legal Alignment**: Refined `LegalPage.jsx` to accurately state data handling controls without unverified formal certifications.

---

## 7. Verification & Automated Test Results
- **Backend Security Suite (`server/test/security.test.js`)**: 8 dedicated tests validating headers, CORS, rate limits, validation rules, honeypot traps, and size limits (12 total server tests pass).
- **Frontend Security Suite (`client/src/test/security.test.jsx`)**: 6 dedicated tests verifying client validation, honeypot rendering, health notices, and API error normalization.
- **Monorepo Test Suite**: All **219 tests across 19 test files** passing with 100% pass rate.
- **Production Build**: Clean production build in **3.62s** with 0 warnings.
