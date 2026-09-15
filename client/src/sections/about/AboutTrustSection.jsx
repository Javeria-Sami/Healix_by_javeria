import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { ShieldCheck, Lock, Award, HeartPulse } from 'lucide-react';

export function AboutTrustSection() {
  const credentials = [
    {
      icon: ShieldCheck,
      title: 'HIPAA Compliant Data Architecture',
      desc: 'All health records and communications are encrypted with AES-256 standards and strict role-based access controls.',
    },
    {
      icon: Award,
      title: 'Certified Medical Specialists',
      desc: 'All physicians hold active board certifications and clinical privileges in preventative cardiology, endocrinology, or internal medicine.',
    },
    {
      icon: Lock,
      title: 'ISO-27001 Security Alignment',
      desc: 'Enterprise-grade clinical infrastructure verified for cybersecurity, privacy management, and continuous data integrity.',
    },
    {
      icon: HeartPulse,
      title: 'Evidence-Based Clinical Guidelines',
      desc: 'Protocols strictly aligned with peer-reviewed cardiovascular and metabolic prevention standards.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="about-trust-heading">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Standards & Governance
          </div>
          <h2 id="about-trust-heading" className="font-heading text-3xl sm:text-4xl font-extrabold text-[#075B43]">
            Our Commitment to Clinical Trust & Compliance
          </h2>
          <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
            We adhere to rigorous healthcare compliance standards, ensuring complete data confidentiality and physician accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-background border border-border rounded-healix-xl space-y-3 shadow-soft-sm"
              >
                <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#075B43]">
                  {cred.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {cred.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
