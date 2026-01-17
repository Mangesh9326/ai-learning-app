import React from 'react';
import * as Icons from './Icons';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-2">
        {/* Previous Button */}
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
        >
          <Icons.ChevronLeft />
        </button>
        
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${
              currentPage === i + 1 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
        >
          <Icons.ChevronRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;