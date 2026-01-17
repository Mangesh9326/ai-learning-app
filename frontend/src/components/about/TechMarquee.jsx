import React from 'react';

const TechMarquee = () => {
  return (
    <div className="bg-gray-900 py-10 overflow-hidden transform -skew-y-2 origin-top-left relative z-20">
      <div className="flex animate-marquee whitespace-nowrap gap-16 items-center transform skew-y-2">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-2xl font-bold text-gray-500">PYTHON</span>
            <span className="text-2xl font-bold text-white">REACT</span>
            <span className="text-2xl font-bold text-gray-500">TENSORFLOW</span>
            <span className="text-2xl font-bold text-white">NODE.JS</span>
            <span className="text-2xl font-bold text-gray-500">OPENAI</span>
            <span className="text-2xl font-bold text-white">PYTORCH</span>
            <span className="text-2xl font-bold text-gray-500">AWS</span>
            <span className="text-2xl font-bold text-white">DOCKER</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;