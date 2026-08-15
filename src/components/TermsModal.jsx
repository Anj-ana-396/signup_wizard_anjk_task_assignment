import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle, Search, Scroll } from 'lucide-react';

export default function TermsModal({ isOpen, onClose, onAccept, isAccepted }) {
  const [activeTab, setActiveTab] = useState('terms');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const termsContent = [
    {
      title: "1. Eligibility & Age Restriction (18+ Mandatory)",
      content: "Extroverts is strictly designed for adults aged 18 years or older due to the social, party, and nightlife nature of events hosted on our platform. By registering, you confirm you are at least 18 years of age. Accounts found belonging to minors will be permanently suspended."
    },
    {
      title: "2. User Conduct & Safe Community Rules",
      content: "Respect and consent are non-negotiable. Zero tolerance policy for harassment, hate speech, unauthorized filming at private hangouts, or inappropriate behavior. Extroverts reserves the right to ban users who violate community safety standards."
    },
    {
      title: "3. Event Participation & Personal Responsibility",
      content: "Users attending meetups, house parties, or campus events do so at their own discretion. Extroverts facilitates connections but is not liable for personal conduct at third-party gatherings. Always follow safety guidelines and local regulations."
    },
    {
      title: "4. Account Verification & Profile Authenticity",
      content: "You agree to provide accurate details (Name, College, Email, DOB). Impersonation, fake profiles, or automated bot signups are prohibited. Email & OTP verification are required to unlock party invites."
    },
    {
      title: "5. Privacy & Data Usage",
      content: "We respect your personal information. Location data is only requested with explicit permission to match you with nearby campus hangouts and city events. We do not sell your personal data to third parties."
    }
  ];

  const filteredTerms = termsContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Extroverts Terms & Safety Policy</h3>
              <p className="text-xs text-slate-400">Last updated: August 2026 • Version 2.4</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Search */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'terms' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'safety' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" /> Safety Guidelines
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 bg-slate-900 border border-slate-700/60 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 w-full sm:w-48"
            />
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-300 text-sm leading-relaxed">
          {activeTab === 'terms' ? (
            filteredTerms.length > 0 ? (
              filteredTerms.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <h4 className="font-semibold text-purple-300 mb-1.5 text-base">{item.title}</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">No terms found matching "{searchTerm}"</p>
            )
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-purple-200 text-xs sm:text-sm">
                <h4 className="font-semibold text-purple-300 text-base mb-2">🎉 Extroverts Vibe Code</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Be Genuine:</strong> Real photos & authentic interests make party matching fun.</li>
                  <li><strong>Respect Boundaries:</strong> Always check with party hosts regarding guest list rules.</li>
                  <li><strong>No Spamming:</strong> Keep event discussions focused on real meetups & vibes.</li>
                  <li><strong>Look Out For Peers:</strong> Report any toxic behavior immediately via in-app flagging.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle className={`w-4 h-4 ${isAccepted ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span>{isAccepted ? 'Terms accepted for signup' : 'You must accept terms to submit profile'}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Close
            </button>
            {onAccept && (
              <button
                onClick={() => {
                  onAccept();
                  onClose();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" /> Accept Terms
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
