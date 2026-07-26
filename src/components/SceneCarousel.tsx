import React, { useCallback, useEffect, useRef } from 'react';
import { scenes } from '../data/scenes';

interface SceneCarouselProps {
  activeScene: number;
  onSceneChange: (sceneId: number) => void;
}

export function SceneCarousel({ activeScene, onSceneChange }: SceneCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  /* The edge fade is a scroll affordance, so it should only appear when there is
     actually something to scroll to. */
  const syncOverflow = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    row.dataset.overflowing = String(row.scrollWidth > row.clientWidth + 1);
  }, []);

  useEffect(() => {
    syncOverflow();
    window.addEventListener('resize', syncOverflow);
    return () => window.removeEventListener('resize', syncOverflow);
  }, [syncOverflow]);

  /* Selecting a scene from anywhere (keyboard arrows, presets, the dropdown) used
     to leave the carousel parked wherever it was, so the active thumbnail could
     sit off-screen with no indication of which scene was live. */
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeScene]);

  return (
    <div className="carousel-wrap glass fixed bottom-[40px] left-1/2 -translate-x-1/2 z-40 rounded-[18.999px] w-full max-w-[calc(100vw-32px)] md:w-max md:max-w-[95vw] pointer-events-auto">
      <div
        ref={rowRef}
        role="tablist"
        aria-label="Scenes"
        className="carousel-inner flex gap-[15.832px] items-center px-[21px] py-[16px] overflow-x-auto scrollbar-hide snap-x touch-pan-x rounded-[18.999px]"
      >
        {scenes.map((scene) => {
          const isActive = activeScene === scene.id;

          return (
            <button
              key={scene.id}
              ref={isActive ? activeRef : undefined}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={scene.name}
              title={scene.name}
              onClick={() => onSceneChange(scene.id)}
              className={`carousel-thumb group flex-shrink-0 h-[105px] relative rounded-[10.555px] w-[120px] transition-all duration-300 origin-center snap-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
                isActive
                  ? 'ring-2 ring-[var(--color-primary)] shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_6px_20px_-4px_rgba(194,122,255,0.55)]'
                  : 'opacity-80 hover:opacity-100 hover:scale-[1.03] active:scale-[0.98]'
              }`}
            >
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="carousel-thumb-img absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover rounded-[10.555px] size-full pointer-events-none"
                src={scene.thumbnail}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
