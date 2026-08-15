import React, { useState } from 'react';
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

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'wizard'
  const [deviceView, setDeviceView] = useState('full'); // 'full' | 'mobile'
  const [currentStep, setCurrentStep] = useState(1); // 1..4
  const [isCompleted, setIsCompleted] = useState(false);

  // Modals & Toast State
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Form State Persistence Across Steps
  const [formData, setFormData] = useState({
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
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    selectedVibes: ['house_parties', 'techno_rave', 'rooftop_chill'],
    agreedTerms: false
  });

  const stepTitles = [
    'Account Verification',
    'Personal Profile',
    'Campus & City',
    'Vibe & Submit'
  ];

  // Helper for displaying toast notifications
  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Reset entire signup wizard state
  const handleResetWizard = () => {
    setFormData({
      email: '',
      phone: '',
      otpDigits: ['', '', '', '', '', ''],
      isOtpSent: false,
      isOtpVerified: false,
      fullName: '',
      dob: '',
      age: null,
      gender: 'Female',
      pronoun: 'She / Her',
      customPronoun: '',
      bio: '',
      state: '',
      city: '',
      college: '',
      customCollege: '',
      academicYear: '2nd Year (Sophomore)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      selectedVibes: ['house_parties', 'techno_rave', 'rooftop_chill'],
      agreedTerms: false
    });
    setCurrentStep(1);
    setIsCompleted(false);
    showToast({
      type: 'info',
      title: 'Wizard Reset',
      message: 'Signup wizard form has been reset to initial state.'
    });
  };

  // Wizard Step Content Renderer
  const renderStepContent = () => {
    if (isCompleted) {
      return (
        <SuccessScreen
          formData={formData}
          onResetWizard={handleResetWizard}
          onGoHome={() => setActiveTab('landing')}
          showToast={showToast}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <Step1AccountVerification
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(2)}
            showToast={showToast}
          />
        );
      case 2:
        return (
          <Step2BasicProfile
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            showToast={showToast}
          />
        );
      case 3:
        return (
          <Step3AcademicLocation
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
            showToast={showToast}
          />
        );
      case 4:
        return (
          <Step4VibeProfile
            formData={formData}
            setFormData={setFormData}
            onComplete={() => setIsCompleted(true)}
            onBack={() => setCurrentStep(3)}
            onJumpToStep={(stepNum) => setCurrentStep(stepNum)}
            onOpenTerms={() => setIsTermsOpen(true)}
            showToast={showToast}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Toast Alert Banner */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        isAccepted={formData.agreedTerms}
        onAccept={() => {
          setFormData((prev) => ({ ...prev, agreedTerms: true }));
          showToast({
            type: 'success',
            title: 'Terms Accepted',
            message: 'You have agreed to Extroverts Terms of Service & Privacy Policy.'
          });
        }}
      />

      {/* Global Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        deviceView={deviceView}
        setDeviceView={setDeviceView}
        onOpenTerms={() => setIsTermsOpen(true)}
        onResetWizard={handleResetWizard}
        currentStep={currentStep}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'landing' ? (
          <LandingPage
            onStartSignup={() => setActiveTab('wizard')}
            onOpenTerms={() => setIsTermsOpen(true)}
          />
        ) : (
          <MobileDeviceFrame isMobileView={deviceView === 'mobile'} setDeviceView={setDeviceView}>
            <div className="w-full min-h-full bg-slate-950 flex flex-col pb-12">
              {!isCompleted && (
                <WizardHeader
                  currentStep={currentStep}
                  totalSteps={4}
                  onBack={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  stepTitles={stepTitles}
                />
              )}
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
            <span>• Party • Hangout • Vibe Replication</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-purple-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-purple-300 transition-colors">
              Safety Rules
            </button>
            <button onClick={handleResetWizard} className="hover:text-pink-300 transition-colors">
              Reset Form
            </button>
          </div>
          <p>© 2026 Extroverts Application Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
