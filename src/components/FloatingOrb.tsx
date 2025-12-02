import React from 'react';
import svgPaths from '../imports/svg-bk0ntt4z9w';

interface FloatingOrbProps {
  onClick: () => void;
  badgeCount?: number;
}

export function FloatingOrb({ onClick, badgeCount }: FloatingOrbProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-[110px] size-[48px]
        sm:right-6 sm:top-[115px] sm:size-[52px]
        md:right-6 md:top-[120px] md:size-[56px]
        lg:right-8 lg:size-[64px]
        group z-50 pointer-events-auto touch-manipulation"
    >
      {/* Main orb container with gradient and shadow */}
      <div className="absolute left-0 rounded-[1.67772e+07px] shadow-[0px_25px_50px_-12px_rgba(173,70,255,0.6)] size-full top-0 transition-transform duration-300 group-hover:scale-105 border border-[rgba(255,255,255,0.3)]">
        {/* Gradient background - using inline style for precise gradient */}
        <div className="absolute inset-0 rounded-[1.67772e+07px] bg-gradient-to-br from-[#ad46ff] via-[#c27aff] to-[#d896ff]" />
        
        {/* Settings icon */}
        <div className="absolute left-[13px] size-[22px] top-[13px]
          sm:left-[14px] sm:size-[24px] sm:top-[14px]
          md:left-[16px] md:size-[26px] md:top-[15px]
          lg:left-[18px] lg:size-[28px] lg:top-[18px]">
          <div className="absolute inset-[-10.12%_-24.41%_-38.69%_-24.4%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
              <g filter="url(#filter0_d_5_871)" id="Icon">
                <path 
                  d={svgPaths.p3cf40300} 
                  id="Vector" 
                  stroke="white" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2.33333" 
                  className="group-hover:rotate-90 transition-transform duration-500 origin-center"
                />
                <path d="M30.165 6.33362V11.0003" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                <path d="M32.4983 8.66695H27.8316" id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                <path d="M11.4983 22.667V25.0003" id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                <path d="M12.665 23.8336H10.3316" id="Vector_5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="44" id="filter0_d_5_871" width="44" x="-1.16838" y="-1.16638">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="4" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5_871" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_5_871" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Blur effect behind */}
        <div className="absolute blur-xl filter left-0 rounded-[1.67772e+07px] size-full top-0 -z-10 bg-gradient-to-br from-[#ad46ff] to-[#d896ff] opacity-60" />
      </div>

      {/* Animated decorative dots */}
      <div className="hidden lg:block absolute left-0 size-[64px] top-0">
        <div className="absolute bg-white left-[30px] opacity-[0.929] rounded-[1.67772e+07px] size-[4px] top-[27.86px] animate-pulse" />
        <div className="absolute bg-white left-[30px] rounded-[1.67772e+07px] size-[4px] top-[29.99px] animate-pulse delay-100" />
        <div className="absolute bg-white left-[30px] opacity-[0.907] rounded-[1.67772e+07px] size-[4px] top-[27.22px] animate-pulse delay-200" />
      </div>

      {/* Badge for preset count */}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 size-5 sm:size-6 bg-pink-500 border-2 border-black rounded-full flex items-center justify-center shadow-lg">
          <span className="font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] font-bold text-white">
            {badgeCount}
          </span>
        </span>
      )}
    </button>
  );
}
