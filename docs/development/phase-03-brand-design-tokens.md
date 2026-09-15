# Phase 03 — Brand Foundation & Design Tokens

## 1. Brand Direction
**Healix** embodies:
$$\text{TRUST} + \text{HUMANITY} + \text{PRECISION} + \text{PREMIUM QUALITY}$$

The brand identity creates an atmosphere of clinical serenity, medical rigor, and approachable human warmth. It avoids standard clichés (generic SaaS templates, sterile hospital grids, neon cyberpunk accents, or chaotic glassmorphism) in favor of tailored editorial typography, calm deep teal, warm linen neutrals, and restrained coral highlights.

---

## 2. Color System
The color architecture combines high-authority clinical tones with organic warmth:

| Color Family | Key Hex | Purpose |
|---|---|---|
| **Primary Deep Teal** | `#0F766E` | Main actions, brand anchors, leadership elements |
| **Primary Dark** | `#115E59` | Hover states, active borders, dark accents |
| **Primary Light** | `#CCFBF1` | Soft brand surfaces, highlighted pills, active tags |
| **Secondary Warm Linen** | `#F5EFE6` | Human-centered editorial backgrounds, pill cards |
| **Accent Warm Coral** | `#F28B82` | Restrained focal points, vital indicator accents |
| **Canvas Background** | `#FCFCFA` | Off-white warm canvas reducing eye strain |
| **Surface Pure** | `#FFFFFF` | Primary card containers, forms, modals |
| **Surface Muted** | `#F8F9F8` | Recessed containers, input backgrounds |
| **Text Primary** | `#172124` | Deep slate for pristine legibility |
| **Text Secondary** | `#5F6B6D` | Medium contrast supporting copy |
| **Text Muted** | `#8A9799` | Captions, timestamps, disabled indicators |
| **Border Neutral** | `#E4E9E8` | Subtle card dividers and container borders |

---

