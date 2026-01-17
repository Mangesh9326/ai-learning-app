const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "10:00"
  videoUrl: { type: String }, // URL to video file
  content: { type: String }   // Text content or transcript for AI
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true }, // e.g., "₹499"
  image: { type: String, required: true },
  category: { type: String },
  totalLessons: { type: Number, default: 0 },
  chapters: [ChapterSchema], // Array of chapters
});

module.exports = mongoose.model('Course', CourseSchema);