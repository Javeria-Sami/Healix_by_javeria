# Healix Healthcare Platform — Production Deployment Guide

## 1. Overview
The Healix Healthcare digital platform is architected as a decoupled, high-performance web system consisting of:
1. **Frontend Client**: Vite + React 18 Single Page Application (`/client`)
2. **Backend API Server**: Node.js + Express REST API with security hardening and rate limiting (`/server`)

---

## 2. Multi-Target Deployment Options

### Option A: Vercel (Recommended for Cloud Serverless Frontend)
1. **Connect Repository**: Import the Healix repository into Vercel.
2. **Framework Preset**: Select `Vite`.
3. **Root Directory**: Set Root Directory to `client` (or use workspace configuration).
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Configuration**: The included `client/vercel.json` automatically configures:
   - Client-side routing rewrites (`"source": "/(.*)", "destination": "/index.html"`)
   - Strict security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`)
   - Immutable browser caching for static assets in `/assets/` (`Cache-Control: public, max-age=31536000, immutable`)

### Option B: Netlify (Static & Jamstack Hosting)
1. **Connect Repository**: Link Git repository in Netlify.
2. **Base Directory**: `client`
3. **Build Command**: `npm run build`
4. **Publish Directory**: `client/dist`
5. **Configuration**: The included `client/netlify.toml` automatically handles:
   - 200 rewrite rule for SPA routing (`/* -> /index.html 200`)
   - Asset cache headers (`max-age=31536000`)
   - HTML freshness headers (`must-revalidate, max-age=0`)
   - Comprehensive security headers across all routes

### Option C: Docker Container (Self-Hosted / AWS ECS / GCP Cloud Run / K8s)
Healix provides a production-hardened multi-stage `Dockerfile`:
```bash
# Build the production container image
docker build -t healix-platform:latest .

# Run container locally or on host on port 80/443
docker run -d -p 80:80 -p 3001:3001 --name healix-app healix-platform:latest
```

### Option D: Traditional VPS / Nginx Reverse Proxy (Ubuntu / Debian / RHEL)
1. **Build Assets**:
   ```bash
   cd healix
   npm run build
   ```
2. **Deploy Client Bundle**: Copy `healix/client/dist/*` to `/var/www/healix/html/`.
3. **Configure Nginx**: Copy `healix/nginx.conf` to `/etc/nginx/sites-available/healix.conf` and symlink to `/etc/nginx/sites-enabled/`.
4. **Start API Daemon via PM2**:
   ```bash
   cd healix/server
   npm install --omit=dev
   pm2 start src/index.js --name healix-api -i max
   pm2 save
   pm2 startup
   ```

---

## 3. Custom Domain & DNS Configuration

| Record Type | Host / Name | Target / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (root) | `76.76.21.21` (or VPS IP) | 3600 | Primary apex domain routing |
| **CNAME** | `www` | `cname.vercel-dns.com` (or `@`) | 3600 | Canonical www-to-apex redirect |
| **CNAME** | `api` | `api.healix.health` (or ALB endpoint) | 3600 | Dedicated API subdomain |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | 3600 | Email authentication & anti-spoofing |
| **TXT** | `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc@healix.health` | 3600 | DMARC policy enforcement |

---

## 4. HTTPS & SSL/TLS Configuration
- **Modern TLS**: Force TLS 1.2 and TLS 1.3 only. Deprecate TLS 1.0/1.1.
- **HSTS Enforcement**: Enable `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- **Let's Encrypt Automated Renewal (Certbot)**:
  ```bash
  sudo certbot --nginx -d healix.health -d www.healix.health
  ```
- **Automated Certificate Validation**: Verified via dry-run: `sudo certbot renew --dry-run`.
