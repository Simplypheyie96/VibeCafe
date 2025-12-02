import React from 'react';

type Tab = 'scenes' | 'playlists' | 'about';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[20px] md:top-[24px] w-[280px] h-[42px] z-40 max-w-[90vw]">
      <div 
        className="bg-[rgba(255,255,255,0.15)] backdrop-blur-xl border border-[rgba(255,255,255,0.3)] flex items-center rounded-[24px] w-full h-[42px] shadow-lg shadow-black/20 overflow-x-auto scrollbar-hide"
        style={{ padding: '4px', gap: '4px' }}
      >
        <button
          onClick={() => onTabChange('scenes')}
          className={`relative flex-1 transition-all duration-200 flex items-center justify-center rounded-[20px] ${
            activeTab === 'scenes' 
              ? 'bg-white/20 border border-white/30' 
              : 'hover:bg-white/10'
          }`}
          style={{ padding: '8px 16px', minWidth: '70px' }}
        >
          <p className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] whitespace-nowrap tracking-[-0.02em] transition-all duration-200 ${
            activeTab === 'scenes' ? 'text-white' : 'text-white/60'
          }`}>
            Scenes
          </p>
        </button>
        
        <button
          onClick={() => onTabChange('playlists')}
          className={`relative flex-1 transition-all duration-200 flex items-center justify-center rounded-[20px] ${
            activeTab === 'playlists' 
              ? 'bg-white/20 border border-white/30' 
              : 'hover:bg-white/10'
          }`}
          style={{ padding: '8px 16px', minWidth: '70px' }}
        >
          <p className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] whitespace-nowrap tracking-[-0.02em] transition-all duration-200 ${
            activeTab === 'playlists' ? 'text-white' : 'text-white/60'
          }`}>
            Playlists
          </p>
        </button>
        
        <button
          onClick={() => onTabChange('about')}
          className={`relative flex-1 transition-all duration-200 flex items-center justify-center rounded-[20px] ${
            activeTab === 'about' 
              ? 'bg-white/20 border border-white/30' 
              : 'hover:bg-white/10'
          }`}
          style={{ padding: '8px 16px', minWidth: '70px' }}
        >
          <p className={`font-['Space_Grotesk',sans-serif] font-medium text-[13px] whitespace-nowrap tracking-[-0.02em] transition-all duration-200 ${
            activeTab === 'about' ? 'text-white' : 'text-white/60'
          }`}>
            About
          </p>
        </button>
      </div>
    </div>
  );
}