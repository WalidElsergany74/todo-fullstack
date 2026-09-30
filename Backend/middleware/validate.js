const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;

    next();
  };
};

module.exports = validateMiddleware;