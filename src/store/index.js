import { configureStore } from '@reduxjs/toolkit';
import signupWizardReducer from './signupWizardSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    signupWizard: signupWizardReducer,
    ui: uiReducer
  }
});
