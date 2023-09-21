import mongoose  from 'mongoose';



// Testimonial model
const testimonialSchema = new mongoose.Schema({
    name: String,
    position: String,
    image: String,
    message: String,
  });
  
  const Testimonial = mongoose.model('Testimonial', testimonialSchema);

  export default Testimonial;
  