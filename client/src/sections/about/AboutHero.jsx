import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, Stethoscope } from 'lucide-react';

export function AboutHero() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'About Healix' },
  ];

  return (
    <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-[#F4F8F5] border-b border-[#DCE8E3]/60 relative overflow-hidden text-center" aria-labelledby="about-hero-heading">
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex justify-center">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center text-center">
          {/* Category Eyebrow */}
          <div className="inline-flex items-center justify-center">
            <Badge variant="primary" size="md" icon={Sparkles}>
              The Healix Story & Clinical Philosophy
            </Badge>
          </div>

          {/* Primary Page Heading (H1) */}
          <h1 id="about-hero-heading" className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075C49] tracking-tight leading-[1.12] text-center">
            Dedicated to Proactive & <br />
            <span className="font-editorial italic font-normal text-[#8FD21F]">
              Human-Centered Medicine
            </span>
          </h1>

          {/* Supporting Narrative */}
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl text-center mx-auto">
            Healix was established on the conviction that modern healthcare must evolve from reactive disease management to proactive longevity protection. We combine diagnostic accuracy with dedicated physician stewardship.
          </p>

          {/* Action Group */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              to={ROUTES.SERVICES}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#075C49] hover:bg-[#054839] text-[#8FD21F] text-sm sm:text-base font-extrabold shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FD21F]"
            >
              <span>Explore Clinical Programs</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1 text-[#8FD21F]" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