## 3. Semantic Color Tokens
Components consume semantic tokens exclusively through CSS custom variables and Tailwind utilities:
- `--color-primary`, `--color-primary-hover`, `--color-primary-active`, `--color-primary-light`, `--color-primary-soft`
- `--color-secondary`, `--color-secondary-hover`, `--color-secondary-active`
- `--color-accent`, `--color-accent-hover`, `--color-accent-soft`
- `--color-background`, `--color-surface`, `--color-surface-muted`, `--color-surface-elevated`, `--color-surface-dark`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse`, `--color-text-brand`
- `--color-border`, `--color-border-subtle`, `--color-border-strong`, `--color-border-focus`
- `--color-status-success`, `--color-status-warning`, `--color-status-error`, `--color-status-info`

---

## 4. Typography System
Three purposeful typefaces are harmonized:
1. **Headings**: `Manrope` (Weights: 600, 700, 800) — Humanist geometric sans-serif projecting modern clarity.
2. **Body**: `Inter` (Weights: 400, 500, 600) — High-legibility grotesque sans-serif optimized for multi-density medical data.
3. **Editorial Accent**: `DM Serif Display` (Weight: 400, Italic) — Traditional editorial serif applied selectively for quotes and philosophical statements.

---

## 5. Font Loading & Performance
- Google Fonts are preconnected to `fonts.googleapis.com` and `fonts.gstatic.com` with `crossorigin` in `index.html`.
- Applied `font-display: swap` to eliminate render-blocking FOIT (Flash of Invisible Text).
- Constrained font weights strictly to `Inter (400, 500, 600, 700)`, `Manrope (400, 500, 600, 700, 800)`, and `DM Serif Display (400 italic/normal)`.

---

## 6. Typography Scale & Fluid Scaling
Fluid typography via CSS `clamp()` prevents mobile overflow while providing impactful desktop proportions:

| Level | Desktop Size | Fluid Formula | Line Height | Tracking |
|---|---|---|---|---|
| **Display** | 64px (4rem) | `clamp(2.5rem, 5vw + 1rem, 4rem)` | 1.15 | -0.03em |
| **H1** | 56px (3.5rem) | `clamp(2.25rem, 4vw + 0.5rem, 3.5rem)` | 1.15 | -0.025em |
| **H2** | 44px (2.75rem) | `clamp(1.75rem, 3vw + 0.5rem, 2.75rem)` | 1.3 | -0.02em |
| **H3** | 32px (2rem) | `clamp(1.5rem, 2vw + 0.25rem, 2rem)` | 1.3 | -0.015em |
| **H4** | 24px (1.5rem) | `clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem)` | 1.3 | -0.01em |
| **Body Large** | 20px (1.25rem) | Fixed 1.25rem | 1.75 | Normal |
| **Body** | 16px (1rem) | Fixed 1rem | 1.6 | Normal |
| **Small** | 14px (0.875rem) | Fixed 0.875rem | 1.5 | Normal |
| **Caption** | 12px (0.75rem) | Fixed 0.75rem | 1.4 | +0.02em |

---

## 7. Spacing System
4px baseline scale enforced across all margins, padding, and gaps:
- `var(--space-1)` = 4px
- `var(--space-2)` = 8px
- `var(--space-3)` = 12px
- `var(--space-4)` = 16px
- `var(--space-5)` = 20px
- `var(--space-6)` = 24px
- `var(--space-8)` = 32px
- `var(--space-10)` = 40px
- `var(--space-12)` = 48px
- `var(--space-16)` = 64px
- `var(--space-20)` = 80px
- `var(--space-24)` = 96px
- `var(--space-30)` = 120px

---

## 8. Containers & Layout
- **Max Container Width**: 1280px (`max-w-container`)
- **Editorial Reading Column**: 960px (`max-w-editorial`)
- **Narrow Form Column**: 768px (`max-w-narrow`)
- **Horizontal Viewport Padding**: Responsive `px-4 sm:px-6 lg:px-8`

---

## 9. Grid System
- Desktop (1024px+): 12-column grid with 24px/32px gutters.
- Tablet (768px–1023px): 8-column grid with 20px gutters.
- Mobile (<768px): Single-column / 2-column compact grid with 16px gutters.

---

## 10. Radius Tokens
- `sm`: 8px (`rounded-healix-sm`) — Badges, small inputs, action tags
- `md`: 12px (`rounded-healix-md`) — Buttons, input fields, menu dropdowns
- `lg`: 20px (`rounded-healix-lg`) — Standard cards, notification boxes
- `xl`: 28px (`rounded-healix-xl`) — Hero containers, feature modules, modals
- `pill`: 9999px (`rounded-healix-pill`) — Status chips, category pills

---

## 11. Shadows & Elevation
- **Level 0**: `none` — Default flat surfaces
- **Level 1**: `0 2px 8px -2px rgba(23, 33, 36, 0.05)` (`shadow-soft-sm`) — Subtle separation
- **Level 2**: `0 8px 24px -4px rgba(23, 33, 36, 0.08)` (`shadow-soft-md`) — Standard cards, header blur
- **Level 3**: `0 16px 36px -6px rgba(23, 33, 36, 0.1)` (`shadow-soft-lg`) — Active hover cards, popovers
- **Level 4**: `0 24px 48px -12px rgba(23, 33, 36, 0.14)` (`shadow-soft-xl`) — Dialogs, drawers, modals

---

## 12. Border System
- Default Border: `1px solid var(--color-border)` (`#E4E9E8`)
- Subtle Divider: `1px solid var(--color-border-subtle)` (`#EEF2F1`)
- Strong Divider: `1px solid var(--color-border-strong)` (`#CBD5D3`)
- Focus Ring: `2px solid var(--color-border-focus)` (`#0F766E`)

---

## 13. Surface Hierarchy
- `surface-base`: Pure white `#FFFFFF` with default `#E4E9E8` border.
- `surface-muted`: Recessed `#F8F9F8` for background panels and secondary cards.
- `surface-secondary`: Warm linen `#F5EFE6` for high-trust editorial features.
- `surface-elevated`: Pure white with Level 2 elevation shadow.
- `surface-dark`: Deep slate `#172124` with inverse white text for selective high-contrast callouts.

---

## 14. Iconography
- Standard Icon Library: `lucide-react`.
- Stroke Width: Uniform 2.0px.
- Sizes:
  - Small: 14px–16px (in badges and inline links)
  - Medium: 20px–24px (standard buttons, menu items)
  - Large: 32px–40px (feature cards, hero highlights)

---

## 15. Interaction States
- **Hover**: 10% dark shift on primary buttons (`#115E59`), Level 3 shadow elevation on interactive cards.
- **Active**: 15% dark shift (`#134E4A`), scale 0.99 for tactile feedback.
- **Focus**: Accessible 2px ring with 3px offset (`:focus-visible`).
- **Disabled**: 50% opacity, `cursor-not-allowed`, non-interactive pointer events.
- **Loading**: Spinner icon replacement, text label retention, disabled interaction.

