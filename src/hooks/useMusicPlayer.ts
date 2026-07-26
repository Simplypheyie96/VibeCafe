import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Track } from '../types';
import type { PlaybackState } from '../components/NowPlayingCard';

/** Deterministic shuffle so a queue is stable for the life of a scene visit. */
function shuffle<T>(input: T[], seed: number): T[] {
  const out = [...input];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface Options {
  /** Every track available for the current scene. */
  tracks: Track[];
  volume: number; // 0-100
  /** False while the audio gate is still closed (no user gesture yet). */
  unlocked: boolean;
  /** Suspends this player entirely, e.g. while an embedded playlist is open. */
  suspended: boolean;
}

/**
 * Queue-based player for the scene soundtrack.
 *
 * The previous implementation pointed a single <audio loop> at a live ICEcast
 * stream. When that stream dropped, stalled, or was refused, playback simply
 * ended with no recovery and no indication -- which is the "music just stops"
 * problem. This plays a real queue instead and treats every failure mode as
 * recoverable: a finished track advances, a stalled track retries once and then
 * advances, and a track that will not load at all is skipped so one bad file
 * cannot end the session.
 */
export function useMusicPlayer({ tracks, volume, unlocked, suspended }: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<PlaybackState>('idle');
  /** Set once the user has actively started playback; drives auto-continue. */
  const wantsPlayback = useRef(false);
  const retriedRef = useRef(false);
  /** Guards against an unloadable catalog spinning through every track forever. */
  const consecutiveFailures = useRef(0);

  const queue = useMemo(() => {
    if (!tracks.length) return [];
    return shuffle(tracks, tracks.length * 7919);
  }, [tracks]);

  const current: Track | undefined = queue[index];

  if (!audioRef.current && typeof Audio !== 'undefined') {
    const el = new Audio();
    el.preload = 'auto';
    el.crossOrigin = 'anonymous';
    audioRef.current = el;
  }

  const advance = useCallback(
    (step = 1) => {
      if (!queue.length) return;
      retriedRef.current = false;
      setIndex((i) => (i + step + queue.length) % queue.length);
    },
    [queue.length],
  );

  /* --- Volume ------------------------------------------------------------- */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = Math.min(1, Math.max(0, volume / 100));
  }, [volume]);

  /* --- Source loading ----------------------------------------------------- */
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current?.src) return;

    el.src = current.src;
    el.load();

    if (wantsPlayback.current && unlocked && !suspended) {
      setState('buffering');
      el.play().catch(() => {
        /* Blocked or unloadable — the `error` handler decides what happens next. */
      });
    }
  }, [current?.src, unlocked, suspended]);

  /* --- Suspension (an embedded playlist has taken over) ------------------- */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (suspended && !el.paused) el.pause();
  }, [suspended]);

  /* --- Lifecycle events --------------------------------------------------- */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlaying = () => {
      consecutiveFailures.current = 0;
      retriedRef.current = false;
      setState('playing');
    };
    const onPause = () => setState((s) => (s === 'error' ? s : 'paused'));
    const onWaiting = () => setState('buffering');
    const onEnded = () => advance(1);

    /* A stall is usually a transient network hiccup: nudge the same track once,
       and only give up on it if the nudge doesn't take. */
    const onStalled = () => {
      if (!wantsPlayback.current) return;
      setState('buffering');
      if (retriedRef.current) {
        advance(1);
        return;
      }
      retriedRef.current = true;
      el.load();
      el.play().catch(() => advance(1));
    };

    const onError = () => {
      consecutiveFailures.current += 1;
      /* Every track in the queue failed in a row — the problem isn't the track. */
      if (consecutiveFailures.current >= Math.max(3, queue.length)) {
        setState('error');
        return;
      }
      advance(1);
    };

    el.addEventListener('playing', onPlaying);
    el.addEventListener('pause', onPause);
    el.addEventListener('waiting', onWaiting);
    el.addEventListener('ended', onEnded);
    el.addEventListener('stalled', onStalled);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('waiting', onWaiting);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('stalled', onStalled);
      el.removeEventListener('error', onError);
    };
  }, [advance, queue.length]);

  /* --- Controls ----------------------------------------------------------- */
  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el || !current?.src) return;
    wantsPlayback.current = true;
    consecutiveFailures.current = 0;
    setState('buffering');
    if (!el.src) {
      el.src = current.src;
      el.load();
    }
    el.play().catch(() => setState('paused'));
  }, [current?.src]);

  const pause = useCallback(() => {
    wantsPlayback.current = false;
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) play();
    else pause();
  }, [play, pause]);

  const next = useCallback(() => {
    wantsPlayback.current = true;
    advance(1);
  }, [advance]);

  /* Playback should survive a scene change: when the queue swaps, keep going if
     the user had music running. */
  useEffect(() => {
    setIndex(0);
    consecutiveFailures.current = 0;
  }, [queue]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return {
    track: current,
    state,
    isPlaying: state === 'playing',
    /** True once the user has asked for audio — used to auto-continue on scene change. */
    engaged: wantsPlayback.current,
    play,
    pause,
    toggle,
    next,
  };
}
