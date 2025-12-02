import React from 'react';
import { Volume2, Music, CloudRain, Coffee, Flame, Bird, Sparkles } from 'lucide-react';
import { ModalShell } from './ui/ModalShell';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  musicVolume: number;
  onMusicVolumeChange: (value: number) => void;
  rainVolume: number;
  onRainVolumeChange: (value: number) => void;
  cityVolume: number;
  onCityVolumeChange: (value: number) => void;
  fireVolume: number;
  onFireVolumeChange: (value: number) => void;
  birdsVolume: number;
  onBirdsVolumeChange: (value: number) => void;
  cafeVolume: number;
  onCafeVolumeChange: (value: number) => void;
  sceneId?: number;
  activeAmbient?: {
    rain: boolean;
    birds: boolean;
    fire: boolean;
    city: boolean;
    cafe: boolean;
  };
  onOpenPresets?: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  musicVolume,
  onMusicVolumeChange,
  rainVolume,
  onRainVolumeChange,
  cityVolume,
  onCityVolumeChange,
  fireVolume,
  onFireVolumeChange,
  birdsVolume,
  onBirdsVolumeChange,
  cafeVolume,
  onCafeVolumeChange,
  sceneId = 0,
  activeAmbient = {
    rain: false,
    birds: false,
    fire: false,
    city: false,
    cafe: false,
  },
  onOpenPresets,
}: SettingsModalProps) {
  const handleReset = () => {
    onMusicVolumeChange(80);
    onRainVolumeChange(50);
    onCityVolumeChange(50);
    onFireVolumeChange(50);
    onBirdsVolumeChange(50);
    onCafeVolumeChange(50);
  };

  if (!isOpen) return null;

  return (
    <ModalShell
      title="Audio Settings"
      description="Adjust music and ambient sound levels"
      onClose={onClose}
    >
      <div className="modal-gap-6">
        {/* Music Volume Section */}
        <div className="modal-gap-3">
          <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white">
            Music
          </h3>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-[10px] shrink-0">
              <Music className="size-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 modal-gap-2">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/90">
                  Lofi Music
                </span>
                <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 tabular-nums">
                  {musicVolume}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => onMusicVolumeChange(Number(e.target.value))}
                className="w-full h-[6px] bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Ambient Sounds Section */}
        <div className="modal-gap-3">
          <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white">
            Ambient Sounds
          </h3>

          <div className="modal-gap-3">
            {/* Rain */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-2.5 rounded-[10px] shrink-0">
                <CloudRain className="size-5 text-blue-300" strokeWidth={2} />
              </div>
              <div className="flex-1 modal-gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/90">
                    Rain
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 tabular-nums">
                    {rainVolume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainVolume}
                  onChange={(e) => onRainVolumeChange(Number(e.target.value))}
                  className="w-full h-[6px] bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-300 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* City Noise */}
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/20 p-2.5 rounded-[10px] shrink-0">
                <Volume2 className="size-5 text-purple-300" strokeWidth={2} />
              </div>
              <div className="flex-1 modal-gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/90">
                    City Traffic
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 tabular-nums">
                    {cityVolume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cityVolume}
                  onChange={(e) => onCityVolumeChange(Number(e.target.value))}
                  className="w-full h-[6px] bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-300 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Fire */}
            <div className="flex items-center gap-4">
              <div className="bg-red-500/20 p-2.5 rounded-[10px] shrink-0">
                <Flame className="size-5 text-red-300" strokeWidth={2} />
              </div>
              <div className="flex-1 modal-gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/90">
                    Fire Crackling
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 tabular-nums">
                    {fireVolume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fireVolume}
                  onChange={(e) => onFireVolumeChange(Number(e.target.value))}
                  className="w-full h-[6px] bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-300 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Birds */}
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-2.5 rounded-[10px] shrink-0">
                <Bird className="size-5 text-green-300" strokeWidth={2} />
              </div>
              <div className="flex-1 modal-gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/90">
                    Birds Singing
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 tabular-nums">
                    {birdsVolume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={birdsVolume}
                  onChange={(e) => onBirdsVolumeChange(Number(e.target.value))}
                  className="w-full h-[6px] bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-300 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Cafe Chatter */}
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 p-2.5 rounded-[10px] shrink-0">
                <Coffee className="size-5 text-amber-300" strokeWidth={2} />
              </div>
              <div className="flex-1 modal-gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/90">
                    Cafe Chatter
                  </span>
                  <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 tabular-nums">
                    {cafeVolume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cafeVolume}
                  onChange={(e) => onCafeVolumeChange(Number(e.target.value))}
                  className="w-full h-[6px] bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0px_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-300 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-gap-3">
          <div className="modal-gap-2">
            {onOpenPresets && (
              <button
                onClick={onOpenPresets}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-[999px] py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="size-[18px] text-white" strokeWidth={2} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium text-white">
                  Manage Vibe Presets
                </span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="w-full rounded-[999px] bg-white/6 hover:bg-white/10 py-2.5 px-4 font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white border border-white/15 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}