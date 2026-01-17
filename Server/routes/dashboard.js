const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // You need a middleware to verify JWT
const Course = require('../models/Course');
const User = require('../models/User');

// @route   GET /api/dashboard
// @desc    Get all courses with user's specific progress
router.get('/', auth, async (req, res) => {
  try {
    // 1. Get the User and populate their enrolled courses
    const user = await User.findById(req.user.id).select('-password');
    
    // 2. Get ALL available courses from DB
    const allCourses = await Course.find();

    // 3. Merge Data: Check which courses the user owns
    const dashboardData = allCourses.map(course => {
      // Find if user has this course in their list
      const userCourse = user.courses.find(c => c.courseId.toString() === course._id.toString());

      if (userCourse) {
        // USER OWNS THIS COURSE
        return {
          _id: course._id,
          title: course.title,
          image: course.image,
          totalLessons: course.chapters.length,
          price: course.price,
          // User specific data:
          owned: true,
          progress: userCourse.progress,
          completedLessons: userCourse.completedChapters.length,
          lastAccessed: userCourse.lastAccessed,
          chapters: course.chapters.map(chap => ({
            _id: chap._id,
            title: chap.title,
            duration: chap.duration,
            // Check if this specific chapter is completed
            completed: userCourse.completedChapters.includes(chap._id.toString())
          }))
        };
      } else {
        // USER DOES NOT OWN THIS COURSE (Locked)
        return {
          _id: course._id,
          title: course.title,
          image: course.image,
          price: course.price,
          totalLessons: course.chapters.length,
          owned: false,
          progress: 0,
          completedLessons: 0,
          chapters: [] // Don't send content for unowned courses
        };
      }
    });

    res.json(dashboardData);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/dashboard/enroll/:courseId
// @desc    Simulate purchasing a course
router.post('/enroll/:courseId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.courseId;

    // Check if already enrolled
    if (user.courses.some(c => c.courseId.toString() === courseId)) {
      return res.status(400).json({ msg: 'Already enrolled' });
    }

    // Add to user's course list
    user.courses.push({
      courseId: courseId,
      progress: 0,
      completedChapters: []
    });

    await user.save();
    res.json(user.courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/dashboard/progress
// @desc    Mark a chapter as completed
router.put('/progress', auth, async (req, res) => {
  const { courseId, chapterId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(courseId);

    // Find the course in user's profile
    const userCourseIndex = user.courses.findIndex(c => c.courseId.toString() === courseId);

    if (userCourseIndex === -1) {
      return res.status(404).json({ msg: 'Course not found in user profile' });
    }

    // Add chapter to completed list if not already there
    const userCourse = user.courses[userCourseIndex];
    if (!userCourse.completedChapters.includes(chapterId)) {
      userCourse.completedChapters.push(chapterId);
    }

    // Recalculate Progress %
    const totalChapters = course.chapters.length;
    const completedCount = userCourse.completedChapters.length;
    userCourse.progress = Math.round((completedCount / totalChapters) * 100);
    userCourse.lastAccessed = Date.now();

    await user.save();
    res.json({ progress: userCourse.progress, completedChapters: userCourse.completedChapters });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;