import asyncHandler from 'express-async-handler';
import Merchant from '../models/merchantModel.js';
import { validationResult } from 'express-validator';

// @desc    Save merchant info to database
// @route   POST /api/merchant
// @access  Public
const createMerchant = asyncHandler(async (req, res, next) => {
	// Destructure request body
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		businessName,
		businessWebsite,
		businessSize,
		product,
		country,
		description,
		payment,
		update,
	} = req.body;

	try {
		// Get request validation result
		const error = validationResult(req);
		// Check for error in request body
		if (!error.isEmpty()) {
			// If error exists, return a 400 Bad Request response with the errors
			return res.status(400).json({
				errors: error.array(),
			});
		}

		// Create a new merchant document and save it to the database
		const merchant = await Merchant.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			phoneNumber: phoneNumber,
			businessName: businessName,
			website: businessWebsite,
			size: businessSize,
			product: product,
			country: country,
			payment: payment,
			description: description,
			update: update,
		});

		// Add merchant information to the response body
		res.merchant = merchant;
		return next();
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error(err.message);
	}
});

export { createMerchant };
