# Healix Healthcare Platform — Operational Maintenance Schedule

## 1. Recurring Maintenance Tasks

### Weekly Operations
- [ ] Inspect synthetic uptime monitors and API health endpoints (`/api/health`).
- [ ] Triage uncaught client-side exceptions in Sentry / logging dashboard.
- [ ] Validate end-to-end contact form submissions and delivery queue.

### Monthly Operations
- [ ] Run `npm audit` across client and server packages and apply non-breaking security patches.
- [ ] Review Google Search Console crawl errors, indexing coverage, and mobile usability logs.
- [ ] Audit SSL/TLS certificate auto-renewal logs to ensure minimum 30 days remaining validity.

### Quarterly Operations
- [ ] Verify clinical faculty bios, board certifications, and program inclusions with Clinical Director.
- [ ] Perform full WCAG 2.1 AA keyboard and screen reader accessibility audit.
- [ ] Review Core Web Vitals RUM metrics (LCP, CLS, INP) against performance budgets.

### Annual Operations
- [ ] Review domain registration renewal and DNS zone configurations.
- [ ] Conduct comprehensive architecture and technical debt review.
- [ ] Archive outdated case studies or resources and update copyright metadata.
