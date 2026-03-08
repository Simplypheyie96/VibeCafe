# VibeCafe

A lofi/chill/focus web app that lets you set the perfect mood by combining curated scenes, ambient sounds, and music — all in one place.

## What It Does

VibeCafe gives you a fully immersive focus or relaxation environment. Pick a scene that matches your mood, layer in ambient sounds, and play music from built-in radio streams or your own Spotify/Apple Music/YouTube/SoundCloud playlists.

## Features

### Scenes
9 built-in visual scenes, each with its own curated music genre and SomaFM radio stream:

| Scene | Genre | Vibe |
|---|---|---|
| Anime Cafe | Coffee House Lofi | Warm, cozy, anime aesthetic |
| Cozy Study | Ambient Lofi | Slow and immersive for deep work |
| Late Night Coding | Chillhop | Retro focus flow |
| Office with a View | Sunlight Lofi | Bright, productive, daytime |
| Cocktail Lounge | Jazz Hop | Jazzy, date night, sophisticated |
| Afternoon Daydream | Chill Downtempo | Laid-back, late afternoon |
| Rainy Stroll | Dark Ambient Lofi | Moody, grey, introspective |
| Electric Stroll | Vaporwave | Neon-lit, pre-party energy |
| Neighborhood Ride | Warm Anime Lofi | Warm, nostalgic, cruising |

You can also create and save **custom scenes** with your own name and assign playlists to them.

### Ambient Sounds
Layer multiple ambient sounds simultaneously with individual volume control:
- Rain
- Birds
- Fire / Fireplace
- City noise
- Cafe chatter

### Music
- Built-in SomaFM radio streams per scene (no account needed)
- Import playlists from **Spotify**, **Apple Music**, **YouTube**, or **SoundCloud** via embed URL
- Floating **PlaylistEmbed** card — drag it anywhere on screen, minimize it, and audio continues playing
- Assign imported playlists to specific scenes so they load automatically

### Vibe Presets
Save your current combination of scene + ambient sounds as a named preset and reload it any time with one click.

### Genre Tags
Browse and filter scenes by genre tags (Coffee House, Anime Lofi, Studying, Jazz Hop, Vaporwave, etc.)

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (`motion`) — animations and drag behavior
- **Radix UI** — accessible UI primitives (tooltips, dropdowns, dialogs, etc.)
- **Embla Carousel** — scene carousel
- **Lucide React** — icons
- **SomaFM** — free internet radio streams
- **Supabase** — backend/storage (optional)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── PlaylistEmbed.tsx      # Floating draggable music player
│   ├── MyPlaylistsModal.tsx   # Import & manage playlists
│   ├── PresetsModal.tsx       # Save/load vibe presets
│   ├── SceneCarousel.tsx      # Scene selection carousel
│   ├── AmbientButton.tsx      # Individual ambient sound toggle
│   ├── NowPlayingCard.tsx     # Currently playing info
│   ├── TabNavigation.tsx      # Bottom/top navigation
│   ├── GenreTags.tsx          # Genre filter tags
│   ├── LoadingScreen.tsx      # Intro loading screen
│   └── ui/                   # Shared UI primitives (modal, tooltip, etc.)
├── data/
│   └── scenes.ts              # Scene definitions and radio URLs
├── types/                     # TypeScript interfaces
├── hooks/                     # Custom React hooks
└── App.tsx                    # Root component and state management
```

