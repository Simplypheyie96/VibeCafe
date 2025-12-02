import React from 'react';

export function Navigation() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] box-border flex gap-[24px] h-[39px] items-center left-[641.7px] px-[25px] py-px rounded-full top-[56.5px] w-[240.711px]">
      <div className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-full" />
      
      <button className="h-[21px] relative shrink-0 w-[48.336px]">
        <p className="absolute font-['Space_Grotesk',sans-serif] leading-[21px] left-[24.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Scenes</p>
      </button>
      
      <button className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0">
        <p className="absolute font-['Space_Grotesk',sans-serif] leading-[21px] left-[27px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Playlists</p>
      </button>
      
      <button className="h-[21px] relative shrink-0 w-[39.828px]">
        <p className="absolute font-['Space_Grotesk',sans-serif] leading-[21px] left-[20px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">About</p>
      </button>
    </div>
  );
}
