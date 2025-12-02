import { useEffect, useState } from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface AudioStatusIndicatorProps {
  hasAudioError: boolean;
  onRetry: () => void;
}

export function AudioStatusIndicator({ hasAudioError, onRetry }: AudioStatusIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (hasAudioError && !isDismissed) {
      setIsVisible(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasAudioError, isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-24 right-8 z-40 animate-fade-in">
      <div className="px-4 py-3 rounded-xl bg-amber-500/20 backdrop-blur-xl border border-amber-400/40 shadow-xl max-w-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-white text-sm mb-2">
              Some ambient sounds may not load. Click the orb and adjust volumes to try different sounds.
            </p>
            <button
              onClick={() => {
                onRetry();
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="text-xs text-amber-300 hover:text-amber-200 underline transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => {
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="ml-4 text-xs text-white/60 hover:text-white/80 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
