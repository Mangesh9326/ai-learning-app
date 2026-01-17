import React from 'react';

const SocialButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 group-hover:scale-110 transition-transform" alt="Google" />
        <span className="text-sm font-medium text-gray-700">Google</span>
      </button>
      <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
        <img src="https://www.svgrepo.com/show/448224/github.svg" className="h-5 w-5 group-hover:scale-110 transition-transform opacity-70" alt="GitHub" />
        <span className="text-sm font-medium text-gray-700">GitHub</span>
      </button>
    </div>
  );
};

export default SocialButtons;