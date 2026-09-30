import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Copy, Check, Send, Clock, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [bengaluruTime, setBengaluruTime] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setBengaluruTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-32 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Soft gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Large Editorial Headline */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-4 font-mono">
            GET IN TOUCH
          </div>
          
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none mb-6">
            LET'S BUILD <br />
            <span className="text-blue-400">SOMETHING USEFUL.</span>
          </h2>

          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed mb-8">
            "Open to internships, collaborations and opportunities to build meaningful software."
          </p>

          {/* Three Core Action Buttons: EMAIL ME, GITHUB, LINKEDIN */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-slate-900 bg-white hover:bg-blue-400 hover:text-slate-950 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL ME</span>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Contact Details & Message Gateway */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-slate-800 items-start">
          
          {/* Left Column: Direct Inquiries & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Direct Box */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Direct Email
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mb-4 break-all">
                {personalInfo.email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Email Copied!" : "Copy Address"}</span>
              </button>
            </div>

            {/* Location & Time */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Location
                </div>
                <div className="text-base font-bold text-white">
                  {personalInfo.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>IST</span>
                </div>
                <div className="text-xs font-mono font-semibold text-blue-300">
                  {bengaluruTime || 'Bengaluru, India'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Message Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80">
            <h3 className="text-lg font-bold text-white mb-4">
              Send a Message
            </h3>

            {formSubmitted ? (
              <div className="p-6 text-center rounded-xl bg-slate-800 border border-blue-500/40 my-6">
                <h4 className="text-base font-bold text-white mb-1">Message Sent</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. Krupa will respond via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry, project, or role..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-white hover:bg-blue-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
