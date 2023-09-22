import express from 'express';
// import { createMerchant } from '../middleware/merchantMiddleware.js';
import { createMerchantValidator } from '../utils/validators/merchantValidator.js';
import {  createMerchant, getAllMerchants, getMerchantById } from '../controllers/merchantController.js';


const router = express.Router();

// @desc    Route for creating a merchant
// @route   POST /api/merchant
// @access  Public

// router.post(
// 	'/',
// 	createMerchantValidator,
// 	merchantResponse
// );

// create Merchant
router.post('/', createMerchant, createMerchantValidator )


// get merchant by Id
router.get('/:id', getMerchantById )


// get all merchants
router.get('/', getAllMerchants )

export default router;
