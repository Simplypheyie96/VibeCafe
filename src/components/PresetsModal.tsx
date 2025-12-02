import React, { useState } from 'react';
import { ModalShell } from './ui/ModalShell';
import { Save, Trash2, Play } from 'lucide-react';
import { Preset } from '../types';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  presets: Preset[];
  onSavePreset: (name: string) => void;
  onLoadPreset: (preset: Preset) => void;
  onDeletePreset: (id: number) => void;
}

export function PresetsModal({
  isOpen,
  onClose,
  presets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
}: PresetsModalProps) {
  const [presetName, setPresetName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSave = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim());
      setPresetName('');
      setShowSaveForm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalShell
      title="Vibe Presets"
      description="Save and load your favorite scene + ambient combinations"
      onClose={onClose}
    >
      <div className="modal-gap-6">
        {/* Save New Preset Section */}
        <div className="modal-gap-3">
          {!showSaveForm ? (
            <button
              onClick={() => setShowSaveForm(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-[12px] py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save className="size-[18px] text-white" strokeWidth={2} />
              <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium text-white">
                Save Current Vibe
              </span>
            </button>
          ) : (
            <div className="bg-white/5 border border-white/20 rounded-[12px] p-6 modal-gap-3">
              <div className="field-group">
                <label className="font-['Space_Grotesk',sans-serif] font-semibold text-[13px] text-white/70">
                  Preset Name
                </label>
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="e.g., Late Night Study, Morning Coffee"
                  className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  maxLength={30}
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSaveForm(false);
                    setPresetName('');
                  }}
                  className="flex-1 rounded-[999px] bg-white/6 hover:bg-white/10 px-4 py-2.5 font-['Space_Grotesk',sans-serif] text-[13px] text-white border border-white/15 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!presetName.trim()}
                  className="flex-1 rounded-[999px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed px-4 py-2.5 font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Presets List Section */}
        <div className="modal-gap-3">
          {presets.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-[12px] p-10 text-center">
              <p className="font-['Space_Grotesk',sans-serif] text-[14px] text-white/60">
                No saved presets yet. Create one to quickly restore your favorite vibes!
              </p>
            </div>
          ) : (
            <div className="modal-gap-2">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-[12px] p-6 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0 modal-gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white truncate">
                          {preset.name}
                        </h3>
                        {preset.isCustomScene && (
                          <span className="px-2 py-1 bg-purple-500/30 border border-purple-500/40 rounded-md font-['Space_Grotesk',sans-serif] text-[10px] text-purple-200 uppercase tracking-wider">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {preset.ambient.rain && (
                          <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-md font-['Space_Grotesk',sans-serif] text-[10px] text-blue-300">
                            Rain
                          </span>
                        )}
                        {preset.ambient.birds && (
                          <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-md font-['Space_Grotesk',sans-serif] text-[10px] text-green-300">
                            Birds
                          </span>
                        )}
                        {preset.ambient.fire && (
                          <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded-md font-['Space_Grotesk',sans-serif] text-[10px] text-orange-300">
                            Fire
                          </span>
                        )}
                        {preset.ambient.city && (
                          <span className="px-2 py-0.5 bg-gray-500/20 border border-gray-500/30 rounded-md font-['Space_Grotesk',sans-serif] text-[10px] text-gray-300">
                            City
                          </span>
                        )}
                        {preset.ambient.cafe && (
                          <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-md font-['Space_Grotesk',sans-serif] text-[10px] text-amber-300">
                            Cafe
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onLoadPreset(preset)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-[12px] transition-all duration-200"
                      >
                        <Play className="size-3.5 text-purple-300" strokeWidth={2} />
                        <span className="font-['Space_Grotesk',sans-serif] text-[12px] text-purple-200">
                          Load
                        </span>
                      </button>
                      <button
                        onClick={() => onDeletePreset(preset.id)}
                        className="size-9 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-[12px] transition-all duration-200"
                        aria-label="Delete preset"
                      >
                        <Trash2 className="size-3.5 text-red-400" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}