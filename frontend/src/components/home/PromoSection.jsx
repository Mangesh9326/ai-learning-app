import React from 'react';
import { CheckCircle, Star } from 'lucide-react';

const PromoSection = () => {
  return (
    <section className="bg-gray-900 text-white py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
                <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm">Personal Plan</span>
            </div>
            <h2 className="text-4xl font-serif mb-6 leading-tight">Reimagine your career in the <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">AI era</span></h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts, customized just for you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {['Learn AI and more', 'Prep for certification', 'Practice with AI coaching', 'Advance your career'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="p-1 rounded-full bg-indigo-900/50 group-hover:bg-indigo-600 transition-colors">
                    <CheckCircle className="w-4 h-4 text-indigo-300 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-white text-gray-900 px-8 py-4 font-bold rounded-lg hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-indigo-900/20">
              Explore Plans
            </button>
          </div>
          
          <div className="relative h-96 lg:h-120 w-full group perspective-1000">
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-900 to-purple-900 rounded-2xl overflow-hidden opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
                alt="Man presenting" 
                className="absolute top-4 right-4 w-3/4 h-full object-cover rounded-2xl shadow-2xl border-4 border-gray-800 transform group-hover:rotate-y-2 group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute bottom-12 left-0 bg-white p-5 rounded-xl shadow-2xl text-gray-900 w-56 animate-bounce-slow z-20 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-100 p-1.5 rounded-md">
                    <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wide text-gray-500">Top Rated</span>
                </div>
                <p className="font-bold text-sm text-gray-900 leading-snug">AI for Business Leaders</p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-600 h-full w-3/4 rounded-full"></div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;