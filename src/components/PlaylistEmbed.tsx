import React, { useState } from 'react';
import { Minimize2, Maximize2, X, Music2, ExternalLink } from 'lucide-react';

interface PlaylistEmbedProps {
  name: string;
  service: 'spotify' | 'apple-music';
  embedId: string;
  onClose: () => void;
}

export function PlaylistEmbed({ name, service, embedId, onClose }: PlaylistEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get direct app/web link
  const getDirectLink = () => {
    if (service === 'spotify') {
      return `https://open.spotify.com/playlist/${embedId}`;
    } else {
      return `https://music.apple.com/us/playlist/${embedId}`;
    }
  };

  // Render the iframe once - it never unmounts
  const renderIframe = () => {
    if (service === 'spotify') {
      return (
        <iframe
          src={`https://open.spotify.com/embed/playlist/${embedId}?utm_source=generator`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify Playlist: ${name}`}
          className="w-full"
        />
      );
    } else {
      return (
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          frameBorder="0"
          height="450"
          width="100%"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src={`https://embed.music.apple.com/us/playlist/${embedId}`}
          title={`Apple Music Playlist: ${name}`}
          className="w-full"
        />
      );
    }
  };

  return (
    <>
      {/* Backdrop - only show when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      {/* Player Container - changes position/size but iframe never unmounts */}
      <div 
        className={`fixed z-50 transition-all duration-300 ${
          isExpanded
            ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px]'
            : 'bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] px-4 md:px-0'
        }`}
      >
        {/* Header */}
        <div className={`bg-black/80 backdrop-blur-xl border border-white/20 px-3 md:px-5 py-2.5 md:py-4 flex items-center justify-between ${
          isExpanded ? 'rounded-t-[20px]' : 'rounded-t-[16px]'
        }`}>
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <Music2 className="size-4 md:size-5 text-white/70 flex-shrink-0" strokeWidth={2} />
            <div className="min-w-0 flex-1">
              <span className="font-['Space_Grotesk',sans-serif] text-[11px] md:text-[14px] font-semibold text-white truncate block">
                {name}
              </span>
              {!isExpanded && (
                <span className="hidden md:block font-['Space_Grotesk',sans-serif] text-[11px] text-white/50">
                  Playing via {service === 'spotify' ? 'Spotify' : 'Apple Music'}
                </span>
              )}
            </div>
            <div className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full flex-shrink-0 ${
              service === 'spotify' ? 'bg-green-500/20' : 'bg-pink-500/20'
            }`}>
              <span className={`font-['Space_Grotesk',sans-serif] text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
                service === 'spotify' ? 'text-green-400' : 'text-pink-400'
              }`}>
                {service === 'spotify' ? 'Spotify' : 'Apple'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 ml-2 md:ml-3">
            <a
              href={getDirectLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="size-7 md:size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Open in app"
              title={`Open in ${service === 'spotify' ? 'Spotify' : 'Apple Music'} app`}
            >
              <ExternalLink className="size-3.5 md:size-4 text-white" strokeWidth={2} />
            </a>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="size-7 md:size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label={isExpanded ? "Minimize playlist" : "Expand playlist"}
              title={isExpanded ? "Minimize to bottom bar" : "Expand playlist controls"}
            >
              {isExpanded ? (
                <Minimize2 className="size-3.5 md:size-4 text-white" strokeWidth={2} />
              ) : (
                <Maximize2 className="size-3.5 md:size-4 text-white" strokeWidth={2} />
              )}
            </button>
            <button
              onClick={onClose}
              className="size-7 md:size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close playlist"
              title="Stop playlist and return to scene music"
            >
              <X className="size-3.5 md:size-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Iframe Container - always rendered, just shown/hidden with max-height */}
        <div 
          className={`bg-black/80 backdrop-blur-xl border-x border-b border-white/20 overflow-hidden transition-all duration-300 shadow-2xl shadow-black/50 ${
            isExpanded 
              ? `rounded-b-[20px] ${service === 'spotify' ? 'max-h-[380px]' : 'max-h-[450px]'}` 
              : 'max-h-0 border-transparent rounded-b-[16px]'
          }`}
        >
          {renderIframe()}
        </div>

        {/* Info Banner - only show when expanded */}
        {isExpanded && (
          <div className="mt-4 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-[16px] px-4 py-3">
            <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-blue-300/90 text-center leading-relaxed">
              <strong>Note:</strong> Music may pause when minimized due to browser restrictions. For best experience, click "Open in app" to play in {service === 'spotify' ? 'Spotify' : 'Apple Music'} while using VibeCafe!
            </p>
          </div>
        )}
      </div>
    </>
  );
}