import React, { useState, useMemo } from 'react';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { ARTICLES } from '../data/articles.js';
import {
  ResourcesHero,
  ResourceCategoryFilter,
  ResourcesGrid,
  ResourcesCTA,
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All Resources' || article.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        (article.summary && article.summary.toLowerCase().includes(query)) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All Resources');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Clinical Insights, Research & Medical Longevity Articles"
        description="Explore evidence-based medical research papers, longevity insights, and preventative health articles authored by Healix physicians."
        canonicalUrl="/resources"
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Insights & Blog' }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <ResourcesHero />

      <PageContainer className="py-12 md:py-16 space-y-16">
        {/* 2. Category Filter & Search Bar */}
        <section aria-label="Filter and Search Articles">
          <ResourceCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredArticles.length}
          />
        </section>

        {/* 3. Resources Grid */}
        <section aria-label="Medical Articles and Resources Grid">
          <ResourcesGrid
            articles={filteredArticles}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* 4. Conversion CTA */}
        <ResourcesCTA />
      </PageContainer>
    </div>
  );
}
