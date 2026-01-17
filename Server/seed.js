const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');

// Load env vars
dotenv.config();

// --- 1. COURSE DATA (5 Courses) ---
const coursesData = [
  {
    title: "Generative AI Masterclass",
    description: "Master LLMs, Prompt Engineering, and building AI agents with LangChain.",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    category: "Generative AI",
    totalLessons: 4,
    chapters: [
      { title: "Intro to LLMs", duration: "10:00", videoUrl: "" },
      { title: "Prompt Engineering", duration: "15:00", videoUrl: "" },
      { title: "Building with LangChain", duration: "20:00", videoUrl: "" },
      { title: "Fine-Tuning", duration: "25:00", videoUrl: "" }
    ]
  },
  {
    title: "Advanced React Patterns",
    description: "Level up your React skills with Composition, HOCs, and Custom Hooks.",
    price: "₹599",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    category: "React",
    totalLessons: 4,
    chapters: [
      { title: "Compound Components", duration: "12:00", videoUrl: "" },
      { title: "Render Props", duration: "14:00", videoUrl: "" },
      { title: "Custom Hooks", duration: "18:00", videoUrl: "" },
      { title: "Performance Optimization", duration: "22:00", videoUrl: "" }
    ]
  },
  {
    title: "Python for Data Science",
    description: "Learn Pandas, NumPy, and Matplotlib for data analysis.",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
    category: "Data Science",
    totalLessons: 3,
    chapters: [
      { title: "Python Basics", duration: "08:00", videoUrl: "" },
      { title: "Pandas Dataframes", duration: "16:00", videoUrl: "" },
      { title: "Visualization", duration: "14:00", videoUrl: "" }
    ]
  },
  {
    title: "AWS Certified Solutions Architect",
    description: "Complete guide to passing the SAA-C03 exam.",
    price: "₹699",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    category: "Amazon AWS",
    totalLessons: 5,
    chapters: [
      { title: "IAM & Security", duration: "12:00", videoUrl: "" },
      { title: "EC2 Fundamentals", duration: "20:00", videoUrl: "" },
      { title: "S3 Storage", duration: "15:00", videoUrl: "" },
      { title: "VPC Networking", duration: "25:00", videoUrl: "" },
      { title: "Databases (RDS)", duration: "18:00", videoUrl: "" }
    ]
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Design beautiful interfaces with Figma and Adobe XD.",
    price: "₹449",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    category: "Design",
    totalLessons: 3,
    chapters: [
      { title: "Typography & Color", duration: "10:00", videoUrl: "" },
      { title: "Wireframing", duration: "20:00", videoUrl: "" },
      { title: "Prototyping", duration: "30:00", videoUrl: "" }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected...');

    // 1. Clear existing courses (Optional: Comment out if you want to keep old data)
    await Course.deleteMany({});
    console.log('🗑️  Old courses cleared.');

    // 2. Insert New Courses
    const createdCourses = await Course.insertMany(coursesData);
    console.log(`🚀 ${createdCourses.length} Courses created.`);

    // 3. Find User (Replace with YOUR email)
    // Make sure you signed up with this email first!
    const targetEmail = "mangeshbandre2307@gmail.com"; 
    const user = await User.findOne({ email: targetEmail });

    if (!user) {
      console.log(`⚠️ User ${targetEmail} not found. Please Sign Up first!`);
      process.exit(1);
    }

    // 4. Assign Progress to User
    // We will assign varying progress to the first 4 courses
    // Course 1: 100% Complete
    // Course 2: 50% Complete
    // Course 3: 0% Started (Just Enrolled)
    // Course 4: 25% Complete
    // Course 5: Not Owned (Locked)

    const userCourses = [
      {
        courseId: createdCourses[0]._id,
        progress: 100,
        completedChapters: createdCourses[0].chapters.map(c => c._id.toString()), // All chapters
        lastAccessed: new Date()
      },
      {
        courseId: createdCourses[1]._id,
        progress: 50,
        completedChapters: [createdCourses[1].chapters[0]._id.toString(), createdCourses[1].chapters[1]._id.toString()], // First 2
        lastAccessed: new Date(Date.now() - 86400000) // Yesterday
      },
      {
        courseId: createdCourses[2]._id,
        progress: 0,
        completedChapters: [],
        lastAccessed: new Date(Date.now() - 172800000) // 2 days ago
      },
      {
        courseId: createdCourses[3]._id,
        progress: 20,
        completedChapters: [createdCourses[3].chapters[0]._id.toString()], // First 1
        lastAccessed: new Date()
      }
      // Course 5 is skipped, so it will appear as "Locked" in Dashboard
    ];

    user.courses = userCourses;
    await user.save();
    
    console.log(`🎉 Successfully assigned ${userCourses.length} courses to ${user.name}`);
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();