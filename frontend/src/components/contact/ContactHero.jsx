import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-[100%] blur-3xl opacity-30 pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 animate-fade-in-up">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-4">
          Contact Us
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          We’d love to <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">hear from you.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Whether you have a question about courses, pricing, or just want to say hello, our team is ready to answer all your questions.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;