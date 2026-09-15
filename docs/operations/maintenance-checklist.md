# Healix Healthcare Platform — Operational Maintenance Checklist

## Periodic Maintenance Verification Roster

- [ ] **Uptime & Health**: Verified `GET /api/health` returns HTTP 200 and healthy status.
- [ ] **Error Monitoring**: Confirmed zero unhandled 5xx exceptions or persistent client crashes.
- [ ] **Forms Functionality**: Tested live consultation request and newsletter subscription workflows.
- [ ] **Dependencies**: Verified no high or critical vulnerabilities via `npm audit`.
- [ ] **Security Headers**: Verified CSP, HSTS, X-Frame-Options, and CORS configurations.
- [ ] **SEO & Sitemaps**: Confirmed zero 404 crawl errors in Google Search Console.
- [ ] **Accessibility (a11y)**: Spot-checked keyboard focus indicators and contrast compliance.
- [ ] **Performance (CWV)**: Verified LCP $\le 1.8\text{s}$, CLS $\le 0.02$, and INP $\le 100\text{ms}$.
- [ ] **Content Freshness**: Verified physician roster, pricing plans, and clinic hours are up to date.
- [ ] **Domain & SSL**: Confirmed certificate renewal status and DNS record validity.
