import React from 'react';
import { Sparkles, Briefcase, TrendingUp, ChevronRight } from 'lucide-react';

const CategoryCards = () => {
  const categories = [
    { title: 'Generative AI', bg: 'bg-indigo-100', text: 'text-indigo-600', icon: <Sparkles className="w-8 h-8"/> },
    { title: 'LLM Engineering', bg: 'bg-purple-100', text: 'text-purple-600', icon: <Briefcase className="w-8 h-8"/> },
    { title: 'Data Science', bg: 'bg-emerald-100', text: 'text-emerald-600', icon: <TrendingUp className="w-8 h-8"/> },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Learn <span className="italic text-indigo-700">essential</span> career and life skills</h2>
        <p className="text-gray-500 mb-8">Master the tools driving the future of tech.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((card, idx) => (
            <div key={idx} className="group cursor-pointer bg-white border border-gray-200 p-6 rounded-xl hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex items-center justify-between transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${card.bg} ${card.text} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{card.title}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;