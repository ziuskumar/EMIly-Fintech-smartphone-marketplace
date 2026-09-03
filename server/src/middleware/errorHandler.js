export function notFound(req, res) {
  res
    .status(404)
    .json({
      error: { message: `Route ${req.method} ${req.originalUrl} not found` },
    });
}
export function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.name === "ZodError")
    return res
      .status(400)
      .json({
        error: { message: "Invalid request parameters", details: error.issues },
      });
  res
    .status(error.statusCode || 500)
    .json({
      error: {
        message: error.message || "Something went wrong. Please try again.",
      },
    });
}
