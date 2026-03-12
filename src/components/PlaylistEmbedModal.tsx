import React from 'react';
import { ModalShell } from './ui/ModalShell';
import { ExternalLink } from 'lucide-react';

interface PlaylistEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  service: 'spotify' | 'apple-music';
  embedId: string;
  url: string;
}

export function PlaylistEmbedModal({
  isOpen,
  onClose,
  name,
  service,
  embedId,
  url,
}: PlaylistEmbedModalProps) {
  const embedUrl =
    service === 'spotify'
      ? `https://open.spotify.com/embed/playlist/${embedId}?utm_source=generator&theme=0&compact=1`
      : `https://embed.music.apple.com/us/playlist/${embedId}`;

  if (!isOpen) return null;

  return (
    <ModalShell
      title={name}
      description={`Playing from ${service === 'spotify' ? 'Spotify' : 'Apple Music'}`}
      onClose={onClose}
    >
      {/* Service Badge & Open Button */}
      <div className="flex items-center justify-between">
        <div
          className={`px-4 py-2 rounded-[10px] border ${
            service === 'spotify'
              ? 'bg-green-500/20 border-green-500/40'
              : 'bg-pink-500/20 border-pink-500/40'
          }`}
        >
          <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white uppercase tracking-wide">
            {service === 'spotify' ? '🎵 Spotify' : '🎧 Apple Music'}
          </span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-[10px] transition-all duration-200"
        >
          <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white">
            Open in App
          </span>
          <ExternalLink className="size-4 text-white/70" strokeWidth={2} />
        </a>
      </div>

      {service === 'spotify' ? (
        /* Spotify can't be embedded without browser sign-in — iframe overlay is uncontrollable */
        <div className="flex flex-col items-center gap-5 bg-white/5 border border-white/10 rounded-[16px] px-6 py-10 text-center">
          <div className="size-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl">
            🎵
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-['Space_Grotesk',sans-serif] text-[15px] font-semibold text-white">
              Play on Spotify
            </p>
            <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/50 leading-relaxed max-w-[260px] mx-auto">
              Spotify's embed requires a browser sign-in to display. Open it directly in the Spotify app instead.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 rounded-[999px] transition-colors"
          >
            <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-semibold text-black">Open in Spotify</span>
            <ExternalLink className="size-3.5 text-black/70" strokeWidth={2.5} />
          </a>
        </div>
      ) : (
        <>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-[12px] p-4">
            <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-blue-300/90 leading-relaxed">
              Requires Apple Music subscription for full playback.
            </p>
          </div>
          <div className="w-full h-[380px] bg-black/20 rounded-[12px] overflow-hidden border border-white/10">
            <iframe
              src={embedUrl}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full block"
              title={`${name} - Apple Music player`}
            />
          </div>
        </>
      )}
    </ModalShell>
  );
}