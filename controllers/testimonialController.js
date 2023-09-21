
import Testimonial from '../models/testimonialModel.js';

// Create a new testimonial


export const createTestimonial = async (req, res) => {
    try {
      const { name, position, image, message } = req.body;

      const testimonial = new Testimonial({ name, position, image, message });
      await testimonial.save();
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ error: 'Error creating testimonial' });
    }
  };

