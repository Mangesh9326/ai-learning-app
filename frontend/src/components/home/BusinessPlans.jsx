import React from 'react';
import { Users, Briefcase } from 'lucide-react';

const BusinessPlans = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Grow your team's skills and your business</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Team Plan */}
            <div className="relative border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col group hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 z-0 group-hover:bg-indigo-100 transition-colors"></div>
                <div className="relative z-10">
                  <div className="mb-6 w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Plan</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">For teams of 2 to 20 people. Give your team access to our top 5,000+ courses and track their progress.</p>
                  <button className="mt-auto w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-gray-800 active:scale-95 transition-all shadow-lg">
                    Start Free Trial
                  </button>
                </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col group hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 z-0 group-hover:bg-purple-100 transition-colors"></div>
                <div className="relative z-10">
                  <div className="mb-6 w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Plan</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">For organizations of more than 20 people. AI-powered learning paths, SSO, and advanced analytics.</p>
                  <button className="mt-auto w-full bg-white border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-50 active:scale-95 transition-all">
                    Request a Demo
                  </button>
                </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default BusinessPlans;