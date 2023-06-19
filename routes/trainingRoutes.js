import express from 'express';
import { getCourses } from '../controllers/trainingController.js';
import { getCoursesValidator } from '../utils/validators/coursesValidator.js';
const router = express.Router();

// @desc    Route for retrieving courses
// @route   GET /api/training/
// @access  Public
router.get('/', getCoursesValidator, getCourses);

export default router;
