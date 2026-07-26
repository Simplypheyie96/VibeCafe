import { Scene } from '../types';
import { MOOD_TRACKS } from './musicCatalog';

/**
 * Scene art is served from `public/scenes` rather than imported through the
 * `figma:asset` aliases. The Figma originals are 4096px PNGs of 2-15 MB each,
 * and because the carousel renders all nine at once a first visit was pulling
 * roughly 59 MB before the app became usable. `scripts/build-scene-images.py`
 * produces the 1920w wallpaper and 480w thumbnail used here -- 1.5 MB for the
 * whole set. The originals stay in `src/assets` as the masters for that script.
 */
const bg = (slug: string) => `/scenes/${slug}-bg.webp`;
const thumb = (slug: string) => `/scenes/${slug}-thumb.webp`;

/**
 * The nine built-in scenes.
 *
 * Each names a `mood`, and its queue comes from that bucket of the Creative Commons
 * catalog. Scenes previously carried hand-written five-track playlists of songs that
 * did not exist -- one credited to a real record label -- next to a SomaFM stream URL
 * that played something else entirely. Both are gone: `playlist` is now the real
 * queue, and no third-party radio stream is used.
 */
export const scenes: Scene[] = [
  {
    id: 0,
    name: 'Anime Cafe',
    thumbnail: thumb('anime-cafe'),
    wallpaper: bg('anime-cafe'),
    genre: 'Coffee House Lofi',
    tags: ['Coffee House', 'Anime Lofi'],
    mood: 'warm-lofi',
    playlist: MOOD_TRACKS['warm-lofi'],
  },
  {
    id: 1,
    name: 'Cozy Study',
    thumbnail: thumb('cozy-study'),
    wallpaper: bg('cozy-study'),
    genre: 'Warm Anime Lofi',
    tags: ['Studying', 'Cozy & Slow'],
    mood: 'mellow-groove',
    playlist: MOOD_TRACKS['mellow-groove'],
  },
  {
    id: 2,
    name: 'Late Night Coding',
    thumbnail: thumb('late-night-coding'),
    wallpaper: bg('late-night-coding'),
    genre: 'Chillhop',
    tags: ['Retro Vibes', 'Focus Flow'],
    mood: 'nocturnal',
    playlist: MOOD_TRACKS['nocturnal'],
  },
  {
    id: 3,
    name: 'Office with a View',
    thumbnail: thumb('office-with-a-view'),
    wallpaper: bg('office-with-a-view'),
    genre: 'Sunlight Lofi',
    tags: ['City View', 'Sunlight Streaming'],
    mood: 'bright-jazzy',
    playlist: MOOD_TRACKS['bright-jazzy'],
  },
  {
    id: 4,
    name: 'Cocktail Lounge',
    thumbnail: thumb('cocktail-lounge'),
    wallpaper: bg('cocktail-lounge'),
    genre: 'Jazz Hop',
    tags: ['Jazzy Interior', 'Date Night'],
    mood: 'lounge-jazz',
    playlist: MOOD_TRACKS['lounge-jazz'],
  },
  {
    id: 5,
    name: 'Afternoon Daydream',
    thumbnail: thumb('afternoon-daydream'),
    wallpaper: bg('afternoon-daydream'),
    genre: 'Chill Downtempo',
    tags: ['Late Afternoon', 'Window View'],
    mood: 'dreamy-haze',
    playlist: MOOD_TRACKS['dreamy-haze'],
  },
  {
    id: 6,
    name: 'Rainy Stroll',
    thumbnail: thumb('rainy-stroll'),
    wallpaper: bg('rainy-stroll'),
    genre: 'Piano & Ambient',
    tags: ['Rainy Mood', 'Mellow Walk'],
    mood: 'melancholy-piano',
    playlist: MOOD_TRACKS['melancholy-piano'],
  },
  {
    id: 7,
    name: 'Electric Stroll',
    thumbnail: thumb('electric-stroll'),
    wallpaper: bg('electric-stroll'),
    genre: 'Vaporwave',
    tags: ['Pre-Party', 'Electric Night'],
    mood: 'neon-retro',
    playlist: MOOD_TRACKS['neon-retro'],
  },
  {
    id: 8,
    name: 'Neighborhood Ride',
    thumbnail: thumb('neighborhood-ride'),
    wallpaper: bg('neighborhood-ride'),
    genre: 'Ambient Lofi',
    tags: ['Warm Afternoon', 'Cruising'],
    mood: 'minimal-focus',
    playlist: MOOD_TRACKS['minimal-focus'],
  },
];
