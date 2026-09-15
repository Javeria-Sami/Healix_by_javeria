import React, { useState, useMemo } from 'react';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { FAQS } from '../data/faqs.js';
import {
  FaqHero,
  FaqCategoryFilter,
  FaqAccordionList,
  FaqQuickContact,
  FaqCTA,
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/structuredData.js';

export function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All Questions' || faq.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query) ||
        (faq.tags && faq.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All Questions');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Frequently Asked Questions & Patient Knowledge Base"
        description="Find answers to common questions about Healix clinical programs, membership pricing, telehealth consultations, and diagnostic testing."
        canonicalUrl="/faq"
        structuredData={[
          generateFAQSchema(FAQS),
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Frequently Asked Questions' }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <FaqHero />

      <PageContainer className="py-12 md:py-16 space-y-16">
        {/* 2. Category Filter & Search Bar */}
        <section aria-label="Filter and Search FAQs">
          <FaqCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredFaqs.length}
          />
        </section>

        {/* 3. Accordion List */}
        <section aria-label="Frequently Asked Questions List">
          <FaqAccordionList
            faqs={filteredFaqs}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* 4. Still Have Questions Supportive Box */}
        <FaqQuickContact />

        {/* 5. Bottom Conversion CTA */}
        <FaqCTA />
      </PageContainer>
    </div>
  );
}
