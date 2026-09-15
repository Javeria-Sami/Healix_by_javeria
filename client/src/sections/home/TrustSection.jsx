import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight } from 'lucide-react';

export function TrustSection() {
  return (
    <section
      id="mission-purpose"
      aria-label="Our Mission — Why Healix"
      className="py-20 sm:py-24 lg:py-32 bg-[#F7FBF8] border-b border-healix-border/50 transition-colors"
    >
      <Container>
        {/* ============================================================
            FULL-WIDTH CENTERED EDITORIAL MISSION MANIFESTO
            Pure Typography • Generous Whitespace • Human-Centered Clarity
            ============================================================ */}
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Subtle Editorial Label */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F1F8F4] border border-[#DCEBE4] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#98CF2D]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[0.22em] text-[#075B43] uppercase">
              OUR MISSION
            </span>
          </div>

          {/* Primary Centered Heading with Established Serif/Italic Accent */}
          <h2
            id="mission-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#075B43] tracking-tight leading-[1.12]"
          >
            Healthcare,{' '}
            <span className="font-serif italic font-normal text-[#075B43] block sm:inline">
              Made Simpler.
            </span>
          </h2>

          {/* Concise Human Mission Copy (30–45 words) */}
          <p className="font-body text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
            We believe getting the healthcare you need should feel simple, trustworthy, and human. Healix brings genuine medicines, reliable diagnostic services, and expert guidance together so everyday healthcare feels effortless.
          </p>

          {/* Understated Editorial Link to About Page */}
          <div className="pt-2 sm:pt-4">
            <Link
              to={ROUTES.ABOUT}
              aria-label="Discover our story and clinical mission"
              className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-[#075B43] hover:text-[#064C38] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-1"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
