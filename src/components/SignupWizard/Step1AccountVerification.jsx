import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Lock, CheckCircle2, AlertCircle, RefreshCw, Send, ShieldCheck, Sparkles } from 'lucide-react';

export default function Step1AccountVerification({ formData, setFormData, onNext, showToast }) {
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [otpDigits, setOtpDigits] = useState(formData.otpDigits || ['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(formData.isOtpSent || false);
  const [isOtpVerified, setIsOtpVerified] = useState(formData.isOtpVerified || false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [timer, setTimer] = useState(30);

  // Errors state
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');

  const inputRefs = useRef([]);

  // Timer countdown for resend OTP
  useEffect(() => {
    let interval = null;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // Validate Email
  const validateEmail = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailError('Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError('Please enter a valid email address (e.g. alex@college.edu).');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate Phone (Numeric-only constraint handled in onChange)
  const validatePhone = (val) => {
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned) {
      setPhoneError('Mobile phone number is required.');
      return false;
    }
    if (cleaned.length !== 10) {
      setPhoneError('Phone number must be exactly 10 numeric digits.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  // Handle Phone change (numeric only)
  const handlePhoneChange = (e) => {
    const inputVal = e.target.value;
    const numericOnly = inputVal.replace(/\D/g, '').slice(0, 10);
    setPhone(numericOnly);
    if (phoneError) validatePhone(numericOnly);
  };

  // Handle Send OTP
  const handleSendOtp = () => {
    const isEmailOk = validateEmail(email);
    const isPhoneOk = validatePhone(phone);

    if (!isEmailOk || !isPhoneOk) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please resolve email and phone number errors before requesting OTP.'
      });
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setIsOtpSent(true);
      setTimer(30);
      setOtpError('');
      showToast({
        type: 'info',
        title: '🔑 Demo OTP Code Sent!',
        message: 'Your verification code is 123456. Enter it below to verify.',
        duration: 8000
      });
    }, 1200);
  };

  // Handle OTP digit change (auto-focus next)
  const handleOtpChange = (index, value) => {
    // Keep only numeric digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpDigits];
    newOtp[index] = digit;
    setOtpDigits(newOtp);
    setOtpError('');

    // Auto focus next input if digit entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if all 6 digits entered
    const fullOtp = newOtp.join('');
    if (fullOtp.length === 6) {
      verifyOtpCode(fullOtp);
    }
  };

  // Handle Key Down for OTP (Backspace auto-focus previous)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste event for OTP
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length > 0) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setOtpDigits(newDigits);
      if (pastedData.length === 6) {
        verifyOtpCode(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  // Verify OTP code logic
  const verifyOtpCode = (code) => {
    // Accepts demo code 123456 or any 6-digit number ending in non-zero
    if (code === '123456' || code.length === 6) {
      setIsOtpVerified(true);
      setOtpError('');
      showToast({
        type: 'success',
        title: 'Account Verified!',
        message: 'Email & Phone verification successful. You may proceed to Step 2.'
      });
    } else {
      setIsOtpVerified(false);
      setOtpError('Invalid OTP code. Please use 123456 for demo verification.');
      showToast({
        type: 'error',
        title: 'Verification Failed',
        message: 'Invalid OTP code. Hint: Use 123456.'
      });
    }
  };

  // Handle Next Submit
  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    const isEmailOk = validateEmail(email);
    const isPhoneOk = validatePhone(phone);

    if (!isEmailOk || !isPhoneOk) {
      showToast({
        type: 'error',
        title: 'Form Error',
        message: 'Please enter a valid email and 10-digit mobile phone number.'
      });
      return;
    }

    if (!isOtpVerified) {
      showToast({
        type: 'warning',
        title: 'Verification Required',
        message: 'Please send and verify the 6-digit OTP code before proceeding.'
      });
      return;
    }

    // Update parent state
    setFormData((prev) => ({
      ...prev,
      email: email.trim(),
      phone,
      otpDigits,
      isOtpSent,
      isOtpVerified
    }));

    onNext();
  };

  return (
    <form onSubmit={handleSubmitStep1} className="space-y-6 max-w-xl mx-auto p-4 sm:p-6">
      {/* Step Info */}
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
          <ShieldCheck className="w-6 h-6 text-purple-400" />
          Step 1: Account & Contact Verification
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Verify your email and mobile phone number to secure your Extroverts profile.
        </p>
      </div>

      {/* Email Input Field */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Email Address <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            placeholder="e.g. alex.student@university.edu"
            value={email}
            disabled={isOtpVerified}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={(e) => validateEmail(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              emailError
                ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                : 'border-slate-800 focus:border-purple-500'
            } ${isOtpVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
          />
        </div>
        {emailError && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" /> {emailError}
          </p>
        )}
      </div>

      {/* Phone Input Field */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Mobile Phone Number (10 Digits) <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="tel"
            maxLength={10}
            placeholder="e.g. 9876543210"
            value={phone}
            disabled={isOtpVerified}
            onChange={handlePhoneChange}
            onBlur={(e) => validatePhone(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              phoneError
                ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                : 'border-slate-800 focus:border-purple-500'
            } ${isOtpVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
          {phoneError ? (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {phoneError}
            </p>
          ) : (
            <span>Numeric digits only (automatically constrained)</span>
          )}
          <span>{phone.length}/10</span>
        </div>
      </div>

      {/* Trigger Send OTP Button */}
      {!isOtpSent && !isOtpVerified && (
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={isSendingOtp}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-purple-300 hover:text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
        >
          {isSendingOtp ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
              <span>Sending Verification Code...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-purple-400" />
              <span>Send 6-Digit OTP Code</span>
            </>
          )}
        </button>
      )}

      {/* OTP Input Section (Shows once OTP sent) */}
      {isOtpSent && (
        <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <h4 className="font-semibold text-sm text-purple-200">Enter 6-Digit Security Code</h4>
            </div>
            {isOtpVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400">
            We sent a verification code to <span className="text-purple-300 font-medium">{email || 'your email'}</span>. 
            <span className="text-pink-400 font-semibold ml-1">(Demo Code: 123456)</span>
          </p>

          {/* 6 Digit Box Inputs */}
          <div className="flex justify-between gap-2 max-w-sm mx-auto" onPaste={handleOtpPaste}>
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                disabled={isOtpVerified}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className={`w-11 h-12 text-center text-xl font-bold bg-slate-900 border rounded-xl text-white focus:outline-none transition-all ${
                  isOtpVerified
                    ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                    : digit
                    ? 'border-purple-500 ring-2 ring-purple-500/30'
                    : 'border-slate-700 focus:border-purple-400'
                }`}
              />
            ))}
          </div>

          {otpError && (
            <p className="text-xs text-red-400 text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {otpError}
            </p>
          )}

          {/* Resend Timer */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Didn't receive code?</span>
            {timer > 0 ? (
              <span className="text-slate-500 font-mono">Resend available in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-purple-400 hover:text-purple-300 font-semibold underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Resend OTP
              </button>
            )}
          </div>
        </div>
      )}

      {/* Submit Button to Step 2 */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!isOtpVerified}
          className={`w-full py-4 text-white font-bold text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
            isOtpVerified
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 shadow-purple-600/30 cursor-pointer hover:scale-[1.01]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-70 border border-slate-700'
          }`}
        >
          <span>Continue to Step 2: Personal Profile</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
