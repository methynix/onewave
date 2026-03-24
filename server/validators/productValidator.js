const Joi = require('joi');

const productValidator = {
  // Validator for creating or updating a product
  productSchema: Joi.object({
    name: Joi.string().required().trim(),
    brand: Joi.string().required().trim(),
    category: Joi.string().required().valid('radios', 'industrial', 'solar', 'security', 'accessories'),
    short_description: Joi.string().required().max(500),
    specifications: Joi.object().required(), // The JSONB field
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    is_featured: Joi.boolean().default(false)
  })
};

module.exports = productValidator;