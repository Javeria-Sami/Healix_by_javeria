import { Router } from 'express';
import healthRoutes from './health.routes.js';
import {
  contactValidationRules,
  newsletterValidationRules,
  validateRequest,
} from '../validators/contact.validator.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const router = Router();

// Health check endpoint
router.use('/', healthRoutes);

/**
 * POST /api/contact
 * Handles patient / client consultation inquiries with strict validation & rate limiting
 */
router.post(
  '/contact',
  contactLimiter,
  contactValidationRules,
  validateRequest,
  (req, res) => {
    const { name, email, phone, service, message } = req.body;

    // Generate unique inquiry reference code
    const referenceId = `HLX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return res.status(200).json({
      success: true,
      data: {
        referenceId,
        message:
          'Thank you for reaching out. A Healix clinical concierge specialist will review your consultation request and follow up promptly.',
        submittedAt: new Date().toISOString(),
      },
    });
  }
);

/**
 * POST /api/newsletter
 * Subscribes user email to medical research & clinical updates
 */
router.post(
  '/newsletter',
  contactLimiter,
  newsletterValidationRules,
  validateRequest,
  (req, res) => {
    return res.status(200).json({
      success: true,
      data: {
        message:
          'Thank you for subscribing to Healix clinical insights and research updates.',
        subscribedAt: new Date().toISOString(),
      },
    });
  }
);

export default router;
