// Core type definitions for VibeCafe

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  /** Direct, CORS-enabled audio URL. Absent on legacy/custom placeholder tracks. */
  src?: string;
  /** Human-readable licence, e.g. "CC BY 4.0". */
  license?: string;
  /** Canonical licence deed URL. */
  licenseUrl?: string;
  /** Page the track came from — the attribution link required by CC BY §3(a)(1). */
  sourceUrl?: string;
}

/**
 * The curated moods. The first nine are each sourced from their own set of
 * recordings; `study-lofi` is composed from tracks that already live in the
 * others, so a track may belong to more than one mood.
 */
export type Mood =
  | 'warm-lofi'
  | 'minimal-focus'
  | 'nocturnal'
  | 'bright-jazzy'
  | 'lounge-jazz'
  | 'dreamy-haze'
  | 'melancholy-piano'
  | 'neon-retro'
  | 'mellow-groove'
  | 'study-lofi';

export interface Scene {
  id: number;
  name: string;
  thumbnail: string;
  wallpaper: string;
  genre: string;
  tags: string[];
  playlist: Track[];
  /** Which catalog bucket this scene draws its queue from. */
  mood?: Mood;
  /**
   * Legacy single-stream URL. Retained so custom scenes (which are user-supplied
   * single URLs) keep working; built-in scenes now play from `mood` instead.
   */
  musicUrl?: string;
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
  service: 'spotify' | 'apple-music' | 'youtube' | 'soundcloud';
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