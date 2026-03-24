const emailService = require('../services/emailService');
const asyncHandler = require('../middlewares/asyncHandler');

exports.handleInquiry = asyncHandler(async (req, res, next) => {
  // 1. Send the email using the service
  await emailService.sendContactEmail(req.body);

  // 2. Respond to the React Frontend
  res.status(200).json({
    status: 'success',
    message: 'Your inquiry has been transmitted to OneWave HQ.'
  });
});