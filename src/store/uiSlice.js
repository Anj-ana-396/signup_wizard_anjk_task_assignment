import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'landing', // 'landing' | 'wizard'
  deviceView: 'full',   // 'full' | 'mobile'
  isTermsOpen: false,
  toast: null,
  simulateServerError: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setDeviceView: (state, action) => {
      state.deviceView = action.payload;
    },
    setIsTermsOpen: (state, action) => {
      state.isTermsOpen = action.payload;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
    toggleSimulateServerError: (state) => {
      state.simulateServerError = !state.simulateServerError;
    }
  }
});

export const {
  setActiveTab,
  setDeviceView,
  setIsTermsOpen,
  showToast,
  hideToast,
  toggleSimulateServerError
} = uiSlice.actions;

export default uiSlice.reducer;
