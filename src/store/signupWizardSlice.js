import { createSlice } from '@reduxjs/toolkit';
import { AVATAR_PRESETS } from '../data/mockData';

const initialFormData = {
  // Step 1
  email: '',
  phone: '',
  otpDigits: ['', '', '', '', '', ''],
  isOtpSent: false,
  isOtpVerified: false,

  // Step 2
  fullName: '',
  dob: '',
  age: null,
  gender: 'Female',
  pronoun: 'She / Her',
  customPronoun: '',
  bio: '',

  // Step 3
  state: '',
  city: '',
  college: '',
  customCollege: '',
  academicYear: '2nd Year (Sophomore)',

  // Step 4
  avatar: AVATAR_PRESETS[0].url,
  selectedVibes: ['house_parties', 'techno_rave', 'rooftop_chill'],
  agreedTerms: false
};

const initialState = {
  currentStep: 1,
  totalSteps: 4,
  isCompleted: false,
  formData: initialFormData
};

const signupWizardSlice = createSlice({
  name: 'signupWizard',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateStep1: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateStep2: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateStep3: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateStep4: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setAgreedTerms: (state, action) => {
      state.formData.agreedTerms = action.payload;
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload;
    },
    resetWizard: (state) => {
      state.currentStep = 1;
      state.isCompleted = false;
      state.formData = initialFormData;
    }
  }
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateStep1,
  updateStep2,
  updateStep3,
  updateStep4,
  setAgreedTerms,
  setIsCompleted,
  resetWizard
} = signupWizardSlice.actions;

export default signupWizardSlice.reducer;
