import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Building2, GraduationCap, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { STATES_AND_CITIES, ACADEMIC_YEARS } from '../../data/mockData';
import { updateStep3, nextStep, prevStep } from '../../store/signupWizardSlice';
import { showToast } from '../../store/uiSlice';

export default function Step3AcademicLocation() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signupWizard.formData);

  const [state, setState] = useState(formData.state || '');
  const [city, setCity] = useState(formData.city || '');
  const [college, setCollege] = useState(formData.college || '');
  const [customCollege, setCustomCollege] = useState(formData.customCollege || '');
  const [academicYear, setAcademicYear] = useState(formData.academicYear || '2nd Year (Sophomore)');

  // Errors state
  const [stateError, setStateError] = useState('');
  const [cityError, setCityError] = useState('');
  const [collegeError, setCollegeError] = useState('');

  // Dependent options logic
  const selectedStateObj = STATES_AND_CITIES.find((s) => s.state === state);
  const availableCities = selectedStateObj ? selectedStateObj.cities : [];
  
  const selectedCityObj = availableCities.find((c) => c.name === city);
  const availableColleges = selectedCityObj ? selectedCityObj.colleges : [];

  // Reset city and college if state changes
  const handleStateChange = (newState) => {
    setState(newState);
    setCity('');
    setCollege('');
    setCustomCollege('');
    setStateError('');
    setCityError('');
    setCollegeError('');
  };

  // Reset college if city changes
  const handleCityChange = (newCity) => {
    setCity(newCity);
    setCollege('');
    setCustomCollege('');
    setCityError('');
    setCollegeError('');
  };

  // Handle Form Submit
  const handleSubmitStep3 = (e) => {
    e.preventDefault();
    let valid = true;

    if (!state) {
      setStateError('Please select your state or province.');
      valid = false;
    }
    if (!city) {
      setCityError('Please select your city.');
      valid = false;
    }
    if (!college) {
      setCollegeError('Please select your college or university.');
      valid = false;
    } else if (college === 'Other' && !customCollege.trim()) {
      setCollegeError('Please enter your college name.');
      valid = false;
    }

    if (!valid) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Validation Error',
          message: 'Please complete state, city, and college selection.'
        })
      );
      return;
    }

    dispatch(
      updateStep3({
        state,
        city,
        college: college === 'Other' ? customCollege.trim() : college,
        customCollege: college === 'Other' ? customCollege.trim() : '',
        academicYear
      })
    );
    dispatch(nextStep());
  };

  return (
    <form onSubmit={handleSubmitStep3} className="space-y-6 max-w-xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-400" />
          Step 3: Location & Campus Details
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Extroverts uses your location and campus to match you with nearby party squads and campus meetups.
        </p>
      </div>

      {/* Cascading State Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          State / Region <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <select
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            className={`w-full pl-10 pr-10 py-3 bg-slate-900 border rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none ${
              stateError ? 'border-red-500/80 bg-red-950/20' : 'border-slate-800 focus:border-purple-500'
            }`}
          >
            <option value="" disabled>-- Select Your State --</option>
            {STATES_AND_CITIES.map((s) => (
              <option key={s.state} value={s.state} className="bg-slate-900 text-white">
                {s.state}
              </option>
            ))}
          </select>
          <ChevronRight className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none rotate-90" />
        </div>
        {stateError && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {stateError}
          </p>
        )}
      </div>

      {/* Cascading City Dropdown (Dependent on State) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          City <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <select
            value={city}
            disabled={!state}
            onChange={(e) => handleCityChange(e.target.value)}
            className={`w-full pl-10 pr-10 py-3 bg-slate-900 border rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none ${
              !state
                ? 'opacity-50 cursor-not-allowed border-slate-800'
                : cityError
                ? 'border-red-500/80 bg-red-950/20'
                : 'border-slate-800 focus:border-purple-500'
            }`}
          >
            <option value="" disabled>
              {state ? '-- Select Your City --' : 'Select State First'}
            </option>
            {availableCities.map((c) => (
              <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                {c.name}
              </option>
            ))}
          </select>
          <ChevronRight className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none rotate-90" />
        </div>
        {cityError && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {cityError}
          </p>
        )}
      </div>

      {/* Cascading College Dropdown (Dependent on City/State) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          College / University <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <select
            value={college}
            disabled={!city}
            onChange={(e) => {
              setCollege(e.target.value);
              setCollegeError('');
            }}
            className={`w-full pl-10 pr-10 py-3 bg-slate-900 border rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none ${
              !city
                ? 'opacity-50 cursor-not-allowed border-slate-800'
                : collegeError
                ? 'border-red-500/80 bg-red-950/20'
                : 'border-slate-800 focus:border-purple-500'
            }`}
          >
            <option value="" disabled>
              {city ? '-- Select College / University --' : 'Select City First'}
            </option>
            {availableColleges.map((col) => (
              <option key={col} value={col} className="bg-slate-900 text-white">
                {col}
              </option>
            ))}
            <option value="Other" className="bg-slate-900 text-purple-300 font-semibold">
              + Other (Enter Custom College)
            </option>
          </select>
          <ChevronRight className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none rotate-90" />
        </div>

        {/* Custom College Input if "Other" selected */}
        {college === 'Other' && (
          <div className="pt-2 animate-in fade-in duration-200">
            <input
              type="text"
              placeholder="Type your university/institute name..."
              value={customCollege}
              onChange={(e) => setCustomCollege(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-purple-500/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>
        )}

        {collegeError && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {collegeError}
          </p>
        )}
      </div>

      {/* Year of Study */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Year of Study / Status
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ACADEMIC_YEARS.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setAcademicYear(yr)}
              className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all ${
                academicYear === yr
                  ? 'bg-purple-600 text-white border border-purple-400 shadow-md shadow-purple-600/30 font-semibold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {yr}
            </button>
          ))}
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
          className="w-2/3 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Step 4: Vibe & Submit</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
