import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { Shield, Target } from 'lucide-react';

export function MissionVision() {
  return (
    <section className="py-14 md:py-20 bg-background" aria-labelledby="mission-vision-heading">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-stretch">
          {/* 1. Left Card: Our Mission (Subtle Pale Healix-Tinted Background) */}
          <div className="p-7 sm:p-9 bg-[#F3F8F5] border border-[#075B43]/15 rounded-2xl space-y-4 shadow-soft-xs flex flex-col justify-between transition-colors">
            <div className="space-y-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#075B43]/10 text-[#075B43] flex items-center justify-center">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#075B43]">
                Our Purpose
              </div>
              <h2 id="mission-heading" className="font-heading font-extrabold text-2xl sm:text-3xl text-[#075B43] tracking-tight">
                Our Mission
              </h2>
              <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
                Empowering people with trusted medical insight and compassionate guidance to make better health decisions.
              </p>
            </div>
          </div>

          {/* 2. Right Card: Our Vision (Clean White Background) */}
          <div className="p-7 sm:p-9 bg-white border border-border/80 rounded-2xl space-y-4 shadow-soft-xs flex flex-col justify-between transition-colors">
            <div className="space-y-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#075B43]/10 text-[#075B43] flex items-center justify-center">
                <Target className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#075B43]">
                Our Future
              </div>
              <h2 id="vision-heading" className="font-heading font-extrabold text-2xl sm:text-3xl text-[#075B43] tracking-tight">
                Our Vision
              </h2>
              <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
                Building a future where proactive, accessible healthcare helps people live healthier for longer.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
