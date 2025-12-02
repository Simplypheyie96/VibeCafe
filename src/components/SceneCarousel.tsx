import React from 'react';
import { scenes } from '../data/scenes';

interface SceneCarouselProps {
  activeScene: number;
  onSceneChange: (sceneId: number) => void;
}

export function SceneCarousel({ activeScene, onSceneChange }: SceneCarouselProps) {
  return (
    <div 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl shadow-black/30 flex items-center gap-3 overflow-x-auto scrollbar-hide max-w-[95vw] w-max"
    >
      {scenes.map((scene) => {
        const isActive = activeScene === scene.id;
        
        return (
          <button
            key={scene.id}
            onClick={() => onSceneChange(scene.id)}
            className={`flex-shrink-0 w-[80px] md:w-[100px] h-[76px] md:h-[105px] relative rounded-[8px] md:rounded-[10.555px] transition-all duration-300 origin-center ${
              isActive ? 'scale-[1.05]' : 'hover:scale-[1.02]'
            }`}
          >
            {/* Scene thumbnail */}
            <img
              alt={scene.name}
              className="absolute inset-0 object-cover rounded-[8px] md:rounded-[10.555px] size-full"
              src={scene.thumbnail}
            />
            
            {/* Active border with vibrant purple glow */}
            {isActive && (
              <>
                <div aria-hidden="true" className="absolute border-[3px] md:border-[5px] border-[#c27aff] inset-0 pointer-events-none rounded-[8px] md:rounded-[10.555px] shadow-[0px_0px_24px_8px_rgba(194,122,255,0.8)]" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#c27aff]/30 to-transparent pointer-events-none rounded-[8px] md:rounded-[10.555px]" />
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}