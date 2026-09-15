import React from 'react';
import { Card } from '../../components/cards/Card.jsx';
import { AlertCircle, Compass, CheckCircle } from 'lucide-react';

export function PortfolioCaseNarrative({ project }) {
  return (
    <div className="space-y-8">
      {/* 1. Challenge */}
      <Card className="p-6 sm:p-8 space-y-4 border border-border bg-surface">
        <div className="flex items-center gap-2.5 text-status-warning">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#075C49]">
            The Healthcare & Diagnostic Challenge
          </h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed pl-0 sm:pl-7">
          {project.challenge}
        </p>
      </Card>

      {/* 2. Approach */}
      <Card className="p-6 sm:p-8 space-y-4 border border-border bg-surface">
        <div className="flex items-center gap-2.5 text-primary">
          <Compass className="w-5 h-5 flex-shrink-0" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#075C49]">
            Healix Clinical & Engineering Approach
          </h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed pl-0 sm:pl-7">
          {project.approach}
        </p>
      </Card>

      {/* 3. Solution */}
      <Card className="p-6 sm:p-8 space-y-4 border border-border bg-surface">
        <div className="flex items-center gap-2.5 text-accent">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#075C49]">
            Deployed Clinical Solution & Architecture
          </h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed pl-0 sm:pl-7">
          {project.solution}
        </p>
      </Card>
    </div>
  );
}
