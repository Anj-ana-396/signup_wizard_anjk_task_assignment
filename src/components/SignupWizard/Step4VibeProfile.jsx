import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Sparkles, Flame, RefreshCw, 
  ShieldCheck, Edit3, ChevronDown, ChevronUp, UserCheck, ToggleLeft, ToggleRight
} from 'lucide-react';
import { VIBE_INTERESTS, AVATAR_PRESETS } from '../../data/mockData';
import { updateStep4, prevStep, setStep, setIsCompleted } from '../../store/signupWizardSlice';
import { showToast, setIsTermsOpen, toggleSimulateServerError } from '../../store/uiSlice';

export default function Step4VibeProfile() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signupWizard.formData);
  const simulateServerError = useSelector((state) => state.ui.simulateServerError);

  const [avatar, setAvatar] = useState(formData.avatar || AVATAR_PRESETS[0].url);
  const [selectedVibes, setSelectedVibes] = useState(formData.selectedVibes || ['house_parties', 'techno_rave', 'rooftop_chill']);
  const [agreedTerms, setAgreedTerms] = useState(formData.agreedTerms || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  // Toggle vibe selection
  const toggleVibe = (id) => {
    if (selectedVibes.includes(id)) {
      setSelectedVibes(selectedVibes.filter((v) => v !== id));
    } else {
      setSelectedVibes([...selectedVibes, id]);
    }
  };

  // Custom avatar upload handler
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Image Too Large',
            message: 'Please choose a photo smaller than 5MB.'
          })
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        dispatch(
          showToast({
            type: 'success',
            title: 'Avatar Uploaded',
            message: 'Custom profile photo updated successfully!'
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Final Form Submit Simulation
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    if (selectedVibes.length < 2) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Vibe Selection Error',
          message: 'Please select at least 2 vibe tags so we can calculate your Vibe Score.'
        })
      );
      return;
    }

    if (!agreedTerms) {
      dispatch(
        showToast({
          type: 'warning',
          title: 'Terms Agreement Required',
          message: 'Please review and accept Extroverts Terms of Service to complete registration.'
        })
      );
      return;
    }

    // Start Submission Simulation
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (simulateServerError) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Server Error Simulated',
            message: 'Network timeout during submission. (Toggle off "Simulate Server Failure" to succeed).'
          })
        );
      } else {
        // Save final data to Redux & complete
        dispatch(
          updateStep4({
            avatar,
            selectedVibes,
            agreedTerms
          })
        );
        dispatch(setIsCompleted(true));

        dispatch(
          showToast({
            type: 'success',
            title: '🎉 Registration Complete!',
            message: 'Welcome to Extroverts! Your profile pass has been generated.'
          })
        );
      }
    }, 1600);
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-6 max-w-xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Flame className="w-6 h-6 text-pink-500" />
          Step 4: Vibe & Profile Customization
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Pick your profile photo and choose your party vibes to complete your Extroverts Member Pass.
        </p>
      </div>

      {/* Avatar Picker & Upload */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Profile Photo / Avatar
        </label>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group">
            <img
              src={avatar}
              alt="Avatar preview"
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20"
            />
            <label className="absolute inset-0 bg-slate-950/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-semibold">
              Change
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setAvatar(preset.url)}
                  className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                    avatar === preset.url ? 'border-pink-500 scale-110 shadow-md shadow-pink-500/30' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <label className="inline-block text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer underline">
              Or upload custom photo (max 5MB)
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Vibe Tags Selection */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Your Party & Social Vibes (Min 2)
          </label>
          <span className="text-xs text-purple-400 font-bold">
            {selectedVibes.length} Selected
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {VIBE_INTERESTS.map((vibe) => {
            const isSelected = selectedVibes.includes(vibe.id);
            return (
              <button
                key={vibe.id}
                type="button"
                onClick={() => toggleVibe(vibe.id)}
                className={`p-3 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                <span className="text-xl">{vibe.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-white truncate">{vibe.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{vibe.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Profile Summary Card with Quick Edit Buttons */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSummary(!showSummary)}
          className="w-full p-4 flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition-colors text-left"
        >
          <div className="flex items-center gap-2 font-bold text-sm text-slate-200">
            <UserCheck className="w-4 h-4 text-purple-400" />
            <span>Profile Summary Review (Redux State)</span>
          </div>
          {showSummary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showSummary && (
          <div className="p-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
            {/* Step 1 summary */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-400 block">Step 1: Contact</span>
                <span className="text-white font-medium">{formData.email || 'Email missing'}</span> • <span className="text-slate-400">{formData.phone || 'Phone missing'}</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setStep(1))}
                className="px-2.5 py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/80 hover:bg-purple-900 border border-purple-800 rounded-lg flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            {/* Step 2 summary */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-400 block">Step 2: Profile</span>
                <span className="text-white font-medium">{formData.fullName || 'Name missing'}</span> ({formData.age ? `${formData.age} yrs` : 'Age'}) • <span className="text-slate-400">{formData.pronoun}</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setStep(2))}
                className="px-2.5 py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/80 hover:bg-purple-900 border border-purple-800 rounded-lg flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            {/* Step 3 summary */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-400 block">Step 3: Campus</span>
                <span className="text-white font-medium">{formData.college || 'College missing'}</span> • <span className="text-slate-400">{formData.city}, {formData.state}</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setStep(3))}
                className="px-2.5 py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/80 hover:bg-purple-900 border border-purple-800 rounded-lg flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reviewer Feature: Toggle Server Failure Simulation */}
      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-purple-300">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Reviewer Option: Simulate Server Failure</span>
        </div>
        <button
          type="button"
          onClick={() => dispatch(toggleSimulateServerError())}
          className="flex items-center gap-1 text-slate-300 font-semibold"
        >
          {simulateServerError ? (
            <span className="text-rose-400 flex items-center gap-1 font-bold">
              <ToggleRight className="w-6 h-6 text-rose-500" /> Enabled (Will Error)
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <ToggleLeft className="w-6 h-6 text-slate-600" /> Disabled (Normal Success)
            </span>
          )}
        </button>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedTerms}
            onChange={(e) => setAgreedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-950"
          />
          <span className="text-xs text-slate-300 leading-relaxed">
            I agree to Extroverts{' '}
            <button
              type="button"
              onClick={() => dispatch(setIsTermsOpen(true))}
              className="text-purple-400 underline font-semibold hover:text-purple-300"
            >
              Terms of Service & Community Guidelines
            </button>
            . I confirm I am 18+ years of age.
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => dispatch(prevStep())}
          disabled={isSubmitting}
          className="w-1/3 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm rounded-2xl border border-slate-800 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-2/3 py-4 text-white font-bold text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-slate-800 text-slate-400 cursor-wait border border-slate-700'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 shadow-purple-600/30 cursor-pointer hover:scale-[1.01]'
          }`}
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-purple-300" />
              <span>Creating Profile...</span>
            </>
          ) : (
            <>
              <span>Complete Profile & Get VIP Pass</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