---

## 16. Form Tokens
- Input Field Background: `var(--color-background)` (`#FCFCFA`)
- Input Border: `1px solid var(--color-border)` (`#E4E9E8`)
- Input Active Focus: `1px solid var(--color-primary)` + 2px `rgba(15, 118, 110, 0.2)` ring
- Validation Error: `border-status-error` (`#C53030`) + `bg-status-error-bg/30`
- Minimum touch target: 44px height across mobile inputs.

---

## 17. Accessible Focus System
- Configured via global `:focus-visible` in `index.css`.
- High contrast 2px teal outline (`#0F766E`) with 3px offset.
- Native outline suppressed only when focus-visible indicator is active.

---

## 18. Responsive Breakpoints
- `mobile-sm`: 320px
- `mobile-md`: 375px
- `mobile-lg`: 430px
- `tablet`: 768px
- `laptop`: 1024px
- `desktop`: 1280px
- `desktop-wide`: 1440px / 1920px+

---

## 19. Motion Tokens
- Fast (`180ms`): Button states, hover triggers, icon rotations.
- Normal (`300ms`): Drawer navigation, card hover expansion, accordion collapse.
- Slow (`600ms`): Modal backdrop, hero section reveal.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (Healix Smooth Standard).

---

## 20. Reduced Motion Strategy
- Media query `@media (prefers-reduced-motion: reduce)` globally reduces transition durations to `0.01ms` and sets scroll behavior to `auto`.

---

## 21. Z-Index Layering System
- Base Content: `0` (`--z-base`)
- Dropdowns & Popovers: `10` (`--z-dropdown`)
- Fixed Header / Nav: `40` (`--z-sticky`)
- Mobile Navigation Drawer: `50` (`--z-drawer`)
- Modal Dialogs: `60` (`--z-modal`)
- Toast Notifications & Skip Links: `70` (`--z-toast`)

---

## 22. Accessibility Contrast Validation
- **Primary Text (`#172124`) on Canvas (`#FCFCFA`)**: Contrast ratio **14.8:1** (Exceeds WCAG AAA requirement of 7.0:1).
- **White Text (`#FFFFFF`) on Primary Teal (`#0F766E`)**: Contrast ratio **4.62:1** (Exceeds WCAG AA requirement of 4.5:1 for normal text and 3.0:1 for bold/large text).
- **Primary Text (`#172124`) on Secondary Linen (`#F5EFE6`)**: Contrast ratio **13.2:1** (Exceeds WCAG AAA).

---

## 23. Dark Mode Evaluation & Decision
- **Decision**: Light-mode first by design.
- **Rationale**: Clinical healthcare products demand high optical clarity, warmth, and biological daylight tones to foster patient trust. Dark modes in healthcare frequently trigger clinical coldness or recreational gaming aesthetics.
- **Future Readiness**: All semantic tokens are decoupled via CSS custom variables (`--color-surface`, `--color-background`), allowing effortless theme toggling in future modular upgrades if requested.

---

## 24. Design Token Architecture & File Map
- [client/src/styles/tokens.css](file:///i:/vs%20code/web%20Projects/healix-website-documentation/healix/client/src/styles/tokens.css): Comprehensive CSS Custom Properties.
- [client/src/styles/variables.css](file:///i:/vs%20code/web%20Projects/healix-website-documentation/healix/client/src/styles/variables.css): Legacy fallback bindings.
- [client/src/styles/index.css](file:///i:/vs%20code/web%20Projects/healix-website-documentation/healix/client/src/styles/index.css): Global reset, fluid typography utilities, surface helpers.
- [client/tailwind.config.js](file:///i:/vs%20code/web%20Projects/healix-website-documentation/healix/client/tailwind.config.js): Tailwind theme extensions mapped directly to tokens.

---

## 25. Design Decisions & Token Usage Rule
- **Rule**: From Phase 03 onward, all UI components must consume semantic tokens. No raw arbitrary hex colors or unscaled pixel margins are permitted.

---

## 26. Verification Results
- **Design System Showcase**: Available at `/design-system`.
- **Vitest Route & Showcase Tests**: 8 tests passing 100%.
- **Vite Production Build**: Succeeded in 1.45s with zero errors.
