import clsx from "clsx";
import svgPaths from "./svg-dia2w435n3";
import imgApp from "figma:asset/f585ed3bbbfe2de88dbd5011fa308c25ae9182b6.png";
import imgContainer from "figma:asset/32b4a6522df786276011078a70b99fc849ecfb5a.png";
import imgContainer1 from "figma:asset/72d56391dae37a8ecd91f0a519d3e3b293989dd0.png";
import imgContainer2 from "figma:asset/9c730196e9eeb1f72fa56232fdc3c8eb2dcd2428.png";
import imgContainer3 from "figma:asset/2d31031bf66a52f6b4227de4cacfcc640b147883.png";
import imgContainer4 from "figma:asset/2e1e50656e46b4f478e6c20270297a0df4471478.png";
import imgContainer5 from "figma:asset/492cfe147a6d419c26f2458be3d723a356423e9c.png";
import imgContainer6 from "figma:asset/350b03cd9be970d67a928d470d8f344a995bc729.png";
import imgContainer7 from "figma:asset/4d82157e1d7e2352cf54ca9ae0151bc85a6a338a.png";
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)" }} className={clsx("content-stretch flex items-center px-[13px] relative rounded-[16777200px] shrink-0", additionalClassNames)}>
      {children}
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative", additionalClassNames)}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] text-center tracking-[-0.1504px] whitespace-nowrap">{text}</p>
    </div>
  );
}

