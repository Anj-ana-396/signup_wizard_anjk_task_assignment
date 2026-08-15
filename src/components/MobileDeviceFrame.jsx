import React from 'react';
import { Wifi, Battery, Signal, Smartphone } from 'lucide-react';

export default function MobileDeviceFrame({ children, isMobileView, setDeviceView }) {
  if (!isMobileView) {
    return <div className="w-full min-h-[calc(100vh-4rem)]">{children}</div>;
  }

  // Get current time formatted (e.g., 9:41)
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full py-6 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-950/60">
      {/* View Notice Bar */}
      <div className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/40 text-xs text-purple-300">
        <Smartphone className="w-3.5 h-3.5" />
        <span>Mobile App Frame Mode active</span>
        <button
          onClick={() => setDeviceView('full')}
          className="ml-2 underline font-semibold text-purple-200 hover:text-white"
        >
          Switch to Full Screen
        </button>
      </div>

      {/* Outer Shell Bezel */}
      <div className="relative w-full max-w-[410px] h-[820px] bg-slate-900 border-[10px] border-slate-800 rounded-[50px] shadow-[0_0_60px_rgba(139,92,246,0.25)] flex flex-col overflow-hidden ring-1 ring-slate-700">
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-0 inset-x-0 h-7 z-50 flex items-center justify-center pointer-events-none">
          <div className="w-28 h-4 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950"></div>
          </div>
        </div>

        {/* Top Status Bar */}
        <div className="pt-2 px-7 h-10 bg-slate-950/90 backdrop-blur border-b border-slate-800/50 flex items-center justify-between z-40 text-slate-300 text-[11px] font-medium tracking-tight">
          <span>{timeString}</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Device Screen Content Scrollable */}
        <div className="flex-1 overflow-y-auto bg-slate-950 relative scrollbar-none">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="h-5 bg-slate-950 flex items-center justify-center z-40">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
