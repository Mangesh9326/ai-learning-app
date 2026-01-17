import React, { useState } from 'react';
import * as Icons from '../common/Icons';

const CourseHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy, 
  onMobileFilterClick 
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    'Most Popular', 
    'Highest Rated', 
    'Newest', 
    'Price: Low to High', 
    'Price: High to Low'
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      
      {/* Mobile Filter Button */}
      <button 
        onClick={onMobileFilterClick}
        className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        <Icons.Filter /> Filters
      </button>

      {/* Local Search */}
      <div className="relative w-full sm:max-w-xs group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Icons.Search />
        </div>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative w-full sm:w-auto z-20">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <span>Sort by: <span className="text-gray-900 font-bold">{sortBy}</span></span>
            <Icons.ChevronDown />
          </button>
          
          {/* Dropdown Menu */}
          {isSortOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsSortOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 animate-fade-in">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortBy(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${sortBy === opt ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-700'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default CourseHeader;