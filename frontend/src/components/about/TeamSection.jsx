import React from 'react';

const TeamSection = () => {
  const team = [
    { name: 'Sarah Jenkins', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
    { name: 'David Chen', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Elena Rodriguez', role: 'Head of AI', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Marcus Johnson', role: 'Community Lead', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Meet the Visionaries</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group relative">
                <div className="relative overflow-hidden rounded-2xl aspect-3/4">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-indigo-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.name}</p>
                      <p className="text-indigo-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.role}</p>
                  </div>
                </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default TeamSection;