import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import TermsModal from './components/TermsModal';
import Toast from './components/Toast';
import MobileDeviceFrame from './components/MobileDeviceFrame';
import WizardHeader from './components/SignupWizard/WizardHeader';
import Step1AccountVerification from './components/SignupWizard/Step1AccountVerification';
import Step2BasicProfile from './components/SignupWizard/Step2BasicProfile';
import Step3AcademicLocation from './components/SignupWizard/Step3AcademicLocation';
import Step4VibeProfile from './components/SignupWizard/Step4VibeProfile';
import SuccessScreen from './components/SignupWizard/SuccessScreen';
import { setIsTermsOpen } from './store/uiSlice';
import { resetWizard } from './store/signupWizardSlice';

export default function App() {
  const dispatch = useDispatch();
  const { activeTab, deviceView } = useSelector((state) => state.ui);
  const { currentStep, isCompleted } = useSelector((state) => state.signupWizard);

  // Wizard Step Content Renderer
  const renderStepContent = () => {
    if (isCompleted) {
      return <SuccessScreen />;
    }

    switch (currentStep) {
      case 1:
        return <Step1AccountVerification />;
      case 2:
        return <Step2BasicProfile />;
      case 3:
        return <Step3AcademicLocation />;
      case 4:
        return <Step4VibeProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Toast Alert Banner */}
      <Toast />

      {/* Terms & Conditions Modal */}
      <TermsModal />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'landing' ? (
          <LandingPage />
        ) : (
          <MobileDeviceFrame isMobileView={deviceView === 'mobile'}>
            <div className="w-full min-h-full bg-slate-950 flex flex-col pb-12">
              {!isCompleted && <WizardHeader />}
              <div className="flex-1 py-4">{renderStepContent()}</div>
            </div>
          </MobileDeviceFrame>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">EXTROVERTS</span>
            <span>• Redux Toolkit State Management</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => dispatch(setIsTermsOpen(true))} className="hover:text-purple-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => dispatch(setIsTermsOpen(true))} className="hover:text-purple-300 transition-colors">
              Safety Rules
            </button>
            <button onClick={() => dispatch(resetWizard())} className="hover:text-pink-300 transition-colors">
              Reset Form
            </button>
          </div>
          <p>© 2026 Extroverts Application Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
