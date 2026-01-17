import React from 'react';
// Components
import AboutHero from '../components/about/AboutHero';
import TechMarquee from '../components/about/TechMarquee';
import StorySection from '../components/about/StorySection';
import ValuesSection from '../components/about/ValuesSection';
import TeamSection from '../components/about/TeamSection';
import AboutCTA from '../components/about/AboutCTA';

const About = () => {
  return (
    <div className="w-full bg-white font-sans overflow-hidden text-gray-900">
      
      <AboutHero />
      <TechMarquee />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />

      {/* Global Animation Styles */}
      <style>{`
        /* Reveal Animation Utility */
        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-blob { animation: blob 15s infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-marquee-infinite { animation: marquee-infinite 60s linear infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-pulse-slow { animation: pulse 3s infinite; }
      `}</style>
    </div>
  );
};

export default About;