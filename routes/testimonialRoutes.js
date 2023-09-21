import express from 'express';
import { createTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

router.post('/', createTestimonial )


export default router;