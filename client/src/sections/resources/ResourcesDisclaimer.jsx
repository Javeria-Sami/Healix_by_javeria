import React from 'react';
import { Card } from '../../components/cards/Card.jsx';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export function ResourcesDisclaimer({ className = '' }) {
  return (
    <Card className={`p-6 border border-border/80 bg-surface/60 space-y-2 text-text-secondary ${className}`}>
      <div className="flex items-center gap-2 text-[#075B43] font-bold text-xs">
        <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
        <span>Medical Information & Clinical Disclaimer</span>
      </div>
      <p className="text-xs leading-relaxed">
        The articles, reviews, and clinical insights published by Healix are intended strictly for general educational 
        and informational purposes. This content does not constitute formal medical diagnosis, individualized treatment 
        prescriptions, or substitute for direct clinical consultation with a licensed healthcare physician. Always consult 
        a qualified healthcare professional regarding specific symptoms, diagnostic tests, or medical interventions.
      </p>
    </Card>
  );
}