function ContainerBackgroundImage1() {
  return (
    <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer} />
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <BackgroundImage>
        <path d="M10 2V4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="2" />
        <path d="M14 2V4" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="2" />
        <path d={svgPaths.p1f246500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="2" />
        <path d="M6 2V4" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="2" />
      </BackgroundImage>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative size-full" data-name="App">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgApp} />
      <div className="absolute content-stretch flex flex-col items-start left-[414px] size-[48px] top-[271px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-20.83%_-29.18%_-37.5%_-29.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.0005 38.0005">
                <g filter="url(#filter0_d_179_543)" id="Icon">
                  <path d={svgPaths.p234b9600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M26.9985 8.00025V12.0002" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M28.9985 10.0002H24.9985" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M10.9985 22.0002V24.0002" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M11.9985 23.0002H9.99848" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_543" width="40" x="-1.00152" y="-0.999751">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_543" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_543" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[616px] size-[48px] top-[377px]" data-name="InteractionIcon">
        <ContainerBackgroundImage />
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[626px] size-[48px] top-[595px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-16.67%_-29.17%_-33.33%_-29.17%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 36.0004">
                <g filter="url(#filter0_d_179_564)" id="Icon">
                  <path d={svgPaths.p36ff0600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p27113e00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p3c7e8100} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p3ccf4060} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M24 25.0002L21 19.0002H17" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p234347c0} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M9 16.0002H15.5L17 13.0002" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p1d32a3e0} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M29 16.0002H22.5L21 19.0002" id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p18be0800} id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p768d400} id="Vector_11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M14 7.00022L17 13.0002H21" id="Vector_12" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_564" width="40" x="-1" y="-1.99978">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_564" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_564" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[894px] size-[48px] top-[595px]" data-name="InteractionIcon">
        <ContainerBackgroundImage />
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[1098px] size-[48px] top-[664px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-16.67%_-16.67%_-37.5%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 37">
                <g filter="url(#filter0_d_179_550)" id="Icon">
                  <path d={svgPaths.p498e3f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_550" width="40" x="-4" y="-1.99998">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_550" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_550" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[814px] size-[48px] top-[290px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-16.66%_-29.17%_-37.5%_-29.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.9979 36.9973">
                <g filter="url(#filter0_d_179_528)" id="Icon">
                  <path d={svgPaths.p11836e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M22.9974 17.9973V23.9973" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M14.9974 17.9973V23.9973" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M18.9974 19.9973V25.9973" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_528" width="40" x="-1.00259" y="-2.00267">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_528" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_528" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[1050px] size-[48px] top-[451px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-20.83%_-25%_-33.33%_-29.17%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 37">
                <g filter="url(#filter0_d_179_518)" id="Icon">
                  <path d={svgPaths.p3ed44420} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.pa507300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_518" width="40" x="-1" y="-0.999989">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_518" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_518" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[422px] size-[48px] top-[562px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-20.83%_-29.17%_-37.5%_-29.17%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
                <g filter="url(#filter0_d_179_534)" id="Icon">
                  <path d={svgPaths.p2f7872f2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p4620f00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p5eb3ad6} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M17 11H21" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M17 15H21" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M17 19H21" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M17 23H21" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_534" width="40" x="-1" y="-1">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_534" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_534" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[rgba(0,0,0,0.2)] content-stretch flex gap-[15.832px] h-[137.46px] items-center justify-center left-1/2 px-[21px] py-px rounded-[18.999px] top-[820.77px]" data-name="Container">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[18.999px]" />
        <ContainerBackgroundImage1 />
        <div className="h-[105px] pointer-events-none relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover rounded-[10.555px] size-full" src={imgContainer1} />
          <div aria-hidden="true" className="absolute border-4 border-[#c27aff] border-solid inset-0 rounded-[10.555px]" />
        </div>
        <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer2} />
        </div>
        <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer3} />
        </div>
        <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer4} />
        </div>
        <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer5} />
        </div>
        <ContainerBackgroundImage1 />
        <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer6} />
        </div>
        <div className="h-[105px] relative rounded-[10.555px] shrink-0 w-[120px]" data-name="Container">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10.555px] size-full" src={imgContainer7} />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[1210px] size-[48px] top-[307px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute inset-[-16.71%_-29.17%_-33.33%_-29.17%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.0001 36.0106">
                <g filter="url(#filter0_d_179_507)" id="Icon">
                  <path d="M23.0001 11.0106H23.0101" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p2d7c9d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p39bc4400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M17.0001 22.0106V25.0106" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M21.0001 21.7606V25.0106" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p2331b62c} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_179_507" width="40" x="-0.999915" y="-1.98943">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_179_507" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_179_507" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[777px] size-[48px] top-[712px]" data-name="InteractionIcon">
        <div className="bg-[rgba(0,0,0,0.2)] content-stretch flex h-[48px] items-center justify-center p-px relative rounded-[16px] shrink-0 w-full" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="relative shrink-0 size-[16px]" data-name="Icon">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="Icon">
                <path d={svgPaths.p3bff1000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.p2916c800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[24px] items-center left-[586px] top-[56.5px]">
        <BackgroundImage2 additionalClassNames="gap-[24px] h-[44px] py-px">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
          <div className="relative rounded-[100px] shrink-0 w-[88px]">
            <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[100px]" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
              <div className="content-stretch flex h-[35.5px] items-center justify-center relative rounded-[20px] shrink-0 w-full" data-name="button" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)" }}>
                <p className="font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[19.5px] relative shrink-0 text-[13px] text-center text-white tracking-[-0.26px] whitespace-nowrap">Scenes</p>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-[70px]" data-name="Button">
            <BackgroundImageAndText text="My Playlist" additionalClassNames="w-full" />
          </div>
          <div className="relative shrink-0" data-name="Button">
            <BackgroundImageAndText text="About" />
          </div>
        </BackgroundImage2>
        <div className="flex flex-row items-center self-stretch">
          <BackgroundImage2 additionalClassNames="gap-[24px] h-full py-px">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
            <BackgroundImage1>
              <g id="Image-file">
                <path d={svgPaths.p273cc9c0} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </BackgroundImage1>
            <BackgroundImage1>
              <g clipPath="url(#clip0_179_515)" id="Settings">
                <g id="Icon">
                  <path clipRule="evenodd" d={svgPaths.p279efa80} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p2828ed00} fill="var(--fill-0, white)" fillRule="evenodd" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_179_515">
                  <rect fill="white" height="24" width="24" />
                </clipPath>
              </defs>
            </BackgroundImage1>
          </BackgroundImage2>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[21px] items-center left-[34px] top-[106px]" data-name="Container">
        <BackgroundImage2 additionalClassNames="gap-[8px] py-[5px]">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
          <div className="bg-[#05df72] opacity-69 rounded-[16777200px] shrink-0 size-[8px]" data-name="Text" />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px] whitespace-nowrap">Cozy study</p>
        </BackgroundImage2>
        <BackgroundImage2 additionalClassNames="justify-center py-[5px]">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px] whitespace-nowrap">Sunset Mood</p>
        </BackgroundImage2>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex items-center justify-center left-[31px] p-[20px] rounded-[16.4px] top-[534px] w-[221px]" data-name="App">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
          <div className="h-[22.398px] relative shrink-0 w-full" data-name="Paragraph">
            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Now Playing</p>
          </div>
          <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
            <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Cozy Cafe Morning</p>
          </div>
          <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 5">
            <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[10px] text-white top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Tropical shore</p>
          </div>
          <BackgroundImage>
            <path d="M9 18V5L21 3V16" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="2" />
            <path d={svgPaths.p4141780} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="2" />
            <path d={svgPaths.p327d5700} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="2" />
          </BackgroundImage>
        </div>
        <div className="relative shrink-0 size-[25.801px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.8008 25.8008">
            <g id="Icon">
              <path d={svgPaths.p328efd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.15007" />
              <path d={svgPaths.p37658a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.15007" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}