# Healix Healthcare Platform — Production Operations Guide

## 1. Observability & Monitoring Stack

### A. Uptime & Synthetic Monitoring
- **Providers**: Better Uptime / Datadog Synthetics / Pingdom.
- **Monitored Endpoints**:
  - `GET https://healix.health/` (Expect HTTP 200 within 400ms)
  - `GET https://healix.health/api/health` (Expect HTTP 200, JSON `{ "status": "healthy" }` within 150ms)
  - `POST https://healix.health/api/contact` (Synthetic test payload to verify anti-spam & rate limiter)
- **Check Frequency**: Every 60 seconds from global edge probes (North America, Europe, Asia).

### B. Application Performance Monitoring (APM)
- **Real User Monitoring (RUM)**: Web Vitals tracking (`LCP < 2.5s`, `FID/INP < 200ms`, `CLS < 0.1`).
- **Server Metrics**: CPU utilization (< 60%), memory usage (< 512MB per instance), event loop latency (< 20ms).

### C. Error Tracking & Crash Reporting
- **Platform**: Sentry / Rollbar.
- **Client-Side**: Unhandled promise rejections, React ErrorBoundary catches, network offline states.
- **Server-Side**: Express unhandled errors, 5xx server exceptions, validation anomalies.

### D. Structured Logging
- **Format**: JSON structured logging (timestamp, level, requestId, ipHash, method, url, statusCode, responseTimeMs).
- **Log Masking**: Automated scrubbing of PII/PHI in accordance with HIPAA standards.

---

## 2. Health Check Specifications

```http
GET /api/health HTTP/1.1
Host: healix.health
```

**Response (200 OK)**:
```json
{
  "status": "healthy",
  "timestamp": "2026-09-11T00:00:00.000Z",
  "uptime": 142850,
  "environment": "production",
  "version": "1.0.0",
  "services": {
    "api": "up",
    "cache": "up"
  }
}
```
