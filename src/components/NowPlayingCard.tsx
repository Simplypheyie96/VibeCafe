import React from 'react';
import { Pause, Play, SkipForward, Loader2, AlertTriangle, Music2 } from 'lucide-react';

export type PlaybackState = 'idle' | 'buffering' | 'playing' | 'paused' | 'error';

interface NowPlayingCardProps {
  trackTitle: string;
  artist: string;
  /** Human-readable licence, e.g. "CC BY 4.0". Rendered as the attribution line. */
  license?: string;
  /** Link back to the track's source page, required by CC BY 4.0 §3(a)(1). */
  sourceUrl?: string;
  state: PlaybackState;
  onPlayPause: () => void;
  onNext?: () => void;
}

export function NowPlayingCard({
  trackTitle,
  artist,
  license,
  sourceUrl,
  state,
  onPlayPause,
  onNext,
}: NowPlayingCardProps) {
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const isError = state === 'error';

  const statusLabel = isError
    ? 'Playback problem'
    : isBuffering
      ? 'Buffering…'
      : isPlaying
        ? 'Now Playing'
        : 'Paused';

  return (
    <div
      className="now-playing-card absolute z-30 flex flex-col gap-2
                 rounded-[14px] border border-white/30 bg-white/20 px-4 py-3.5 backdrop-blur-xl
                 shadow-xl shadow-black/30
                 left-4 right-4 bottom-[112px]
                 sm:left-6 sm:right-6 sm:max-w-[420px]
                 md:left-[31px] md:right-auto md:top-auto md:bottom-[200px] md:w-[268px] md:rounded-[16px]"
    >
      {/* Status line */}
      <div className="flex items-center gap-1.5">
        {isError ? (
          <AlertTriangle aria-hidden="true" className="size-3.5 text-amber-300" />
        ) : isBuffering ? (
          <Loader2 aria-hidden="true" className="size-3.5 animate-spin text-white/70" />
        ) : (
          <Music2 aria-hidden="true" className="size-3.5 text-white/60" />
        )}
        <p className="text-[11px] uppercase tracking-[0.09em] text-white/65 leading-none">
          {statusLabel}
        </p>
      </div>

      {/* Track + transport */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-medium leading-snug tracking-[-0.2px] text-white"
            title={trackTitle}
          >
            {trackTitle}
          </p>
          <p className="truncate text-[12.5px] leading-snug text-white/70" title={artist}>
            {artist}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            title={isPlaying ? 'Pause' : 'Play'}
            className="flex size-11 items-center justify-center rounded-full text-white transition
                       hover:bg-white/20 active:scale-95
                       outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
          >
            {isPlaying
              ? <Pause className="size-5" fill="currentColor" strokeWidth={0} />
              : <Play className="size-5 translate-x-[1px]" fill="currentColor" strokeWidth={0} />}
          </button>

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next track"
              title="Next track"
              className="flex size-11 items-center justify-center rounded-full text-white/85 transition
                         hover:bg-white/20 hover:text-white active:scale-95
                         outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            >
              <SkipForward className="size-[18px]" fill="currentColor" strokeWidth={0} />
            </button>
          )}
        </div>
      </div>

      {/* Attribution. Required by CC BY 4.0 §3(a)(1) whenever the track is licensed. */}
      {license && (
        <p className="text-[10.5px] leading-tight text-white/55">
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer license"
              className="underline decoration-white/30 underline-offset-2 transition hover:text-white/80
                         outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            >
              {license}
            </a>
          ) : (
            license
          )}
          {' · '}
          <span>Free to stream</span>
        </p>
      )}
    </div>
  );
}
