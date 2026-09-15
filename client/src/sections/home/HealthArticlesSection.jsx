import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight } from 'lucide-react';

export const HEALTH_ARTICLES = [
  {
    id: 'art-daily-habits',
    slug: 'daily-habits-for-sustainable-energy-and-health',
    category: 'WELLNESS',
    title: 'Simple Habits for Better Health',
    imageUrl: '/images/articles/article-daily-habits.jpg',
    imageAlt: 'Man doing a calm morning stretching workout on a mat in a bright, sunlit room',
  },
  {
    id: 'art-preventive-checkups',
    slug: 'why-routine-health-checkups-matter',
    category: 'PREVENTION',
    title: 'Why Regular Checkups Matter',
    imageUrl: '/images/articles/article-preventive-checkups.jpg',
    imageAlt: 'Doctor discussing proactive health insights with a patient in a calm modern clinic',
  },
  {
    id: 'art-understanding-medicines',
    slug: 'understanding-medicines-responsible-use-guide',
    category: 'MEDICINES',
    title: 'Understanding Your Medicines',
    imageUrl: '/images/articles/article-understanding-medicines.jpg',
    imageAlt: 'Amber glass medicine bottles filled with prescription capsules and tablets',
  },
];

export function HealthArticlesSection() {
  return (
    <section
      id="health-articles"
      aria-labelledby="health-articles-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#FCFBF7] border-b border-healix-border/50 transition-colors"
    >
      <Container>
        {/* ============================================================
            SECTION HEADER: Minimal Eyebrow, Heading, and Short One-Line Copy
            ============================================================ */}
        <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EAF4EF] border border-[#D8E7E0] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94D126]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#075A46] uppercase">
              HEALTH &amp; WELLNESS
            </span>
          </div>

          <h2
            id="health-articles-heading"
            className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-neutral-900 tracking-tight leading-tight"
          >
            Helpful Reads for Better Health
          </h2>

          <p className="font-body text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Simple, reliable information for everyday health.
          </p>
        </header>

        {/* ============================================================
            ARTICLE CARDS: Minimal-Text HCI-Focused Editorial Cards
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch max-w-6xl mx-auto">
          {HEALTH_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#D8E7E0] hover:border-[#B7D9CA] shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 overflow-hidden"
            >
              {/* 1. Large Dominant Editorial Photography (65–70% of card) */}
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-100">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* 2. Compact Minimal Meta & Title */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-1.5 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#0E745B] tracking-widest uppercase">
                  {article.category}
                </span>

                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#075A46] transition-colors leading-snug">
                    <Link
                      to={`/resources/${article.slug}`}
                      className="focus:outline-none focus-visible:underline after:absolute after:inset-0"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <ArrowRight
                    className="w-4 h-4 text-neutral-400 group-hover:text-[#075A46] transition-all duration-200 group-hover:translate-x-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ============================================================
            SECTION ACTION: Understated "View All Articles" CTA
            ============================================================ */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to={ROUTES.RESOURCES}
            className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#075A46] hover:text-[#054837] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-1"
          >
            <span>View All Articles</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
