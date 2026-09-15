import React from 'react';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ArrowRight, Phone, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-surface to-background relative overflow-hidden" aria-labelledby="final-cta-heading">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary-light/50 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center">
            <Badge variant="primary" size="md" icon={Sparkles}>
              Begin Your Proactive Health Journey
            </Badge>
          </div>

          <h2 id="final-cta-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#075C49] tracking-tight leading-tight">
            Ready to Take Control of <br />
            <span className="font-editorial italic font-normal text-primary">
              Your Healthspan & Longevity?
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Schedule an initial consultation with our board-certified physicians and discover how personalized diagnostic precision can transform your long-term health.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              to={ROUTES.CONTACT}
              variant="primary"
              size="lg"
              iconTrailing={ArrowRight}
              className="w-full sm:w-auto shadow-soft-md hover:shadow-soft-lg"
            >
              Schedule Initial Consultation
            </Button>

            <Button
              to={ROUTES.PLANS}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Care Memberships
            </Button>
          </div>

          <div className="pt-8 border-t border-border/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Admissions Line: <a href="tel:+18004325491" className="text-primary font-semibold hover:underline">+1 (800) 432-5491</a></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>HIPAA Compliant & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Review within 1 business day</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
