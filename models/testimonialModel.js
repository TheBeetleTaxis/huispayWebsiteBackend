import mongoose  from 'mongoose';



// Testimonial model
const testimonialSchema = new mongoose.Schema({

    logo: String,
    caption: String,
    review: String,
    name: String,
    position: String,
    image: String,
  });
  
  const Testimonial = mongoose.model('Testimonial', testimonialSchema);

  export default Testimonial;
  


 