import React, { useState, useMemo } from 'react';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { PROJECTS } from '../data/projects.js';
import {
  PortfolioHero,
  PortfolioCategoryFilter,
  FeaturedProject,
  PortfolioGrid,
  PortfolioCapabilities,
  PortfolioCTA,
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProject = useMemo(() => {
    return PROJECTS.find((p) => p.isFeatured) || PROJECTS[0];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All Projects' || project.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.clientType.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All Projects');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Clinical Portfolio & Healthcare Transformation Case Studies"
        description="Explore documented clinical case studies, enterprise wellness partnerships, and patient health transformation initiatives at Healix."
        canonicalUrl="/portfolio"
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Portfolio' }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <PortfolioHero />

      <PageContainer className="py-12 md:py-16 space-y-16">
        {/* 2. Flagship / Featured Initiative (shown when unfiltered) */}
        {selectedCategory === 'All Projects' && !searchQuery && featuredProject && (
          <section aria-label="Featured Case Study">
            <FeaturedProject project={featuredProject} />
          </section>
        )}

        {/* 3. Category Filter & Search Bar */}
        <section aria-label="Filter and Search Case Studies">
          <PortfolioCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredProjects.length}
          />
        </section>

        {/* 4. Projects Grid */}
        <section aria-label="Case Studies Grid">
          <PortfolioGrid
            projects={filteredProjects}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* 5. Clinical & Technical Capabilities */}
        <PortfolioCapabilities />

        {/* 6. Conversion CTA */}
        <PortfolioCTA />
      </PageContainer>
    </div>
  );
}
