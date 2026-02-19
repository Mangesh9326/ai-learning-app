const express = require("express");
const courses = require("../data/courses.json");
const router = express.Router();
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const User = require("../models/User");

// @route   GET /api/dashboard
// @desc    Get all courses with user's specific progress
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Filter only courses user owns
    const enrolledCourses = courses.filter((course) =>
      user.courses.some((c) => c.courseId === course.id),
    );

    // Build response
    const dashboardData = enrolledCourses.map((course) => {
      const userCourse = user.courses.find((c) => c.courseId === course.id);

      return {
        id: course.id,
        title: course.title,
        image: course.image,
        owned: true,
        totalLessons: course.content?.length || 0,
        price: course.price,
        progress: userCourse.progress || 0,
        completedLessons: userCourse.completedChapters.length,
        lastAccessed: userCourse.lastAccessed,
        chapters: Array.isArray(course.content)
          ? course.content.map((lesson, index) => ({
              id: index.toString(),
              title: lesson,
              duration: "10 min",
              completed: userCourse.completedChapters.includes(
                index.toString(),
              ),
            }))
          : [],
      };
    });

    res.json(dashboardData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST /api/dashboard/enroll/:courseId
// @desc    Simulate purchasing a course
router.post("/enroll/:courseId", auth, async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // 🔎 Check if course exists in JSON
    const courseExists = courses.find((c) => c.id === courseId);
    if (!courseExists) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // 🚫 Prevent duplicate enroll
    const isEnrolled = user.courses.some((c) => c.courseId === courseId);
    if (isEnrolled) {
      return res.status(400).json({ msg: "Already enrolled" });
    }

    // ✅ Enroll
    user.courses.push({
      courseId,
      progress: 0,
      completedChapters: [],
      lastAccessed: Date.now(),
    });

    await user.save();

    res.json({ msg: "Enrollment successful", courses: user.courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

router.get("/check/:courseId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const courseId = req.params.courseId;

    // Check if course exists in user's list
    const isEnrolled = user.courses.some(
      (c) => c.courseId.toString() === courseId.toString(),
    );

    res.json({ enrolled: isEnrolled });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/dashboard/progress
// @desc    Mark a chapter as completed
router.put("/progress", auth, async (req, res) => {
  const { courseId, chapterId } = req.body;
  const courses = require("../data/courses.json");
  const course = courses.find((c) => c.id === Number(courseId));

  try {
    const user = await User.findById(req.user.id);

    if (!user || !course) {
      return res.status(404).json({ msg: "User or Course not found" });
    }

    // Find the course in user's profile
    const userCourseIndex = user.courses.findIndex(
      (c) => c.courseId === course.id,
    );

    if (userCourseIndex === -1) {
      return res.status(404).json({ msg: "Course not found in user profile" });
    }

    // Add chapter to completed list if not already there
    const userCourse = user.courses[userCourseIndex];
    if (!userCourse.completedChapters.includes(chapterId)) {
      userCourse.completedChapters.push(chapterId);
    }

    // Recalculate Progress %
    const totalChapters = course.content?.length || 0;
    // Prevent division by zero if course has no chapters
    if (totalChapters > 0) {
      const completedCount = userCourse.completedChapters.length;
      userCourse.progress = Math.round((completedCount / totalChapters) * 100);
    } else {
      userCourse.progress = 100;
    }

    userCourse.lastAccessed = Date.now();

    await user.save();
    res.json({
      progress: userCourse.progress,
      completedChapters: userCourse.completedChapters,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/dashboard/:courseId
// @desc    Get a single enrolled course and its progress
// @route   GET /api/dashboard/:courseId
// @desc    Get a single enrolled course and its progress
router.get('/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // 1️⃣ Check if user enrolled
    const userCourse = user.courses.find(
      c => c.courseId.toString() === courseId.toString()
    );

    if (!userCourse) {
      return res.status(403).json({ msg: 'You are not enrolled in this course' });
    }

    // 2️⃣ Get course from JSON (NOT Mongo)
    const courseData = courses.find(
      c => c.id.toString() === courseId.toString()
    );

    if (!courseData) {
      return res.status(404).json({ msg: 'Course data not found' });
    }

    // 3️⃣ Convert content -> chapters (since your JSON uses content)
    const chapters = Array.isArray(courseData.content)
      ? courseData.content.map((lesson, index) => ({
          id: index.toString(),
          title: lesson,
          duration: "10 min",
          completed: userCourse.completedChapters.includes(index.toString())
        }))
      : [];

    // 4️⃣ Merge progress
    const mergedCourse = {
      id: courseData.id,
      title: courseData.title,
      image: courseData.image,
      totalLessons: chapters.length,
      progress: userCourse.progress || 0,
      completedLessons: userCourse.completedChapters.length,
      chapters
    };

    res.json(mergedCourse);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


module.exports = router;
