import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { hideToast } from '../store/uiSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toast && toast.autoClose !== false) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, toast.duration || 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const typeStyles = {
    error: {
      bg: 'bg-red-950/90 border-red-500/50 text-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
      accent: 'bg-red-500'
    },
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
      accent: 'bg-emerald-500'
    },
    warning: {
      bg: 'bg-amber-950/90 border-amber-500/50 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
      accent: 'bg-amber-500'
    },
    info: {
      bg: 'bg-purple-950/90 border-purple-500/50 text-purple-200',
      icon: <Info className="w-5 h-5 text-purple-400 shrink-0" />,
      accent: 'bg-purple-500'
    }
  };

  const style = typeStyles[toast.type] || typeStyles.info;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl ${style.bg}`}>
        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${style.accent}`} />
        {style.icon}
        <div className="flex-1 pr-2">
          {toast.title && <h4 className="font-semibold text-sm leading-tight text-white mb-1">{toast.title}</h4>}
          <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={() => dispatch(hideToast())}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
