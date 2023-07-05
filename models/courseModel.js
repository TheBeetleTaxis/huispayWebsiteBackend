import mongoose from 'mongoose';

// Course schema definition
const courseSchema = new mongoose.Schema(
	{
		image: { type: String, required: true, unique: true },
		caption: { type: String, required: true, unique: true },
		rating: { type: Number, default: 5.0 },
		duration: { type: Number, required: true},
		teacherPix: { type: String, required: true },
		teacherName: { type: String, required: true },
		teacherPost: { type: String, required: true },
		oldPrice: { type: Number },
		newPrice: { type: Number, required: true},
	},
	{ timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
