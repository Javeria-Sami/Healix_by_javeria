# Healix Healthcare — Design System Governance & Token Management

## 1. Core Visual Tokens

### A. Color Palette
- **Primary Clinical Teal (`--healix-primary`)**: `#0D9488` (hsl(175, 84%, 32%)) — Used for primary buttons, active navigation indicators, and key branding accents.
- **Primary Light (`--healix-primary-light`)**: `#CCFBF1` (hsl(168, 86%, 89%)) — Used for subtle badge backgrounds, highlight pills, and ambient glow layers.
- **Secondary Sage (`--healix-secondary`)**: `#E6F4EA` — Used for secondary container surfaces and soft borders.
- **Accent Coral (`--healix-accent`)**: `#F28B82` — Used for micro-accents, status dots, and subtle brand marks.
- **Surface & Background (`--healix-surface`, `--healix-bg`)**: `#F8FAFC` & `#FFFFFF` — Clean, calming healthcare backdrop.
- **Text Hierarchy (`--healix-text-primary`, `--healix-text-secondary`)**: `#0F172A` (900) & `#475569` (600) — High contrast readability ($\ge 4.5:1$).

### B. Typography Hierarchy
- **Brand & Headings**: `Plus Jakarta Sans`, sans-serif (800, 700, 600 weight) — Clean geometric clarity.
- **Editorial Sub-Headings**: `Newsreader`, Georgia, serif (Italic, 400 weight) — Warm, human, clinical distinction.
- **Body & Controls**: `Inter`, system-ui, sans-serif (400, 500 weight) — Maximum legibility across all screen densities.

### C. Elevation & Soft UI Radii
- **Border Radii**: Small (`6px`), Medium (`10px`), Large (`16px`), Pill (`9999px`).
- **Shadows**: Soft subtle shadows (`shadow-soft-sm`, `shadow-soft-md`, `shadow-soft-lg`) with low opacity to prevent harsh visual clutter.

---

## 2. Design Change Impact Policy
Before introducing any new UI element or modifying existing tokens:
1. **Token Verification**: Verify that the new component can be built using existing CSS variables in `variables.css`.
2. **Accessibility Review**: Check color contrast using WCAG AA standards ($4.5:1$ for body text, $3.0:1$ for large text).
3. **Restraint Check**: Avoid excessive floating elements, aggressive drop shadows, or unneeded motion effects.
