# Healix Healthcare Platform — Incident Management Protocol

## 1. Severity Classification Matrix

| Severity Level | Definition | MTTD Target | MTTR Target | Escalation Scope |
| :--- | :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Entire website unavailable, severe security breach, or SSL expiry causing complete traffic drop. | < 5 mins | < 30 mins | Executive Leadership, Lead Engineer, Support Ops |
| **SEV-2 (High)** | Contact form failure, primary intake pathway broken, or API rate limiting errors blocking legitimate users. | < 15 mins | < 2 hours | Lead Engineer, Clinic Intake Lead |
| **SEV-3 (Medium)** | Non-blocking visual glitch, localized device rendering defect, or single asset loading failure. | < 1 hour | < 8 hours | Engineering Team |
| **SEV-4 (Low)** | Minor typo, documentation update, or minor non-functional styling adjustment. | < 1 day | Next Sprint | Engineering Team |

---

## 2. Emergency Rollback Procedures

### Vercel / Netlify Instant Rollback
1. Access the hosting project dashboard.
2. Select the **Deployments** tab.
3. Locate the last known good deployment SHA.
4. Click **Promote to Production** / **Rollback**.

### Docker / VPS Rollback
```bash
# Pull and run the previous stable container tag
docker stop healix-app
docker run -d -p 80:80 -p 3001:3001 --name healix-app healix-platform:v1.0.0-stable

# Or revert Git commit and rebuild
git revert HEAD --no-edit
npm run build
pm2 restart healix-api
```
