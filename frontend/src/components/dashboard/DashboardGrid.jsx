import React from 'react';
import { Award, CheckCircle, Clock, Lock, Play, Search } from 'lucide-react';

const DashboardGrid = ({ courses, onSelectCourse, user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="text-gray-500 mt-2 text-lg">You've learned for <span className="font-bold text-indigo-600">324 minutes</span> this week.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-indigo-50 px-5 py-4 rounded-2xl border border-indigo-100 flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm"><Award className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Certificates</p>
              <p className="font-bold text-gray-900 text-lg">2 Earned</p>
            </div>
          </div>
          <div className="bg-emerald-50 px-5 py-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl text-emerald-600 shadow-sm"><CheckCircle className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Completed</p>
              <p className="font-bold text-gray-900 text-lg">12 Lessons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Courses</h2>
        <div className="relative hidden sm:block">
           <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
           <input type="text" placeholder="Search your courses..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course._id} 
            onClick={() => onSelectCourse(course)}
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
          >
            {/* Image Area */}
            <div className="relative h-52 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              {!course.owned && (
                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 font-bold text-gray-900 shadow-lg text-sm">
                    <Lock className="w-4 h-4" /> Locked
                  </div>
                </div>
              )}
              
              {course.owned && (
                <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 text-indigo-600 fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded ${course.owned ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                  {course.owned ? 'In Progress' : 'Not Owned'}
                </span>
                {course.owned && (
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> 2h ago
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 leading-tight">{course.title}</h3>
              
              <div className="mt-auto pt-4 border-t border-gray-50">
                {course.owned ? (
                  <>
                    <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
                      <span>{course.progress}% Complete</span>
                      <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                        style={{ width: `${course.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    <span className="text-sm font-bold text-indigo-600 group-hover:underline">View Details</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Explore Card */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-600 text-lg group-hover:text-indigo-600 transition-colors">Explore New Skills</h3>
          <p className="text-sm mt-2 mb-6 max-w-xs">Browse our library of 500+ expert-led courses.</p>
          <button className="text-indigo-600 font-bold text-sm border border-indigo-200 px-6 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">Go to Courses</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;