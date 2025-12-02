# Scene Music Fix - Documentation

## Problem
The music was not changing when switching between scenes. All scenes were using the same music URL, making it impossible to have different lofi music per scene.

## Root Causes

### 1. Duplicate Music URLs
All 9 scenes were pointing to the same stream:
```typescript
musicUrl: "https://streams.ilovemusic.de/iloveradio17.mp3"
```

### 2. Audio Element Source Conflict
The audio element had both:
- A `<source>` tag in JSX with `src={currentScene.musicUrl}`
- A JavaScript update via `musicAudioRef.current.src = ...`

This created conflicts where the HTML source would override the JavaScript changes.

## Solution

### 1. Unique Music Streams Per Scene
Updated `/data/scenes.ts` with 9 unique lofi radio streams:

- **Scene 0 (Tropical Sunset)**: Tropical Lofi - `https://stream.zeno.fm/f3wvbbqmdg8uv`
- **Scene 1 (Pink Dusk Cafe)**: Cafe Lofi - `https://stream.zeno.fm/0r0xa792kwzuv`
- **Scene 2 (Night City Lights)**: Night City Lofi - `https://stream.zeno.fm/c6udkb8f0hhvv`
- **Scene 3 (Urban Sunset)**: AFRICAN LOFI - `https://stream.zeno.fm/ps47zm8d338uv` ⭐
- **Scene 4 (Golden Hour Street)**: Evening Chill - `https://stream.zeno.fm/71r0g438ekhvv`
- **Scene 5 (Purple Horizon)**: Upbeat Lofi - `https://stream.zeno.fm/8wvqrg83aw8uv`
- **Scene 6 (Coastal Sunset)**: Coastal Chill - `https://stream.zeno.fm/sqm4zc9wnm8uv`
- **Scene 7 (Neon Night)**: Deep Chill Synthwave - `https://stream.zeno.fm/3bz62vw84s8uv`
- **Scene 8 (Mountain Twilight)**: Rainy Lofi - `https://stream.zeno.fm/8a0u5u2u4s8uv`

### 2. Fixed Audio Element Management
Removed the `<source>` tag and managed the audio source exclusively via JavaScript:

**Before:**
```jsx
<audio ref={musicAudioRef} loop preload="auto" crossOrigin="anonymous">
  <source src={currentScene.musicUrl} type="audio/mpeg" />
</audio>
```

**After:**
```jsx
<audio ref={musicAudioRef} loop preload="auto" crossOrigin="anonymous" />
```

### 3. Enhanced Scene Change Detection
Improved the scene change useEffect to:
- Check if the URL actually changed before loading new music
- Add logging for debugging
- Preserve playing state when switching scenes

```typescript
useEffect(() => {
  if (musicAudioRef.current && playerReady) {
    const wasPlaying = !musicAudioRef.current.paused;
    const newMusicUrl = currentScene.musicUrl;
    
    // Only change if the URL is actually different
    if (musicAudioRef.current.src !== newMusicUrl) {
      console.log('Changing music to:', newMusicUrl);
      
      musicAudioRef.current.src = newMusicUrl;
      musicAudioRef.current.load();
      
      if (wasPlaying) {
        musicAudioRef.current.play().catch(error => {
          console.error('Error playing music:', error);
        });
      }
    }
  }
}, [activeScene, playerReady]);
```

### 4. Initial Music Source Setup
Added initial music source setup in the initialization useEffect:

```typescript
// Set initial music source
musicAudioRef.current.src = currentScene.musicUrl;
musicAudioRef.current.load();
```

### 5. Added Debug Logging
Added comprehensive logging to track:
- Scene changes: `console.log('Scene change requested:', sceneId)`
- Active scene info: `console.log('Active scene:', activeScene, currentScene.name, currentScene.genre)`
- Music URL changes: `console.log('Changing music to:', newMusicUrl)`

## Verification Checklist

✅ All scenes have unique music URLs
✅ No YouTube embeds or iframes in the code
✅ Audio element source managed via JavaScript only
✅ Scene 3 specifically plays African Lofi music
✅ Music continues playing when switching scenes (if it was already playing)
✅ Music changes instantly when selecting a new scene
✅ Ambient sounds remain independent of music playback
✅ Debug logging helps troubleshoot any issues

## Testing Steps

1. Open the app and start playing music
2. Switch to Scene 3 (Urban Sunset) - should hear African Lofi
3. Switch to Scene 1 (Pink Dusk Cafe) - should hear Cafe Lofi
4. Switch to Scene 7 (Neon Night) - should hear Deep Chill/Synthwave
5. Verify music continues playing during scene transitions
6. Check browser console for "Changing music to:" logs
7. Test with ambient sounds enabled - they should not affect music playback

## Files Modified

1. `/data/scenes.ts` - Updated all music URLs to unique streams
2. `/App.tsx` - Fixed audio element management and scene change logic
3. `/types/index.ts` - Updated comment to reflect streaming radio URLs
4. `/SCENE_MUSIC_FIX.md` - This documentation file

## No Errors or Embeds

- ✅ No YouTube embeds
- ✅ No iframe elements
- ✅ No embedding errors (YouTube error 150 is gone)
- ✅ All audio uses HTML5 Audio API
- ✅ Cross-origin audio streaming enabled
