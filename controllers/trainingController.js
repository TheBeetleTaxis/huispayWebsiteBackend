import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Course from '../models/courseModel.js';

// @desc    Get courses
// @route   GET /api/training/
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
	const { title, teacher, duration, price } = req.query;
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

		// Filter course search based on the query parameters
		if (title) {
			result = await Course.find({ caption: title });
		} else if (teacher) {
			result = await Course.find({ teacherName: teacher });
		} else if (duration) {
			result = await Course.find({ duration: duration });
		} else if (price) {
			result = await Course.find({ newPrice: price });
		} else {
			result = await Course.find();
		}
		// Return a 200 OK response with the resulting courses
		res.status(200).json(result);
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error(err.message);
	}
});

const getCourseById = asyncHandler(async (req, res) => {
	// Get course id from request parameter
	const { id } = req.params;
	try {
		// Find course by id
		const course = await Course.findById(id);
		// If course exist in database
		if (course) return res.status(200).json(course);
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error('Invalid course id');
	}
});

const createCourse = asyncHandler(async (req, res) => {
	const {
		image,
		caption,
		duration,
		rating,
		teacherPix,
		teacherName,
		teacherPost,
		oldPrice,
		newPrice,
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

		// Create a new course document and save it to the database
		const course = await Course.create({
			image: image,
			caption: caption,
			rating: rating,
			duration: duration,
			teacherPix: teacherPix,
			teacherName: teacherName,
			teacherPost: teacherPost,
			oldPrice: oldPrice,
			newPrice: newPrice,
		});

		return res.status(201).json(course);
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error(err.message);
	}
});

export { getCourses, getCourseById, createCourse };
