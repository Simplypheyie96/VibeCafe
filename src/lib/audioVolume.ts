/**
 * Volume control that also works on iOS.
 *
 * `HTMLMediaElement.volume` is read-only on iOS Safari: Apple ignores writes to
 * it so the hardware buttons stay the only volume control. Nothing throws and
 * nothing warns -- the assignment simply does not take. That made every slider
 * in this app dead on an iPhone while working perfectly on desktop, which is
 * exactly the kind of bug that reads as "the settings don't do anything".
 *
 * `GainNode.gain` is not restricted, so each element is routed through a gain
 * node and the slider drives that instead. Two things this has to respect:
 *
 *  - `createMediaElementSource` may be called only once per element, hence the
 *    WeakMap. Calling it twice throws and would kill the element's audio.
 *  - Once an element is routed, its output goes only through the graph. If the
 *    context is suspended, the result is silence. So routing is deferred until
 *    the context is actually running, and until then we fall back to setting
 *    `.volume` -- which is correct on desktop and a harmless no-op on iOS.
 *
 * The media must also be CORS-clean or the graph outputs silence; every host
 * this app uses (archive.org, mixkit, jsDelivr, githack) sends
 * `access-control-allow-origin: *`, and the elements carry `crossOrigin`.
 */

type Ctor = typeof AudioContext;

let ctx: AudioContext | null = null;
const gains = new WeakMap<HTMLMediaElement, GainNode>();
/* Elements whose routing threw. They stay on the `.volume` path forever rather
   than being retried on every slider tick. */
const unroutable = new WeakSet<HTMLMediaElement>();

function context(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === 'undefined') return null;
  const Ctor: Ctor | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }
  return ctx;
}

function gainFor(el: HTMLMediaElement): GainNode | null {
  const existing = gains.get(el);
  if (existing) return existing;
  if (unroutable.has(el)) return null;

  const ac = context();
  // Routing into a suspended context would mute the element. Wait for the
  // gesture that resumes it; `unlock` re-applies volumes once that happens.
  if (!ac || ac.state !== 'running') return null;

  try {
    const gain = ac.createGain();
    ac.createMediaElementSource(el).connect(gain);
    gain.connect(ac.destination);
    gains.set(el, gain);
    return gain;
  } catch {
    unroutable.add(el);
    return null;
  }
}

/* Every element we have been asked to set a volume on, plus the percentage last
   asked for. Held weakly so an element that goes away can still be collected.
   Used to re-apply volumes after the context resumes, since anything set before
   that took the `.volume` fallback and needs moving onto its gain node. */
const known: Array<{ ref: WeakRef<HTMLMediaElement>; percent: number }> = [];

function remember(el: HTMLMediaElement, percent: number) {
  const hit = known.find((k) => k.ref.deref() === el);
  if (hit) hit.percent = percent;
  else known.push({ ref: new WeakRef(el), percent });
}

/** Set an element's volume from a 0-100 slider value. */
export function setVolume(el: HTMLMediaElement | null | undefined, percent: number): void {
  if (!el) return;
  remember(el, percent);
  const v = Math.min(1, Math.max(0, percent / 100));
  const gain = gainFor(el);
  if (gain) {
    // The element must stay wide open: the gain node is the only attenuator.
    el.volume = 1;
    gain.gain.value = v;
  } else {
    el.volume = v;
  }
}

/**
 * Resume the context from a user gesture. iOS starts every context suspended,
 * and audio routed through a suspended context is silent, so this must run on
 * the same tap that starts playback. Safe to call more than once.
 */
export function unlockAudio(): void {
  const ac = context();
  if (!ac) return;
  const done = ac.state === 'suspended' ? ac.resume() : Promise.resolve();
  // Anything whose volume was set while the context was still suspended is
  // sitting on the `.volume` fallback, which is a no-op on iOS. Now that the
  // graph is live, route those elements and re-apply.
  void done.then(() => {
    for (let i = known.length - 1; i >= 0; i--) {
      const el = known[i].ref.deref();
      if (!el) known.splice(i, 1);
      else setVolume(el, known[i].percent);
    }
  });
}
