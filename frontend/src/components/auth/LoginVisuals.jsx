import React from 'react';
import { CheckCircle } from 'lucide-react';

const LoginVisuals = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 bg-gray-50 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 flex items-center justify-center p-20">
        <div className="relative w-full max-w-lg">
          {/* 3D-ish Card Effect */}
          <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-indigo-500/20 group">

            {/* Decorative UI Elements */}
            <div className="absolute -top-12 -right-12 bg-white rounded-2xl p-4 shadow-xl animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Daily Goal</p>
                  <p className="text-sm font-bold text-gray-800">Completed!</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-48 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <span className="text-white text-5xl font-bold tracking-tighter relative z-10">Ai</span>
              </div>

              <div className="space-y-4">
                <div className="h-4 bg-white/50 rounded-full w-3/4"></div>
                <div className="h-4 bg-white/50 rounded-full w-1/2"></div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-gray-800 font-medium text-lg italic">
                  "The best way to predict the future is to create it."
                </p>
                <p className="text-gray-600 text-sm mt-2">— Peter Drucker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginVisuals;