import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  CheckCircle,
  ArrowLeft,
  Award,
  Sparkles,
  Menu,
  ChevronRight,
  X,
  Clock,
} from "lucide-react";
import AIAssistant from "./AIAssistant";

const CoursePlayer = ({ course, onBack, onUpdateProgress }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [localCourse, setLocalCourse] = useState(course);
  const [activeChapter, setActiveChapter] = useState(
    course?.chapters?.[0] || null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const activeChapterId = activeChapter?._id || activeChapter?.id;

  // 2. Prevent Stale Data Overwrites & Fetch Deep Course Data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/dashboard/${courseId}`,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          },
        );

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();

          if (res.ok) {
            // FIXED: Was setCourse(data), changed to setLocalCourse(data)
            setLocalCourse(data); 
          } else {
            console.error("Backend Error:", data.msg);
          }
        } else {
          const textError = await res.text();
          console.error(
            "Received HTML instead of JSON. Endpoint might be missing.",
            textError,
          );
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  // 3. Keep Active Chapter Synced
  useEffect(() => {
    if (localCourse?.chapters?.length > 0) {
      if (activeChapterId) {
        const updatedChapter = localCourse.chapters.find(
          (c) => (c._id || c.id) === activeChapterId,
        );
        if (updatedChapter) setActiveChapter(updatedChapter);
      } else {
        // FIXED: Set the first chapter if activeChapter was previously null
        setActiveChapter(localCourse.chapters[0]); 
      }
    }
  }, [localCourse, activeChapterId]);

  // 4. Instant UI Update Handler
  const handleMarkComplete = () => {
    if (activeChapter?.completed) return;

    // Instantly update our local copy of the course
    setLocalCourse((prevCourse) => {
      const updatedChapters = prevCourse.chapters.map((c) =>
        (c._id || c.id) === activeChapterId ? { ...c, completed: true } : c,
      );

      const newCompletedCount = updatedChapters.filter(
        (c) => c.completed,
      ).length;
      const total = prevCourse.totalLessons || updatedChapters.length;
      const newProgress =
        total > 0 ? Math.round((newCompletedCount / total) * 100) : 100;

      return {
        ...prevCourse,
        chapters: updatedChapters,
        completedLessons: newCompletedCount,
        progress: newProgress,
      };
    });

    // Send the update to the parent/backend in the background
    if (onUpdateProgress) {
      onUpdateProgress(courseId, activeChapterId);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white animate-in fade-in duration-300 relative">
      {/* ================= TOP BAR ================= */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button
            onClick={onBack}
            className="p-2 md:p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors border border-transparent hover:border-gray-200 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 text-base md:text-lg leading-tight truncate">
              {localCourse?.title}
            </h2>
            <p className="text-xs text-gray-500 hidden sm:block mt-0.5">
              Chapter{" "}
              {(localCourse?.chapters?.findIndex(
                (c) => (c._id || c.id) === activeChapterId,
              ) ?? 0) + 1}{" "}
              of {localCourse?.totalLessons || localCourse?.chapters?.length || 0}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Real-time Progress Badge */}
          <div className="hidden lg:flex items-center gap-2 text-sm bg-orange-50 text-orange-700 px-4 py-2 rounded-full border border-orange-100 font-medium transition-all duration-500">
            <Award className="w-4 h-4" />
            {localCourse?.progress || 0}% Completed
          </div>

          <button
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4 md:p-8 w-full scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center relative group overflow-hidden border border-gray-800">
              <img
                src={localCourse?.image}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>

              <button className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all border border-white/20 shadow-2xl">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-2" />
              </button>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Lesson{" "}
                    {(localCourse?.chapters?.findIndex(
                      (c) => (c._id || c.id) === activeChapterId,
                    ) ?? 0) + 1}
                  </span>
                  <span className="text-gray-300 text-sm font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activeChapter?.duration || "0:00"}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  {activeChapter?.title || "Loading..."}
                </h3>
              </div>
            </div>

            {/* Lesson Details & Controls */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  About this lesson
                </h1>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
                  In this comprehensive lesson, we will break down the core
                  concepts of <strong>{activeChapter?.title}</strong>. Pay close
                  attention to the practical examples to master this topic.
                </p>

                {/* AI Tip Box */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4 items-start">
                  <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-sm shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 text-sm mb-1">
                      Stuck or need a review?
                    </h4>
                    <p className="text-sm text-indigo-700/80">
                      Open the AI Tutor to summarize this video or take a quick
                      practice quiz to test your knowledge.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto shrink-0">
                <button
                  onClick={handleMarkComplete}
                  disabled={activeChapter?.completed}
                  className={`w-full md:w-auto px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                    activeChapter?.completed
                      ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                      : "bg-gray-900 text-white hover:bg-indigo-600 hover:shadow-indigo-500/20 active:scale-95"
                  }`}
                >
                  {activeChapter?.completed ? (
                    <>
                      <CheckCircle className="w-5 h-5 fill-green-200" />{" "}
                      Completed
                    </>
                  ) : (
                    <>
                      Mark as Complete <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SIDEBAR (Curriculum) ================= */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div
          className={`absolute lg:static inset-y-0 right-0 w-[85%] max-w-sm lg:w-96 bg-white border-l border-gray-200 flex flex-col z-40 transform transition-transform duration-300 shadow-2xl lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
        >
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Curriculum</h3>
              <p className="text-xs text-gray-500 font-medium mt-1 transition-all duration-300">
                {localCourse?.completedLessons || 0} /{" "}
                {localCourse?.totalLessons || localCourse?.chapters?.length || 0} Completed
              </p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-200">
            {localCourse?.chapters?.map((chapter, idx) => {
              const chapId = chapter._id || chapter.id;
              const isActive = activeChapterId === chapId;
              const isCompleted = chapter.completed;

              return (
                <div
                  key={chapId ?? idx}
                  onClick={() => {
                    setActiveChapter(chapter);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                  className={`group p-4 rounded-xl cursor-pointer transition-all border relative overflow-hidden flex items-start gap-3 ${
                    isActive
                      ? "bg-indigo-50/50 border-indigo-200 shadow-sm"
                      : "bg-white border-transparent hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-md"></div>
                  )}

                  <div
                    className={`mt-0.5 shrink-0 transition-colors ${
                      isCompleted
                        ? "text-green-500"
                        : isActive
                          ? "text-indigo-600"
                          : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 fill-green-50" />
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${isActive ? "border-indigo-600" : "border-current"}`}
                      ></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <p
                      className={`text-sm font-semibold mb-1 line-clamp-2 leading-snug ${isActive ? "text-indigo-900" : "text-gray-700"}`}
                    >
                      {idx + 1}. {chapter.title}
                    </p>
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                      <Play className="w-3 h-3" /> {chapter.duration || "0:00"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Tutor Modal */}
        {isAiOpen && (
          <AIAssistant
            isOpen={isAiOpen}
            onClose={() => setIsAiOpen(false)}
            currentTopic={activeChapter?.title}
          />
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;