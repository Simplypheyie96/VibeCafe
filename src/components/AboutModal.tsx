import React from 'react';
import { ExternalLink, Sparkles, Palette, Keyboard } from 'lucide-react';
import { ModalShell } from './ui/ModalShell';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const features = [
    'Beautiful cafe scenes with lofi music',
    'Five ambient sounds (rain, city, fire, birds, cafe)',
    'Individual volume controls for all audio',
    'Change scene backgrounds & music',
    'Import Spotify & Apple Music playlists',
    'Save & load vibe presets',
  ];

  const shortcuts = [
    { keys: ['⌘', 'P'], description: 'Open Presets' },
    { keys: ['⌘', 'E'], description: 'Export Data' },
    { keys: ['1-9'], description: 'Quick Load Preset' },
    { keys: ['←', '→'], description: 'Navigate Scenes' },
    { keys: ['Space'], description: 'Play/Pause' },
  ];

  if (!isOpen) return null;

  return (
    <ModalShell
      title="VibeCafe"
      description="Your immersive lofi music sanctuary"
      onClose={onClose}
    >
      {/* Description Section */}
      <section className="modal-gap-3">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-[12px] p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="size-6 text-purple-300 shrink-0 mt-0.5" strokeWidth={2} />
            <p className="font-['Space_Grotesk',sans-serif] text-[14px] text-white/90 leading-relaxed">
              VibeCafe combines curated lofi playlists with beautiful animated cafe scenes. 
              Relax, focus, or vibe out to specially selected African lofi and global chill beats 
              while enjoying immersive ambient sounds.
            </p>
          </div>
        </div>
      </section>

      {/* Designer Info Section */}
      <section className="modal-gap-3">
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-6">
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-[12px] shrink-0">
              <Palette className="size-6 text-white" strokeWidth={2} />
            </div>
            
            <div className="flex flex-col flex-1 space-y-2">
              <p className="font-['Space_Grotesk',sans-serif] text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                Designed by
              </p>
              <p className="font-['Space_Grotesk',sans-serif] text-[16px] font-semibold text-white">
                Ajayi Feyikemi Mabel
              </p>
              <a 
                href="https://simplypheyie.tilda.ws/" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Space_Grotesk',sans-serif] text-[13px] text-purple-300 hover:text-purple-200 inline-flex items-center transition-colors duration-200 gap-2"
              >
                <span>Visit Portfolio</span>
                <ExternalLink className="size-3.5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="modal-gap-3">
        <h3 className="font-['Space_Grotesk',sans-serif] text-[14px] font-semibold text-white/90">
          Features
        </h3>
        
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-2" />
              <span className="font-['Space_Grotesk',sans-serif] text-[14px] text-white/80 leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="modal-gap-3">
        <div className="flex items-center gap-2">
          <Keyboard className="size-[18px] text-purple-300" strokeWidth={2} />
          <h3 className="font-['Space_Grotesk',sans-serif] text-[14px] font-semibold text-white/90">
            Keyboard Shortcuts
          </h3>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-3">
          <div className="card-section">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/70">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <React.Fragment key={i}>
                      <kbd className="bg-white/10 border border-white/20 rounded-md px-2 py-1 font-['Space_Grotesk',sans-serif] text-[12px] text-white/90 font-medium min-w-[28px] text-center">
                        {key}
                      </kbd>
                      {i < shortcut.keys.length - 1 && (
                        <span className="text-white/50 text-[12px]">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="modal-gap-3">
        <div className="bg-white/5 border border-white/10 rounded-[12px] text-center p-6">
          <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/70 leading-relaxed mb-3">
            Made with ♥ for lofi music lovers everywhere
          </p>
          <p className="font-['Space_Grotesk',sans-serif] text-[11px] text-white/40 tracking-wider">
            Version 2.0
          </p>
        </div>
      </section>
    </ModalShell>
  );
}