import rateLimit from 'express-rate-limit';

/**
 * Global API Rate Limiter
 * 200 requests per 15 minutes per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP. Please try again after 15 minutes.',
      statusCode: 429,
    },
  },
});

/**
 * Dedicated Stricter Rate Limiter for Form Submissions (Anti-Spam / Abuse Protection)
 * Max 10 submissions per 15 minutes per IP
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Submission limit reached. Please wait before submitting another inquiry.',
      statusCode: 429,
    },
  },
});
