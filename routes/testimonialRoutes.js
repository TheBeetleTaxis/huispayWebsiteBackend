import express from 'express';
import { createTestimonial } from '../controllers/testimonialController';

const router = express.Router();

app.post('/testimonial', createTestimonial )


export default router;