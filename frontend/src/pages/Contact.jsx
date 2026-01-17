import React from 'react';

// Components
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactGrid from '../components/contact/ContactGrid';
import FAQSection from '../components/contact/FAQSection';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-20 pb-20 overflow-hidden">
      
      <ContactHero />
      <ContactGrid />

      {/* ================= FORM & FAQ WRAPPER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-inner relative overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />
            <FAQSection />
          </div>
        </div>
      </section>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 4s infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default Contact;