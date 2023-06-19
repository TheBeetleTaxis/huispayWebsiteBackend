import { query } from 'express-validator';

// Validator middleware for retrieving courses
const getCoursesValidator = [
	// Validation for 'title' query parameter
	query('title')
		.optional({ checkFalsy: true })
		.isAscii()
		.withMessage('Title must contain only ASCII characters'),
	// Validation for 'price' query parameter
	query('price')
		.optional({ checkFalsy: true })
		.isNumeric()
		.withMessage('Price must be a valid integer'),
	// Validation for 'duration' query parameter
	query('duration')
		.optional({ checkFalsy: true })
		.isInt()
		.withMessage('Duration must be a valid integer'),
	// Validation for 'tutor' query parameter
	query('tutor')
		.optional({ checkFalsy: true })
		.isAlpha()
		.withMessage('title must contain only alphabetic characters'),
];

export { getCoursesValidator };
