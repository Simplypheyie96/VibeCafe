import svgPaths from "./svg-ankwpcu4ba";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[32px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="App">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <div className="bg-[rgba(0,201,80,0.2)] h-[32px] relative rounded-[16777200px] shrink-0 w-[62.094px]" data-name="Container">
            <p className="absolute font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[15px] left-[10px] text-[#05df72] text-[10px] top-[9.5px] tracking-[0.5px] uppercase whitespace-nowrap">Spotify</p>
          </div>
          <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-[112px]" data-name="Container">
            <Wrapper1>
              <Wrapper>
                <g id="ExternalLink">
                  <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M6.66667 9.33333L14 2" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p25f66900} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </g>
              </Wrapper>
            </Wrapper1>
            <Wrapper1>
              <Wrapper>
                <g id="Maximize2">
                  <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M6 14H2V10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M14 2L9.33333 6.66667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M2 14L6.66667 9.33333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </g>
              </Wrapper>
            </Wrapper1>
            <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[16777200px]" data-name="button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                <Wrapper>
                  <g id="X">
                    <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </g>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[12px] h-[37.5px] items-center relative shrink-0 w-full" data-name="Container">
          <div className="relative shrink-0 size-[20px]" data-name="Music2">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Music2">
                <path d={svgPaths.p5641f40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
                <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
              </g>
            </svg>
          </div>
          <div className="flex-[1_0_0] h-[37.5px] min-h-px min-w-px relative" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
              <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="span">
                <p className="absolute font-['Space_Grotesk:SemiBold',sans-serif] leading-[21px] left-0 not-italic text-[14px] text-white top-[0.5px] whitespace-nowrap">olivia</p>
              </div>
              <div className="h-[16.5px] relative shrink-0 w-full" data-name="span">
                <p className="absolute font-['Space_Grotesk:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.5)] top-0 whitespace-nowrap">Playing via Spotify</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}