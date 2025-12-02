import { Scene } from '../types';
// Correct order based on Figma carousel
import imgScene1 from 'figma:asset/672d004b58339785c9699ebd45f9cef64750ded8.png'; // Tropical Sunset
import imgScene2 from 'figma:asset/f585ed3bbbfe2de88dbd5011fa308c25ae9182b6.png'; // Pink Dusk
import imgScene3 from 'figma:asset/72398f9b8bcd53694333c067b89ce78c40e9ffd6.png'; // Night City
import imgScene4 from 'figma:asset/91a227977446438fe02834e4ef7bf6af18904865.png'; // Urban Sunset - AFRICAN LOFI
import imgScene5 from 'figma:asset/816c38d2ff44b9630bc9c4f53ce9bf8dead06864.png'; // Golden Hour
import imgScene6 from 'figma:asset/8795908339892b0a3a824041bbd4c8d504f6804a.png'; // Purple Horizon
import imgScene7 from 'figma:asset/3ab662004d6a0d5d03aaa6a85ae445451b7798d4.png'; // Coastal Sunset
import imgScene8 from 'figma:asset/350b03cd9be970d67a928d470d8f344a995bc729.png'; // Neon Night
import imgScene9 from 'figma:asset/e8aef29075cf3f2f40dbc14675a51678955d13b0.png'; // Mountain Twilight

