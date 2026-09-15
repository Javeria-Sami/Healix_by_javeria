import React from 'react';
import { TESTIMONIALS } from '../../data/testimonials.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          badge="Verified Patient Experiences"
          title="Trusted by Leaders & Proactive Patients"
          subtitle="Real reflections on our preventative diagnostic rigor, clinical bedside manner, and physician partnership."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-background border border-border rounded-healix-xl p-8 text-left relative flex flex-col justify-between shadow-soft-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" aria-hidden="true" />
                    ))}
                  </div>
                  <Badge variant="primary" size="sm">
                    {item.serviceUsed}
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-border mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#075B43]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {item.role}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-primary font-semibold">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
