# Healix Healthcare — SEO Maintenance & Change Control Guide

## 1. Structured Data Schema Governance

All structured data is managed centrally in `client/src/utils/structuredData.js`. The following schemas are implemented:
- **`MedicalBusiness` / `MedicalOrganization`**: Embedded on homepage with clinic hours, physical coordinates, and medical specializations.
- **`Physician`**: Embedded on physician directory and individual profile pages.
- **`MedicalProcedure` / `MedicalWebPage`**: Embedded on clinical service detail routes.
- **`BreadcrumbList`**: Embedded on all secondary pages for enhanced SERP rich snippet navigation.
- **`Article` / `BlogPosting`**: Embedded on medical resource detail routes.

---

## 2. Search Engine Asset Maintenance

### A. Sitemap (`/public/sitemap.xml`)
- Update when new services, case studies, or permanent clinical routes are published.
- Maintain absolute production URLs (`https://healix.health/...`) with `lastmod` and `changefreq` tags.

### B. Robots Configuration (`/public/robots.txt`)
- Allows indexation of all public routes while referencing the primary sitemap endpoint.
- Verifies that error routes (e.g. 404) utilize `noindex, nofollow` robot meta tags dynamically.

---

## 3. SEO Change Control Protocol
Before modifying page titles, meta descriptions, or canonical URLs:
1. Verify no canonical loops or relative URL errors are introduced.
2. Confirm OpenGraph tags (`og:title`, `og:description`, `og:image`) match primary meta tags.
3. Validate rich results using Google Rich Results Testing tool before committing changes.
