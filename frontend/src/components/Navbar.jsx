import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User, LogOut, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // State to hold the logged-in user data
  const [user, setUser] = useState(null);
  const cartCount = 3; 

  // Check Local Storage on Component Mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    localStorage.removeItem('isAuthenticated');
    setUser(null); // Clear state
    setIsOpen(false); // Close mobile menu if open
    // Optional: navigate('/login') here if using router
  };

  // ✅ UPDATED: Dynamic Navigation Links
  const navLinks = [
    ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 w-full fixed top-0 z-40 shadow-sm font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            
            {/* --- Mobile: Left Menu Button --- */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors duration-300"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* --- Branding --- */}
            <div className="shrink-0 flex items-center md:absolute md:left-0 md:ml-4 lg:ml-8">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Ai</span>
                </div>
                <span className="text-2xl font-bold text-gray-800 tracking-tight">AiLearn</span>
              </a>
            </div>

            {/* --- Mobile: Right Icons --- */}
            <div className="flex md:hidden items-center space-x-3">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <a href="/cart" className="p-2 text-gray-600 relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </a>
            </div>

            {/* --- Desktop: Center Links --- */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-32 lg:ml-48">
              <div className="flex space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 px-1 py-2 text-sm font-medium transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* --- Desktop: Right Actions --- */}
            <div className="hidden md:flex items-center space-x-6 mr-4">
              
              {/* Search Bar */}
              <div className="relative w-88 lg:w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-300 shadow-sm"
                  placeholder="Search courses, skills..."
                />
              </div>

              {/* Cart Badge */}
              <a href="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors relative group">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Auth Logic (Desktop) */}
              <div className="flex items-center ml-2 border-l pl-6 border-gray-200 h-8">
                {user ? (
                  // Logged In State
                  <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group relative">
                    <div className="text-right hidden xl:block">
                      <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-37.5">{user.email}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center overflow-hidden text-indigo-700 font-bold">
                       {/* Show Initials if no image */}
                       {user.name.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* Simple Desktop Dropdown for Logout */}
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
                  // Logged Out State
                  <div className="flex items-center space-x-3">
                    <a href="/login" className="text-gray-600 hover:text-indigo-600 font-medium text-sm">Log in</a>
                    <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">Sign up</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Search Bar --- */}
        <div className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 px-4 py-3 shadow-md transition-all duration-300 origin-top ${isSearchOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 p-0 overflow-hidden'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
      </nav>

      {/* --- Mobile Side Drawer (Left Side 70%) --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 left-0 z-50 h-full w-[70%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <span className="text-xl font-bold text-indigo-600">AiLearn</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.name}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </a>
            ))}
          </div>

          {/* Footer (Auth Mobile) */}
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            {user ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-700 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <a href="/login" className="block w-full py-2.5 text-center rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                  Log In
                </a>
                <a href="/signup" className="block w-full py-2.5 text-center rounded-lg bg-indigo-600 font-medium text-white hover:bg-indigo-700 shadow-md transition-colors">
                  Sign Up
                </a>
              </div>
            )}
            
            {/* Logout Mobile */}
            {user && (
              <button 
                onClick={handleLogout}
                className="mt-2 flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;