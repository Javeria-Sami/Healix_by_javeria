/**
 * Healix Contact & Lead Submission Service
 */

import { api } from './api.js';

export const contactService = {
  /**
   * Submit general contact / consultation inquiry
   */
  submitInquiry: async (formData) => {
    return api.post('/contact', formData);
  },

  /**
   * Subscribe email to healthcare insights newsletter
   */
  subscribeNewsletter: async (email) => {
    return api.post('/newsletter', { email });
  },
};
