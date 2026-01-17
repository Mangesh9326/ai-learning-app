import React from 'react';
import { ChevronRight } from 'lucide-react';

const Certifications = () => {
  return (
    <section className="bg-slate-50 py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get certified and get ahead</h2>
          <p className="text-gray-500 mb-10 max-w-3xl">Prep for certifications with comprehensive courses, practice tests, and special offers on exam vouchers.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
              {[
                { id: 'AWS', name: 'Amazon Web Services', desc: 'Cloud Computing, Security, AI', color: 'bg-blue-600' },
                { id: 'TF', name: 'TensorFlow Developer', desc: 'Machine Learning, Neural Networks', color: 'bg-orange-500' },
                { id: 'PMI', name: 'Project Management', desc: 'PMP, Agile, Leadership', color: 'bg-indigo-600' }
              ].map((cert, idx) => (
                <div key={idx} className="bg-white p-8 border border-gray-200 rounded-2xl hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                  <div className={`w-14 h-14 ${cert.color} rounded-xl mb-6 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {cert.id}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{cert.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{cert.desc}</p>
                  <div className="text-indigo-600 font-semibold text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    View Certification <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
          </div>
        </div>
    </section>
  );
};

export default Certifications;