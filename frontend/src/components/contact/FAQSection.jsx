import React from 'react';
import { HelpCircle, Phone, Mail } from 'lucide-react';

const FAQSection = () => {
  return (
    <div className="flex flex-col justify-center space-y-8 animate-fade-in-up animation-delay-400">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: 'What is the response time?', a: 'We usually respond within 24 business hours.' },
            { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all courses.' },
            { q: 'Can I get a custom plan?', a: 'Absolutely! Contact our sales team for enterprise pricing.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="mt-1">
                  <HelpCircle className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.q}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
         <h4 className="font-bold text-lg mb-4">Direct Contact</h4>
         <div className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-200">
               <Phone className="w-5 h-5" /> <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-200">
               <Mail className="w-5 h-5" /> <span>hello@ailearn.com</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FAQSection;