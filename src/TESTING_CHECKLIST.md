# VibeCafe Testing Checklist

## ✅ Music System Tests

### Basic Playback
- [ ] App loads without errors
- [ ] Music starts playing automatically (or after user interaction)
- [ ] Play/pause button works in Now Playing card
- [ ] Play button shows correct icon (▶ when paused, || when playing)
- [ ] Volume slider in settings controls music volume

### Scene Switching
- [ ] Switching scenes changes the music
- [ ] Music continues playing when switching scenes (if already playing)
- [ ] Music stays paused when switching scenes (if already paused)
- [ ] Visual scene transition is smooth (crossfade)
- [ ] Genre tags update with scene change

### Scene-Specific Music
- [ ] Scene 0 (Tropical Sunset): Plays tropical lofi
- [ ] Scene 1 (Pink Dusk Cafe): Plays cafe lofi
- [ ] Scene 2 (Night City Lights): Plays night city lofi
- [ ] **Scene 3 (Urban Sunset): Plays AFRICAN LOFI** ⭐ IMPORTANT
- [ ] Scene 4 (Golden Hour Street): Plays evening chill
- [ ] Scene 5 (Purple Horizon): Plays upbeat lofi
- [ ] Scene 6 (Coastal Sunset): Plays coastal chill
- [ ] Scene 7 (Neon Night): Plays deep chill/synthwave
- [ ] Scene 8 (Mountain Twilight): Plays rainy lofi

### Music Independence
- [ ] Ambient sounds don't affect music playback
- [ ] Rain toggle works independently
- [ ] City noise toggle works independently
- [ ] Fire crackling toggle works independently
- [ ] Birds chirping toggle works independently
- [ ] Cafe ambience toggle works independently
- [ ] All ambient sounds can play simultaneously with music

## ✅ No Embeds Check

### Console Verification
- [ ] No YouTube errors in console
- [ ] No "Error 150" messages
- [ ] No iframe-related errors
- [ ] No CORS errors for audio streams

### Code Verification
- [ ] No `<iframe>` tags in the code
- [ ] No YouTube API scripts
- [ ] No Spotify/SoundCloud widgets
- [ ] Only HTML5 `<audio>` elements

### Network Verification
- [ ] Only audio streams are loaded (check Network tab)
- [ ] No YouTube embed requests
- [ ] No external player scripts loaded

## ✅ UI/UX Tests

### Now Playing Card
- [ ] Shows current track title
- [ ] Updates when scene changes
- [ ] Play/pause button is responsive
- [ ] Card has glassmorphism effect
- [ ] Music icon displays at bottom

### Scene Carousel
- [ ] All 9 scenes are visible
- [ ] Active scene has purple border/glow
- [ ] Clicking scene changes it
- [ ] Scene thumbnails load correctly
- [ ] Hover effects work

### Settings Modal
- [ ] Opens when clicking purple orb
- [ ] Music volume slider works (0-100)
- [ ] Rain volume slider works
- [ ] City volume slider works
- [ ] Fire volume slider works
- [ ] Birds volume slider works
- [ ] Cafe volume slider works
- [ ] Settings persist during scene changes

### Ambient Sound Buttons
- [ ] All 5 ambient buttons are positioned correctly
- [ ] Clicking toggles the sound on/off
- [ ] Visual feedback shows active state
- [ ] Sounds loop continuously
- [ ] Volume adjustments are immediate

### Tab Navigation
- [ ] "Scenes" tab is active by default
- [ ] "My Playlists" tab opens modal
- [ ] "About" tab opens modal
- [ ] Only one modal open at a time
- [ ] Modals close properly

## ✅ Performance Tests

### Loading
- [ ] App loads in under 3 seconds
- [ ] Images load progressively
- [ ] Audio preloads properly
- [ ] No layout shifts during load

### Streaming
- [ ] Music streams without buffering
- [ ] Ambient sounds stream smoothly
- [ ] No audio dropouts
- [ ] CPU usage is reasonable

### Transitions
- [ ] Scene transitions are smooth (700ms)
- [ ] No frame drops during crossfade
- [ ] Audio doesn't stutter during transitions

## ✅ Browser Compatibility

### Desktop Browsers
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Opera (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Audio Autoplay
- [ ] Works with user interaction
- [ ] Handles autoplay blocking gracefully
- [ ] Shows appropriate message if blocked

## ✅ Error Handling

### Network Issues
- [ ] Graceful handling if stream fails
- [ ] Error messages in console (not alerts)
- [ ] UI doesn't break on stream failure
- [ ] Can retry playback

### User Interactions
- [ ] Rapid scene switching doesn't break audio
- [ ] Multiple ambient toggles work smoothly
- [ ] Volume changes are smooth
- [ ] No race conditions with audio operations

## ✅ Debug Features

### Console Logs
- [ ] "Scene change requested: X" when clicking scene
- [ ] "Active scene: X SceneName Genre" on scene change
- [ ] "Changing music to: URL" when music changes
- [ ] "Music player ready" when initialized

### Verification
- [ ] Current scene ID matches visual selection
- [ ] Music URL in console matches scene's musicUrl
- [ ] No error messages in console

## 🎯 Critical Tests (Must Pass)

1. **African Lofi Test**
   - Navigate to Scene 3 (Urban Sunset)
   - Verify music changes to African lofi stream
   - Confirm genre tag shows "Afro Lofi Chill"
   - Music should be distinctly African/Afrobeat style

2. **Scene Music Change Test**
   - Start at Scene 0, play music
   - Switch to Scene 3 → music changes to African lofi
   - Switch to Scene 7 → music changes to synthwave
   - Switch to Scene 1 → music changes to cafe lofi
   - All changes should be immediate and seamless

3. **No Embeds Test**
   - Open browser DevTools → Network tab
   - Filter for "youtube" or "iframe"
   - Should see ZERO YouTube-related requests
   - Only audio streams from zeno.fm should load

4. **Music Independence Test**
   - Play music
   - Enable all 5 ambient sounds simultaneously
   - Music should continue unaffected
   - All 6 audio layers playing together
   - Adjust volumes independently

## 📊 Success Criteria

### Music Changes Per Scene: ✅
- Each scene plays different music
- Scene 3 plays African lofi
- Music switches instantly on scene change

### No Embeds: ✅
- Zero YouTube embeds
- Zero iframes
- Only HTML5 audio elements

### Playback Continuity: ✅
- Music continues when switching scenes
- Play state is preserved
- Volume is preserved

### Ambient Independence: ✅
- All 5 ambient sounds work independently
- Don't affect music playback
- Can be toggled on/off smoothly

## 🐛 Known Issues to Check

- [ ] No "YouTube error 150" messages
- [ ] No audio stuttering on scene change
- [ ] No duplicate audio playback
- [ ] No CORS errors
- [ ] No race conditions with ambient toggles

## 📝 Test Report Template

```
Date: ___________
Browser: ___________
OS: ___________

Scene Music Changes: PASS / FAIL
African Lofi (Scene 3): PASS / FAIL
No Embeds: PASS / FAIL
Ambient Independence: PASS / FAIL
Console Errors: NONE / LIST BELOW

Notes:
_______________________
_______________________
```
