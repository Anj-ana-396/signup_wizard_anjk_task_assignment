import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Sparkles, PartyPopper, Users, Zap, ShieldCheck, ArrowRight, 
  MapPin, Flame 
} from 'lucide-react';
import { VIBE_INTERESTS } from '../data/mockData';
import { setActiveTab, setIsTermsOpen } from '../store/uiSlice';

export default function LandingPage() {
  const dispatch = useDispatch();

  return (
    <div className="w-full text-slate-100 min-h-screen bg-slate-950 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        {/* Glow Spheres Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-pink-600/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-6 shadow-lg shadow-purple-500/10 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Extroverts App Signup Wizard • Redux Toolkit State Management</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Ditch the Screen. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Join Real Parties & Hangouts.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
            Connect with campus peers, find live house parties, rooftop jams, and techno raves in your city. Replicate the 4-Step Signup Wizard below to build your Vibe Profile!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => dispatch(setActiveTab('wizard'))}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <PartyPopper className="w-5 h-5" /> Launch 4-Step Signup Wizard
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => dispatch(setIsTermsOpen(true))}
              className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Read Terms & Conditions
            </button>
          </div>

          {/* Micro Stats Banner */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-lg">
            <div className="text-center p-2">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white">50K+</span>
              <span className="text-xs text-slate-400">Verified Extroverts</span>
            </div>
            <div className="text-center p-2">
              <span className="block text-2xl sm:text-3xl font-extrabold text-purple-400">1,200+</span>
              <span className="text-xs text-slate-400">Weekly Hangouts</span>
            </div>
            <div className="text-center p-2">
              <span className="block text-2xl sm:text-3xl font-extrabold text-pink-400">4.9 ★</span>
              <span className="text-xs text-slate-400">Vibe Rating</span>
            </div>
            <div className="text-center p-2">
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">18+</span>
              <span className="text-xs text-slate-400">Age Verified Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Why Extroverts Signup Flow Stands Out
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Engineered with robust progressive disclosure, real-time validation, OTP verification, cascading selectors, and age enforcement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Email & Phone OTP Auth</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Step 1 features email format regex check, 10-digit phone filtering, 6-digit auto-focus OTP inputs, countdown timer, and simulated OTP verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-pink-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Profile & Age Enforcement</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Step 2 captures name, gender, pronouns, and DOB. Automatically prompts and blocks users under 18 with explicit edge case handling.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Cascading Location & College</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Step 3 implements State → City → College dependent selectors, custom university input, and year of study filters.
            </p>
          </div>
        </div>
      </section>

      {/* Vibe Tags Preview */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-pink-500" /> Explore Vibe Tags You Can Select in Step 4
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {VIBE_INTERESTS.map((vibe) => (
              <div
                key={vibe.id}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-2 hover:border-purple-500 transition-colors"
              >
                <span>{vibe.icon}</span>
                <span>{vibe.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-purple-950/70 via-slate-900 to-pink-950/50 border border-purple-500/30 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to test the 4-Step Signup Wizard?</h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Experience complete form state management with Redux Toolkit, real-time error toasts, back-navigation, and instant member pass generation.
          </p>
          <button
            onClick={() => dispatch(setActiveTab('wizard'))}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-400 text-white font-bold rounded-2xl shadow-xl shadow-purple-600/30 hover:scale-105 transition-all text-base inline-flex items-center gap-2"
          >
            <PartyPopper className="w-5 h-5" /> Start Signup Wizard Now
          </button>
        </div>
      </section>
    </div>
  );
}
