import express from 'express';
import { createTestimonial, getTestimonialById, getAllTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();


// create testimonial
router.post('/', createTestimonial )


// get testimonial by Id
router.get('/:id', getTestimonialById )


// get all testimonials
router.get('/', getAllTestimonial )




export default router;