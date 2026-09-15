# Healix Healthcare Platform — Troubleshooting Matrix

## 1. Common Issues & Resolution Matrix

| Symptom | Probable Cause | Diagnostic Command | Remediation |
| :--- | :--- | :--- | :--- |
| **Direct URL refresh returns 404** (e.g. `/plans`) | Missing SPA rewrite rule in web server / CDN configuration | `curl -I https://healix.health/plans` | Ensure Nginx `try_files $uri $uri/ /index.html;`, `vercel.json` rewrites, or `netlify.toml` redirects are loaded. |
| **CORS Error on API submission** | Frontend domain not whitelisted in server `CORS_ORIGINS` | Check browser console network error & server logs | Add production domain `https://healix.health` to `server/.env` `CORS_ORIGINS`. |
| **Contact Form returns 429 Too Many Requests** | Client exceeded rate limit (100 req/15min) or shared corporate IP | Check `RateLimit-Remaining` response headers | Allow rate limit window to expire, or whitelist verified clinical intranet IPs. |
| **Assets fail to load (404 on JS/CSS)** | Old asset cache reference after new build deployment | Inspect network tab requested hash vs `dist/assets` | Ensure CDN cache is purged upon release or verify proper cache-busting hashing. |
| **API Health check fails (500 or timeout)** | Node process exited or port conflict | `pm2 status` or `docker logs healix-app` | Restart API daemon via `pm2 restart healix-api` and inspect error log. |
