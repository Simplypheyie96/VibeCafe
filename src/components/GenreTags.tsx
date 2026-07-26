import React from 'react';

interface GenreTagsProps {
  tags: string[];
  /** Kept for call-site compatibility; the first tag is always the live one. */
  activeTag?: string;
}

/**
 * The scene's mood tags. This was two near-identical trees behind `md:hidden` /
 * `hidden md:flex`; it is now one, with the breakpoint doing only the two things
 * that actually differ (position and horizontal scrolling).
 */
export function GenreTags({ tags }: GenreTagsProps) {
  const [live, ...rest] = tags.length ? tags : ['Lofi Chill'];

  return (
    <div
      className="absolute z-40 left-4 right-4 top-[104px] overflow-x-auto scrollbar-hide
                 md:left-[24px] md:right-auto md:top-[96px] md:overflow-visible"
    >
      <div className="flex items-center gap-2 py-1">
        <span className="flex flex-shrink-0 items-center gap-2.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/20">
          <span
            aria-hidden="true"
            className="size-[8px] flex-shrink-0 rounded-full bg-[#05df72] opacity-80 shadow-sm shadow-[#05df72]/50"
          />
          <span className="whitespace-nowrap text-[13px] md:text-[14px] leading-none text-white tracking-[-0.1504px]">
            {live}
          </span>
        </span>

        {rest.map((tag) => (
          <span
            key={tag}
            className="flex flex-shrink-0 items-center rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/20"
          >
            <span className="whitespace-nowrap text-[13px] md:text-[14px] leading-none text-white tracking-[-0.1504px]">
              {tag}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
