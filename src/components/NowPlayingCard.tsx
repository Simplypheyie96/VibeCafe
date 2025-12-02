import React from 'react';
import svgPaths from '../imports/svg-bk0ntt4z9w';

interface NowPlayingCardProps {
  trackTitle: string;
  artist: string;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function NowPlayingCard({ trackTitle, artist, isPlaying, onPlayPause }: NowPlayingCardProps) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.25)] backdrop-blur-xl border border-[rgba(255,255,255,0.35)] flex flex-col z-30
      left-4 right-4 bottom-[128px]
      md:left-[31px] md:right-auto md:top-[534px] md:bottom-auto md:w-[221px]
      rounded-[12px] md:rounded-[16.4px] shadow-xl shadow-black/30
      sm:left-6 sm:right-6 sm:max-w-[400px]"
      style={{ padding: '10px 16px' }}
    >
      {/* Content Container */}
      <div className="flex flex-col gap-[4px]">
        {/* Now Playing label */}
        <p className="font-['Space_Grotesk',sans-serif] font-normal text-[12px] md:text-[14px] text-[rgba(255,255,255,0.6)] tracking-[-0.1504px]">
          Now Playing
        </p>
        
        {/* Track title and Play/Pause button row */}
        <div className="flex items-center justify-between gap-[12px]">
          <p className="font-['Space_Grotesk',sans-serif] font-medium text-[14px] md:text-[16px] text-white tracking-[-0.3125px] overflow-hidden text-ellipsis whitespace-nowrap flex-1">
            {trackTitle}
          </p>
          
          {/* Play/Pause button */}
          <button
            onClick={onPlayPause}
            className="size-[24px] md:size-[20px] hover:scale-110 active:scale-95 transition-transform duration-200 shrink-0 flex items-center justify-center"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="Icon">
                {isPlaying ? (
                  <>
                    <path d={svgPaths.p3bff1000} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={svgPaths.p2916c800} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </>
                ) : (
                  <path d="M4 2.66667L12 8L4 13.3333V2.66667Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                )}
              </g>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Music icon at bottom */}
      <div className="relative shrink-0 size-[20px] md:size-[24px] mt-[6px] md:mt-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="Icon">
            <path d="M9 18V5L21 3V16" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="2" />
            <path d={svgPaths.p4141780} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="2" />
            <path d={svgPaths.p327d5700} id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}