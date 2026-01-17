import React from 'react';
import * as Icons from '../common/Icons';

const CourseFilters = ({ 
  selectedCategories, 
  toggleCategory, 
  selectedLevels, 
  toggleLevel, 
  minRating, 
  setMinRating 
}) => {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {['Development', 'Business', 'Data Science', 'Design', 'Marketing'].map(cat => (
            <label key={cat} className="flex items-center space-x-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-indigo-600 font-medium' : 'text-gray-600 group-hover:text-indigo-600'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Levels */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Level</h3>
        <div className="space-y-2">
          {['Beginner', 'Intermediate', 'Expert', 'All Levels'].map(lvl => (
            <label key={lvl} className="flex items-center space-x-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                checked={selectedLevels.includes(lvl)}
                onChange={() => toggleLevel(lvl)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className={`text-sm transition-colors ${selectedLevels.includes(lvl) ? 'text-indigo-600 font-medium' : 'text-gray-600 group-hover:text-indigo-600'}`}>
                {lvl}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Rating</h3>
        <div className="space-y-2">
           {[4.5, 4.0, 3.5].map(rating => (
             <label key={rating} className="flex items-center space-x-3 cursor-pointer group select-none">
               <input 
                 type="radio" 
                 name="rating"
                 checked={minRating === rating}
                 onChange={() => setMinRating(rating)}
                 className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
               />
               <div className="flex items-center">
                 <span className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                     <Icons.Star 
                       key={i} 
                       className={i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'} 
                       fill={i < Math.floor(rating) ? 'currentColor' : 'none'} 
                     />
                   ))}
                 </span>
                 <span className={`text-sm ml-2 transition-colors ${minRating === rating ? 'text-indigo-600 font-medium' : 'text-gray-600 group-hover:text-indigo-600'}`}>
                   {rating} & up
                 </span>
               </div>
             </label>
           ))}
           <label className="flex items-center space-x-3 cursor-pointer group select-none">
               <input 
                 type="radio" 
                 name="rating"
                 checked={minRating === 0}
                 onChange={() => setMinRating(0)}
                 className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
               />
               <span className="text-sm text-gray-600 ml-2">Any Rating</span>
           </label>
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;