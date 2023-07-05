import { query, body } from 'express-validator';

// Validator middleware for retrieving courses
const getCoursesValidator = [
	// Validation for 'title' query parameter
	query('caption')
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
	query('teacher')
		.optional({ checkFalsy: true })
		.isAlpha()
		.withMessage('title must contain only alphabetic characters'),
];

const createCourseValidator = [
	// Validation for 'image' body parameter
	body('image')
		.notEmpty()
		.withMessage('Course image is required!')
		.isURL()
		.withMessage('Course image must be a valid url'),
	// Validation for 'caption' body parameter
	body('caption')
		.notEmpty()
		.withMessage('Caption is required!')
		.isAscii()
		.withMessage('Title must contain only ASCII characters'),
	// Validation for 'old price' body parameter
	body('oldPrice')
		.optional({ checkFalsy: true })
		.isNumeric()
		.withMessage('Old price must be a valid integer'),
	// Validation for 'new price' body parameter
	body('newPrice')
		.notEmpty()
		.withMessage('Price is required!')
		.isNumeric()
		.withMessage('Price must be a valid integer'),
	// Validation for 'duration' body parameter
	body('duration')
		.notEmpty()
		.withMessage('is required!')
		.isInt()
		.withMessage('Duration must be a valid integer'),
	// Validation for 'teacher name' body parameter
	body('teacherName')
		.notEmpty()
		.withMessage('is required!')
		.isAlpha()
		.withMessage('Teacher name must contain only alphabetic characters'),
	// Validation for 'teacher post' body parameter
	body('teacherPost')
		.notEmpty()
		.withMessage('is required!')
		.isAlpha()
		.withMessage('Teacher post must contain only alphabetic characters'),
	// Validation for 'teacher pix' body parameter
	body('teacherPix')
		.notEmpty()
		.withMessage('is required!')
		.isURL()
		.withMessage('Teacher pix must be a valid url'),
	// Validation for 'rating' body parameter
	body('rating')
		.optional({ checkFalsy: true })
		.isNumeric()
		.withMessage('Rating must be number between 0 and 5.0')
		.custom((value, { req }) => {
			if (value < 0 || value > 5)
				throw new Error('Rating must be number between 0 and 5.0');
			return true;
		}),
];

export { getCoursesValidator, createCourseValidator };
