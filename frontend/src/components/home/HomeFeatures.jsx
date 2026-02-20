import React from 'react';
import { 
  BrainCircuit, 
  Users, 
  Video, 
  BookOpen, 
  Target, 
  MessageCircleQuestion 
} from 'lucide-react';

const features = [
  {
    title: "Expert Top-Tier Faculty",
    description: "Learn directly from experienced educators who have a proven track record of producing top rankers and successful professionals.",
    icon: Users,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "AI-Powered Smart Tutor",
    description: "Get personalized learning recommendations, instant doubt resolutions, and interactive quizzes powered by advanced AI.",
    icon: BrainCircuit,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Interactive Live Classes",
    description: "Engage in real-time with teachers through our high-quality live streaming platform. Never miss out on interactive learning.",
    icon: Video,
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    title: "Comprehensive Material",
    description: "Access a vast library of structured notes, mind maps, and recorded lectures designed to cover every aspect of your syllabus.",
    icon: BookOpen,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Mock Tests & Analytics",
    description: "Test your knowledge with regular assessments and get detailed performance analytics to identify your weak areas.",
    icon: Target,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "24/7 Doubt Resolution",
    description: "Stuck on a problem at 2 AM? Use our community forums or AI assistant to get your doubts solved instantly, anytime.",
    icon: MessageCircleQuestion,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  }
];

const HomeFeatures = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 animate-fade-in-up">
          <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">
            Why Choose Us?
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">succeed</span>
          </h3>
          <p className="text-lg text-gray-500">
            At Disha Classes, we combine expert mentorship with cutting-edge technology to provide a learning experience that guarantees results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${feature.bgColor}`}>
                  <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                
                {/* Content */}
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Optional: Bottom Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6 font-medium">Ready to start your journey with Disha Classes?</p>
          <a 
            href="/courses" 
            className="inline-flex items-center justify-center bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95"
          >
            Explore Our Courses
          </a>
        </div>

      </div>
    </section>
  );
};

export default HomeFeatures;