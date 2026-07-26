import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Minimize2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import svgPaths from "../imports/svg-ankwpcu4ba";

interface PlaylistEmbedProps {
  name: string;
  service: 'spotify' | 'apple-music' | 'youtube' | 'soundcloud';
  embedId: string;
  onClose: () => void;
}

export function PlaylistEmbed({ name, service, embedId, onClose }: PlaylistEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEmbedPlaying, setIsEmbedPlaying] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const buildSrc = (): string => {
    if (service === 'spotify')
      return `https://open.spotify.com/embed/playlist/${embedId}?utm_source=generator&theme=0`;
    if (service === 'apple-music')
      return `https://embed.music.apple.com/us/playlist/${embedId}`;
    if (service === 'youtube') {
      const isList = embedId.startsWith('PL') || embedId.startsWith('UU') || embedId.startsWith('FL') || embedId.startsWith('RD');
      return isList
        ? `https://www.youtube-nocookie.com/embed/videoseries?list=${embedId}&enablejsapi=1&autoplay=1`
        : `https://www.youtube-nocookie.com/embed/${embedId}?enablejsapi=1&loop=1&playlist=${embedId}&autoplay=1`;
    }
    if (service === 'soundcloud')
      return `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${encodeURIComponent(embedId)}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    return '';
  };

  const handlePlayPause = () => {
    if (!isEmbedPlaying) {
      // Mount the new iframe synchronously within the click gesture so autoplay is allowed
      flushSync(() => {
        setIsEmbedPlaying(true);
        setIframeKey(prev => prev + 1);
      });
    } else {
      setIsEmbedPlaying(false);
    }
  };

  // Get direct app/web link
  const getDirectLink = () => {
    if (service === 'spotify') return `https://open.spotify.com/playlist/${embedId}`;
    if (service === 'apple-music') return `https://music.apple.com/us/playlist/${embedId}`;
    if (service === 'youtube') {
      if (embedId.startsWith('PL') || embedId.startsWith('UU') || embedId.startsWith('FL') || embedId.startsWith('RD')) {
        return `https://www.youtube.com/playlist?list=${embedId}`;
      }
      return `https://www.youtube.com/watch?v=${embedId}`;
    }
    if (service === 'soundcloud') return `https://soundcloud.com/${embedId}`;
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
      case 'spotify': return 'bg-[rgba(0,201,80,0.2)]';
      case 'apple-music': return 'bg-pink-500/20';
      case 'youtube': return 'bg-red-500/20';
      case 'soundcloud': return 'bg-orange-500/20';
      default: return 'bg-white/20';
    }
  };

  const getServiceBadgeTextColor = () => {
    switch (service) {
      case 'spotify': return 'text-[#05df72]';
      case 'apple-music': return 'text-pink-400';
      case 'youtube': return 'text-red-400';
      case 'soundcloud': return 'text-orange-400';
      default: return 'text-white';
    }
  };

  // Render the iframe — key forces remount on play, null when paused
  const renderIframe = () => {
    if (!isEmbedPlaying) return null;
    const src = buildSrc();
    const commonProps = { key: iframeKey, width: '100%', frameBorder: '0' as const, className: 'w-full', src };
    if (service === 'spotify') {
      return (
        <iframe
          {...commonProps}
          height="380"
          style={{ height: '380px', minHeight: '380px', maxHeight: '380px' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          title={`Spotify Playlist: ${name}`}
        />
      );
    } else if (service === 'apple-music') {
      return (
        <iframe
          {...commonProps}
          height="450"
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          title={`Apple Music Playlist: ${name}`}
        />
      );
    } else if (service === 'youtube') {
      const isPlaylist = embedId.startsWith('PL') || embedId.startsWith('UU') || embedId.startsWith('FL') || embedId.startsWith('RD');
      return (
        <iframe
          {...commonProps}
          height="380"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          title={`YouTube ${isPlaylist ? 'Playlist' : 'Video'}: ${name}`}
        />
      );
    } else if (service === 'soundcloud') {
      return (
        <iframe
          {...commonProps}
          height="380"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          title={`SoundCloud: ${name}`}
        />
      );
    }
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
      
      <div className={`fixed z-50 inset-0 pointer-events-none ${isExpanded ? 'flex items-center justify-center' : ''}`}>
        <motion.div
          drag={!isExpanded}
          dragMomentum={false}
          dragElastic={0.1}
          layout
          initial={false}
          animate={isExpanded ? { x: 0, y: 0 } : {}}
          className={`pointer-events-auto glass glass-deep flex flex-col overflow-hidden ${
            isExpanded
              ? 'w-[90vw] max-w-[500px] rounded-[16px]'
              : 'w-[320px] rounded-[10px] absolute bottom-6 right-6 cursor-grab active:cursor-grabbing'
          }`}
        >
          {/* Header - Matches Figma Design */}
          <div className="p-[20px] flex flex-col gap-[12px] shrink-0 w-full relative z-10">
            {/* Top Row */}
            <div className="flex items-center justify-between w-full">
              {/* Service Badge + drag hint when minimized */}
              <div className="flex items-center gap-[8px]">
                <div className={`h-[32px] px-[10px] rounded-full flex items-center justify-center ${getServiceBadgeColor()}`}>
                  <span className={`font-['Space_Grotesk',sans-serif] font-bold text-[10px] tracking-[0.5px] uppercase whitespace-nowrap ${getServiceBadgeTextColor()}`}>
                    {getServiceName()}
                  </span>
                </div>
                {!isExpanded && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center cursor-grab active:cursor-grabbing text-white/60 hover:text-white transition-colors">
                        <GripVertical className="size-[16px]" strokeWidth={2} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={6} className="bg-zinc-900 text-white/90 border border-white/15 font-['Space_Grotesk',sans-serif] text-[11px]">
                      Drag to reposition
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-[8px] h-[32px] cursor-auto" onPointerDown={(e) => e.stopPropagation()}>
                {/* Play/Pause button — only shown in minimized state */}
                {!isExpanded && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handlePlayPause}
                        className="size-[32px] rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] active:scale-90 flex items-center justify-center transition-all"
                        aria-label={isEmbedPlaying ? 'Pause' : 'Play'}
                      >
                        {isEmbedPlaying ? (
                          <svg className="size-[16px] text-white" fill="none" viewBox="0 0 16 16">
                            <path d="M6 3H4V13H6V3Z" fill="currentColor" />
                            <path d="M12 3H10V13H12V3Z" fill="currentColor" />
                          </svg>
                        ) : (
                          <svg className="size-[16px] text-white" fill="none" viewBox="0 0 16 16">
                            <path d="M4 2.66667L12 8L4 13.3333V2.66667Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </svg>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={6} className="bg-zinc-900 text-white/90 border border-white/15 font-['Space_Grotesk',sans-serif] text-[11px]">
                      {isEmbedPlaying ? 'Pause' : 'Play'}
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={getDirectLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-[32px] rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center transition-colors"
                      aria-label="Open in app"
                    >
                      <svg className="size-[16px] text-white" fill="none" viewBox="0 0 16 16">
                        <path d="M10 2H14V6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M6.66667 9.33333L14 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p25f66900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6} className="bg-zinc-900 text-white/90 border border-white/15 font-['Space_Grotesk',sans-serif] text-[11px]">
                    Open in {getServiceName()}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        const expanding = !isExpanded;
                        if (expanding && !isEmbedPlaying) {
                          flushSync(() => {
                            setIsExpanded(true);
                            setIsEmbedPlaying(true);
                            setIframeKey((prev: number) => prev + 1);
                          });
                        } else {
                          setIsExpanded(expanding);
                        }
                      }}
                      className="size-[32px] rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center transition-colors"
                      aria-label={isExpanded ? "Minimize" : "Expand"}
                    >
                      {isExpanded ? (
                        <Minimize2 className="size-[16px] text-white" strokeWidth={1.5} />
                      ) : (
                        <svg className="size-[16px] text-white" fill="none" viewBox="0 0 16 16">
                          <path d="M10 2H14V6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d="M6 14H2V10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d="M14 2L9.33333 6.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d="M2 14L6.66667 9.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </svg>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6} className="bg-zinc-900 text-white/90 border border-white/15 font-['Space_Grotesk',sans-serif] text-[11px]">
                    {isExpanded ? 'Minimize player' : 'Expand player'}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onClose}
                      className="size-[32px] rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center transition-colors"
                      aria-label="Close"
                    >
                      <svg className="size-[16px] text-white" fill="none" viewBox="0 0 16 16">
                        <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6} className="bg-zinc-900 text-white/90 border border-white/15 font-['Space_Grotesk',sans-serif] text-[11px]">
                    Close player
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-[12px] items-center w-full h-[37.5px]">
              <div className="size-[20px] flex items-center justify-center shrink-0">
                <svg className="size-[20px] text-white/70" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p5641f40} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M10 15V1.66667L15.8333 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
              <div className="flex flex-col flex-1 min-w-0 justify-center h-full">
                <p className="font-['Space_Grotesk',sans-serif] font-semibold text-[14px] text-white leading-[21px] truncate w-full">
                  {name}
                </p>
                <p className="font-['Space_Grotesk',sans-serif] text-[11px] text-[rgba(255,255,255,0.5)] leading-[16.5px] truncate w-full">
                  {!isExpanded && !isEmbedPlaying
                    ? 'Expand to resume playing'
                    : `Playing via ${getServiceName()}`}
                </p>
              </div>
            </div>
          </div>

          {/* Iframe container — inline min/max/height locks prevent layout animation from stretching */}
          <div
            style={{
              height: isExpanded
                ? service === 'spotify' ? '380px' : '450px'
                : '0px',
              minHeight: isExpanded
                ? service === 'spotify' ? '380px' : '450px'
                : '0px',
              maxHeight: isExpanded
                ? service === 'spotify' ? '380px' : '450px'
                : '0px',
              overflow: 'hidden',
              transition: 'height 0.3s ease',
              flexShrink: 0,
            }}
            className="w-full relative z-0 bg-black/40"
          >
            <div className="w-full h-full px-3 pb-3">
              <div className="w-full h-full rounded-[12px] overflow-hidden">
                {renderIframe()}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </>
  );
}
