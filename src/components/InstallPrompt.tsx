import React, { useCallback, useEffect, useState } from 'react';
import { Download, X, Share, SquarePlus } from 'lucide-react';

/** Chromium's install event. Not in lib.dom, so it is declared here. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'vibecafe_install_dismissed';

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari predates display-mode and uses a non-standard flag.
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports as a Mac; the touch points give it away.
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * Install affordance.
 *
 * Two genuinely different flows: Chromium fires `beforeinstallprompt` and can be
 * driven programmatically, while iOS has no install API at all and can only be
 * walked through Share → Add to Home Screen. Anything already installed gets
 * nothing.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSSheet, setShowIOSSheet] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY) === '1') return;

    if (isIOS()) {
      /* Nothing to wait for on iOS — let the scene land first, then offer. */
      const t = setTimeout(() => setVisible(true), 12000);
      return () => clearTimeout(t);
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setShowIOSSheet(false);
    localStorage.setItem(DISMISS_KEY, '1');
  }, []);

  const install = useCallback(async () => {
    if (isIOS()) {
      setShowIOSSheet(true);
      return;
    }
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
    if (outcome === 'dismissed') localStorage.setItem(DISMISS_KEY, '1');
  }, [deferred]);

  if (!visible) return null;

  if (showIOSSheet) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ios-install-title"
        className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 px-4 pb-6 backdrop-blur-sm animate-fadeIn sm:items-center sm:pb-0"
        onClick={dismiss}
      >
        <div
          className="w-full max-w-[380px] rounded-[22px] border border-white/20 bg-[#1B1613]/95 p-6 shadow-2xl shadow-black/60"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 id="ios-install-title" className="text-[17px] font-semibold text-white">
              Add VibeCafe to your Home Screen
            </h2>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="-mr-1 -mt-1 flex size-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="size-4" />
            </button>
          </div>

          <ol className="flex flex-col gap-4">
            <li className="flex items-center gap-3.5 text-[14px] leading-snug text-white/80">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <Share className="size-[18px]" />
              </span>
              <span>
                Tap the <span className="font-medium text-white">Share</span> button in Safari's
                toolbar.
              </span>
            </li>
            <li className="flex items-center gap-3.5 text-[14px] leading-snug text-white/80">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <SquarePlus className="size-[18px]" />
              </span>
              <span>
                Choose <span className="font-medium text-white">Add to Home Screen</span>, then
                tap Add.
              </span>
            </li>
          </ol>

          <p className="mt-5 text-[12px] leading-relaxed text-white/45">
            VibeCafe then opens full screen, with its own icon — no browser chrome.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="install-banner glass fixed z-[60] flex items-center gap-3 rounded-full py-2 pl-4 pr-2 animate-fadeIn">
      <Download aria-hidden="true" className="size-4 shrink-0 text-white/80" />
      <p className="whitespace-nowrap text-[13px] text-white/90">Install VibeCafe</p>
      <button
        type="button"
        onClick={install}
        className="rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#1B1613] transition hover:bg-white/90 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
      >
        Add
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
