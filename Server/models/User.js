const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },

  courses: [
  {
    courseId: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    completedChapters: [{ type: String }],
    lastAccessed: { type: Date, default: Date.now }
  }
  ],
});

module.exports = mongoose.model("User", UserSchema);
