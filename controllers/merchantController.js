import asyncHandler from 'express-async-handler';

const merchantResponse = asyncHandler(async (req, res) => {
	try {
		// Retrieve the merchant from the response object
		const { merchant } = res;
		// Return a 201 Created response with the merchant JSON
		return res.status(201).json(merchant);
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error(err.message);
	}
});

export { merchantResponse };
