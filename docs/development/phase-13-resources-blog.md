# Healix — Phase 13: Resources & Blog Experience

## 1. Objective
Establish an evidence-based, editorial healthcare resource center (`/resources` and `/resources/:slug`) providing actionable clinical guides, biomarker analyses, physician insights, and educational reviews while upholding strict medical content responsibility and WCAG 2.2 AA accessibility standards.

## 2. Scope & Boundaries
- Strictly educational and evidence-guided healthcare resources.
- **NOT** a diagnostic tool, prescription engine, or substitute for personalized medical consultation.
- Clear medical disclaimers integrated on overview and detail pages per healthcare safety protocols.
- No fabricated medical studies, unverified doctor credentials, artificial clinical claims, or fake statistics.

## 3. Public Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/resources` | `ResourcesPage.jsx` | Editorial resource center with Hero, category topic filtering, real-time search, featured clinical review, scannable grid, medical disclaimer, and CTA |
| `/resources/:slug` | `ResourceDetailPage.jsx` | Article reading experience with breadcrumbs, publication metadata, key clinical takeaways callout, structured typography, author bio card, related services, cross-article recommendations, and 404 EmptyState |

## 4. Resource Data Model (`client/src/data/articles.js`)
Each article is structured with the following schema:
- `id` (string): Unique identifier (`art-1`, etc.)
- `slug` (string): SEO-friendly URL slug
- `title` (string): Article title
- `category` (string): One of `Cardiology`, `Metabolic Health`, `Executive Wellness`, `Genomics & Precision`
- `readTime` (string): Estimated reading duration
- `publishedDate` (string): Authentic publication date
- `author` (string): Author name
- `authorSlug` (string): Slug mapping to Healix physician team (`dr-elena-vance`, etc.)
- `authorRole` (string): Physician title and specialty
- `isFeatured` (boolean): Flag for flagship review showcase
- `excerpt` (string): Executive abstract
- `summary` (string): Detailed summary
- `keyTakeaways` (array of strings): Bulleted clinical highlights
- `sections` (array of objects): Structured `{ heading, body }` sub-sections
- `tags` (array of strings): Topic tags
- `image` (string): High-resolution contextual visual asset
- `serviceSlugs` (array of strings): Direct relations to Healix clinical services
- `relatedArticleIds` (array of strings): Cross-article discovery relations

## 5. Modular Section Architecture (`client/src/sections/resources/`)
- `ResourcesHero.jsx`: Semantic `<h1>`, breadcrumbs, category pills, and supporting copy.
- `ResourceCategoryFilter.jsx`: Accessible category tablist (`role="tablist"`, `role="tab"`) with real-time text query search and active filter reset.
- `FeaturedResource.jsx`: Flagship editorial split presentation for featured educational article.
- `ResourcesGrid.jsx`: Reusable card grid with `Card`, `Badge`, reading time, author, title, excerpt, tags, and "Read Article" link; with `EmptyState` when 0 matches.
- `ResourcesDisclaimer.jsx`: Prominent, accessible medical informational disclaimer card stating that articles are for general education and do not replace formal clinical consultation.
- `ResourcesCTA.jsx`: Bottom conversion block linking to `/contact` and `/services`.
- `ResourceDetailHero.jsx`: Breadcrumbs, category badge, single `<h1>`, publication metadata (date, reading time, author link), and featured visual.
- `ResourceContentBody.jsx`: 65-75 ch line length editorial layout, styled typography, key takeaways callout box, structured sub-sections, and medical disclaimer.
- `ResourceConnectedServices.jsx`: Connected Healix clinical services cards linking to `/services/:slug`.
- `ResourceConnectedAuthor.jsx`: Author bio card linking to `/professionals/:slug`.
- `RelatedResources.jsx`: Cross-article discovery grid linking to `/resources/:slug`.
- `ResourceDetailCTA.jsx`: Bottom action card linking to `/contact` and `/resources`.
- `index.js`: Barrel exports.

## 6. Accessibility & Responsiveness
- **Semantic Structure**: Proper heading hierarchy (`h1` -> `h2` -> `h3`), `<nav aria-label="Breadcrumb">`, `<div role="tablist">`, and `<button role="tab">`.
- **Keyboard Navigation**: Fully keyboard navigable with visible focus rings and accessible labels.
- **Empty & Error States**: Interactive search reset and graceful handling of invalid slugs with return navigation.
- **Responsive Viewports**: Tested and verified across 320px, 375px, 768px, 1024px, 1440px, and 1920px+.

## 7. Verification & Test Results
- **Client Tests**: 123 passing tests across 11 suites (`vitest run`).
- **Server Tests**: 3 passing tests (`node --test`).
- **Production Build**: Clean bundle compiled in 3.25s (`vite build`).
- **Zero console errors, zero broken links, zero unverified claims.**
