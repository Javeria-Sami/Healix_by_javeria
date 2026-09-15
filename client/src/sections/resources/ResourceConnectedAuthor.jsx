import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Button } from '../../components/common/Button.jsx';
import { PROFESSIONALS } from '../../data/professionals.js';
import { ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

export function ResourceConnectedAuthor({ authorSlug, authorName, authorRole }) {
  const professional = PROFESSIONALS.find((p) => p.slug === authorSlug);

  return (
    <section className="max-w-3xl mx-auto pt-8 border-t border-border/60">
      <Card className="p-6 sm:p-8 border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-soft-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary-light text-primary flex items-center justify-center flex-shrink-0 text-xl font-bold">
            {professional?.image ? (
              <img
                src={professional.image}
                alt={authorName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Stethoscope className="w-6 h-6" />
            )}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Article Author & Clinical Lead
            </span>
            <h3 className="font-heading text-lg font-bold text-text-primary">
              {authorName}
            </h3>
            <p className="text-xs text-text-secondary">
              {authorRole || professional?.role || 'Medical Specialist'}
            </p>
          </div>
        </div>

        {authorSlug && (
          <Link to={`/professionals/${authorSlug}`}>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <span>View Physician Bio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        )}
      </Card>
    </section>
  );
}
