import React, { useState } from 'react';
import { Play, CheckCircle, Lock, ArrowLeft, Award, Sparkles, Menu, ChevronRight } from 'lucide-react';
import AIAssistant from './AIAssistant';

const CoursePlayer = ({ course, onBack, onUpdateProgress }) => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(course.chapters[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  // --- LOCKED STATE (PURCHASE WALL) ---
  if (!course.owned) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
          <button 
            onClick={onBack} 
            className="absolute top-4 left-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur p-2 rounded-full text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="h-48 bg-gray-900 relative">
             <img src={course.image} className="w-full h-full object-cover opacity-40" alt="" />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white/10 backdrop-blur-md p-4 rounded-full">
                 <Lock className="w-12 h-12 text-white" />
               </div>
             </div>
          </div>
          
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unlock Full Access</h2>
            <p className="text-gray-500 mb-8 text-lg">
              Enroll in <strong>{course.title}</strong> to access all {course.totalLessons} lessons, 
              downloadable resources, and your certificate.
            </p>
            
            <div className="bg-indigo-50 p-6 rounded-xl mb-8 text-left border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-3 text-sm uppercase tracking-wide">Course Includes:</h4>
              <div className="grid grid-cols-2 gap-3">
                {['24 Video Lessons', 'Certificate', 'Source Code', 'AI Tutor Access'].map((item, i) => (
                  <div key={i} className="flex items-center text-indigo-700 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20 transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Unlock for {course.price} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE LEARNING STATE ---
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] animate-fade-in bg-white">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-gray-900 truncate max-w-[200px] md:max-w-md text-sm md:text-base">
            {course.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
              <Award className="w-4 h-4 text-orange-500" /> 
              <span className="text-gray-600 font-medium">{course.progress}% Completed</span>
           </div>
           <button 
             onClick={() => setIsAiOpen(!isAiOpen)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
               isAiOpen 
                ? 'bg-indigo-600 text-white shadow-indigo-500/30 shadow-lg' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
             }`}
           >
             <Sparkles className="w-4 h-4" /> 
             <span className="hidden sm:inline">AI Tutor</span>
           </button>
           {/* Mobile Sidebar Toggle */}
           <button 
             className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
           >
             <Menu className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content (Video) */}
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4 md:p-8 w-full">
           <div className="max-w-5xl mx-auto">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-black rounded-2xl shadow-2xl flex items-center justify-center mb-6 relative group overflow-hidden border-4 border-white">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                 <button className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                 </button>
                 <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-indigo-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 inline-block">Now Playing</span>
                    <h3 className="text-xl md:text-2xl font-bold">{activeChapter.title}</h3>
                 </div>
              </div>

              {/* Lesson Details */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                   <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Overview</h1>
                   <p className="text-gray-600 leading-relaxed mb-6">
                     This lesson covers the core concepts of {activeChapter.title}. We will dive deep into practical examples and real-world scenarios.
                   </p>
                   <button 
                     onClick={() => onUpdateProgress(course._id, activeChapter._id)}
                     className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                   >
                     <CheckCircle className="w-5 h-5" /> Mark as Complete
                   </button>
                </div>
              </div>
           </div>
        </div>

        {/* Sidebar (Curriculum) */}
        <div className={`
          absolute md:static inset-y-0 right-0 w-80 bg-white border-l border-gray-200 flex flex-col z-30 transform transition-transform duration-300 shadow-2xl md:shadow-none
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
           <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900 text-lg">Course Content</h3>
              <p className="text-xs text-gray-500 mt-1">{course.completedLessons}/{course.totalLessons} Lessons Completed</p>
           </div>
           <div className="overflow-y-auto flex-1 p-3 space-y-2">
              {course.chapters?.map((chapter) => (
                <div 
                  key={chapter._id} 
                  onClick={() => {
                    setActiveChapter(chapter);
                    setIsSidebarOpen(false); // Close sidebar on mobile select
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    activeChapter._id === chapter._id
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                      : 'hover:bg-gray-50 border-transparent'
                  }`}
                >
                   <div className="flex items-start gap-3">
                      <div className={`mt-1 ${chapter.completed ? 'text-green-500' : 'text-gray-300'}`}>
                         {chapter.completed ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-current"></div>}
                      </div>
                      <div>
                         <p className={`text-sm font-semibold ${activeChapter._id === chapter._id ? 'text-indigo-700' : 'text-gray-700'}`}>
                           {chapter.title}
                         </p>
                         <p className="text-xs text-gray-400 mt-1">{chapter.duration}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* AI Assistant Overlay */}
        <AIAssistant 
          isOpen={isAiOpen} 
          onClose={() => setIsAiOpen(false)} 
          currentTopic={activeChapter.title}
        />
      </div>
    </div>
  );
};

export default CoursePlayer;