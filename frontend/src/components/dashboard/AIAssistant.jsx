import React from 'react';
import { Sparkles, X, ArrowLeft } from 'lucide-react';

const AIAssistant = ({ isOpen, onClose, currentTopic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed md:absolute right-4 bottom-4 w-[90vw] md:w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-scale-in origin-bottom-right">
      {/* Header */}
      <div className="p-4 bg-indigo-600 text-white rounded-t-2xl flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold">Ai Tutor</span>
        </div>
        <button onClick={onClose} className="hover:bg-indigo-500 p-1 rounded transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
        {/* AI Message */}
        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-gray-100">
          <p className="text-sm text-gray-700">
            Hi! I see you're learning about <strong>{currentTopic || "this topic"}</strong>. 
            I can summarize the video, generate a quiz, or explain complex code snippets. How can I help?
          </p>
        </div>

        {/* User Message Simulation */}
        <div className="bg-indigo-100 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] ml-auto text-right">
          <p className="text-sm text-indigo-900">Can you give me a quiz on this?</p>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl shrink-0">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask anything..." 
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-shadow" 
          />
          <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;