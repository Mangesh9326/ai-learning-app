import React from 'react';
import { CheckCircle, PlayCircle } from 'lucide-react';

const CourseContent = ({ course }) => {
  return (
    <div className="space-y-12">
      
      {/* 1. What you'll learn */}
      {course.features && course.features.length > 0 && (
        <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {course.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-700 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Course Syllabus */}
      {course.content && course.content.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>{course.content.length} sections</span>
            <span>•</span>
            <span>{course.duration} total length</span>
          </div>
          
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-200 overflow-hidden">
            {course.content.map((item, index) => (
              <div key={index} className="bg-white p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
                <span className="text-xs text-gray-400 hidden sm:block">
                  {Math.floor(Math.random() * 60) + 10} mins
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="prose prose-indigo text-gray-600 max-w-none">
          <p>
            Dive deep into {course.title}. This course is meticulously designed by {course.instructor} to take you from a {course.level} level to an advanced practitioner.
          </p>
          <p className="mt-4">
            Whether you are looking to upskill for a new job or build your own projects, this curriculum covers everything you need. You will get lifetime access to all future updates and a certificate of completion upon finishing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;