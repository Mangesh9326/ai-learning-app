import React, { memo } from 'react';
import * as Icons from '../common/Icons';

const CourseCard = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
        {course.bestseller && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            BESTSELLER
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 mb-1">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="font-bold text-amber-700 text-sm">{course.rating}</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Icons.Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill={i < Math.floor(course.rating) ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({course.reviews.toLocaleString()})</span>
        </div>

        {/* Meta Tags */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Icons.Clock /> {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Icons.BarChart /> {course.level}
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">₹{course.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{course.originalPrice}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

// Memoizing prevents re-renders if props don't change
export default memo(CourseCard);