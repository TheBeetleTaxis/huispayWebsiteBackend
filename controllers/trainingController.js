import asyncHandler from 'express-async-handler';
import { findCourse } from '../utils/objectFinder.js';
import { validationResult } from 'express-validator';

// @desc    Get courses
// @route   GET /api/training/
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
	const { title, tutor, duration, price } = req.query;
	let result;
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

		// Determine the filter based on the query parameters and call the findCourse function accordingly
		if (title) {
			result = findCourse('title', title);
		} else if (tutor) {
			result = findCourse('tutor', tutor);
		} else if (duration) {
			result = findCourse('duration', duration);
		} else if (price) {
			result = findCourse('price', price);
		} else {
			result = findCourse();
		}
		// Return a 200 OK response with the resulting courses
		res.status(200).json(result);
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error(err.message);
	}
});

export { getCourses };
