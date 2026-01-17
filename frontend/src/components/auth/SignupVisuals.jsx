import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

const SignupVisuals = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 bg-gray-50 relative overflow-hidden">
      {/* Animated Background Gradients (Warmer tones for Signup) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 flex items-center justify-center p-20">
        <div className="relative w-full max-w-lg">
          {/* Glassmorphism Card */}
          <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-orange-500/20 group">
            
            {/* Floating Badge: Community Stats */}
            <div className="absolute -top-10 -left-10 bg-white rounded-2xl p-4 shadow-xl animate-bounce-slow z-20">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                   ))}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Join</p>
                  <p className="text-sm font-bold text-gray-800">15k+ Students</p>
                </div>
              </div>
            </div>

            {/* Floating Badge: Growth */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-bounce-slow animation-delay-2000 z-20">
               <div className="flex items-center gap-2">
                 <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 font-bold uppercase">Career</p>
                   <p className="text-sm font-bold text-gray-900">+45% Salary</p>
                 </div>
               </div>
            </div>

            <div className="space-y-6">
              <div className="h-48 rounded-2xl bg-linear-to-br from-orange-400 to-pink-600 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                {/* Abstract UI representation */}
                <div className="w-3/4 h-3/4 border-2 border-white/30 rounded-xl relative">
                   <div className="absolute top-4 left-4 right-4 h-2 bg-white/40 rounded-full"></div>
                   <div className="absolute top-8 left-4 w-1/2 h-2 bg-white/40 rounded-full"></div>
                   <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 rounded-full backdrop-blur-md"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-gray-900 font-bold text-xl">
                  Unlock your potential.
                </p>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupVisuals;