const AppError = require('../utils/appError');

/**
 * validatorMiddleware
 * @param {Object} schema - The Joi schema to validate against
 * @returns {Function} - Express middleware function
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true, // Useful for ignoring metadata Supabase might add
      stripUnknown: true, // Removes fields not defined in the schema for extra security
    });

    if (error) {
      // 2. Extract all error messages into a single string
      const errorMessage = error.details
        .map((details) => details.message.replace(/"/g, ''))
        .join(', ');

      return next(new AppError(`Validation Error: ${errorMessage}`, 400));
    }

    req.body = value;
    
    next();
  };
};

module.exports = validate;