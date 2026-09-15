# Healix Healthcare Platform — Production Launch Checklist

## Phase Gate Status
- **Target Release**: Version 1.0.0 (Production General Availability)
- **Deployment Sign-off**: Engineering Lead & Clinical Compliance Officer

---

## 1. Pre-Deployment Verification
- [x] **Test Suites**: 100% test pass rate across all 20 test files (244 total tests).
- [x] **Build Verification**: Zero build warnings, asset compression (Gzip/Brotli) enabled.
- [x] **Environment Variables**: Production `.env` configured with proper `CORS_ORIGINS`, `PORT`, and secret keys.
- [x] **Security Headers**: HSTS, CSP, X-Content-Type-Options, X-Frame-Options configured across all static hosts and API server.
- [x] **Static Assets**: Favicon (`favicon.svg`), `robots.txt`, and `sitemap.xml` verified in `/public`.
- [x] **SEO Schema**: JSON-LD Breadcrumbs, MedicalBusiness, and Physician schema verified on all routes.
- [x] **Accessibility (WCAG 2.1 AA)**: All landmark roles, skip links, contrast ratios (>= 4.5:1), and keyboard navigation validated.

---

## 2. Deployment Execution
- [ ] **DNS Cutover**: Update apex A record and www CNAME record to target production edge.
- [ ] **SSL/TLS Provisioning**: Verify Let's Encrypt / Cloudflare SSL certificate is active with A+ SSL Labs rating.
- [ ] **API Service Startup**: Deploy Node.js server to container runtime or PM2 process manager.
- [ ] **Frontend CDN Invalidation**: Purge edge cache to ensure latest bundle distribution.

---

## 3. Post-Deployment Smoke Verification
- [ ] **Route Availability**: Verify `/`, `/about`, `/services`, `/professionals`, `/plans`, `/portfolio`, `/resources`, `/faq`, `/contact` return HTTP 200.
- [ ] **Deep Linking & Refresh**: Test browser reload on `/services/preventive-health-screenings` to ensure SPA rewrite succeeds without 404.
- [ ] **Contact Form End-to-End**: Submit live test inquiry through `/contact` and verify delivery in notification queue.
- [ ] **Newsletter Subscription**: Submit test email and verify confirmation state.
- [ ] **API Health Endpoint**: Query `https://healix.health/api/health` and verify `status: "healthy"`.
- [ ] **Telemetry & Logging**: Verify Sentry error monitoring and Logtail/Datadog streams are receiving events.
