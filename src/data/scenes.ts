import { Scene } from '../types';

import imgScene1 from 'figma:asset/32b4a6522df786276011078a70b99fc849ecfb5a.png';
import imgScene2 from 'figma:asset/72d56391dae37a8ecd91f0a519d3e3b293989dd0.png';
import imgScene3 from 'figma:asset/9c730196e9eeb1f72fa56232fdc3c8eb2dcd2428.png';
import imgScene4 from 'figma:asset/2d31031bf66a52f6b4227de4cacfcc640b147883.png';
import imgScene5 from 'figma:asset/2e1e50656e46b4f478e6c20270297a0df4471478.png';
import imgScene6 from 'figma:asset/492cfe147a6d419c26f2458be3d723a356423e9c.png';
import imgScene7 from 'figma:asset/5b450a7110e000ba2f5c2131ad2b26158a225c8a.png';
import imgScene8 from 'figma:asset/350b03cd9be970d67a928d470d8f344a995bc729.png';
import imgScene9 from 'figma:asset/4d82157e1d7e2352cf54ca9ae0151bc85a6a338a.png';

export const scenes: Scene[] = [
  {
    id: 0,
    name: "Anime Cafe",
    thumbnail: imgScene1,
    wallpaper: imgScene1,
    genre: "Coffee House Lofi",
    tags: ["Coffee House", "Anime Lofi"],
    playlist: [
      { id: "t1", title: "Matcha Latte", artist: "Cafe Beats", duration: "3:45" },
      { id: "t2", title: "Manga Reader", artist: "Tokyo Lofi", duration: "4:12" },
      { id: "t3", title: "Espresso Drip", artist: "Morning Brew", duration: "3:28" },
      { id: "t4", title: "Corner Table", artist: "Quiet Moments", duration: "3:55" },
      { id: "t5", title: "Barista's Choice", artist: "Lofi Bean", duration: "4:08" }
    ],
    // Scene 1 - Coffee house / Anime Lofi vibe
    musicUrl: "https://ice4.somafm.com/illstreet-128-mp3"
  },
  {
    id: 1,
    name: "Cozy Study",
    thumbnail: imgScene2,
    wallpaper: imgScene2,
    genre: "Ambient Lofi",
    tags: ["Studying", "Cozy & Slow"],
    playlist: [
      { id: "t6", title: "Deep Focus", artist: "Study Flow", duration: "3:52" },
      { id: "t7", title: "Page Turner", artist: "Library Tones", duration: "4:05" },
      { id: "t8", title: "Slow Thoughts", artist: "Ambient Mind", duration: "3:38" },
      { id: "t9", title: "Cozy Blanket", artist: "Warm Sounds", duration: "4:18" },
      { id: "t10", title: "Midnight Exam", artist: "Quiet Desk", duration: "3:42" }
    ],
    // Scene 2 - Extremely slow and cozy for studying
    musicUrl: "https://ice4.somafm.com/deepspaceone-128-mp3"
  },
  {
    id: 2,
    name: "Late Night Coding",
    thumbnail: imgScene3,
    wallpaper: imgScene3,
    genre: "Chillhop",
    tags: ["Retro Vibes", "Focus Flow"],
    playlist: [
      { id: "t11", title: "Midnight Pixel", artist: "Chillhop Music", duration: "4:20" },
      { id: "t12", title: "CRT Glow", artist: "Retro Dreams", duration: "3:55" },
      { id: "t13", title: "Keyboard Taps", artist: "Hacker Lofi", duration: "4:15" },
      { id: "t14", title: "Lo-Fi Cat", artist: "Mellow Beats", duration: "3:48" },
      { id: "t15", title: "Syntax Error", artist: "Code Chill", duration: "4:02" }
    ],
    // Scene 3 - Unchanged, perfect vibe
    musicUrl: "https://ice1.somafm.com/defcon-128-mp3"
  },
  {
    id: 3,
    name: "Office with a View",
    thumbnail: imgScene4,
    wallpaper: imgScene4,
    genre: "Sunlight Lofi",
    tags: ["City View", "Sunlight Streaming"],
    playlist: [
      { id: "t16", title: "Highrise Coffee", artist: "Morning Commute", duration: "3:48" },
      { id: "t17", title: "Skyscraper Sun", artist: "Metro Lofi", duration: "4:22" },
      { id: "t18", title: "Desk by the Window", artist: "Office Chill", duration: "3:58" },
      { id: "t19", title: "City Awakening", artist: "Urban Rays", duration: "4:15" },
      { id: "t20", title: "Productive Flow", artist: "Bright Beats", duration: "4:05" }
    ],
    // Scene 4 - Upbeat instrumental daytime vibe (no vocals)
    musicUrl: "https://ice4.somafm.com/fluid-128-mp3"
  },
  {
    id: 4,
    name: "Cocktail Lounge",
    thumbnail: imgScene5,
    wallpaper: imgScene5,
    genre: "Jazz Hop",
    tags: ["Jazzy Interior", "Date Night"],
    playlist: [
      { id: "t21", title: "Dim Lights", artist: "Lounge Acts", duration: "3:35" },
      { id: "t22", title: "Velvet Seats", artist: "Jazz Vibes", duration: "4:08" },
      { id: "t23", title: "Evening Glass", artist: "Smooth Tones", duration: "3:42" },
      { id: "t24", title: "Late Reservation", artist: "City Romance", duration: "4:12" },
      { id: "t25", title: "Whiskey & Ice", artist: "Night Jazz", duration: "3:58" }
    ],
    // Scene 5 - Jazzy, cocktail restaurant, date night feeling
    musicUrl: "https://ice1.somafm.com/lush-128-mp3"
  },
  {
    id: 5,
    name: "Afternoon Daydream",
    thumbnail: imgScene6,
    wallpaper: imgScene6,
    genre: "Chill Downtempo",
    tags: ["Late Afternoon", "Window View"],
    playlist: [
      { id: "t26", title: "Lying Here", artist: "Bedside Lofi", duration: "4:18" },
      { id: "t27", title: "Watching the Sky", artist: "Afternoon Flow", duration: "3:50" },
      { id: "t28", title: "Lazy Shadows", artist: "Sun Drift", duration: "4:02" },
      { id: "t29", title: "Bedroom Window", artist: "Mellow Rays", duration: "3:45" },
      { id: "t30", title: "Drifting Off", artist: "Sleepy Beats", duration: "4:15" }
    ],
    // Scene 6 - Late afternoon lying down vibe
    musicUrl: "https://ice4.somafm.com/groovesalad-128-mp3"
  },
  {
    id: 6,
    name: "Rainy Stroll",
    thumbnail: imgScene7,
    wallpaper: imgScene7,
    genre: "Dark Ambient Lofi",
    tags: ["Rainy Mood", "Mellow Walk"],
    playlist: [
      { id: "t31", title: "Puddles & Umbrellas", artist: "Rainy Days", duration: "4:25" },
      { id: "t32", title: "Grey Skies", artist: "Storm Lofi", duration: "3:58" },
      { id: "t33", title: "Drizzling Notes", artist: "Wet Vibes", duration: "4:12" },
      { id: "t34", title: "Splash Rhythm", artist: "City Showers", duration: "3:48" },
      { id: "t35", title: "Cloudy Walk", artist: "Thunder Beats", duration: "4:05" }
    ],
    // Scene 7 - Slow, soft drone ambient fit for moody/rainy weather
    musicUrl: "https://ice2.somafm.com/dronezone-128-mp3"
  },
  {
    id: 7,
    name: "Electric Stroll",
    thumbnail: imgScene8,
    wallpaper: imgScene8,
    genre: "Vaporwave",
    tags: ["Pre-Party", "Electric Night"],
    playlist: [
      { id: "t36", title: "Neon Walking", artist: "Future Funk", duration: "3:45" },
      { id: "t37", title: "Night Breeze", artist: "Synth City", duration: "4:10" },
      { id: "t38", title: "Headed Out", artist: "Party Prep", duration: "3:52" },
      { id: "t39", title: "Electric Pulse", artist: "Vapor Vibes", duration: "4:22" },
      { id: "t40", title: "Streetlight Glow", artist: "Midnight Wave", duration: "3:58" }
    ],
    // Scene 8 - Vaporwave/Future funk for walking to a party in neon
    musicUrl: "https://ice1.somafm.com/vaporwaves-128-mp3"
  },
  {
    id: 8,
    name: "Neighborhood Ride",
    thumbnail: imgScene9,
    wallpaper: imgScene9,
    genre: "Warm Anime Lofi",
    tags: ["Warm Afternoon", "Cruising"],
    playlist: [
      { id: "t41", title: "Suburban Sunset", artist: "Anime Beats", duration: "4:30" },
      { id: "t42", title: "Bicycle Days", artist: "Warm Ride", duration: "4:05" },
      { id: "t43", title: "Golden Block", artist: "Cruising Lofi", duration: "3:48" },
      { id: "t44", title: "Summer Breeze", artist: "Neighborhood Chill", duration: "4:18" },
      { id: "t45", title: "Heading Home", artist: "Nostalgic Tones", duration: "4:12" }
    ],
    // Scene 9 - Upbeat chill lofi for a warm afternoon ride
    musicUrl: "https://ice1.somafm.com/synphaera-128-mp3"
  }
];