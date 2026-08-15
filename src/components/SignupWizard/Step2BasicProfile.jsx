import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Calendar, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';
import { PRONOUN_OPTIONS } from '../../data/mockData';
import { updateStep2, nextStep, prevStep } from '../../store/signupWizardSlice';
import { showToast } from '../../store/uiSlice';

export default function Step2BasicProfile() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signupWizard.formData);

  const [fullName, setFullName] = useState(formData.fullName || '');
  const [dob, setDob] = useState(formData.dob || '');
  const [gender, setGender] = useState(formData.gender || 'Female');
  const [pronoun, setPronoun] = useState(formData.pronoun || 'She / Her');
  const [customPronoun, setCustomPronoun] = useState(formData.customPronoun || '');
  const [bio, setBio] = useState(formData.bio || '');

  // Errors state
  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');

  // Calculate age from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculatedAge = calculateAge(dob);
  const isUnderage = calculatedAge !== null && calculatedAge < 18;

  // Validate Name
  const validateName = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      setNameError('Full name is required (cannot be blank spaces).');
      return false;
    }
    if (trimmed.length < 2) {
      setNameError('Name must be at least 2 characters long.');
      return false;
    }
    const nameRegex = /^[a-zA-Z\s'.-]+$/;
    if (!nameRegex.test(trimmed)) {
      setNameError('Name should only contain letters and spaces.');
      return false;
    }
    setNameError('');
    return true;
  };

  // Validate DOB & Age
  const validateDob = (val) => {
    if (!val) {
      setDobError('Date of birth is required.');
      return false;
    }
    const age = calculateAge(val);
    if (age === null || isNaN(age)) {
      setDobError('Please enter a valid date of birth.');
      return false;
    }
    if (age < 18) {
      setDobError('Must be at least 18 years old to register on Extroverts.');
      return false;
    }
    if (age > 100) {
      setDobError('Please enter a valid birth year.');
      return false;
    }
    setDobError('');
    return true;
  };

  // Handle Form Submit
  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    const isNameValid = validateName(fullName);
    const isDobValid = validateDob(dob);

    if (!isNameValid || !isDobValid) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Validation Error',
          message: isUnderage
            ? 'Registration blocked: Users under 18 cannot join Extroverts.'
            : 'Please resolve the highlighted field errors.'
        })
      );
      return;
    }

    dispatch(
      updateStep2({
        fullName: fullName.trim(),
        dob,
        age: calculatedAge,
        gender,
        pronoun: pronoun === 'Custom' ? customPronoun.trim() || 'Custom' : pronoun,
        bio: bio.trim()
      })
    );
    dispatch(nextStep());
  };

  return (
    <form onSubmit={handleSubmitStep2} className="space-y-6 max-w-xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-purple-400" />
          Step 2: Basic Profile & Age Check
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tell us about yourself so party hosts and campus peers know who you are.
        </p>
      </div>

      {/* Full Name Field */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Full Name <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="e.g. Anjana Sharma"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (nameError) validateName(e.target.value);
            }}
            onBlur={(e) => validateName(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              nameError
                ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                : 'border-slate-800 focus:border-purple-500'
            }`}
          />
        </div>
        {nameError && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {nameError}
          </p>
        )}
      </div>

      {/* Date of Birth & Age Check */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Date of Birth (18+ Only) <span className="text-pink-500">*</span>
          </label>
          {calculatedAge !== null && !isNaN(calculatedAge) && (
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                isUnderage
                  ? 'bg-red-950/80 text-red-300 border-red-800'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
              }`}
            >
              Calculated Age: {calculatedAge} yrs
            </span>
          )}
        </div>

        <div className="relative">
          <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              validateDob(e.target.value);
            }}
            onBlur={(e) => validateDob(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              dobError || isUnderage
                ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                : 'border-slate-800 focus:border-purple-500'
            }`}
          />
        </div>

        {/* UX Edge Case Alert for Under 18 */}
        {isUnderage && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs sm:text-sm space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-red-300">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>Age Limit Warning: 18+ Platform Required</span>
            </div>
            <p className="text-xs text-red-300/90 leading-relaxed">
              Extroverts features nightlife, party meetups, and adult social gatherings. Users under 18 years of age cannot complete registration.
            </p>
          </div>
        )}

        {dobError && !isUnderage && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {dobError}
          </p>
        )}
      </div>

      {/* Gender & Pronouns */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Pronouns & Gender Identity
        </label>
        
        {/* Pronouns Pills */}
        <div className="flex flex-wrap gap-2">
          {PRONOUN_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setPronoun(opt)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                pronoun === opt
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Bio / Headline */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Short Headline / Bio
          </label>
          <span className="text-[11px] text-slate-500">{bio.length}/160</span>
        </div>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <textarea
            rows={3}
            maxLength={160}
            placeholder="e.g. CS major • Love house parties, synthwave music, and late-night taco runs 🌮"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => dispatch(prevStep())}
          className="w-1/3 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm rounded-2xl border border-slate-800 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isUnderage}
          className={`w-2/3 py-4 text-white font-bold text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
            isUnderage
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60 border border-slate-700'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 shadow-purple-600/30 cursor-pointer hover:scale-[1.01]'
          }`}
        >
          <span>Continue to Step 3: Campus & City</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
