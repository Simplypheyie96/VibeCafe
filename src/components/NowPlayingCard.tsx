import React from 'react';
import { Pause, Play, Loader2, AlertTriangle, Music2 } from 'lucide-react';

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
}

export function NowPlayingCard({
  trackTitle,
  artist,
  license,
  sourceUrl,
  state,
  onPlayPause,
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
    // `bottom-[110px]` puts the card one 16px gap above the mobile carousel
    // (which sits at 14px and stands 80px tall) so the two read as one bottom
    // cluster. At 200px it floated mid-screen with a 100px hole underneath.
    <div
      className="now-playing-card glass rise-in rise-delay-2 absolute z-30 flex flex-col gap-2
                 rounded-[14px] px-4 py-3.5
                 left-4 right-4 bottom-[calc(110px+env(safe-area-inset-bottom,0px))]
                 sm:left-6 sm:right-6 sm:max-w-[400px]
                 md:left-[31px] md:right-auto md:top-[534px] md:bottom-auto md:w-[221px] md:rounded-[16px]"
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
        {/* Keyed on the title so React remounts it when the queue hands over,
            which restarts the animation. Without the key the text would swap
            between frames with no motion at all. */}
        <div key={trackTitle} className="track-swap min-w-0 flex-1">
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

        {/* Play/pause only. The stream is continuous -- tracks hand over to the
            next one on their own, so there is nothing for a skip control to do
            that the app isn't already doing. */}
        <button
          type="button"
          onClick={onPlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-white transition
                     hover:bg-white/20 active:scale-95
                     outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        >
          {isPlaying
            ? <Pause className="size-5" fill="currentColor" strokeWidth={0} />
            : <Play className="size-5 translate-x-[1px]" fill="currentColor" strokeWidth={0} />}
        </button>
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
