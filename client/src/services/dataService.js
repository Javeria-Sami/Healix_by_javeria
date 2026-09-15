/**
 * Healix Unified Data Service
 * Abstracts access to static or remote healthcare content models.
 */

import {
  SERVICES,
  LAB_TESTS_DATA,
  PROFESSIONALS,
  PROJECTS,
  PLANS,
  ARTICLES,
  FAQS,
  TESTIMONIALS,
} from '../data/index.js';

export const dataService = {
  // Services & Lab Tests
  getServices: async () => SERVICES,
  getServiceBySlug: async (slug) => {
    return SERVICES.find((s) => s.slug === slug) || 
           (LAB_TESTS_DATA && LAB_TESTS_DATA.find((l) => l.slug === slug)) || 
           null;
  },

  // Professionals
  getProfessionals: async () => PROFESSIONALS,
  getProfessionalBySlug: async (slug) => PROFESSIONALS.find((p) => p.slug === slug) || null,

  // Projects / Portfolio
  getProjects: async () => PROJECTS,
  getProjectBySlug: async (slug) => PROJECTS.find((p) => p.slug === slug) || null,

  // Plans
  getPlans: async () => PLANS,

  // Articles
  getArticles: async () => ARTICLES,
  getArticleBySlug: async (slug) => ARTICLES.find((a) => a.slug === slug) || null,

  // FAQs
  getFaqs: async () => FAQS,

  // Testimonials
  getTestimonials: async () => TESTIMONIALS,
};
