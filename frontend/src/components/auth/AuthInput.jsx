import React from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const AuthInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon, 
  isPassword = false, 
  showPassword, 
  togglePassword 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 block">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-500'} transition-colors`} />
        </div>
        
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-10 py-3 border rounded-xl leading-5 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
              : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500 hover:border-indigo-300'
          }`}
        />

        {/* Error Icon */}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none animate-pulse">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}

        {/* Password Toggle Button */}
        {isPassword && !error && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default AuthInput;