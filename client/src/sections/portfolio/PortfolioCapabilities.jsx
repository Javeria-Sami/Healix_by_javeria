import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { ShieldCheck, Cpu, Stethoscope, LineChart } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Stethoscope,
    title: 'On-Site Diagnostic Deployment',
    description: 'Turnkey on-site biometric and resting ECG screening pods tailored for corporate workspaces and specialized outpatient environments.',
  },
  {
    icon: Cpu,
    title: 'Continuous Telemetry & Biosensors',
    description: 'Direct integration with medical-grade continuous glucose monitors, blood pressure cuffs, and ECG rhythm patches.',
  },
  {
    icon: ShieldCheck,
    title: 'Interdisciplinary Clinical Governance',
    description: 'Every deployment is supervised by board-certified physicians ensuring clinical safety, encrypted data hygiene, and regulatory alignment.',
  },
  {
    icon: LineChart,
    title: 'Actionable Healthspan Analytics',
    description: 'Clear reporting dashboards that translate complex biological datasets into targeted lifestyle roadmaps and clinical escalation triage.',
  },
];

export function PortfolioCapabilities() {
  return (
    <section className="py-12 md:py-16 border-t border-border/40">
      <SectionHeading
        eyebrow="Implementation Standards"
        title="Healix Deployment Capabilities"
        description="Our clinical engineering and medical advisory teams bridge the gap between advanced diagnostic technology and real-world health outcomes."
        align="center"
        className="max-w-2xl mx-auto mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <Card key={idx} className="p-6 space-y-4 border border-border bg-surface hover:shadow-soft-md transition-all">
              <div className="w-10 h-10 rounded-healix-md bg-primary-light flex items-center justify-center text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#075C49]">
                {cap.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {cap.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
