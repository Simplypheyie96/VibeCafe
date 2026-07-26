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
 * Continuous player for the scene soundtrack.
 *
 * Playback runs on two <audio> elements rather than one. While the audible
 * element plays, the standby element is already downloading the track that
 * comes after it, so a handover is a pointer swap rather than a fresh network
 * round-trip. With a single element every track change meant `load()` then
 * wait -- seconds of silence against a remote host, on every song and every
 * scene change. That gap is what made the app feel slow to start and prone to
 * stopping.
 *
 * Failure modes all resolve forward: a finished track hands over, a stalled
 * track retries once then hands over, and a track that will not load at all is
 * skipped, so one bad file can't end the session.
 */
export function useMusicPlayer({ tracks, volume, unlocked, suspended }: Options) {
  /** [0] and [1] swap roles; `liveRef` says which one is currently audible. */
  const poolRef = useRef<HTMLAudioElement[] | null>(null);
  const liveRef = useRef(0);
  /** What each pool element has loaded, so we never re-fetch what's already there. */
  const loadedRef = useRef<[string, string]>(['', '']);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
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

  if (!poolRef.current && typeof Audio !== 'undefined') {
    poolRef.current = [0, 1].map(() => {
      const el = new Audio();
      el.preload = 'auto';
      el.crossOrigin = 'anonymous';
      return el;
    });
  }

  const live = () => poolRef.current?.[liveRef.current];

  /** Point a pool element at a source, skipping the fetch if it already has it. */
  const assign = useCallback((slot: number, src: string) => {
    const el = poolRef.current?.[slot];
    if (!el || !src || loadedRef.current[slot] === src) return;
    el.src = src;
    loadedRef.current[slot] = src;
    el.load();
  }, []);

  /** Hand over to the next track, using the standby element's head start. */
  const advance = useCallback(() => {
    const pool = poolRef.current;
    if (!pool || !queue.length) return;

    retriedRef.current = false;
    const nextIndex = (indexRef.current + 1) % queue.length;
    const nextSrc = queue[nextIndex]?.src;
    if (!nextSrc) return;

    const outgoing = pool[liveRef.current];
    const incomingSlot = 1 - liveRef.current;
    const incoming = pool[incomingSlot];

    outgoing.pause();
    /* Normally a no-op: the prefetch effect put this track here a track ago. */
    assign(incomingSlot, nextSrc);

    liveRef.current = incomingSlot;
    indexRef.current = nextIndex;
    setIndex(nextIndex);

    if (wantsPlayback.current && unlocked && !suspended) {
      /* Only claim to be buffering if it actually is -- a prefetched track is
         ready immediately and shouldn't flash a spinner on the way past. */
      if (incoming.readyState < 3) setState('buffering');
      incoming.play().catch(() => {
        /* Blocked or unloadable — the `error` handler decides what happens next. */
      });
    }
  }, [queue, unlocked, suspended, assign]);

  /* --- Volume ------------------------------------------------------------- */
  useEffect(() => {
    const v = Math.min(1, Math.max(0, volume / 100));
    poolRef.current?.forEach((el) => {
      el.volume = v;
    });
  }, [volume]);

  /* --- Prefetch the track after this one ----------------------------------
   *
   * Deliberately late. This used to be a mount effect, which meant the moment
   * the app loaded it started downloading track 2 alongside track 1 -- two
   * ~2.4MB files competing for the same pipe before a single note had played.
   * On a phone that roughly doubled the wait for the track you were actually
   * waiting for.
   *
   * Now the standby element stays idle until the live track is nearly over, so
   * the first track gets the whole connection and the handover still has a
   * comfortable head start. `PREFETCH_LEAD_S` is generous because the source
   * host is slow to first byte (see the preconnect note in index.html).
   */
  const PREFETCH_LEAD_S = 45;

  const prefetchNext = useCallback(() => {
    if (queue.length < 2) return;
    const nextSrc = queue[(indexRef.current + 1) % queue.length]?.src;
    if (nextSrc) assign(1 - liveRef.current, nextSrc);
  }, [queue, assign]);

  /* --- Suspension (an embedded playlist has taken over) ------------------- */
  useEffect(() => {
    if (suspended) live()?.pause();
  }, [suspended]);

  /* --- Lifecycle events --------------------------------------------------- */
  useEffect(() => {
    const pool = poolRef.current;
    if (!pool) return;

    /* Both elements are wired up, but only the audible one drives UI state --
       the standby element fires `canplay`, `waiting` and friends as it
       prefetches, and none of that is something the user should see. */
    const isLive = (ev: Event) => ev.target === pool[liveRef.current];

    const onPlaying = (ev: Event) => {
      if (!isLive(ev)) return;
      consecutiveFailures.current = 0;
      retriedRef.current = false;
      setState('playing');
    };
    const onPause = (ev: Event) => {
      if (!isLive(ev)) return;
      setState((s) => (s === 'error' ? s : 'paused'));
    };
    const onWaiting = (ev: Event) => {
      if (isLive(ev)) setState('buffering');
    };
    const onEnded = (ev: Event) => {
      if (isLive(ev)) advance();
    };

    /* The prefetch trigger. Fires often, so it stays cheap: `assign` is a no-op
       once the standby element already holds the right source. */
    const onTimeUpdate = (ev: Event) => {
      if (!isLive(ev)) return;
      const el = pool[liveRef.current];
      if (!Number.isFinite(el.duration)) return;
      if (el.duration - el.currentTime <= PREFETCH_LEAD_S) prefetchNext();
    };

    /* A stall is usually a transient network hiccup: nudge the same track once,
       and only give up on it if the nudge doesn't take. */
    const onStalled = (ev: Event) => {
      if (!isLive(ev) || !wantsPlayback.current) return;
      const el = pool[liveRef.current];
      setState('buffering');
      if (retriedRef.current) {
        advance();
        return;
      }
      retriedRef.current = true;
      el.load();
      el.play().catch(() => advance());
    };

    const onError = (ev: Event) => {
      /* A failed prefetch is silent: nothing is playing to interrupt, and the
         track gets re-fetched if it ever becomes the live one. */
      if (!isLive(ev)) return;
      consecutiveFailures.current += 1;
      /* Every track in the queue failed in a row — the problem isn't the track. */
      if (consecutiveFailures.current >= Math.max(3, queue.length)) {
        setState('error');
        return;
      }
      advance();
    };

    const events: [string, (ev: Event) => void][] = [
      ['playing', onPlaying],
      ['pause', onPause],
      ['waiting', onWaiting],
      ['ended', onEnded],
      ['timeupdate', onTimeUpdate],
      ['stalled', onStalled],
      ['error', onError],
    ];
    pool.forEach((el) => events.forEach(([n, h]) => el.addEventListener(n, h)));
    return () => {
      pool.forEach((el) => events.forEach(([n, h]) => el.removeEventListener(n, h)));
    };
  }, [advance, queue.length, prefetchNext]);

  /* --- Controls ----------------------------------------------------------- */
  const play = useCallback(() => {
    const el = live();
    if (!el || !current?.src) return;
    wantsPlayback.current = true;
    consecutiveFailures.current = 0;
    assign(liveRef.current, current.src);
    if (el.readyState < 3) setState('buffering');
    el.play().catch(() => setState('paused'));
  }, [current?.src, assign]);

  const pause = useCallback(() => {
    wantsPlayback.current = false;
    live()?.pause();
  }, []);

  const toggle = useCallback(() => {
    const el = live();
    if (!el) return;
    if (el.paused) play();
    else pause();
  }, [play, pause]);

  /* --- Scene change: cross-load rather than cut ---------------------------- */
  /* Doubles as the initial warm-up. On mount this downloads the first track
     before the audio gate is dismissed -- fetching isn't playing, so the gate
     stays honest while the track is ready the moment the user opens it. On a
     later scene change the outgoing track keeps playing until the new one can
     actually start, so switching scenes never drops the room into silence. */
  useEffect(() => {
    const pool = poolRef.current;
    if (!pool || !queue.length) return;

    const firstSrc = queue[0]?.src;
    if (!firstSrc) return;

    indexRef.current = 0;
    setIndex(0);
    consecutiveFailures.current = 0;
    retriedRef.current = false;

    const outgoing = pool[liveRef.current];
    const wasPlaying = wantsPlayback.current && !outgoing.paused;

    if (!wasPlaying) {
      assign(liveRef.current, firstSrc);
      return;
    }

    const incomingSlot = 1 - liveRef.current;
    const incoming = pool[incomingSlot];
    assign(incomingSlot, firstSrc);

    let swapped = false;
    const swap = () => {
      if (swapped) return;
      swapped = true;
      outgoing.pause();
      liveRef.current = incomingSlot;
      incoming.play().catch(() => setState('paused'));
    };

    if (incoming.readyState >= 3) {
      swap();
      return;
    }
    setState('buffering');
    incoming.addEventListener('canplay', swap, { once: true });
    /* If the new track never loads, don't strand the user on the previous
       scene's audio -- hand over anyway and let the error path deal with it. */
    const bail = window.setTimeout(swap, 6000);
    return () => {
      incoming.removeEventListener('canplay', swap);
      window.clearTimeout(bail);
    };
  }, [queue, assign]);

  useEffect(() => {
    return () => {
      poolRef.current?.forEach((el) => {
        el.pause();
        el.src = '';
      });
      poolRef.current = null;
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
  };
}
