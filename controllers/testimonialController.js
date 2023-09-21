
import Testimonial from '../models/testimonialModel.js';

// Create a new testimonial


export const createTestimonial = async (req, res) => {
    try {
      const { logo, caption, review, name, position, image } = req.body;

      const testimonial = new Testimonial({ logo, caption, review, name, position, image });
      await testimonial.save();
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ error: 'Error creating testimonial' });
    }
  };

  // Get a testimonial by ID
export const getTestimonialById = async (req, res) => {
    try {
      const testimonialId = req.params.id;
      const testimonial = await Testimonial.findById(testimonialId);
      
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving testimonial by ID' });
    }
  };

  // Get all testimonials
export const getAllTestimonial = async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving testimonials' });
    }
  };

  

