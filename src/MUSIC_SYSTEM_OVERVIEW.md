# VibeCafe Music System Overview

## Architecture

### HTML5 Audio API
VibeCafe uses the native HTML5 Audio API for all music playback. No YouTube embeds, no iframes, no external players.

### Music Streaming
Each scene streams lofi music from Zeno.fm radio stations via direct HTTP audio streams.

## How It Works

### 1. Scene Data Structure
Each scene in `/data/scenes.ts` contains:
```typescript
{
  id: number,
  name: string,
  genre: string,
  musicUrl: string,  // Direct streaming URL
  playlist: Track[], // Display metadata only
  // ... other properties
}
```

### 2. Audio Element
Single audio element for music playback:
```jsx
<audio ref={musicAudioRef} loop preload="auto" crossOrigin="anonymous" />
```

- **loop**: Continuous playback
- **preload="auto"**: Start loading immediately
- **crossOrigin="anonymous"**: Required for streaming from external domains

### 3. Scene Change Flow

```
User clicks scene
    ↓
handleSceneChange(sceneId) called
    ↓
activeScene state updates
    ↓
useEffect detects activeScene change
    ↓
Checks if new musicUrl differs
    ↓
Loads new audio source
    ↓
Resumes playback if was playing
```

### 4. Music Independence

Music playback is **completely independent** from:
- ✅ Ambient sound effects (rain, city, fire, birds, cafe)
- ✅ Scene transitions and animations
- ✅ UI interactions (modals, settings, etc.)

## Scene-Specific Music

### Scene 0: Tropical Sunset
- **Genre**: Tropical Lofi
- **Stream**: Chillhop Radio
- **Vibe**: Beach vibes, island paradise

### Scene 1: Pink Dusk Cafe
- **Genre**: Cafe Lofi
- **Stream**: Jazz/Lofi Cafe
- **Vibe**: Cozy coffee shop atmosphere

### Scene 2: Night City Lights
- **Genre**: Night Neo Chill
- **Stream**: Night City Lofi
- **Vibe**: Urban nighttime, neon reflections

### Scene 3: Urban Sunset 🎵 AFRICAN LOFI
- **Genre**: African Lofi
- **Stream**: Afrobeat Chill Radio
- **Vibe**: African beats, Lagos sunset, Sahara nights

### Scene 4: Golden Hour Street
- **Genre**: Chill Sunset
- **Stream**: Evening Chill Lofi
- **Vibe**: Golden hour, warm amber light

### Scene 5: Purple Horizon
- **Genre**: Upbeat Lofi
- **Stream**: Upbeat Lofi
- **Vibe**: Energetic, positive vibes

### Scene 6: Coastal Sunset
- **Genre**: Evening Chill
- **Stream**: Coastal Chill Lofi
- **Vibe**: Ocean breeze, seaside memories

### Scene 7: Neon Night
- **Genre**: Deep Chill
- **Stream**: Deep Chill Synthwave
- **Vibe**: Cyberpunk, neon dreams

### Scene 8: Mountain Twilight
- **Genre**: Rainy Mood
- **Stream**: Rainy Lofi
- **Vibe**: Cozy rainfall, misty mountains

## State Management

### Music State
```typescript
const [isPlaying, setIsPlaying] = useState(false);
const [musicVolume, setMusicVolume] = useState(70);
const [playerReady, setPlayerReady] = useState(false);
```

### Audio Ref
```typescript
const musicAudioRef = useRef<HTMLAudioElement>(null);
```

### Scene State
```typescript
const [activeScene, setActiveScene] = useState(0);
const [sceneTransitioning, setSceneTransitioning] = useState(false);
```

## Key Features

### ✅ Seamless Scene Transitions
Music continues playing when switching scenes (if already playing)

### ✅ Play State Preservation
If music is playing, it keeps playing with the new scene's music

### ✅ Volume Control
Independent volume control in settings modal (0-100)

### ✅ Error Handling
Graceful degradation if streams fail to load

### ✅ Cross-Origin Support
Properly configured for external streaming sources

## Player Controls

### Play/Pause Button
Located in the "Now Playing" card:
- Shows pause icon when playing (||)
- Shows play icon when paused (▶)
- Toggles music playback state

### Volume Control
Located in Settings modal (purple orb):
- Music volume slider (0-100)
- Separate from ambient sound volumes
- Affects only the music stream

## Debug Logging

Console logs help track music behavior:

```
"Scene change requested: 3"
"Active scene: 3 Urban Sunset African Lofi"
"Changing music to: https://stream.zeno.fm/ps47zm8d338uv"
"Music player ready"
```

## No Embeds Policy

VibeCafe uses **NO** external embeds:
- ❌ No YouTube iframes
- ❌ No Spotify widgets
- ❌ No SoundCloud players
- ✅ Only HTML5 Audio with direct streams

This ensures:
- Maximum compatibility
- No embedding restrictions
- No external player UI
- Complete control over playback
- No YouTube error 150 issues

## Technical Benefits

1. **Lightweight**: No heavy iframe/player libraries
2. **Reliable**: Direct HTTP audio streams
3. **Fast**: No external player initialization
4. **Flexible**: Full control over audio element
5. **Universal**: Works on all modern browsers
6. **Offline-capable**: Can cache streams (if configured)
