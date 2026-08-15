# Extroverts Signup Wizard Replication & Landing Page

[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple.svg)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-v6-646cff.svg)](https://vitejs.dev/)

A high-fidelity, responsive, and feature-complete replication of the **Signup Wizard** for **Extroverts - Party • Hangout • Vibe** (Reference app package: [`com.pro.nubpack`](https://play.google.com/store/apps/details?id=com.pro.nubpack)).

Built for the **Frontend Engineering Assessment**, this project implements modern UI/UX design patterns, **Redux Toolkit** centralized state management, real-time validations, edge case handling (such as age restrictions for under-18 users), cascading location pickers, and interactive device preview modes.

---

## 📋 Assessment Requirement Mapping Matrix

| Requirement / Criteria | Implementation Detail | Target Source File |
| :--- | :--- | :--- |
| **Landing Page Mechanism** | Hero section, app features grid, micro stats, party vibe preview | [`LandingPage.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/LandingPage.jsx) |
| **Terms & Conditions Page** | Tabbed TOS & Safety Rules, instant search filter, agreement checkbox | [`TermsModal.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/TermsModal.jsx) |
| **Progressive Disclosure Wizard** | 4-step wizard with visual progress bar and step indicators | [`WizardHeader.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/WizardHeader.jsx) |
| **Real-time Validation** | Email format regex check, instant blur/change feedback, required fields | [`Step1AccountVerification.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step1AccountVerification.jsx) |
| **Enhanced OTP Experience** | Auto-focusing 6-digit pin boxes, paste handling (`123456`), 30s resend timer | [`Step1AccountVerification.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step1AccountVerification.jsx) |
| **Age Limit Handling (<18)** | Automatic age calculation from DOB, prominent under-18 alert & block | [`Step2BasicProfile.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step2BasicProfile.jsx) |
| **Input Constraints** | Digit-only filter for phone (10 max), no whitespace-only names | [`Step1AccountVerification.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step1AccountVerification.jsx) |
| **Cascading Selectors** | State → City → College dependent dropdown filtering + Custom institute | [`Step3AcademicLocation.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step3AcademicLocation.jsx) |
| **Profile & Vibe Customization** | Custom photo upload, avatar presets, multi-select party vibe tags | [`Step4VibeProfile.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step4VibeProfile.jsx) |
| **Summary & Quick Back Edit** | Collapsible summary card with inline "Edit" buttons to jump to previous steps | [`Step4VibeProfile.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step4VibeProfile.jsx) |
| **Loading State & Error Toast** | Submission spinner, double-submit block, reviewer server failure toggle | [`Step4VibeProfile.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/Step4VibeProfile.jsx), [`Toast.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/Toast.jsx) |
| **Success Feedback & Pass** | Confetti celebration, Digital VIP Member Pass card with QR Code | [`SuccessScreen.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/SignupWizard/SuccessScreen.jsx) |
| **Responsive Device Simulator** | Toggle between Mobile iPhone Frame View and Full Desktop View | [`MobileDeviceFrame.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/MobileDeviceFrame.jsx), [`Navbar.jsx`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/components/Navbar.jsx) |
| **Redux Toolkit State** | Centralized slices for form data and UI overlay states | [`store/signupWizardSlice.js`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/store/signupWizardSlice.js), [`store/uiSlice.js`](file:///c:/Users/anjan/OneDrive/Desktop/Signup_wizard_anjana_task_assignment/src/store/uiSlice.js) |

---

## 🚀 Live Demo & Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation & Running Locally

1. **Clone or navigate to project directory**:
   ```bash
   cd Signup_wizard_anjana_task_assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://127.0.0.1:5173/`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📦 State Management Architecture (Redux Toolkit)

The application utilizes **Redux Toolkit (`@reduxjs/toolkit` and `react-redux`)** for global, predictable, and maintainable state management across all 4 steps of the wizard and global UI overlays:

### Redux Slices:

1. **`signupWizardSlice.js`**:
   - Manages multi-step wizard state (`currentStep`, `totalSteps`, `isCompleted`).
   - Persists all user input data across step transitions (Email, Phone, OTP status, Full Name, DOB, Age, Pronouns, State, City, College, Academic Year, Avatar, Vibe tags, Terms agreement).
   - Actions: `setStep`, `nextStep`, `prevStep`, `updateStep1`, `updateStep2`, `updateStep3`, `updateStep4`, `setAgreedTerms`, `setIsCompleted`, `resetWizard`.

2. **`uiSlice.js`**:
   - Manages global layout states (`activeTab`: 'landing' | 'wizard', `deviceView`: 'full' | 'mobile').
   - Handles global Toast Alert Banners (`showToast`, `hideToast`).
   - Controls Terms & Conditions Modal visibility (`setIsTermsOpen`).
   - Controls reviewer server error simulation toggle (`toggleSimulateServerError`).

---

## 🌟 Key Features & Functional Requirements

### 1. 📱 Landing Page & Responsive Viewport Simulator
- **Hero Banner**: Bold typography (Poppins), vibrant neon dark mode styling (`#0B0F19` slate background with purple/pink glassmorphism), micro stats counter, and quick CTA buttons.
- **Mobile Shell Device View Toggle**: Click **"Mobile Shell"** on the top navigation bar to test the application framed within an interactive **iPhone Device Frame** with status bar, signal indicators, and notch, or switch back to **"Full Responsive"** view for standard desktop testing.

### 2. 📜 Terms & Conditions Modal (`TermsModal.jsx`)
- Accessible anytime from the navbar or step 4.
- Features tabbed views (*Terms of Service*, *Safety Rules*), real-time search within terms, and an instant acceptance toggle integrated with Redux state.

### 3. 🧙‍♂️ 4-Step Signup Wizard (`SignupWizard/`)

#### Step 1: Account Verification (`Step1AccountVerification.jsx`)
- **Real-time Email Validation**: Regex check on-blur/on-change with clear error messages.
- **Numeric-Only Phone Input**: Automatically strips non-numeric characters and enforces a 10-digit limit.
- **Enhanced 6-Digit OTP UI**: Auto-focusing pin boxes, backspace keyboard navigation, paste handler (`123456`), 30-second resend countdown timer, demo OTP toast prompt (`Demo OTP: 123456`), and verified badge.

#### Step 2: Basic Profile & Age Check (`Step2BasicProfile.jsx`)
- **Full Name Validation**: Prevents whitespace-only entries, requires at least 2 alphabetic characters.
- **Age Restriction Edge Case (<18 Handling)**: Automatically calculates exact age from Date of Birth. If the calculated age is **under 18**, a prominent **Age Limit Warning Banner** is shown, explaining that Extroverts is an 18+ platform, and form submission is disabled.
- **Pronouns & Gender Selection**: Interactive pill selection (*He/Him, She/Her, They/Them, Ze/Zir, Custom*).
- **Bio/Headline**: Character counter with a 160-character cap.

#### Step 3: Campus & Location Cascading Selectors (`Step3AcademicLocation.jsx`)
- **Cross-Field Cascading Logic**:
  - Selecting a **State** dynamically filters available **Cities**.
  - Selecting a **City** populates corresponding **Colleges & Universities**.
  - Includes an `+ Other (Enter Custom College)` option that renders an inline custom university input.
- **Academic Year Filter**: 1st Year (Freshman) to Senior / Alumni pills.

#### Step 4: Vibe Profile & Submission Simulation (`Step4VibeProfile.jsx`)
- **Profile Photo Picker**: Upload custom photo or pick from 6 curated preset avatars.
- **Multi-Select Party Vibes**: Selectable grid of 10 vibe tags with icons (*House Parties, Techno Raves, Tech Startups, Board Games, etc.*).
- **Collapsible Profile Summary Card**: Lists all entered data across Steps 1-3 from Redux store with quick inline **"Edit"** buttons to jump straight back to previous steps.
- **Reviewer Option (Server Failure Simulation)**: Toggle to simulate network timeout error toast vs. successful completion scenario.
- **Button Loading State**: Animated spinner on submit to prevent duplicate submissions.

### 4. 🎟️ Success Screen & Digital VIP Pass (`SuccessScreen.jsx`)
- Celebratory **canvas-confetti** explosion on completion.
- Renders an **Extroverts VIP Digital Member Pass** card with a generated QR code, Member ID (`EXT-2026-XXXX`), user photo, college, city, age, and vibe tags.
- Option to download the pass or reset the wizard to test again.

---

## 📁 Project Structure

```
Signup_wizard_anjana_task_assignment/
├── index.html                  # HTML template with Google Fonts (Poppins)
├── vite.config.js              # Vite configuration with @tailwindcss/vite
├── src/
│   ├── main.jsx                # Entry point with Redux Provider
│   ├── App.jsx                 # Main application state & step router
│   ├── index.css               # Tailwind CSS & custom glassmorphism styles
│   ├── store/
│   │   ├── index.js            # Redux store configuration
│   │   ├── signupWizardSlice.js # Signup wizard state slice
│   │   └── uiSlice.js          # UI overlays, device view, toast state slice
│   ├── data/
│   │   └── mockData.js         # States, cities, colleges, avatars, vibe tags
│   ├── components/
│   │   ├── Navbar.jsx          # Header with device view toggle & links
│   │   ├── Toast.jsx           # Global error/success/warning notification toasts
│   │   ├── TermsModal.jsx      # Terms & Conditions modal with search
│   │   ├── MobileDeviceFrame.jsx # Mobile iPhone frame viewport simulator
│   │   ├── LandingPage.jsx     # Landing page hero & app feature showcase
│   │   └── SignupWizard/
│   │       ├── WizardHeader.jsx            # Step progress bar & back navigation
│   │       ├── Step1AccountVerification.jsx # Email, Phone, & OTP verification
│   │       ├── Step2BasicProfile.jsx       # Name, DOB, Age check (<18 block)
│   │       ├── Step3AcademicLocation.jsx   # Cascading State->City->College selects
│   │       ├── Step4VibeProfile.jsx        # Avatar, Vibe tags, summary review
│   │       └── SuccessScreen.jsx           # VIP Member pass & confetti explosion
└── package.json
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (`@reduxjs/toolkit`, `react-redux`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Typography**: Google Fonts — **Poppins**
