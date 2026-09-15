import React, { useState, useMemo } from 'react';
import { 
  ProfessionalsHero, 
  ProfessionalsFilter, 
  ProfessionalsGrid, 
  ProfessionalsStandards, 
  ProfessionalsCTA 
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';
import { PROFESSIONALS, PROFESSIONAL_DEPARTMENTS } from '../data/professionals.js';

export function ProfessionalsPage() {
  const [activeDepartment, setActiveDepartment] = useState('All Specialties');

  // Compute counts per department
  const departmentCounts = useMemo(() => {
    const counts = { 'All Specialties': PROFESSIONALS.length };
    PROFESSIONAL_DEPARTMENTS.forEach((dept) => {
      if (dept !== 'All Specialties') {
        counts[dept] = PROFESSIONALS.filter((p) => p.department === dept).length;
      }
    });
    return counts;
  }, []);

  // Filtered list
  const filteredProfessionals = useMemo(() => {
    if (activeDepartment === 'All Specialties') {
      return PROFESSIONALS;
    }
    return PROFESSIONALS.filter((p) => p.department === activeDepartment);
  }, [activeDepartment]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Distinguished Physicians & Clinical Specialists"
        description="Meet our board-certified medical leadership and multidisciplinary specialists pioneering precision diagnostics and proactive healthcare."
        canonicalUrl="/professionals"
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Faculty' }
          ])
        ]}
      />

      {/* 1. Hero */}
      <ProfessionalsHero />

      {/* 2. Department Filter */}
      <ProfessionalsFilter
        departments={PROFESSIONAL_DEPARTMENTS}
        activeDepartment={activeDepartment}
        onSelectDepartment={setActiveDepartment}
        counts={departmentCounts}
      />

      {/* 3. Medical Team Grid */}
      <ProfessionalsGrid
        professionals={filteredProfessionals}
        activeDepartment={activeDepartment}
        onResetFilter={() => setActiveDepartment('All Specialties')}
      />

      {/* 4. Clinical Governance & Standards */}
      <ProfessionalsStandards />

      {/* 5. Actionable CTA */}
      <ProfessionalsCTA />
    </div>
  );
}
