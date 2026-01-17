import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

const AboutHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-linear-to-b from-indigo-50/50 via-white to-white">
      
      {/* 1. Background Faded Marquee */}
      <div 
        className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.04] select-none pointer-events-none z-0"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px) rotate(-5deg) scale(${1 + scrollY * 0.0005})` 
        }}
      >
        <div className="flex animate-marquee-infinite text-[12rem] md:text-[15rem] font-black uppercase text-indigo-950 leading-none whitespace-nowrap">
          <span>Learn Create Innovate Develop Master &nbsp;</span>
          <span>Learn Create Innovate Develop Master &nbsp;</span>
        </div>
      </div>

      {/* 2. Vibrant Parallax Blobs */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-160 h-160 bg-linear-to-br from-cyan-300 to-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-180 h-180 bg-linear-to-tr from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"
        style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.1}px)` }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 w-120 h-120 bg-linear-to-r from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-[60px] opacity-50 animate-blob animation-delay-4000"
        style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` }}
      ></div>

      {/* 3. Hero Content */}
      <div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm text-sm font-bold text-indigo-600 mb-8 animate-fade-in-up">
          <Rocket className="w-4 h-4 mr-2" />
          Empowering the next Gen of Coders
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 animate-fade-in-up animation-delay-200 leading-[1.1]">
          We are democratizing <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
            AI Education.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          AiLearn isn't just a platform; it's a movement. We believe that the power of Artificial Intelligence should be accessible to everyone, not just the few.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
          <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-indigo-200 hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95">
            Join Our Mission
          </button>
          <button className="px-8 py-4 bg-white/90 backdrop-blur border-2 border-white text-gray-700 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            Meet the Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;