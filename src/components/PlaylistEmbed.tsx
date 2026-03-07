import React, { useState } from 'react';
import { Minimize2, Maximize2, X, Music2, ExternalLink } from 'lucide-react';

interface PlaylistEmbedProps {
  name: string;
  service: 'spotify' | 'apple-music' | 'youtube' | 'soundcloud';
  embedId: string;
  onClose: () => void;
}

export function PlaylistEmbed({ name, service, embedId, onClose }: PlaylistEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded so users can log in

  // Get direct app/web link
  const getDirectLink = () => {
    if (service === 'spotify') {
      return `https://open.spotify.com/playlist/${embedId}`;
    } else if (service === 'apple-music') {
      return `https://music.apple.com/us/playlist/${embedId}`;
    } else if (service === 'youtube') {
      // Check if it's a playlist or single video
      if (embedId.startsWith('PL') || embedId.startsWith('UU') || embedId.startsWith('FL') || embedId.startsWith('RD')) {
        return `https://www.youtube.com/playlist?list=${embedId}`;
      }
      return `https://www.youtube.com/watch?v=${embedId}`;
    } else if (service === 'soundcloud') {
      return `https://soundcloud.com/${embedId}`;
    }
    return '#';
  };

  // Get service display name
  const getServiceName = () => {
    switch (service) {
      case 'spotify': return 'Spotify';
      case 'apple-music': return 'Apple Music';
      case 'youtube': return 'YouTube';
      case 'soundcloud': return 'SoundCloud';
      default: return service;
    }
  };

  // Get service badge color
  const getServiceBadgeColor = () => {
    switch (service) {
      case 'spotify': return 'bg-green-500/20';
      case 'apple-music': return 'bg-pink-500/20';
      case 'youtube': return 'bg-red-500/20';
      case 'soundcloud': return 'bg-orange-500/20';
      default: return 'bg-white/20';
    }
  };

  const getServiceBadgeTextColor = () => {
    switch (service) {
      case 'spotify': return 'text-green-400';
      case 'apple-music': return 'text-pink-400';
      case 'youtube': return 'text-red-400';
      case 'soundcloud': return 'text-orange-400';
      default: return 'text-white';
    }
  };

  // Render the iframe once - it never unmounts
  const renderIframe = () => {
    if (service === 'spotify') {
      return (
        <iframe
          src={`https://open.spotify.com/embed/playlist/${embedId}?utm_source=generator&theme=0`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title={`Spotify Playlist: ${name}`}
          className="w-full"
          style={{ borderRadius: '12px' }}
        />
      );
    } else if (service === 'apple-music') {
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
          style={{ borderRadius: '12px' }}
        />
      );
    } else if (service === 'youtube') {
      // Determine if it's a playlist or single video
      const isPlaylist = embedId.startsWith('PL') || embedId.startsWith('UU') || embedId.startsWith('FL') || embedId.startsWith('RD');
      const embedUrl = isPlaylist 
        ? `https://www.youtube-nocookie.com/embed/videoseries?list=${embedId}&enablejsapi=1`
        : `https://www.youtube-nocookie.com/embed/${embedId}?enablejsapi=1&loop=1&playlist=${embedId}`;
      
      return (
        <iframe
          width="100%"
          height="380"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          title={`YouTube ${isPlaylist ? 'Playlist' : 'Video'}: ${name}`}
          className="w-full rounded-b-[12px]"
        />
      );
    } else if (service === 'soundcloud') {
      return (
        <iframe
          width="100%"
          height="380"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${encodeURIComponent(embedId)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
          title={`SoundCloud: ${name}`}
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
                  Playing via {getServiceName()}
                </span>
              )}
            </div>
            <div className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full flex-shrink-0 ${getServiceBadgeColor()}`}>
              <span className={`font-['Space_Grotesk',sans-serif] text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${getServiceBadgeTextColor()}`}>
                {getServiceName()}
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
              title={`Open in ${getServiceName()} app`}
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
              {service === 'spotify' ? (
                <>
                  <strong>🎵 How to use:</strong> Click the green "Play on Spotify" button above. If you have Spotify Premium, you can listen within the embed. Free users can click the <ExternalLink className="inline size-3 mx-0.5" /> button to play in Spotify app while enjoying VibeCafe visuals!
                </>
              ) : service === 'apple-music' ? (
                <>
                  <strong>🎵 How to use:</strong> Apple Music subscribers can log in directly in the player above. After logging in, press play and minimize this player to enjoy alongside the cafe ambience!
                </>
              ) : (
                <>
                  <strong>Tip:</strong> Press play above to start the music! You can minimize this player anytime to enjoy it alongside the cafe ambience.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}