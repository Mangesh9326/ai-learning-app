import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Globe, 
  Zap 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-8 overflow-hidden font-sans border-t border-slate-800">
      
      {/* --- Ambient Background Glow (AI Effect) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Section: Branding & Newsletter --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 border-b border-slate-800 pb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">AiLearn</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              The intelligent way to master coding. Join 15,000+ developers upgrading their careers with our AI-driven curriculum.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold mb-2">Stay ahead of the curve</h3>
            <p className="text-slate-400 text-sm mb-4">Get the latest AI tutorials and course updates sent to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                />
              </div>
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-indigo-900/30 flex items-center justify-center gap-2 group">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* --- Middle Section: Navigation Links --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm">
              {['Browse Courses', 'Career Paths', 'AI Assistant', 'Pricing', 'For Business'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-1 text-indigo-500">›</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              {['Blog', 'Cheatsheets', 'Community Forum', 'Success Stories', 'Webinars'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-1 text-indigo-500">›</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'Careers', 'Affiliate Program', 'Partners', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-1 text-indigo-500">›</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              {['Terms of Service', 'Privacy Policy', 'Cookie Settings', 'Accessibility', 'Sitemap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-1 text-indigo-500">›</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Copyright & Socials --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
          
          <div className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AiLearn Inc. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Language Selector */}
            <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-800">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </button>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((Social, index) => (
                <a 
                  key={index} 
                  href={Social.href} 
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 group"
                >
                  <Social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;