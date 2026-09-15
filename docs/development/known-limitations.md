# Healix Healthcare Platform — Known Limitations & System Boundaries

## Documented Architectural Boundaries

1. **Static Catalog vs Database CMS**:
   - The platform delivers blazing sub-1.8s page loads by compiling structured data models into optimized client-side JS chunks. Dynamic editorial changes require Git commits and automated redeployments rather than real-time database edits.

2. **Decoupled API vs Monolithic SSR**:
   - The client is a React 18 Single Page Application with dynamic client-side route rewrites. Direct URL deep links require proper web server SPA fallback routing (`try_files $uri $uri/ /index.html;`).

3. **Intake Form Scope & Privacy Constraints**:
   - The contact form is strictly optimized for consultation scheduling and admissions inquiries. It explicitly does NOT support the ingestion of acute electronic health records (EHR) or confidential PHI.
