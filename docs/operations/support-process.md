# Healix Healthcare Platform — Technical Support & Change Request Process

## 1. Support Request Lifecycle

```mermaid
graph TD
    A[Issue / Change Request Submitted] --> B[Initial Triage & Priority Assignment]
    B --> C{Priority Level}
    C -->|SEV-1 / SEV-2| D[Emergency Response & On-Call Fix]
    C -->|SEV-3 / SEV-4| E[Backlog Scheduling & Sprint Delivery]
    D --> F[Staging QA & Regression Testing]
    E --> F
    F --> G[Production Deployment]
    G --> H[Client Notification & Verification Sign-Off]
```

---

## 2. Request Classification & SLA

- **Bug / Defect**: Unintended deviation from documented requirements. (SLA: Critical < 2h, Major < 8h, Minor Next Sprint).
- **Content Update**: Text, pricing, or clinician changes. (SLA: 2–3 business days).
- **Design Enhancement**: Layout, color, or component additions. (SLA: Scoped via sprint backlog).
- **Security / Compliance Patch**: Vulnerability remediation. (SLA: Critical < 24h).
