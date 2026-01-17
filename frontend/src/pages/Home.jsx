import React from 'react';

// Components
import HomeHero from '../components/home/HomeHero';
import CategoryCards from '../components/home/CategoryCards';
import PromoSection from '../components/home/PromoSection';
import CourseTabs from '../components/home/CourseTabs';
import Certifications from '../components/home/Certifications';
import CareerPaths from '../components/home/CareerPaths';
import BusinessPlans from '../components/home/BusinessPlans';

const Home = () => {
  return (
    <div className="w-full bg-white font-sans text-gray-900 pb-20">
      
      <HomeHero />
      <CategoryCards />
      <PromoSection />
      <CourseTabs />
      <Certifications />
      <CareerPaths />
      <BusinessPlans />

      {/* Global Style for Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>

    </div>
  );
};

export default Home;