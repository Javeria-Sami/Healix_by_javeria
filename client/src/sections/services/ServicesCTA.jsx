import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ArrowRight, Calendar, PhoneCall, ShieldCheck } from 'lucide-react';

export function ServicesCTA() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
      {/* Subtle Glows */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <PageContainer>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-sm">
              Begin Your Clinical Care Plan
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Ready to Take Control of Your Health with <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-accent-light">
              Physician-Led Precision Diagnostics?
            </span>
          </h2>

          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Speak with an intake coordinator to determine the right diagnostic assessment 
            or request a tailored preventive consultation with our clinical team.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              className="hover:bg-white hover:text-[#075C49] inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#075C49]" />
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#075C49]" />
            </Button>
            <Button
              to="/plans"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <span>Explore Membership Plans</span>
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent-light" />
              <span>HIPAA Compliant & Confidential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-accent-light" />
              <span>Dedicated Clinical Concierge</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
