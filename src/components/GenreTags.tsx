import React from 'react';

interface GenreTagsProps {
  tags: string[];
  activeTag: string;
}

export function GenreTags({ tags, activeTag }: GenreTagsProps) {
  return (
    <>
      {/* Desktop: Original absolute positioning */}
      <div className="hidden md:block absolute h-[39px] left-[24px] top-[96px] w-[259.305px] z-40">
        {/* First tag with green dot - active */}
        <div className="absolute bg-[rgba(255,255,255,0.15)] backdrop-blur-xl border border-[rgba(255,255,255,0.3)] border-solid h-[30px] left-0 rounded-[1.67772e+07px] top-px w-[128.516px] shadow-lg shadow-black/20">
          <div className="absolute bg-[#05df72] left-[12px] opacity-[0.8] rounded-[1.67772e+07px] size-[8px] top-[10px] shadow-sm shadow-[#05df72]/50" />
          <p className="absolute font-['Space_Grotesk',sans-serif] font-normal leading-[20px] left-[28px] not-italic text-[14px] text-nowrap text-white top-[4.5px] tracking-[-0.1504px] whitespace-pre">
            {tags[0] || 'Lofi Chill'}
          </p>
        </div>

        {/* Second tag */}
        {tags[1] && (
          <div className="absolute bg-[rgba(255,255,255,0.15)] backdrop-blur-xl border border-[rgba(255,255,255,0.3)] border-solid h-[30px] left-[136.52px] rounded-[1.67772e+07px] top-0 w-[122.789px] shadow-lg shadow-black/20">
            <p className="absolute font-['Space_Grotesk',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[14px] text-nowrap text-white top-[4.5px] tracking-[-0.1504px] whitespace-pre">
              {tags[1]}
            </p>
          </div>
        )}
      </div>

      {/* Mobile: Scrollable flexbox layout */}
      <div className="md:hidden absolute h-[39px] left-4 top-[108px] right-4 overflow-x-auto scrollbar-hide z-40">
        <div className="flex gap-2 h-full items-center py-1">
          {/* First tag with green dot - active */}
          <div className="flex-shrink-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-xl border border-[rgba(255,255,255,0.3)] border-solid h-[30px] rounded-[1.67772e+07px] shadow-lg shadow-black/20 flex items-center" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
            <div className="bg-[#05df72] opacity-[0.8] rounded-[1.67772e+07px] size-[8px] shadow-sm shadow-[#05df72]/50 flex-shrink-0" />
            <p className="font-['Space_Grotesk',sans-serif] font-normal text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre ml-2">
              {tags[0] || 'Lofi Chill'}
            </p>
          </div>

          {/* Second tag */}
          {tags[1] && (
            <div className="flex-shrink-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-xl border border-[rgba(255,255,255,0.3)] border-solid h-[30px] rounded-[1.67772e+07px] shadow-lg shadow-black/20 flex items-center" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
              <p className="font-['Space_Grotesk',sans-serif] font-normal text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">
                {tags[1]}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
