import { body, validationResult } from 'express-validator';

const ALLOWED_SERVICES = [
  'preventative-screening',
  'cardiovascular',
  'executive-health',
  'metabolic-medicine',
  'genomics-screening',
  'care-plans',
  'corporate-partnership',
  'general-inquiry',
];

/**
 * Middleware to evaluate express-validator results and format standardized 400 errors.
 */
export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid form submission data.',
        statusCode: 400,
        details: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      },
    });
  }
  next();
}

/**
 * Validation chain for general consultation / contact inquiries.
 */
export const contactValidationRules = [
  // Anti-spam Honeypot: Must be empty
  body('honeypot')
    .optional()
    .custom((val) => {
      if (val && val.trim() !== '') {
        throw new Error('Spam submission detected.');
      }
      return true;
    }),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.')
    .customSanitizer((val) => val.replace(/[<>]/g, '')),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('A valid email address is required.')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters.')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 7, max: 25 })
    .withMessage('Phone number must be between 7 and 25 characters.')
    .matches(/^[+\d\s().-]+$/)
    .withMessage('Phone number contains invalid characters.'),

  body('service')
    .trim()
    .notEmpty()
    .withMessage('Clinical service category is required.')
    .isIn(ALLOWED_SERVICES)
    .withMessage('Invalid clinical service category selection.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Inquiry message is required.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Inquiry message must be between 10 and 2000 characters.')
    .customSanitizer((val) => val.replace(/[<>]/g, '')),
];

/**
 * Validation chain for newsletter subscriptions.
 */
export const newsletterValidationRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('A valid email address is required.')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters.')
    .normalizeEmail(),
];
