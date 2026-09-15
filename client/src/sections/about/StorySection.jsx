import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ShieldAlert, Sparkles, CheckCircle2, HeartPulse } from 'lucide-react';

export function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="story-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="primary" size="md" icon={Sparkles}>
              The Founding Problem
            </Badge>

            <h2 id="story-heading" className="font-heading text-3xl sm:text-4xl font-extrabold text-[#075C49] leading-tight">
              Why We Built Healix: <br />
              <span className="font-editorial italic font-normal text-primary">
                Closing the Preventative Healthcare Gap
              </span>
            </h2>

            <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              Traditional healthcare often responds after problems appear. Healix was built to make prevention more proactive—combining earlier insight, thoughtful care, and physician guidance.
            </p>
          </div>

          {/* Right Column: Dark Healix Clinical Paradigm Shift Panel (~45% width) */}
          <div className="lg:col-span-5">
            <div className="bg-[#075C49] rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 text-left border border-[#0C6F58]/40 text-white">
              <div className="border-b border-white/15 pb-3.5">
                <h3 className="font-heading font-bold text-base tracking-wide text-white">
                  The Clinical Paradigm Shift
                </h3>
              </div>

              <div className="space-y-3">
                {/* Reactive Healthcare Block */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/10 space-y-1.5 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/90">
                    <ShieldAlert className="w-4 h-4 text-[#FCA5A5] flex-shrink-0" aria-hidden="true" />
                    <span className="tracking-wide">Reactive Healthcare</span>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Care begins when symptoms become noticeable.
                  </p>
                </div>

                {/* Healix Preventative Standard Block */}
                <div className="p-4 rounded-xl bg-white/10 border border-[#8FD21F]/30 space-y-1.5 transition-colors shadow-soft-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8FD21F]">
                    <CheckCircle2 className="w-4 h-4 text-[#8FD21F] flex-shrink-0" aria-hidden="true" />
                    <span className="tracking-wide">Healix Preventative Standard</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-normal">
                    Earlier insight enables more proactive care.
                  </p>
                </div>
              </div>

              {/* Bottom Concluding Statement */}
              <div className="pt-3.5 flex items-center justify-between text-xs text-white/70 border-t border-white/15">
                <span className="flex items-center gap-1.5 text-white/85">
                  <HeartPulse className="w-4 h-4 text-[#8FD21F]" aria-hidden="true" />
                  Prevention Focused
                </span>
                <span className="font-semibold text-[#8FD21F] tracking-wide">
                  Physician Guided
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
