const AppError = require('../utils/appError');

module.exports = (req, res, next) => {
  const { id } = req.params;
  // Regex to check if the string is a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(id)) {
    return next(new AppError('Invalid ID format. Expected a valid UUID.', 400));
  }
  next();
};