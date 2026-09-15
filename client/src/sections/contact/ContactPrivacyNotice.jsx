import React from 'react';
import { Card } from '../../components/cards/Card.jsx';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';

export function ContactPrivacyNotice() {
  return (
    <Card className="p-6 border border-border/80 bg-surface/60 space-y-3">
      <div className="flex items-center gap-2 text-text-primary font-bold text-xs">
        <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
        <span>Medical Communication & Privacy Notice</span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        This general contact form is designed for introductory consultations, program inquiries, and membership coordination. 
        For your personal privacy and safety, please do not include protected health information (PHI), clinical history, 
        or detailed laboratory reports in this submission. Enrolled members communicate via our encrypted patient portal.
      </p>

      <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-1 border-t border-border/40">
        <AlertTriangle className="w-3.5 h-3.5 text-status-warning flex-shrink-0" />
        <span>In case of acute medical emergencies, immediately dial 911 or visit the nearest emergency care facility.</span>
      </div>
    </Card>
  );
}
