import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { ArrowRight } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="py-12 md:py-20 bg-background" aria-labelledby="about-cta-heading">
      <Container>
        <div className="bg-[#075A46] rounded-3xl px-6 py-12 sm:px-12 sm:py-16 md:py-20 text-center text-white shadow-xl relative overflow-hidden border border-[#0E745B]/40">
          {/* Eyebrow */}
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#94D126] mb-3 sm:mb-4">
            Looking Ahead
          </div>

          {/* Heading */}
          <h2
            id="about-cta-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] max-w-3xl mx-auto mb-4 sm:mb-5"
          >
            Connecting Everyday Health to Long-Term Vitality.
          </h2>

          {/* Subtitle */}
          <p className="font-body text-sm sm:text-base md:text-lg text-[#D8E7E0] max-w-2xl mx-auto leading-relaxed mb-8">
            While our platform delivers verified medicines and daily care essentials today, we are actively developing broader diagnostic and proactive wellness solutions for tomorrow.
          </p>

          {/* Lime CTA Button */}
          <div className="flex justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 bg-[#94D126] hover:bg-[#86BE22] text-[#075A46] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#94D126] focus-visible:ring-offset-2"
            >
              <span>Get in Touch with Healix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
