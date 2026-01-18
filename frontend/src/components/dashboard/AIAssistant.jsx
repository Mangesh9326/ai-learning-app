import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, ArrowUp, User, Bot, CheckCircle, XCircle, BrainCircuit } from 'lucide-react';

const AIAssistant = ({ isOpen, onClose, currentTopic }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- INITIALIZE CHAT ---
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: 'ai', 
          type: 'text',
          content: `Hi! I'm your AI Tutor. We're currently focusing on **${currentTopic}**.` 
        },
        {
          role: 'ai',
          type: 'options',
          options: ['Start Quiz Test 🧠', 'Ask a Doubt 🙋‍♂️', 'Summarize Lesson 📝']
        }
      ]);
    }
  }, [isOpen, currentTopic]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const msgText = textToSend || input;
    if (!msgText.trim()) return;

    // 1. Add User Message
    setMessages(prev => [...prev, { role: 'user', type: 'text', content: msgText }]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ 
          message: msgText, 
          context: currentTopic 
        })
      });

      const data = await response.json();

      // 2. Add AI Response
      setMessages(prev => [...prev, { 
        role: 'ai', 
        type: data.type || 'text', 
        ...data 
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "I'm having trouble connecting to the brain. Please check your internet." }]);
    } finally {
      setLoading(false);
    }
  };

  // --- SUB-COMPONENT: Quiz Card ---
  const QuizCard = ({ data }) => {
    const [selected, setSelected] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionClick = (idx) => {
      if (isSubmitted) return;
      setSelected(idx);
      setIsSubmitted(true);
    };

    const isCorrect = selected === data.correctIndex;

    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm w-full mt-2">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
          <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Knowledge Check</span>
        </div>
        
        <h4 className="font-bold text-gray-900 mb-6 text-base leading-relaxed">{data.question}</h4>
        
        <div className="space-y-3">
          {data.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl text-sm border-2 transition-all duration-200 flex justify-between items-center group ";
            
            if (isSubmitted) {
              if (idx === data.correctIndex) {
                btnClass += "bg-green-50 border-green-500 text-green-900 font-medium";
              } else if (idx === selected) {
                btnClass += "bg-red-50 border-red-500 text-red-900";
              } else {
                btnClass += "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
              }
            } else {
              btnClass += "bg-white border-gray-100 hover:border-indigo-600 hover:bg-indigo-50 text-gray-700";
            }

            return (
              <button 
                key={idx} 
                onClick={() => handleOptionClick(idx)}
                disabled={isSubmitted}
                className={btnClass}
              >
                <span>{option}</span>
                {isSubmitted && idx === data.correctIndex && <CheckCircle className="w-5 h-5 text-green-600" />}
                {isSubmitted && idx === selected && idx !== data.correctIndex && <XCircle className="w-5 h-5 text-red-600" />}
                {!isSubmitted && <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-indigo-600"></div>}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className={`mt-6 p-4 rounded-xl border-l-4 animation-fade-in ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
            <p className={`font-bold mb-1 ${isCorrect ? 'text-green-800' : 'text-orange-900'}`}>
              {isCorrect ? "🎉 That's correct!" : "👀 Not quite right."}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{data.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    // ✅ FIX: z-[9999] ensures it stays above Footer/Navbar
    // ✅ FIX: fixed inset-0 on mobile ensures full screen coverage
    <div className="fixed inset-0 md:inset-auto md:right-6 md:bottom-6 md:w-125 md:h-175 bg-white md:rounded-3xl shadow-2xl border border-gray-200 flex flex-col z-9999 animate-scale-in origin-bottom-right font-sans overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">AI Tutor</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-500 font-medium">Online & Ready</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-50/80 p-4 md:p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => {
          if (msg.type === 'options') {
            return (
              <div key={index} className="flex flex-wrap gap-2 animate-fade-in pl-10">
                {msg.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(opt)}
                    className="bg-white border border-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            );
          }

          return (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[90%] md:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-auto ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 text-indigo-600'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Content */}
                {msg.type === 'quiz' ? (
                  <QuizCard data={msg} />
                ) : (
                  <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gray-900 text-white rounded-br-none' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {loading && (
          <div className="flex justify-start pl-11">
             <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
               <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
               <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
               <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center gap-3"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a doubt..." 
            className="flex-1 pl-5 pr-14 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-700 placeholder-gray-400" 
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <ArrowUp className="w-6 h-6" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;