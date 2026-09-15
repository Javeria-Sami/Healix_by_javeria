export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404,
    },
  });
}
