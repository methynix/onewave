const express = require('express');
const contactController = require('../controllers/contactController');
const validate = require('../middlewares/validatorMiddleware');
const contactSchema = require('../validators/contactValidator');

const router = express.Router();

// POST /api/v1/contact
router.post('/', validate(contactSchema), contactController.handleInquiry);

module.exports = router;