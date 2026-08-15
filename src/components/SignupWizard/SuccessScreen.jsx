import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, PartyPopper, Download, RefreshCw, 
  MapPin, GraduationCap, ShieldCheck, QrCode
} from 'lucide-react';
import { VIBE_INTERESTS } from '../../data/mockData';
import { resetWizard } from '../../store/signupWizardSlice';
import { setActiveTab, showToast } from '../../store/uiSlice';

export default function SuccessScreen() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signupWizard.formData);

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch (err) {
      console.log('Confetti error:', err);
    }
  }, []);

  const selectedVibeObjs = VIBE_INTERESTS.filter((v) => formData.selectedVibes?.includes(v.id));
  const memberId = `EXT-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleDownloadPass = () => {
    dispatch(
      showToast({
        type: 'success',
        title: 'Pass Downloaded!',
        message: `Extroverts VIP Pass #${memberId} saved to downloads.`
      })
    );
  };

  const handleReset = () => {
    dispatch(resetWizard());
    dispatch(
      showToast({
        type: 'info',
        title: 'Form Reset',
        message: 'Signup wizard form has been reset for new entry.'
      })
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 text-center space-y-6 animate-in zoom-in-95 duration-500">
      {/* Success Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>Signup Complete & Profile Verified</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Welcome to <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Extroverts!</span> 🎉
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Your 4-step registration was successful. Here is your official Extroverts Digital Member Pass:
        </p>
      </div>

      {/* Extroverts Digital Pass Card */}
      <div className="relative w-full max-w-md mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/40 p-6 shadow-2xl shadow-purple-600/30 overflow-hidden text-left space-y-5">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-purple-400" />
            <span className="font-extrabold text-base tracking-wider text-white uppercase">EXTROVERTS PASS</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
            {memberId}
          </span>
        </div>

        {/* Profile Content Grid */}
        <div className="flex items-start gap-4">
          <img
            src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={formData.fullName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-purple-500/60 shadow-lg"
          />

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-lg text-white leading-snug">{formData.fullName || 'Member Name'}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            <p className="text-xs text-purple-300 font-medium">
              {formData.age ? `${formData.age} yrs` : '18+ Verified'} • {formData.pronoun}
            </p>

            <p className="text-xs text-slate-300 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{formData.college || 'University'}</span>
            </p>

            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{formData.city}, {formData.state}</span>
            </p>
          </div>
        </div>

        {/* Selected Vibes Chips */}
        {selectedVibeObjs.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Vibe Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedVibeObjs.map((vibe) => (
                <span
                  key={vibe.id}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-medium text-slate-200 flex items-center gap-1"
                >
                  <span>{vibe.icon}</span>
                  <span>{vibe.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pass Footer / QR Code Simulation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="space-y-0.5">
            <span className="block text-slate-500">Contact Verified</span>
            <span className="text-slate-300 font-mono text-[10px]">{formData.email}</span>
          </div>
          <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center shadow-md">
            <QrCode className="w-full h-full text-slate-950" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleDownloadPass}
          className="w-full sm:w-1/2 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" /> Download VIP Pass
        </button>

        <button
          onClick={handleReset}
          className="w-full sm:w-1/2 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-purple-400" /> Test Signup Again
        </button>
      </div>
    </div>
  );
}
