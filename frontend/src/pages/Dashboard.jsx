import React, { useState, useEffect } from 'react';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import CoursePlayer from '../components/dashboard/CoursePlayer';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // --- 1. Load User & Courses ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Handle redirect if needed

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
  }, []);

  // --- 2. Update Progress (When user clicks 'Mark Complete') ---
  const handleUpdateProgress = async (courseId, chapterId) => {
    const token = localStorage.getItem('token');
    
    // Optimistic UI Update (Update state immediately for speed)
    const updatedCourses = courses.map(c => {
      if (c._id === courseId) {
        const updatedChapters = c.chapters.map(chap => 
          chap._id === chapterId ? { ...chap, completed: true } : chap
        );
        // Recalculate basic progress for UI
        const completedCount = updatedChapters.filter(ch => ch.completed).length;
        const newProgress = Math.round((completedCount / c.totalLessons) * 100);
        
        // Update selected course view immediately too
        if (selectedCourse && selectedCourse._id === courseId) {
           setSelectedCourse({ ...c, chapters: updatedChapters, progress: newProgress, completedLessons: completedCount });
        }

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
      // Revert state if error (optional)
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
    <div className="min-h-screen bg-white pt-16">
      {selectedCourse ? (
        <CoursePlayer 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)}
          onUpdateProgress={handleUpdateProgress}
        />
      ) : (
        <DashboardGrid 
          courses={courses} 
          user={user}
          onSelectCourse={setSelectedCourse} 
        />
      )}

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

export default Dashboard;