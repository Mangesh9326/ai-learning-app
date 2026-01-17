import React from 'react';
import { MessageSquare, Mail, MapPin, ArrowRight } from 'lucide-react';

const ContactGrid = () => {
  const cards = [
    {
      icon: MessageSquare,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
      title: 'Chat with support',
      desc: "We're here to help you with any technical issues.",
      cta: 'Start Live Chat',
      ctaColor: 'text-indigo-600'
    },
    {
      icon: Mail,
      color: 'text-pink-600',
      bg: 'bg-pink-100',
      title: 'Email Us',
      desc: "Send us a detailed message and we'll reply within 24h.",
      cta: 'support@ailearn.com',
      ctaColor: 'text-pink-600'
    },
    {
      icon: MapPin,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      title: 'Visit our Office',
      desc: "Come say hello at our HQ in San Francisco.",
      cta: 'View on Map',
      ctaColor: 'text-orange-600'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up delay-${idx * 200}`}>
            <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-500 mb-4">{card.desc}</p>
            <span className={`${card.ctaColor} font-bold flex items-center group-hover:gap-2 transition-all`}>
              {card.cta} <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactGrid;