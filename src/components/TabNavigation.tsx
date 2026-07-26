import React from 'react';
import svgPaths from '../imports/svg-dia2w435n3';

type Tab = 'scenes' | 'playlists' | 'about';

const ACTIVE_PILL =
  'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)';

/**
 * One nav pill.
 *
 * The button wrapper is 42px tall and stretches a few pixels past the visible
 * pill on each side. Previously the label was the button, which made the tap
 * area 20px tall -- below any touch guideline, and the hardest thing to hit in
 * the whole app. The horizontal stretch is drawn with an ::after overlay rather
 * than padding so it costs no layout width, which matters at 320px where the
 * row only just fits.
 *
 * The pill's padding is also constant now. It used to be applied only when
 * active, so selecting a tab visibly shoved its neighbours sideways.
 */
function Tab({
  label,
  isActive,
  onClick,
  children,
  pillClassName = 'px-[6px] md:px-[13px]',
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  pillClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      className="relative shrink-0 flex h-[42px] items-center rounded-[20px]
                 after:absolute after:inset-y-0 after:-inset-x-[5px] after:content-['']
                 md:after:-inset-x-[8px]
                 outline-none focus-visible:ring-2 focus-visible:ring-white
                 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
    >
      <div
        className={`relative flex h-[35.5px] items-center justify-center rounded-[20px]
                    transition-all duration-200 ${pillClassName} ${
                      isActive ? '' : 'hover:bg-white/10'
                    }`}
        style={isActive ? { backgroundImage: ACTIVE_PILL } : undefined}
      >
        {isActive && (
          <div
            aria-hidden="true"
            className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[100px]"
          />
        )}
        <p
          className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] md:text-[14px]
                      text-center tracking-[-0.1504px] whitespace-nowrap transition-all duration-200 ${
                        isActive ? 'text-white' : 'text-white/80'
                      }`}
        >
          {children}
        </p>
      </div>
    </button>
  );
}

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onChangeScene?: () => void;
  onOpenSettings?: () => void;
}

export function TabNavigation({ activeTab, onTabChange, onChangeScene, onOpenSettings }: TabNavigationProps) {
  return (
    // Full-width and padded rather than `left-1/2 -translate-x-1/2` on a
    // content-sized box: that centred the row but put no floor under it, so on a
    // narrow phone the two pill groups simply ran off both edges of the screen.
    // `pointer-events-none` keeps the now-transparent full-width strip from
    // swallowing taps meant for the scene behind it.
    <div
      className="absolute inset-x-0 top-[20px] md:top-[24px] z-40 pointer-events-none
                 flex items-center justify-center
                 px-3 md:px-4 md:px-6
                 gap-[6px] md:gap-[12px] md:gap-[24px]"
    >
      {/* Tab Pills Container */}
      <div
        className="glass pointer-events-auto relative flex items-center rounded-full py-px h-[44px]
                   px-[7px] md:px-[13px]
                   gap-[8px] md:gap-[16px] md:gap-[24px]"
      >

        {/* Scenes Tab */}
        <Tab
          label="Scenes"
          isActive={activeTab === 'scenes'}
          onClick={() => onTabChange('scenes')}
          /* Fixed width rather than padding, so the widest label does not make
             the pill jump between scenes. */
          pillClassName="w-[62px] md:w-[88px]"
        >
          <span className="tracking-[-0.26px]">Scenes</span>
        </Tab>

        {/* My Playlist Tab */}
        <Tab
          label="My Playlist"
          isActive={activeTab === 'playlists'}
          onClick={() => onTabChange('playlists')}
        >
          {/* "My" is dropped on the narrowest phones so the row still fits. */}
          <span className="min-[360px]:hidden">Playlist</span>
          <span className="hidden min-[360px]:inline">My Playlist</span>
        </Tab>

        {/* About Tab */}
        <Tab
          label="About"
          isActive={activeTab === 'about'}
          onClick={() => onTabChange('about')}
        >
          About
        </Tab>
      </div>

      {/* Icon Buttons Container */}
      <div
        className="glass pointer-events-auto relative flex items-center rounded-full py-px h-[44px]
                   px-[7px] md:px-[13px]
                   gap-[12px] md:gap-[20px] md:gap-[24px]"
      >

        {/* Change Scene Icon (Image file icon) */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={onChangeScene}
            className="relative flex items-center justify-center shrink-0 size-[24px] hover:scale-110 active:scale-95 transition-transform duration-200
                       after:absolute after:content-[''] after:-inset-y-[10px] after:-inset-x-[7px] md:after:-inset-x-[10px]
                       rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-[6px] focus-visible:ring-offset-black/40"
            aria-label="Change scene"
          >
            <svg
              className="block size-full"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g id="Image-file">
                <path d={svgPaths.p273cc9c0} fill="white" id="Icon" />
              </g>
            </svg>
          </button>
          <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[100]">
            Change scene
          </div>
        </div>

        {/* Settings Icon (Gear icon) */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={onOpenSettings}
            className="relative flex items-center justify-center shrink-0 size-[24px] hover:scale-110 hover:rotate-45 active:scale-95 transition-all duration-300
                       after:absolute after:content-[''] after:-inset-y-[10px] after:-inset-x-[7px] md:after:-inset-x-[10px]
                       rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-[6px] focus-visible:ring-offset-black/40"
            aria-label="Settings"
          >
            <svg
              className="block size-full"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g clipPath="url(#clip0_nav_settings)" id="Settings">
                <g id="Icon">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p279efa80}
                    fill="white"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p2828ed00}
                    fill="white"
                    fillRule="evenodd"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_nav_settings">
                  <rect fill="white" height="24" width="24" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[100]">
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}
