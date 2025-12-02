import { AmbientSound } from '../types';

// Using reliable free audio sources
// Note: For production, host your own audio files for guaranteed availability

export const ambientSounds: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Rain',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3', // Rain sound
    icon: 'CloudRain',
    defaultVolume: 40
  },
  {
    id: 'thunder',
    name: 'Thunder',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2813/2813-preview.mp3', // Thunder
    icon: 'CloudLightning',
    defaultVolume: 25
  },
  {
    id: 'fireplace',
    name: 'Fireplace',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2377/2377-preview.mp3', // Fire crackling
    icon: 'Flame',
    defaultVolume: 35
  },
  {
    id: 'wind',
    name: 'Wind',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3', // Wind
    icon: 'Wind',
    defaultVolume: 30
  },
  {
    id: 'cafe-chatter',
    name: 'Cafe Chatter',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2467/2467-preview.mp3', // Cafe ambience
    icon: 'Coffee',
    defaultVolume: 35
  },
  {
    id: 'waves',
    name: 'Ocean Waves',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2388/2388-preview.mp3', // Ocean waves
    icon: 'Waves',
    defaultVolume: 40
  },
  {
    id: 'night-ambience',
    name: 'Night Crickets',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2392/2392-preview.mp3', // Night crickets
    icon: 'Moon',
    defaultVolume: 30
  },
  {
    id: 'vinyl',
    name: 'Vinyl Crackle',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2450/2450-preview.mp3', // Vinyl record
    icon: 'Disc3',
    defaultVolume: 20
  },
  {
    id: 'birds',
    name: 'Birds',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2389/2389-preview.mp3', // Birds chirping
    icon: 'Bird',
    defaultVolume: 35
  },
  {
    id: 'city-sounds',
    name: 'City Ambience',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2521/2521-preview.mp3', // City sounds
    icon: 'Building2',
    defaultVolume: 30
  },
  {
    id: 'pages',
    name: 'Page Turns',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2437/2437-preview.mp3', // Paper sounds
    icon: 'BookOpen',
    defaultVolume: 25
  }
];
