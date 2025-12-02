function Heading() {
  return (
    <div className="h-[24px] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.3125px] w-full whitespace-pre" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium left-0 text-[#101828] top-[-0.5px]">About</p>
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Bold',sans-serif] font-bold left-0 text-white top-[-0.5px] underline">About</p>
    </div>
  );
}

function FileUpload() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="File Upload">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Designer: Ajayi Feyikemi Mabel</p>
    </div>
  );
}

function FileUpload1() {
  return (
    <div className="h-[56px] overflow-clip relative shrink-0 w-full" data-name="File Upload">
      <div className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-0 tracking-[-0.3125px] w-[262px]">
        <p className="mb-0">Portfolio:</p>
        <a className="block cursor-pointer" href="https://simplypheyie.tilda.ws/">{` https://simplypheyie.tilda.ws/`}</a>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-[36px]">
        <Icon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function App() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[168px] items-start relative shrink-0 w-full" data-name="App">
      <Heading />
      <FileUpload />
      <FileUpload1 />
      <Container />
    </div>
  );
}

export default function Container1() {
  return (
    <div className="relative rounded-[10px] size-full" data-name="Container" style={{ backgroundImage: "linear-gradient(144.192deg, rgb(194, 122, 255) 0%, rgb(246, 51, 154) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
          <App />
        </div>
      </div>
    </div>
  );
}