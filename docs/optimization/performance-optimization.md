# Healix Healthcare — Performance Optimization & Budget Guide

## 1. Core Web Vitals Targets & Current Metrics

| Metric | Google Standard | Healix Target | Production Measurement | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | $\le 2.5\text{s}$ | $\le 1.8\text{s}$ | **~1.2s** | **EXCELLENT** |
| **Cumulative Layout Shift (CLS)** | $\le 0.10$ | $\le 0.02$ | **0.00** | **EXCELLENT** |
| **Interaction to Next Paint (INP)** | $\le 200\text{ms}$ | $\le 100\text{ms}$ | **~45ms** | **EXCELLENT** |
| **First Contentful Paint (FCP)** | $\le 1.8\text{s}$ | $\le 1.0\text{s}$ | **~0.8s** | **EXCELLENT** |
| **Time to First Byte (TTFB)** | $\le 800\text{ms}$ | $\le 250\text{ms}$ | **~120ms** | **EXCELLENT** |

---

## 2. Platform Performance Budgets

To ensure long-term speed and prevent code bloat, all future pull requests must adhere to the following budgets:

- **Initial HTML Document**: $\le 20\text{ kB}$ (compressed)
- **Primary CSS Bundle**: $\le 50\text{ kB}$ (gzip)
- **Vendor React Bundle**: $\le 180\text{ kB}$ (gzip)
- **Individual Lazy Route Chunk**: $\le 30\text{ kB}$ (gzip)
- **Total Initial JS Load**: $\le 220\text{ kB}$ (gzip)
- **Hero Image Size**: $\le 80\text{ kB}$ (WebP/AVIF format)
- **Font Assets (Self-Hosted/CDN)**: $\le 60\text{ kB}$ total

---

## 3. Continuous Optimization Practices
1. **Dynamic Route Chunking**: Keep all pages lazily imported via `React.lazy()` with lightweight Suspense loaders.
2. **Immutable Caching**: Maintain `max-age=31536000, immutable` headers on versioned static assets in `/assets/`.
3. **Modern Image Pipeline**: Enforce WebP image formats with descriptive intrinsic dimensions (`width`/`height`) to preserve layout stability.
