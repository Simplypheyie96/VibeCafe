// Core type definitions for VibeCafe

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

export interface Scene {
  id: number;
  name: string;
  thumbnail: string;
  wallpaper: string;
  genre: string;
  tags: string[];
  playlist: Track[];
  musicUrl: string; // Streaming radio URL for lofi music
  isCustom?: boolean; // Flag for custom scenes
}

export interface CustomScene {
  id: number;
  name: string;
  imageUrl: string;
  mood: string;
  musicUrl: string;
  artistName?: string;
  trackTitle?: string;
}

export interface CustomPlaylist {
  id: number;
  name: string;
  service: 'spotify' | 'apple-music';
  url: string;
  embedId: string;
  sceneId: number | null; // Link to scene (null = not assigned)
}

export interface Preset {
  id: number;
  name: string;
  sceneId: number;
  isCustomScene: boolean;
  ambient: {
    rain: boolean;
    birds: boolean;
    fire: boolean;
    city: boolean;
    cafe: boolean;
  };
  volumes: {
    music: number;
    rain: number;
    birds: number;
    fire: number;
    city: number;
    cafe: number;
  };
}

export interface AppState {
  currentSceneId: number;
  currentTrackIndex: number;
  isPlaying: boolean;
  isRainActive: boolean;
  activeTab: 'scenes' | 'playlists' | 'about';
}
