import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as Icons from '../components/common/Icons';

// Components
import CourseFilters from '../components/courses/CourseFilters';
import CourseHeader from '../components/courses/CourseHeader';
import CourseCard from '../components/courses/CourseCard';
import Pagination from '../components/common/Pagination';

const Courses = () => {
  // --- STATE ---
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [minRating, setMinRating] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // --- INITIAL FETCH ---
  useEffect(() => {
    setLoading(true);
    fetch('/data/courses.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // --- FILTERING & SORTING LOGIC ---
  useEffect(() => {
    let result = [...courses];

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(lowerQuery) || 
        c.instructor.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter(c => selectedCategories.includes(c.category));
    }

    // 3. Levels
    if (selectedLevels.length > 0) {
      result = result.filter(c => selectedLevels.includes(c.level));
    }

    // 4. Rating
    if (minRating > 0) {
      result = result.filter(c => c.rating >= minRating);
    }

    // 5. Sorting
    switch (sortBy) {
      case 'Most Popular': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'Highest Rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'Newest': result.sort((a, b) => b.id - a.id); break;
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break;
      default: break;
    }

    setFilteredCourses(result);
    setCurrentPage(1); 
  }, [searchQuery, selectedCategories, selectedLevels, minRating, sortBy, courses]);

  // --- HANDLERS (Memoized for performance) ---
  const toggleCategory = useCallback((cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, []);

  const toggleLevel = useCallback((lvl) => {
    setSelectedLevels(prev => 
      prev.includes(lvl) ? prev.filter(l => l !== lvl) : [...prev, lvl]
    );
  }, []);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // --- DERIVED STATE ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Clear All Filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedLevels([]);
    setMinRating(0);
    setSortBy('Most Popular');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* Page Title */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="mt-2 text-gray-500">Discover top-rated courses from expert instructors.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CourseFilters 
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedLevels={selectedLevels}
                toggleLevel={toggleLevel}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            
            <CourseHeader 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onMobileFilterClick={() => setMobileFiltersOpen(true)}
            />

            {/* Course Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-xl h-96 p-4 border border-gray-100">
                    <div className="bg-gray-200 h-40 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded mb-4"></div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 col-span-full">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                   <div className="text-gray-400"><Icons.BookOpen /></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Try adjusting your search or filters.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-6 text-indigo-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              paginate={paginate} 
            />

            {/* Showing x-y of z results text */}
            {filteredCourses.length > 0 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCourses.length)} of {filteredCourses.length} results
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileFiltersOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div className={`absolute inset-y-0 left-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="flex items-center justify-between p-5 border-b border-gray-200">
             <h2 className="text-xl font-bold text-gray-900">Filters</h2>
             <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
               <Icons.X />
             </button>
           </div>
           <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
             <CourseFilters 
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedLevels={selectedLevels}
                toggleLevel={toggleLevel}
                minRating={minRating}
                setMinRating={setMinRating}
             />
           </div>
           <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
             <button 
               onClick={() => setMobileFiltersOpen(false)}
               className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
             >
               Show Results
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;