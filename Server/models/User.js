const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  
  // ✅ NEW: Track Enrolled Courses
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      progress: { type: Number, default: 0 }, // 0 to 100
      completedChapters: [{ type: String }], // Store Chapter IDs
      lastAccessed: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);