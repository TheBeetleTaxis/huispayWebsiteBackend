import express from 'express';
import { merchantResponse } from '../controllers/merchantController.js';
import { createMerchant } from '../middleware/merchantMiddleware.js';
import { createMerchantValidator } from '../utils/validators/merchantValidator.js';
import sendEmail from '../middleware/emailMiddleware.js';

const router = express.Router();

// @desc    Route for creating a merchant
// @route   POST /api/merchant
// @access  Public
router.post(
	'/',
	createMerchantValidator,
	createMerchant,
	sendEmail,
	merchantResponse
);

export default router;
