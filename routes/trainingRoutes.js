import express from 'express';
import {
	getCourses,
	getCourseById,
	createCourse,
} from '../controllers/trainingController.js';
import {
	getCoursesValidator,
	createCourseValidator,
} from '../utils/validators/coursesValidator.js';
const router = express.Router();

// @desc    Route for retrieving courses
// @route   GET /api/training/
// @access  Public
router.get('/', getCoursesValidator, getCourses);

// @desc    Route for retrieving course by id
// @route   GET /api/training/:id
// @access  Public
router.get('/:id', getCourseById);

// @desc    Route for retrieving courses
// @route   POST /api/training/
// @access  Private
router.post('/', createCourseValidator, createCourse);

export default router;
