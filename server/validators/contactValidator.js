const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(), // Supports +255...
  subject: Joi.string().required(),
  message: Joi.string().min(10).max(2000).required()
});

module.exports = contactSchema;