// Using unique soft lofi streaming URLs for each scene - Scene 4 is upbeat, rest are chill
export const scenes: Scene[] = [
  {
    id: 0,
    name: "Tropical Sunset",
    thumbnail: imgScene1,
    wallpaper: imgScene1,
    genre: "Tropical Lofi",
    tags: ["Tropical Lofi", "Beach Vibes"],
    playlist: [
      { id: "t1", title: "Island Paradise", artist: "Lofi Fruits Music", duration: "3:45" },
      { id: "t2", title: "Sunset Beach Walk", artist: "Tropical Dreams", duration: "4:12" },
      { id: "t3", title: "Ocean Breeze", artist: "Chill Waves", duration: "3:28" },
      { id: "t4", title: "Palm Tree Rhythms", artist: "Beach Lofi", duration: "3:55" },
      { id: "t5", title: "Tropical Nights", artist: "Island Beats", duration: "4:08" }
    ],
    // Scene 1 - Soft Tropical Lofi - Lush Downtempo
    musicUrl: "https://ice4.somafm.com/groovesalad-128-mp3"
  },
  {
    id: 1,
    name: "Pink Dusk Cafe",
    thumbnail: imgScene2,
    wallpaper: imgScene2,
    genre: "Cafe Lofi",
    tags: ["Cafe Lofi", "Cozy Vibes"],
    playlist: [
      { id: "t6", title: "Morning Coffee", artist: "Cafe Collective", duration: "3:52" },
      { id: "t7", title: "Warm Cup Dreams", artist: "Lofi Cafe", duration: "4:05" },
      { id: "t8", title: "Cozy Corner", artist: "Coffee Beats", duration: "3:38" },
      { id: "t9", title: "Afternoon Latte", artist: "Brew Lofi", duration: "4:18" },
      { id: "t10", title: "Sunset Espresso", artist: "Cafe Sounds", duration: "3:42" }
    ],
    // Scene 2 - Slow Cafe Lofi - Ultra Mellow & Dreamy
    musicUrl: "https://ice4.somafm.com/deepspaceone-128-mp3"
  },
  {
    id: 2,
    name: "Night City Lights",
    thumbnail: imgScene3,
    wallpaper: imgScene3,
    genre: "Night Neo Chill",
    tags: ["Night Neo Chill", "Urban Beats"],
    playlist: [
      { id: "t11", title: "Midnight Drive", artist: "City Nights", duration: "4:20" },
      { id: "t12", title: "Neon Reflections", artist: "Urban Dreams", duration: "3:55" },
      { id: "t13", title: "Tokyo Streets", artist: "Neo Lofi", duration: "4:15" },
      { id: "t14", title: "Downtown Vibes", artist: "Metro Beats", duration: "3:48" },
      { id: "t15", title: "Skyline Dreams", artist: "Night Flow", duration: "4:02" }
    ],
    // Scene 3 - Study Lofi - Mellow & Relaxing (Ambient Chill)
    musicUrl: "https://streams.fluxfm.de/Chillhop/mp3-320/streams.fluxfm.de/"
  },
  {
    id: 3,
    name: "Urban Sunset",
    thumbnail: imgScene4,
    wallpaper: imgScene4,
    genre: "African Lofi",
    tags: ["Afro Lofi Chill", "African Vibes"],
    playlist: [
      { id: "t16", title: "Lagos Sunset", artist: "Afrobeat Dreams", duration: "3:48" },
      { id: "t17", title: "Sahara Nights", artist: "African Lofi", duration: "4:22" },
      { id: "t18", title: "Nairobi Mornings", artist: "Afro Chill", duration: "3:58" },
      { id: "t19", title: "Accra Vibes", artist: "West African Beats", duration: "4:15" },
      { id: "t20", title: "Cape Town Dreams", artist: "Southern Soul", duration: "4:05" },
      { id: "t21", title: "Marrakech Memories", artist: "North African Lofi", duration: "3:52" },
      { id: "t22", title: "Ethiopian Highlands", artist: "East African Chill", duration: "4:28" }
    ],
    // Scene 4 - UPBEAT African Lofi - Energetic Beats
    musicUrl: "https://ice4.somafm.com/suburbsofgoa-128-mp3"
  },
  {
    id: 4,
    name: "Golden Hour Street",
    thumbnail: imgScene5,
    wallpaper: imgScene5,
    genre: "Chill Sunset",
    tags: ["Chill Sunset", "Golden Vibes"],
    playlist: [
      { id: "t23", title: "Golden Dreams", artist: "Sunset Collective", duration: "3:35" },
      { id: "t24", title: "Amber Light", artist: "Evening Lofi", duration: "4:08" },
      { id: "t25", title: "Twilight Moments", artist: "Golden Hour", duration: "3:42" },
      { id: "t26", title: "Warm Glow", artist: "Dusk Beats", duration: "4:12" },
      { id: "t27", title: "Evening Peace", artist: "Sunset Vibes", duration: "3:58" }
    ],
    // Scene 5 - Soft Sunset Lofi - Atmospheric Ambient
    musicUrl: "https://ice4.somafm.com/sonicuniverse-128-mp3"
  },
  {
    id: 5,
    name: "Purple Horizon",
    thumbnail: imgScene6,
    wallpaper: imgScene6,
    genre: "Upbeat Lofi",
    tags: ["Upbeat Lofi", "Energy Boost"],
    playlist: [
      { id: "t28", title: "Purple Rain", artist: "Horizon Beats", duration: "4:18" },
      { id: "t29", title: "Vibrant Mood", artist: "Energy Flow", duration: "3:50" },
      { id: "t30", title: "Positive Energy", artist: "Upbeat Dreams", duration: "4:02" },
      { id: "t31", title: "Sunrise Motivation", artist: "Morning Vibes", duration: "3:45" },
      { id: "t32", title: "Happy Days", artist: "Feel Good Lofi", duration: "4:15" }
    ],
    // Scene 6 - Soft Purple Lofi - Dreamy Chill
    musicUrl: "https://ice4.somafm.com/thistle-128-mp3"
  },
  {
    id: 6,
    name: "Coastal Sunset",
    thumbnail: imgScene7,
    wallpaper: imgScene7,
    genre: "Evening Chill",
    tags: ["Evening Chill", "Coastal Vibes"],
    playlist: [
      { id: "t33", title: "Ocean Breeze", artist: "Coastal Dreams", duration: "4:25" },
      { id: "t34", title: "Sunset Waves", artist: "Beach Lofi", duration: "3:58" },
      { id: "t35", title: "Twilight Shore", artist: "Sea Vibes", duration: "4:12" },
      { id: "t36", title: "Seaside Memories", artist: "Coastal Chill", duration: "3:48" },
      { id: "t37", title: "Evening Tide", artist: "Ocean Beats", duration: "4:05" }
    ],
    // Scene 7 - Soft Coastal Lofi - Peaceful Waves
    musicUrl: "https://ice4.somafm.com/beatblender-128-mp3"
  },
  {
    id: 7,
    name: "Neon Night",
    thumbnail: imgScene8,
    wallpaper: imgScene8,
    genre: "Deep Chill",
    tags: ["Deep Chill", "Neon Dreams"],
    playlist: [
      { id: "t38", title: "Cyber Dreams", artist: "Neon Lofi", duration: "3:45" },
      { id: "t39", title: "Midnight Glow", artist: "Deep Beats", duration: "4:10" },
      { id: "t40", title: "Purple Haze", artist: "Future Chill", duration: "3:52" },
      { id: "t41", title: "Electric Night", artist: "Synthwave Lofi", duration: "4:22" },
      { id: "t42", title: "Neon Lights", artist: "Cyber Vibes", duration: "3:58" }
    ],
    // Scene 8 - Soft Deep Lofi - Ethereal Ambient
    musicUrl: "https://ice4.somafm.com/secretagent-128-mp3"
  },
  {
    id: 8,
    name: "Mountain Twilight",
    thumbnail: imgScene9,
    wallpaper: imgScene9,
    genre: "Rainy Mood",
    tags: ["Rainy Mood", "Stormy Beats"],
    playlist: [
      { id: "t43", title: "Rainy Window", artist: "Storm Sounds", duration: "4:30" },
      { id: "t44", title: "Thunder Dreams", artist: "Rain Vibes", duration: "4:05" },
      { id: "t45", title: "Misty Evening", artist: "Weather Lofi", duration: "3:48" },
      { id: "t46", title: "Cozy Rainfall", artist: "Storm Chill", duration: "4:18" },
      { id: "t47", title: "Mountain Mist", artist: "Nature Beats", duration: "4:12" }
    ],
    // Scene 9 - Soft Rainy Lofi - Cozy Atmosphere
    musicUrl: "https://ice4.somafm.com/defcon-128-mp3"
  }
];