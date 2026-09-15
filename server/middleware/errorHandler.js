import { config } from '../config/environment.js';

export function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  
  // In production, avoid leaking unvetted 500 exception messages to users
  const message =
    config.isProduction && statusCode === 500
      ? 'An unexpected server error occurred. Please try again later.'
      : err.message || 'Internal Server Error';

  if (config.env !== 'test') {
    // Log sanitized error without logging sensitive request body contents
    console.error(
      `[Server Error] ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${err.message}`
    );
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(config.isProduction ? {} : { stack: err.stack, details: err.details }),
    },
  });
}
