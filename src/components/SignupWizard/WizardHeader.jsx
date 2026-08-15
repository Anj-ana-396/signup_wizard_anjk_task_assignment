import React from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function WizardHeader({ currentStep, totalSteps = 4, onBack, stepTitles }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full bg-slate-900/80 border-b border-slate-800 p-4 sm:p-6 backdrop-blur-md">
      <div className="max-w-2xl mx-auto">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {currentStep > 1 ? (
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60 flex items-center gap-1 text-xs font-semibold"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sparkles className="w-4 h-4" />
              </div>
            )}
            <div>
              <h2 className="font-bold text-base sm:text-lg text-white">Extroverts Signup Wizard</h2>
              <p className="text-xs text-slate-400">Step {currentStep} of {totalSteps} — {stepTitles[currentStep - 1]}</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 font-bold text-xs">
            {progressPercent}% Done
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-2">
          {stepTitles.map((title, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-600/40 ring-2 ring-purple-400/50'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium mt-1.5 hidden sm:block truncate max-w-full ${
                  isCurrent ? 'text-purple-300 font-semibold' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
