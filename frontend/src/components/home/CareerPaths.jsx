import React from 'react';
import { TrendingUp } from 'lucide-react';

const CareerPaths = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to reimagine your career?</h2>
          <p className="text-gray-500 mb-10">Get the skills and real-world experience employers want with Career Accelerators.</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { role: 'Full Stack Dev', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', color: 'bg-indigo-600' },
              { role: 'Data Scientist', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80', color: 'bg-purple-600' },
              { role: 'AI Engineer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', color: 'bg-emerald-600' },
              { role: 'Product Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', color: 'bg-pink-600' },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2">
                  <div className="h-44 overflow-hidden relative">
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold text-white z-10 ${card.color} shadow-sm`}>
                      CAREER PATH
                    </div>
                    <img src={card.img} alt={card.role} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{card.role}</h3>
                    <div className="mt-2 flex items-center text-xs text-gray-500 font-medium">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-500" /> 
                      <span className="group-hover:text-green-600 transition-colors">45k+ learners</span>
                    </div>
                  </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default CareerPaths;