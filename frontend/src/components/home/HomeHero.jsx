import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Award, Users, BookOpen, Sparkles } from 'lucide-react';

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white overflow-hidden pb-16 pt-20 lg:pt-32 lg:pb-28">
      {/* --- Background Ambient Glow --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white -z-10 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-12 -left-24 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-200 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT CONTENT: Text & CTAs ================= */}
          <div className="animate-fade-in-up max-w-2xl">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
              </span>
              New: Masterclasses Available
            </div>

            {/* Headline */}
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6 leading-[1.1]">
              <span className="block text-2xl sm:text-3xl text-gray-500 font-bold mb-2">Hello Student, 👋</span>
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Disha Classes
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Empower your future with world-class education. Whether you're preparing for competitive exams or mastering new digital skills, we provide the expert guidance and interactive tools you need to succeed.
            </p>
            
            {/* Feature Checkmarks */}
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10 text-sm font-semibold text-gray-700">
              <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500"/> Expert Mentors</li>
              <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500"/> Interactive Learning</li>
              <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500"/> Proven Results</li>
            </ul>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
               <button 
                 onClick={() => navigate('/courses')}
                 className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
               >
                 Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <div>
                <div className="flex text-yellow-400 mb-1">
              
                </div>
                <p className="text-xs font-semibold text-gray-500">Trusted by successful students</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT: Image & Floating Cards ================= */}
          <div className="relative lg:ml-10 mt-10 lg:mt-0">
            {/* Main Image Base */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/50 bg-white">
              <img 
                className="w-full h-[500px] lg:h-[600px] object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Happy students learning"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
            </div>

            {/* Floating Card 1: Top Right */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow hidden sm:flex">
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">AI Powered</p>
                <p className="font-extrabold text-gray-900">Smart Tutor</p>
              </div>
            </div>

            {/* Floating Card 2: Bottom Left */}
            <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-bounce-slow animation-delay-500 hidden sm:flex">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">100%</p>
                <p className="text-sm font-bold text-gray-500">Success Rate</p>
              </div>
            </div>

            {/* Floating Card 3: Middle Right */}
            <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50 flex flex-col items-center justify-center hidden lg:flex">
              <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
              <p className="font-black text-xl text-gray-900">500+</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Live Classes</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// Simple checkmark component
const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default HomeHero;