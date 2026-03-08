import React from 'react';
import svgPaths from '../imports/svg-dia2w435n3';

type Tab = 'scenes' | 'playlists' | 'about';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onChangeScene?: () => void;
  onOpenSettings?: () => void;
}

export function TabNavigation({ activeTab, onTabChange, onChangeScene, onOpenSettings }: TabNavigationProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[20px] md:top-[24px] z-40 flex items-center gap-[12px] md:gap-[24px]">
      {/* Tab Pills Container */}
      <div
        className="relative flex items-center rounded-full px-[13px] py-px h-[44px]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          gap: '24px',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-full"
        />

        {/* Scenes Tab */}
        <button
          onClick={() => onTabChange('scenes')}
          className="relative shrink-0 w-[88px]"
        >
          {activeTab === 'scenes' && (
            <div
              aria-hidden="true"
              className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[100px]"
            />
          )}
          <div
            className={`flex h-[35.5px] items-center justify-center rounded-[20px] w-full transition-all duration-200 ${
              activeTab === 'scenes' ? '' : 'hover:bg-white/10'
            }`}
            style={
              activeTab === 'scenes'
                ? {
                    backgroundImage:
                      'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)',
                  }
                : undefined
            }
          >
            <p
              className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] text-center tracking-[-0.26px] whitespace-nowrap transition-all duration-200 ${
                activeTab === 'scenes' ? 'text-white' : 'text-white/80'
              }`}
            >
              Scenes
            </p>
          </div>
        </button>

        {/* My Playlist Tab */}
        <button
          onClick={() => onTabChange('playlists')}
          className="relative shrink-0"
        >
          <div
            className={`flex items-center justify-center rounded-[20px] transition-all duration-200 ${
              activeTab === 'playlists' ? '' : 'hover:bg-white/10'
            }`}
            style={
              activeTab === 'playlists'
                ? {
                    backgroundImage:
                      'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)',
                    padding: '7px 13px',
                  }
                : undefined
            }
          >
            {activeTab === 'playlists' && (
              <div
                aria-hidden="true"
                className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[100px]"
              />
            )}
            <p
              className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] md:text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap transition-all duration-200 ${
                activeTab === 'playlists' ? 'text-white' : 'text-white/80'
              }`}
            >
              My Playlist
            </p>
          </div>
        </button>

        {/* About Tab */}
        <button
          onClick={() => onTabChange('about')}
          className="relative shrink-0"
        >
          <div
            className={`flex items-center justify-center rounded-[20px] transition-all duration-200 ${
              activeTab === 'about' ? '' : 'hover:bg-white/10'
            }`}
            style={
              activeTab === 'about'
                ? {
                    backgroundImage:
                      'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)',
                    padding: '7px 13px',
                  }
                : undefined
            }
          >
            {activeTab === 'about' && (
              <div
                aria-hidden="true"
                className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[100px]"
              />
            )}
            <p
              className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] md:text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap transition-all duration-200 ${
                activeTab === 'about' ? 'text-white' : 'text-white/80'
              }`}
            >
              About
            </p>
          </div>
        </button>
      </div>

      {/* Icon Buttons Container */}
      <div
        className="relative flex items-center rounded-full px-[13px] py-px h-[44px]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          gap: '24px',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-full"
        />

        {/* Change Scene Icon (Image file icon) */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={onChangeScene}
            className="relative flex items-center justify-center shrink-0 size-[24px] hover:scale-110 active:scale-95 transition-transform duration-200"
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
            className="relative flex items-center justify-center shrink-0 size-[24px] hover:scale-110 hover:rotate-45 active:scale-95 transition-all duration-300"
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
