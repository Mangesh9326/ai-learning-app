import React from 'react';
import { Globe, Zap, Users } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

const ValuesSection = () => {
  const values = [
    { icon: Globe, color: 'text-blue-600', bg: 'bg-blue-100', title: 'Accessibility First', desc: 'Education should be a right, not a privilege. We keep costs low and quality high.' },
    { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100', title: 'Innovation Always', desc: 'We constantly update our curriculum to match the breakneck speed of AI.' },
    { icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', title: 'Community Driven', desc: 'Learning is social. We foster a supportive environment for peer growth.' },
  ];

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Driven by Values</h2>
            <p className="mt-4 text-xl text-gray-500">We don't just teach code; we build character and community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 200}>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
      </div>
    </section>
  );
};

export default ValuesSection;