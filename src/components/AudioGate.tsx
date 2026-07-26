import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

interface AudioGateProps {
  open: boolean;
  sceneName: string;
  onEnter: () => void;
}

/**
 * The threshold into the app.
 *
 * Browsers will not start audio without a user gesture, on any platform — this
 * is not something to work around, so the gesture is made part of the experience
 * instead of a failure the user has to notice and repair. Previously only iOS
 * got a prompt (an unfocusable <div>), so Android and desktop users landed on a
 * silent app with a play button they had no reason to press.
 */
export function AudioGate({ open, sceneName, onEnter }: AudioGateProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) buttonRef.current?.focus();
  }, [open]);

  /* While the gate is up it is the only thing on screen, so it owns the keyboard. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        buttonRef.current?.focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, onEnter]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-gate-title"
      aria-describedby="audio-gate-desc"
      className="absolute inset-0 z-[99999] flex items-center justify-center scrim px-6 animate-fadeIn"
    >
      <div className="flex w-full max-w-[340px] flex-col items-center gap-6 rounded-[24px] border border-white/20 bg-white/10 px-7 py-9 text-center shadow-2xl shadow-black/50">
        {/* The cassette mark, drawn inline so the gate needs no network fetch. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 512 512"
          className="size-14 text-[#E8DCC4]"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="24">
            <rect x="98" y="159" width="316" height="194" rx="33" />
            <circle cx="190" cy="256" r="44" strokeWidth="20" />
            <circle cx="322" cy="256" r="44" strokeWidth="20" />
          </g>
          <g fill="currentColor">
            <circle cx="190" cy="256" r="10" />
            <circle cx="322" cy="256" r="10" />
          </g>
        </svg>

        <div className="flex flex-col gap-2">
          <h2
            id="audio-gate-title"
            className="text-[22px] font-semibold leading-tight tracking-[-0.4px] text-white"
          >
            Ready when you are
          </h2>
          <p id="audio-gate-desc" className="text-[13.5px] leading-relaxed text-white/70">
            Your browser waits for a tap before playing sound. Press below and{' '}
            <span className="text-white/90">{sceneName}</span> starts.
          </p>
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={onEnter}
          className="group flex w-full items-center justify-center gap-2.5 rounded-full
                     bg-white px-6 py-3.5 text-[15px] font-semibold text-[#1B1613]
                     transition hover:bg-white/90 active:scale-[0.98]
                     outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
        >
          <Play className="size-4 translate-x-[1px]" fill="currentColor" strokeWidth={0} />
          Start listening
        </button>

        <p className="text-[11px] leading-relaxed text-white/45">
          Music streams from Creative Commons artists. Free, and free to share.
        </p>
      </div>
    </div>
  );
}
