// Analytics utility for VibeCafe
// Supports Google Analytics 4 (GA4)

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialize Google Analytics
export const initAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
  });
};

// Track page views
export const trackPageView = (path: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
  });
};

// Track scene changes
export const trackSceneChange = (sceneName: string, sceneId: number, isCustom: boolean) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'scene_change', {
    scene_name: sceneName,
    scene_id: sceneId,
    is_custom_scene: isCustom,
  });
};

// Track music playback
export const trackMusicPlayback = (action: 'play' | 'pause', trackTitle: string, artist: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', `music_${action}`, {
    track_title: trackTitle,
    artist: artist,
  });
};

// Track ambient sound toggles
export const trackAmbientToggle = (soundType: string, isActive: boolean) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'ambient_sound', {
    sound_type: soundType,
    action: isActive ? 'enabled' : 'disabled',
  });
};

// Track playlist interactions
export const trackPlaylistAction = (action: 'open' | 'close' | 'add', playlistName?: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'playlist_interaction', {
    action: action,
    playlist_name: playlistName || 'unknown',
  });
};

// Track custom content creation
export const trackCustomContent = (contentType: 'scene' | 'playlist' | 'preset', name: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'custom_content_created', {
    content_type: contentType,
    content_name: name,
  });
};

// Track settings changes
export const trackSettingsChange = (setting: string, value: number) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'settings_change', {
    setting_name: setting,
    setting_value: value,
  });
};

// Track user engagement time
export const trackEngagement = (durationSeconds: number) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'user_engagement', {
    engagement_time_msec: durationSeconds * 1000,
  });
};

// Track errors
export const trackError = (errorMessage: string, errorLocation: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'exception', {
    description: errorMessage,
    fatal: false,
    location: errorLocation,
  });
};
