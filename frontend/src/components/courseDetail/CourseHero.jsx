import React from 'react';
import { Star, AlertCircle, Globe } from 'lucide-react';

const CourseHero = ({ course }) => {
  return (
    <div className="bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* Left Side: Text Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold uppercase tracking-wider">
            <span>{course.category}</span>
            <span>/</span>
            <span>{course.level}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {course.title}
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl">
            Master the skills required to become a professional in {course.category}. 
            Join thousands of students learning with {course.instructor}.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {course.bestseller && (
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold text-xs uppercase">
                Bestseller
              </span>
            )}
            
            <div className="flex items-center gap-1 text-yellow-400 font-bold">
              <span>{course.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-600'}`} />
                ))}
              </div>
            </div>
            
            <span className="text-indigo-200 underline">
              ({course.reviews.toLocaleString()} ratings)
            </span>
            
            <span className="text-gray-300 border-l border-gray-700 pl-4">
              Created by <span className="text-white font-bold">{course.instructor}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 pt-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Last updated 2/2026
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              English
            </div>
          </div>
        </div>
        
        {/* Right Side Placeholder */}
        <div className="hidden lg:block"></div>
      </div>
    </div>
  );
};

export default CourseHero;