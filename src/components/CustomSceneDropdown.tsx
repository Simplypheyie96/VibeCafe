import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { Scene } from '../types';

interface CustomScene {
  id: number;
  name: string;
  imageUrl: string;
  mood: string;
}

interface CustomSceneDropdownProps {
  customScenes: CustomScene[];
  scenes: Scene[];
  activeScene: number;
  onSceneChange: (sceneId: number) => void;
  onDeleteScene?: (id: number) => void;
}

export function CustomSceneDropdown({
  customScenes,
  scenes,
  activeScene,
  onSceneChange,
  onDeleteScene,
}: CustomSceneDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if a custom scene is currently active
  const activeCustomScene = customScenes.find((s) => -s.id === activeScene);
  const isCustomSceneActive = activeCustomScene !== undefined;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (customScenes.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-4 md:left-1/2 md:-translate-x-1/2 bottom-[240px] md:bottom-auto md:top-[740px] z-50"
    >
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-[12px]
          bg-[rgba(255,255,255,0.2)] backdrop-blur-xl border border-[rgba(255,255,255,0.35)]
          hover:bg-[rgba(255,255,255,0.25)]
          transition-all duration-200
          shadow-xl shadow-black/30
          ${isCustomSceneActive ? 'border-[#c27aff] shadow-[0px_0px_16px_rgba(194,122,255,0.5)]' : ''}
        `}
      >
        <span className="font-['Space_Grotesk',sans-serif] text-[13px] md:text-[14px] font-medium text-white">
          {isCustomSceneActive ? activeCustomScene.name : 'Custom Scenes'}
        </span>
        
        {/* Badge showing count */}
        <span className="bg-purple-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <span className="font-['Space_Grotesk',sans-serif] text-[11px] font-semibold text-white">
            {customScenes.length}
          </span>
        </span>

        {/* Chevron */}
        <ChevronDown
          className={`size-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute top-full mt-2 left-0 
            min-w-[280px] max-w-[320px]
            bg-black/40 backdrop-blur-xl border border-white/10
            rounded-[12px] shadow-2xl
            overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10">
            <h3 className="font-['Space_Grotesk',sans-serif] text-[13px] font-semibold text-white/90">
              Your Custom Scenes
            </h3>
          </div>

          {/* Scene List - Scrollable */}
          <div className="max-h-[300px] overflow-y-auto custom-scroll">
            {customScenes.map((scene) => {
              const customSceneId = -scene.id;
              const isActive = activeScene === customSceneId;

              return (
                <div
                  key={scene.id}
                  className={`
                    group relative flex items-center gap-3 px-4 py-3
                    hover:bg-white/10 transition-colors cursor-pointer
                    ${isActive ? 'bg-white/15' : ''}
                  `}
                  onClick={() => {
                    onSceneChange(customSceneId);
                    setIsOpen(false);
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative size-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={scene.imageUrl}
                      alt={scene.name}
                      className="size-full object-cover"
                    />
                    {isActive && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 border-2 border-[#c27aff] rounded-lg pointer-events-none"
                      />
                    )}
                  </div>

                  {/* Scene Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium text-white truncate">
                      {scene.name}
                    </p>
                    <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/60 capitalize">
                      {scene.mood}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="size-2 rounded-full bg-[#c27aff] shadow-[0px_0px_8px_rgba(194,122,255,0.8)] flex-shrink-0" />
                  )}

                  {/* Delete Button */}
                  {onDeleteScene && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteScene(scene.id);
                        if (customScenes.length === 1) {
                          setIsOpen(false);
                        }
                      }}
                      className="
                        opacity-0 group-hover:opacity-100
                        size-8 rounded-full
                        bg-red-500/90 hover:bg-red-600
                        flex items-center justify-center
                        transition-all duration-200
                        flex-shrink-0
                      "
                      aria-label={`Delete ${scene.name}`}
                    >
                      <Trash2 className="size-3.5 text-white" strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}