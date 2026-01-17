import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20">
        <div className="relative z-10 bg-white lg:max-w-2xl lg:w-full">
          <div className="relative shadow-2xl rounded-2xl p-8 lg:p-10 bg-white border border-gray-100 z-20 mt-8 lg:mt-0 animate-fade-in-up">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              New: AI Certification Path
            </div>

            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6 leading-tight">
              Jump into AI <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                for less
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-500 mb-8 leading-relaxed">
              If you're new to AiLearn, we've got good news: For a limited time, courses start at just <span className="font-bold text-gray-900">₹499</span> for new learners!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <button 
                 onClick={() => navigate('/courses')}
                 className="bg-gray-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition-all duration-200 transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2"
               >
                 Start Learning <ArrowRight className="w-5 h-5" />
               </button>
               <button className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                 View Roadmap
               </button>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-indigo-50 flex items-center justify-center h-96 lg:h-full mt-8 lg:mt-0">
           <img 
             className="h-full w-full object-cover object-top transition-transform duration-1000 hover:scale-105"
             src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
             alt="Student learning AI"
           />
           <div className="absolute inset-0 bg-linear-to-t from-indigo-900/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;