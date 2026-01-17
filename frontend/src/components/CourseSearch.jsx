import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const courses = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "React",
  "Node.js",
  "SQL",
  "AI / Machine Learning",
  "Data Science",
  "Web Development",
];

const CourseSearch = () => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null); // for outside click

  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (filteredCourses.length > 0) {
      setSelectedCourse(
        filteredCourses[activeIndex >= 0 ? activeIndex : 0]
      );
    }
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedCourse(null);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex(prev =>
        prev < filteredCourses.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = (course) => {
    setQuery(course);
    setSelectedCourse(course);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  return (
    <>
      {/* SEARCH BAR */}
      <div ref={searchRef} className="relative w-[420px]">
        <input
          type="text"
          placeholder="Search any course"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCourse(null);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 pr-14 rounded-full
          bg-white text-slate-900
          border border-slate-500
          hover:border-slate-700
          focus:outline-none focus:ring-2 focus:ring-blue-400
          focus:border-2 focus:border-blue-400
          text-sm transition-all duration-200"
        />

        {/* Clear button */}
        {query && (
          <FaTimes
            onClick={clearSearch}
            className="absolute right-12 top-1/2 -translate-y-1/2
            text-slate-400 cursor-pointer hover:text-black"
          />
        )}

        {/* Search button */}
        <FaSearch
          onClick={handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2
          text-indigo-600 cursor-pointer"
        />

        {/* Suggestions */}
        {query && showSuggestions && (
          <div
            className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border z-50
            transition-all duration-200 ease-out
            opacity-100 translate-y-0"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(course)}
                  className={`px-4 py-2 cursor-pointer text-sm
                  transition-colors duration-150
                  ${index === activeIndex
                    ? "bg-slate-300"
                    : "hover:bg-slate-300"
                  }`}
                >
                  {course}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-red-500">
                Course not found
              </div>
            )}
          </div>
        )}
      </div>

      {/* RESULT CARD */}
      {selectedCourse && (
        <div className="absolute top-[90px] left-[40px] z-40">
          <div className="bg-white w-[180px] rounded-xl shadow-lg p-5 flex flex-col items-center">
            <div className="text-4xl mb-2">💻</div>
            <h3 className="font-semibold text-slate-800">
              {selectedCourse}
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseSearch;
