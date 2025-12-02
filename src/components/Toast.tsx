import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-top-2 duration-300"
      role="alert"
    >
      <div className="bg-gradient-to-r from-purple-500/95 to-pink-500/95 backdrop-blur-xl border border-white/20 rounded-[16px] shadow-2xl shadow-purple-500/30 px-5 py-3 flex items-center gap-3 min-w-[280px]">
        <CheckCircle2 className="size-5 text-white flex-shrink-0" strokeWidth={2} />
        <span className="font-['Inter',sans-serif] text-[14px] font-medium text-white flex-1">
          {message}
        </span>
        <button
          onClick={onClose}
          className="size-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="size-4 text-white/80" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
