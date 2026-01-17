import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Minimum 10 characters required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-lg animate-scale-in flex flex-col items-center justify-center h-96">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500">Thank you for reaching out. We will get back to you shortly.</p>
        <button onClick={() => setIsSuccess(false)} className="mt-8 text-indigo-600 font-bold hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in-up animation-delay-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
      <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300 bg-red-50 focus:ring-red-200' : 'border-gray-200 bg-gray-50 focus:ring-indigo-100 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all duration-200`}
            />
            {errors.name && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.name}</p>}
          </div>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 bg-red-50 focus:ring-red-200' : 'border-gray-200 bg-gray-50 focus:ring-indigo-100 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all duration-200`}
            />
            {errors.email && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Subject</label>
          <input 
            type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?"
            className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-300 bg-red-50 focus:ring-red-200' : 'border-gray-200 bg-gray-50 focus:ring-indigo-100 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all duration-200`}
          />
           {errors.subject && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.subject}</p>}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Message</label>
          <textarea 
            rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..."
            className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-300 bg-red-50 focus:ring-red-200' : 'border-gray-200 bg-gray-50 focus:ring-indigo-100 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
          ></textarea>
          {errors.message && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.message}</p>}
        </div>

        <button 
          type="submit" disabled={isSubmitting}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;