import React from 'react';
import { Sparkles, Smartphone, Monitor, ShieldCheck, UserPlus, RefreshCw, PartyPopper } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, deviceView, setDeviceView, onOpenTerms, onResetWizard, currentStep }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10.5px] flex items-center justify-center">
              <PartyPopper className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent uppercase font-sans">
                Extroverts
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-md uppercase tracking-wider">
                Vibe App
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-tight">Party • Hangout • Campus</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'landing'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Home Landing
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'wizard'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Signup Wizard {currentStep > 1 && `(Step ${currentStep}/4)`}
          </button>
          <button
            onClick={onOpenTerms}
            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            Terms & Rules
          </button>
        </nav>

        {/* Right Actions & Device Frame Toggle */}
        <div className="flex items-center gap-2">
          {/* Device Frame View Toggle (Mobile App Preview vs Desktop Responsive) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setDeviceView('mobile')}
              title="Mobile Device Shell View"
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                deviceView === 'mobile'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px] font-medium">Mobile Shell</span>
            </button>
            <button
              onClick={() => setDeviceView('full')}
              title="Full Responsive View"
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                deviceView === 'full'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px] font-medium">Full Responsive</span>
            </button>
          </div>

          {/* Direct CTA */}
          {activeTab !== 'wizard' ? (
            <button
              onClick={() => setActiveTab('wizard')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all duration-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Join Extroverts
            </button>
          ) : (
            <button
              onClick={onResetWizard}
              title="Reset Wizard Form"
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-900/50 rounded-xl transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Form</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
