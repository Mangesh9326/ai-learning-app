import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const CourseTabs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Python');
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    setLoading(true);
    fetch('/data/courses.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setAllCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  useEffect(() => {
    const categoryMap = {
      'Development': ['Development', 'React', 'Java'],
      'Python': ['Development', 'Data Science', 'Programming'], 
      'Machine Learning': ['Data Science', 'Machine Learning', 'AI'],
      'React': ['Development', 'Web Development', 'Frontend'],
      'Amazon AWS': ['Business', 'Cloud Computing', 'DevOps'] 
    };

    if (allCourses.length > 0) {
      const filtered = allCourses.filter(course => {
        const allowedCategories = categoryMap[activeTab];
        const isCategoryMatch = allowedCategories?.includes(course.category);
        
        const titleLower = course.title.toLowerCase();
        const tabLower = activeTab.toLowerCase();
        const isTitleMatch = titleLower.includes(tabLower);

        return isCategoryMatch || isTitleMatch;
      });
      setFilteredCourses(filtered.slice(0, 4));
    }
  }, [activeTab, allCourses]);

  const tabs = ['Development', 'Python', 'Machine Learning', 'React', 'Amazon AWS'];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills to transform your career</h2>
        <p className="text-gray-500 mb-8">Choose from our most popular learning paths.</p>
        
        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 mb-10 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap rounded-t-lg transition-all duration-200 border-b-2 ${
                activeTab === tab 
                  ? 'text-indigo-700 border-indigo-600 bg-indigo-50/50' 
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Description Box */}
        <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl mb-10 flex flex-col items-start transition-all duration-300">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Expand your career with {activeTab}</h3>
            <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
              Take one of AiLearn's top-rated {activeTab} courses. Whether you're a beginner or an expert aiming for certification, we have the right curriculum for you.
            </p>
            <button className="border-2 border-gray-900 text-gray-900 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition-colors duration-300">
              Explore {activeTab}
            </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-100 rounded-xl"></div>)}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            {filteredCourses.map((course) => (
              <div key={course.id} className="flex flex-col group cursor-pointer h-full">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <ArrowRight className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                </div>
                <div className="flex flex-col grow">
                  <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
                  <div className="flex items-center gap-1 mb-2">
                      <span className="font-bold text-amber-700 text-sm">{course.rating}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, starI) => (
                          <Star key={starI} className={`w-3 h-3 ${starI < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({course.reviews?.toLocaleString()})</span>
                  </div>
                  <div className="mt-auto flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-lg">₹{course.price}</span>
                    <span className="text-gray-400 font-normal line-through text-sm">₹{course.originalPrice}</span>
                  </div>
                  {course.bestseller && (
                    <div className="mt-3 text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded w-fit bg-yellow-100 text-yellow-800">Bestseller</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">No courses found for {activeTab}.</div>
        )}

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/courses')} className="px-8 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md active:scale-95">
            View More Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseTabs;