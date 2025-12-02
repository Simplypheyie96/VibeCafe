# Audio System Setup Guide

## Current Audio Configuration

VibeCafe uses two types of audio:

### 1. Music (YouTube Embedded)
- **Source**: YouTube embedded iframes
- **Format**: Streaming video/audio
- **Status**: ✅ Working (requires user interaction to play)
- **Control**: Play/pause via controls modal

### 2. Ambient Sounds (HTML5 Audio)
- **Source**: Mixkit free audio library
- **Format**: MP3 preview files
- **Status**: ⚠️ Some files may not load (CDN limitations)
- **Control**: Individual volume sliders in controls modal

## How It Works

### On Page Load
1. Scene loads with wallpaper and visual effects
2. Ambient sounds are **set to 0 volume** by default
3. Music player is ready but paused (browser autoplay restrictions)

### User Interaction Required
Due to browser autoplay policies, users must:
1. **Click the purple orb** to open controls
2. **Press play** to start music
3. **Adjust ambient sliders** to enable ambient sounds

This ensures audio only plays after explicit user interaction, which all modern browsers require.

## Audio Sources

### Music (YouTube)
Each scene has a curated YouTube playlist:
- Cafe Lofi: `jfKfPfyJRdk` (Lofi hip hop radio)
- Night Drive: `DWcJFNfaw9c` (Synthwave lofi)
- Rainy Mood: `5qap5aO4i9A` (Lofi rain)
- Chill Sunset: `rUxyKA_-grg` (Chill lofi)
- Sleep Lofi: `lTRiuFIWV54` (Sleep lofi)
- Focus Beats: `5yx6BWlEVcY` (Study lofi)

### Ambient Sounds (Mixkit CDN)
11 ambient layers from Mixkit's free library:
- Rain, Thunder, Fireplace, Wind
- Cafe Chatter, Ocean Waves, Night Crickets
- Vinyl Crackle, Birds, City Sounds, Page Turns

**Note**: Preview URLs may have limitations. For production, host your own audio files.

## For Production Use

### Recommended: Host Your Own Audio Files

1. **Download ambient sounds** from free sources:
   - [Mixkit](https://mixkit.co/free-sound-effects/)
   - [Freesound](https://freesound.org/)
   - [Pixabay Audio](https://pixabay.com/sound-effects/)
   - [Zapsplat](https://www.zapsplat.com/)

2. **Host files** on your CDN or server:
   ```
   /public/audio/rain.mp3
   /public/audio/fire.mp3
   /public/audio/cafe.mp3
   etc.
   ```

3. **Update** `/data/ambientSounds.ts`:
   ```typescript
   audioUrl: '/audio/rain.mp3'
   ```

### Alternative: Use a Dedicated Audio CDN
- Upload to AWS S3 + CloudFront
- Use Cloudinary for audio hosting
- Host on Vercel/Netlify with audio files

### Music Integration Options

**Current**: YouTube embeds (free, no API needed)

**Upgrades**:
- **Spotify Web Playback SDK** (requires Premium + API key)
- **Apple Music Web Player** (requires API key)
- **SoundCloud Widget API** (free with attribution)
- **Self-hosted MP3s** (requires licensing)

## Error Handling

The app includes graceful error handling:

1. **Audio load failures** are logged to console with helpful messages
2. **Welcome overlay** guides users to enable audio
3. **Retry mechanism** available via status indicator
4. **Silent failures** don't break the app - visuals work independently

## Testing Audio

### Test Ambient Sounds
1. Open the app
2. Click the purple orb (bottom-right)
3. Scroll to "Ambient Sounds"
4. Drag a slider above 0
5. If you hear sound = working ✅
6. If silent = that file failed to load ⚠️

### Test Music
1. Click the purple orb
2. Press the play button
3. Music should start playing from YouTube
4. If blocked, check browser console for autoplay errors

## Browser Compatibility

### Audio API Support
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (may require user gesture)
- ✅ Mobile browsers: Works after user interaction

### Known Issues
- **Safari iOS**: May require two taps to start audio
- **Chrome Mobile**: Autoplay blocked until user interacts
- **Firefox**: Some CORS audio files may be blocked

## Troubleshooting

### "Audio won't play"
1. Check browser console for errors
2. Ensure you clicked something first (autoplay policy)
3. Check if audio files are accessible (try URL in new tab)
4. Disable browser extensions that block media

### "Some ambient sounds missing"
1. CDN preview files have limitations
2. Replace with self-hosted files for reliability
3. Check `/data/ambientSounds.ts` URLs

### "Music plays but no controls"
1. YouTube iframe API takes time to load
2. Volume control is handled by YouTube player
3. Use browser tab audio controls as backup

## Future Enhancements

- [ ] Implement YouTube IFrame API for better music control
- [ ] Add volume control for YouTube player
- [ ] Preload audio files on scene hover
- [ ] Add audio quality selector
- [ ] Implement audio visualizer
- [ ] Save user's ambient mix presets
- [ ] Add fade-in/fade-out for smoother transitions
- [ ] Implement crossfade between tracks
- [ ] Add offline mode with cached audio

---

**Note**: The current implementation prioritizes simplicity and works with free resources. For a production app with commercial use, ensure you have proper licenses for all audio content.
