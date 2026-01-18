import React, { useState } from 'react';
import { Play, CheckCircle, Lock, ArrowLeft, Award, Sparkles, Menu, ChevronRight } from 'lucide-react';
import AIAssistant from './AIAssistant';

const CoursePlayer = ({ course, onBack, onUpdateProgress }) => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(course.chapters[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- LOCKED STATE ---
  if (!course.owned) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-6 animate-fade-in bg-gray-50/50">
        <div className="max-w-3xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="h-64 bg-gray-900 relative overflow-hidden">
             <img src={course.image} className="w-full h-full object-cover opacity-60 scale-105" alt="" />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
             <button onClick={onBack} className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all">
               <ArrowLeft className="w-6 h-6" />
             </button>
             <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <p className="opacity-90 flex items-center gap-2"><Lock className="w-4 h-4" /> Locked Content</p>
             </div>
          </div>
          
          <div className="p-10 md:p-14 text-center">
            <p className="text-gray-600 mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
              Ready to master this skill? Enroll now to get full access to <span className="font-bold text-gray-900">{course.totalLessons} premium lessons</span>, project files, and community support.
            </p>
            <button className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto">
              Unlock for {course.price} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- LEARNING INTERFACE ---
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white animate-fade-in">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors border border-transparent hover:border-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight truncate max-w-[150px] md:max-w-md">{course.title}</h2>
            <p className="text-xs text-gray-500 hidden md:block">Chapter {course.chapters.indexOf(activeChapter) + 1} of {course.totalLessons}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex items-center gap-2 text-sm bg-orange-50 text-orange-700 px-4 py-2 rounded-full border border-orange-100">
              <Award className="w-4 h-4" /> 
              <span className="font-bold">{course.progress}%</span>
           </div>
           <button 
             onClick={() => setIsAiOpen(true)}
             className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95"
           >
             <Sparkles className="w-4 h-4" /> 
             <span className="hidden sm:inline">AI Tutor</span>
           </button>
           <button 
             className="lg:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl"
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
           >
             <Menu className="w-6 h-6" />
           </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4 md:p-8 lg:p-10 w-full scroll-smooth">
           <div className="max-w-5xl mx-auto">
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-3xl shadow-2xl flex items-center justify-center mb-8 relative group overflow-hidden border border-gray-800">
                 <img src={course.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                 
                 <button className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20 hover:bg-white/20">
                    <Play className="w-10 h-10 text-white fill-current ml-2" />
                 </button>
                 
                 <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Lesson {course.chapters.indexOf(activeChapter) + 1}</span>
                       <span className="text-gray-300 text-sm font-medium">{activeChapter.duration}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{activeChapter.title}</h3>
                 </div>
              </div>

              {/* Lesson Controls & Description */}
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                   <div className="flex justify-between items-start mb-6">
                      <h1 className="text-2xl font-bold text-gray-900">About this lesson</h1>
                      <button 
                        onClick={() => onUpdateProgress(course._id, activeChapter._id)}
                        disabled={activeChapter.completed}
                        className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                          activeChapter.completed 
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-gray-900 text-white hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/20'
                        }`}
                      >
                        {activeChapter.completed ? (
                          <><CheckCircle className="w-5 h-5" /> Completed</>
                        ) : (
                          <>Mark as Complete <ChevronRight className="w-4 h-4" /></>
                        )}
                      </button>
                   </div>
                   <p className="text-gray-600 leading-relaxed text-lg mb-8">
                     In this comprehensive lesson, we will break down the core concepts of <strong>{activeChapter.title}</strong>. 
                     By the end of this video, you will understand how to apply these techniques in real-world scenarios.
                   </p>
                   
                   <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                      <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> AI Tip
                      </h4>
                      <p className="text-indigo-800 text-sm">
                        Stuck? Open the <strong>AI Tutor</strong> and ask for a summary or a mini-quiz to test your knowledge on this specific topic!
                      </p>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Sidebar (Curriculum) */}
        <div className={`
          absolute lg:static inset-y-0 right-0 w-96 bg-white border-l border-gray-200 flex flex-col z-30 transform transition-transform duration-300 shadow-2xl lg:shadow-none
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
           <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Curriculum</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">{course.completedLessons} / {course.totalLessons} Completed</p>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
           </div>
           
           <div className="overflow-y-auto flex-1 p-4 space-y-3">
              {course.chapters?.map((chapter, idx) => {
                const isActive = activeChapter._id === chapter._id;
                return (
                  <div 
                    key={chapter._id} 
                    onClick={() => {
                      setActiveChapter(chapter);
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                    className={`group p-4 rounded-2xl cursor-pointer transition-all border relative overflow-hidden ${
                      isActive
                        ? 'bg-white border-indigo-600 ring-1 ring-indigo-600 shadow-md' 
                        : 'bg-white border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                    }`}
                  >
                     {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600"></div>}
                     
                     <div className="flex items-start gap-4">
                        <div className={`mt-0.5 min-w-[24px] h-6 flex items-center justify-center rounded-full border-2 ${
                          chapter.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : isActive ? 'border-indigo-600 text-indigo-600' : 'border-gray-300 text-transparent'
                        }`}>
                           {chapter.completed && <CheckCircle className="w-4 h-4 fill-current" />}
                           {!chapter.completed && isActive && <div className="w-2 h-2 bg-current rounded-full"></div>}
                        </div>
                        
                        <div className="flex-1">
                           <p className={`text-sm font-bold mb-1 ${isActive ? 'text-indigo-900' : 'text-gray-700'}`}>
                             {idx + 1}. {chapter.title}
                           </p>
                           <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                             <Play className="w-3 h-3" /> {chapter.duration}
                           </p>
                        </div>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Mobile Sidebar Overlay Backdrop */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        {/* AI Assistant */}
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