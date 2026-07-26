import React from 'react';
import { ExternalLink, Sparkles, Palette, Keyboard, Music4, Scale } from 'lucide-react';
import { ALL_TRACKS } from '../data/musicCatalog';

const REPO = 'https://github.com/Simplypheyie96/VibeCafe/blob/main';
import { ModalShell } from './ui/ModalShell';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const features = [
    'Nine scenes, each with its own Creative Commons soundtrack',
    'Five ambient sounds and four visual effects, layered freely',
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
              VibeCafe pairs beautiful animated cafe scenes with a hand-picked catalog of
              Creative Commons music. Relax, focus, or vibe out — every scene has its own
              mood, and you can layer ambient sound on top of any of them.
            </p>
          </div>
        </div>
      </section>

      {/* Designer Info Section */}
      <section className="modal-gap-3">
        <div className="glass-inset rounded-[12px] p-6">
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
                href="https://simplypheyie.is-a.dev/" 
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
        
        <div className="glass-inset rounded-[12px] p-3">
          <div className="card-section">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/70">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <React.Fragment key={i}>
                      <kbd className="glass-inset rounded-md px-2 py-1 font-['Space_Grotesk',sans-serif] text-[12px] text-white/90 font-medium min-w-[28px] text-center">
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

      {/* Music & licensing. Creative Commons attribution is a licence obligation, not
          a courtesy, so it gets a real section rather than a footnote. */}
      <section className="modal-gap-3">
        <div className="flex items-center gap-2">
          <Music4 className="size-[18px] text-purple-300" strokeWidth={2} />
          <h3 className="font-['Space_Grotesk',sans-serif] text-[14px] font-semibold text-white/90">
            Music &amp; Licensing
          </h3>
        </div>

        <div className="glass-inset rounded-[12px] p-6">
          <p className="font-['Space_Grotesk',sans-serif] text-[14px] text-white/80 leading-relaxed">
            All {ALL_TRACKS.length} built-in tracks are Creative Commons or public-domain
            releases, streamed from the Internet Archive's netlabels collection. The artist,
            licence, and a link to the original release show on the now-playing card while
            each track plays.
          </p>
          <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/55 leading-relaxed mt-4">
            Listening here doesn't grant you rights to reuse a track — for that, follow the
            licence on its source page.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-6">
            <a
              href={`${REPO}/MUSIC-LICENSES.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Grotesk',sans-serif] text-[13px] text-purple-300 hover:text-purple-200 inline-flex items-center gap-2 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <span>Full track credits</span>
              <ExternalLink className="size-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="modal-gap-3">
        <div className="flex items-center gap-2">
          <Scale className="size-[18px] text-purple-300" strokeWidth={2} />
          <h3 className="font-['Space_Grotesk',sans-serif] text-[14px] font-semibold text-white/90">
            Legal
          </h3>
        </div>

        <div className="glass-inset rounded-[12px] p-6">
          <p className="font-['Space_Grotesk',sans-serif] text-[14px] text-white/80 leading-relaxed">
            No account, no sign-in, and nothing you make here leaves your browser. Usage is
            counted in aggregate with Google Analytics, which you're free to block.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-6">
            <a
              href={`${REPO}/PRIVACY.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Grotesk',sans-serif] text-[13px] text-purple-300 hover:text-purple-200 inline-flex items-center gap-2 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <span>Privacy Policy</span>
              <ExternalLink className="size-3.5" strokeWidth={2} />
            </a>
            <a
              href={`${REPO}/TERMS.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Grotesk',sans-serif] text-[13px] text-purple-300 hover:text-purple-200 inline-flex items-center gap-2 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              <span>Terms of Use</span>
              <ExternalLink className="size-3.5" strokeWidth={2} />
            </a>
          </div>

          <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/40 leading-relaxed mt-6 border-t border-white/10 pt-5">
            These are starter drafts and have not been reviewed by a lawyer. Get
            professional review before relying on them.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <section className="modal-gap-3">
        <div className="glass-inset rounded-[12px] text-center p-6">
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