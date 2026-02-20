import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef(null);

  // Load User
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // --- SEARCH LOGIC ---
  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        // Fetch all courses (In real app, use a search API endpoint)
        const res = await fetch("/data/courses.json");
        const data = await res.json();

        const filtered = data.filter(
          (course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error("Search error", error);
      }
    };

    const debounce = setTimeout(fetchResults, 300); // Debounce API calls
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    setIsOpen(false);
    navigate("/login");
  };

  const handleResultClick = (courseId) => {
    setSearchQuery("");
    setIsSearchActive(false);
    navigate(`/course/${courseId}`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
        ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 w-full fixed top-0 z-50 shadow-sm font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div
              className="shrink-0 flex items-center md:absolute md:left-0 md:ml-4 lg:ml-8 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  Ai
                </div>
                <span className="text-2xl font-bold text-gray-800 tracking-tight">
                  AiLearn
                </span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={() => setIsSearchActive(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-32 lg:ml-48">
              <div className="flex space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 px-1 py-2 text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Search & Auth */}
            <div className="hidden md:flex items-center space-x-6 mr-4">
              {/* --- DESKTOP SEARCH BAR --- */}
              <div className="relative w-72 lg:w-96" ref={searchRef}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchActive(true);
                  }}
                  onFocus={() => setIsSearchActive(true)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  placeholder="Search courses..."
                />

                {/* Desktop Search Results Dropdown */}
                {isSearchActive && searchQuery.length >= 2 && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                    {searchResults.length > 0 ? (
                      <div>
                        <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Courses
                        </div>
                        {searchResults.map((course) => (
                          <div
                            key={course.id}
                            onClick={() => handleResultClick(course.id)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-50 last:border-0"
                          >
                            <img
                              src={course.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 truncate">
                                {course.title}
                              </h4>
                              <p className="text-xs text-gray-500 truncate">
                                {course.instructor}
                              </p>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => navigate("/courses")}
                          className="w-full text-center py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          View all results
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No courses found.
                      </div>
                    )}
                  </div>
                )}
              </div>

            

              {/* Auth */}
              <div className="flex items-center ml-2 border-l pl-6 border-gray-200 h-8">
                {user ? (
                  <div className="flex items-center gap-3 cursor-pointer group relative">
                    <div className="text-right hidden xl:block">
                      <p className="text-sm font-semibold text-gray-700">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-37.5">
                        {user.email}
                      </p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {/* Desktop User Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <a
                      href="/login"
                      className="text-gray-600 hover:text-indigo-600 font-medium text-sm"
                    >
                      Log in
                    </a>
                    <a
                      href="/signup"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-md"
                    >
                      Sign up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE SEARCH OVERLAY (Full Screen) --- */}
        {isSearchActive && (
          <div className="fixed inset-0 bg-white z-60 md:hidden animate-in fade-in duration-200">
            {/* --- Header Section --- */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white shadow-sm sticky top-0 z-10">
              <div className="relative flex-1 group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Search className="w-5 h-5" />
                </div>

                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all placeholder-gray-400 font-medium"
                />

                {/* Clear Input Button (UX Improvement) */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchQuery("");
                }}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-2 active:opacity-70 transition-opacity"
              >
                Cancel
              </button>
            </div>

            {/* --- Results Area --- */}
            <div className="overflow-y-auto h-[calc(100vh-80px)] bg-white">
              {searchResults.length > 0 ? (
                <div className="p-4 pb-20 space-y-2">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Top Results ({searchResults.length})
                    </h3>
                  </div>

                  {searchResults.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => handleResultClick(course.id)}
                      className="flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 active:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      {/* Thumbnail with Aspect Ratio */}
                      <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={course.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
                          {course.title}
                        </h4>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center text-amber-500 font-medium">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {course.rating}
                          </span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="truncate max-w-25">
                            {course.instructor}
                          </span>
                        </div>
                      </div>

                      {/* Navigation Cue */}
                      <div className="flex items-center justify-center text-gray-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* --- Empty States --- */
                <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                  {searchQuery.length > 1 ? (
                    // No Results State
                    <>
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                      </div>
                      <h3 className="text-gray-900 font-semibold mb-1">
                        No courses found
                      </h3>
                      <p className="text-gray-500 text-sm">
                        We couldn't find any matches for "{searchQuery}". Try
                        browsing categories.
                      </p>
                    </>
                  ) : (
                    // Initial State (Optional: Show categories or recent searches here)
                    <div className="opacity-50">
                      <p className="text-sm font-medium text-gray-400">
                        Start typing to find courses...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* --- MOBILE SIDE DRAWER (Left) --- */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[75%] max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <span className="text-xl font-bold text-indigo-600">AiLearn</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.name} <ChevronRight className="h-4 w-4 opacity-50" />
              </a>
            ))}
          </div>

          <div className="p-5 border-t border-gray-100 bg-gray-50">
            {user ? (
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-700 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100 bg-white"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <a
                  href="/login"
                  className="block w-full py-2.5 text-center rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="block w-full py-2.5 text-center rounded-lg bg-indigo-600 font-medium text-white hover:bg-indigo-700 shadow-md"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;