# Healix Healthcare Platform — Technical Debt Register

## Current Technical Debt Items

| ID | Component / Area | Description | Impact | Effort | Priority | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TD-01** | Contact Form Analytics | Diagnostic conversion events utilize local DOM custom events rather than a centralized warehouse sink. | Low | Low | Low (P4) | Connect event dispatching to dedicated telemetry pipeline (e.g. Segment/Snowflake) when high-volume traffic justifies it. |
| **TD-02** | Static Data Model | Services, physicians, and articles are stored in structured JS modules rather than a headless CMS. | Low | Medium | Low (P4) | Connect structured schemas to a headless CMS (e.g. Sanity/Strapi) if non-technical editors require direct web-based publishing. |
| **TD-03** | Server Storage | Express server logs contact inquiries to console and ephemeral process memory. | Low | Medium | Low (P4) | Wire Express validation handler to production webhook/CRM (e.g. Salesforce Health Cloud / HubSpot). |
