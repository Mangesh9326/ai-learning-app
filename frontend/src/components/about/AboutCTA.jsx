import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutCTA = () => {
  return (
    <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
          
          <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to shape the future?</h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Join 15,000+ developers who are changing the world, one line of code at a time.
              </p>
              <button className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-xl hover:shadow-indigo-500/50 flex items-center gap-2 mx-auto group-hover:scale-105">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </button>
          </div>
        </div>
    </section>
  );
};

export default AboutCTA;