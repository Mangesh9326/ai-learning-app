import React from 'react';
import { Heart } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

const StorySection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <RevealOnScroll>
          <h2 className="text-indigo-600 font-bold tracking-wide uppercase mb-3">Our Story</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">From a dorm room to a global classroom.</h3>
          <div className="space-y-6 text-lg text-gray-600">
            <p>
              It started in 2024. Three friends, frustrated by how expensive and outdated coding bootcamps were, decided to build something different.
            </p>
            <p>
              We asked ourselves: <span className="text-gray-900 font-semibold italic">"What if an AI could teach you exactly what you need to know, when you need to know it?"</span>
            </p>
            <p>
              Today, AiLearn serves millions of students. We've stripped away the fluff and focused on pure, project-based learning powered by adaptive intelligence.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
            <div>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">15k+</div>
                <div className="text-sm text-gray-500 font-medium uppercase">Active Learners</div>
            </div>
            <div>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">120+</div>
                <div className="text-sm text-gray-500 font-medium uppercase">Countries Reached</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Image Grid */}
        <RevealOnScroll delay={300} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img className="rounded-2xl shadow-lg transform translate-y-12 hover:-translate-y-2 transition-transform duration-500" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team meeting" />
              <img className="rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-500" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" alt="Working on laptop" />
            </div>
            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-full shadow-2xl flex items-center justify-center animate-pulse-slow">
              <Heart className="w-10 h-10 text-red-500 fill-current" />
            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default StorySection;