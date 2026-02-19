import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import CoursePlayer from '../components/dashboard/CoursePlayer';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // --- 1. Load User & Courses ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return; 
      }

      try {
        const res = await fetch('http://localhost:5000/api/dashboard', {
          headers: { 'x-auth-token': token }
        });
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // --- 2. Update Progress (Prop drilled to CoursePlayer) ---
  const handleUpdateProgress = async (courseId, chapterId) => {
    const token = localStorage.getItem('token');
    
    // Optimistic UI Update for the main courses array
    const updatedCourses = courses.map(c => {
      if ((c.id || c._id) === courseId) {
        // If chapters exist in the grid preview, update them
        const updatedChapters = c.chapters ? c.chapters.map(chap => 
          (chap._id || chap.id) === chapterId ? { ...chap, completed: true } : chap
        ) : [];
        
        const completedCount = updatedChapters.filter(ch => ch.completed).length;
        // Prevent division by zero if totalLessons is missing
        const total = c.totalLessons || updatedChapters.length || 1; 
        const newProgress = Math.round((completedCount / total) * 100);
        
        return { ...c, chapters: updatedChapters, progress: newProgress, completedLessons: completedCount };
      }
      return c;
    });
    setCourses(updatedCourses);

    // Backend Call
    try {
      await fetch('http://localhost:5000/api/dashboard/progress', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token 
        },
        body: JSON.stringify({ courseId, chapterId })
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Set up nested routes inside the Dashboard */}
      <Routes>
        {/* Route: /dashboard (Shows the Grid) */}
        <Route 
          path="/" 
          element={<DashboardGrid courses={courses} user={user} />} 
        />
        
        {/* Route: /dashboard/:courseId (Shows the Player) */}
        <Route 
          path="/:courseId" 
          element={
            <CoursePlayerWrapper 
              courses={courses} 
              onUpdateProgress={handleUpdateProgress} 
            />
          } 
        />
      </Routes>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

// --- Helper Component to extract URL params and find the course ---
const CoursePlayerWrapper = ({ courses, onUpdateProgress }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Find the specific course from the state based on the URL parameter
  const course = courses.find(c => (c._id || c.id).toString() === courseId);

  if (!course) return <div className="p-10 text-center">Course not found or loading...</div>;

  return (
    <CoursePlayer 
      course={course} 
      onBack={() => navigate('/dashboard')} // Go back to grid
      onUpdateProgress={onUpdateProgress}
    />
  );
};

export default Dashboard;