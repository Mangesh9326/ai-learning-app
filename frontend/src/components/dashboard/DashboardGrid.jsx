import React from 'react';
import { Award, CheckCircle, Clock, Play, Search, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardGrid = ({ courses, user }) => {
  const navigate = useNavigate();
  
  // 1. Filter to show ONLY enrolled courses
  const enrolledCourses = courses?.filter(course => course.owned) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      
      {/* ================= WELCOME HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            You've learned for <span className="font-bold text-indigo-600">324 minutes</span> this week. Keep it up!
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-indigo-50 px-5 py-4 rounded-2xl border border-indigo-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-2.5 bg-white rounded-xl text-indigo-600 shadow-sm">
              <Award className="w-6 h-6"/>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Certificates</p>
              <p className="font-bold text-gray-900 text-lg">2 Earned</p>
            </div>
          </div>
          <div className="bg-emerald-50 px-5 py-4 rounded-2xl border border-emerald-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-2.5 bg-white rounded-xl text-emerald-600 shadow-sm">
              <CheckCircle className="w-6 h-6"/>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Completed</p>
              <p className="font-bold text-gray-900 text-lg">12 Lessons</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COURSE GRID HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Enrolled Courses</h2>
        <div className="relative hidden sm:block w-64">
           <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
           <input 
             type="text" 
             placeholder="Search your courses..." 
             className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
           />
        </div>
      </div>

      {/* ================= GRID AREA ================= */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div 
              key={course.id || course._id} 
              // Navigate to the course player using the course ID
              onClick={() => navigate(`/dashboard/${course.id || course._id}`)}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
            >
              {/* Image Area */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-white p-4 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 text-indigo-600 fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  {/* Dynamic Status Badge */}
                  {course.progress === 100 ? (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-green-50 text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-50 text-indigo-700">
                      In Progress
                    </span>
                  )}

                  <span className="text-xs text-gray-400 flex items-center font-medium">
                    <Clock className="w-3.5 h-3.5 mr-1" /> Last active
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 text-xl mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                
                {/* Progress Bar Area */}
                <div className="mt-auto pt-5 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mb-2 font-semibold">
                    <span className={course.progress === 100 ? 'text-green-600' : 'text-indigo-600'}>
                      {course.progress}% Complete
                    </span>
                    <span>{course.completedLessons || 0} / {course.totalLessons || 0} Lessons</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${course.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                      style={{ width: `${course.progress || 0}%` }}
                    >
                      {/* Subtle pulse effect on the progress bar */}
                      {course.progress > 0 && course.progress < 100 && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State if no courses enrolled */
          <div className="col-span-full md:col-span-2 py-16 px-6 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm text-gray-400">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses in progress</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              You haven't enrolled in any courses yet. Start your learning journey today!
            </p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Browse Catalog
            </button>
          </div>
        )}
        
        {/* ================= EXPLORE CARD ================= */}
        <div 
          onClick={() => navigate('/courses')}
          className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer group min-h-[360px]"
        >
          <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-300 group-hover:text-indigo-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-700 text-xl group-hover:text-indigo-700 transition-colors">Explore New Skills</h3>
          <p className="text-sm mt-2 mb-8 max-w-xs text-gray-500">Browse our library of 500+ expert-led courses to expand your knowledge.</p>
          <button className="text-indigo-600 font-bold text-sm bg-white border border-indigo-100 px-6 py-2.5 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
            Go to Courses
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardGrid;