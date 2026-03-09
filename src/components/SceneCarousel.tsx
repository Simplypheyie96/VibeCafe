import React from 'react';
import { scenes } from '../data/scenes';

interface SceneCarouselProps {
  activeScene: number;
  onSceneChange: (sceneId: number) => void;
}

export function SceneCarousel({ activeScene, onSceneChange }: SceneCarouselProps) {
  return (
    <div className="carousel-wrap fixed bottom-[40px] left-1/2 -translate-x-1/2 z-40 bg-[rgba(0,0,0,0.2)] backdrop-blur-md rounded-[18.999px] w-full max-w-[calc(100vw-32px)] md:w-max md:max-w-[95vw] shadow-lg pointer-events-auto">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[18.999px] z-10" />
      <div className="carousel-inner flex gap-[15.832px] items-center px-[21px] py-[16px] overflow-x-auto scrollbar-hide snap-x touch-pan-x rounded-[18.999px]">
        {scenes.map((scene) => {
          const isActive = activeScene === scene.id;

          return (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              className={`carousel-thumb flex-shrink-0 h-[105px] relative rounded-[10.555px] w-[120px] transition-all duration-300 origin-center snap-center ${
                isActive ? 'scale-[1.02] ring-[4px] ring-[#ea4df4] shadow-[0_0_15px_rgba(234,77,244,0.6)]' : 'hover:scale-[1.02]'
              }`}
            >
              <img
                alt={scene.name}
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
