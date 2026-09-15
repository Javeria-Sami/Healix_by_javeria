import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight, Calendar, ShieldCheck, PhoneCall } from 'lucide-react';

export function ProfessionalsCTA() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
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
              Connect with Clinical Leadership
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Consult with Our Board-Certified <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-accent-light">
              Physicians & Specialists
            </span>
          </h2>

          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are seeking preventative longevity planning, targeted cardiology diagnostics, 
            or metabolic health optimization, our clinical team is here to guide your care.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              to={ROUTES.CONTACT}
              variant="primary"
              size="lg"
              className="hover:bg-white hover:text-[#075C49] inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#075C49]" />
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#075C49]" />
            </Button>
            <Button
              to={ROUTES.SERVICES}
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <span>Explore Specializations</span>
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent-light" />
              <span>Strict Patient Confidentiality</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-accent-light" />
              <span>Concierge Intake Support</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
