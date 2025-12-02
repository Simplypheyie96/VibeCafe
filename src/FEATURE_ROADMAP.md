# VibeCafe Feature Roadmap

## 🔧 Bug Fixes (COMPLETED)

### ✅ Critical Fixes
1. **Settings button visibility on tablet** - Fixed positioning to use responsive right-alignment instead of fixed left position
2. **Settings modal clickability on mobile** - Added `pointer-events-auto` and `touch-manipulation` for better touch handling
3. **Ambient sound controls on mobile** - Enhanced touch targets and pointer events
4. **Better mobile responsiveness** - Improved background image positioning

---

## 🎯 User-Requested Features

### 1. **Longer Ambient Sound Loops** 
**Priority:** HIGH  
**Complexity:** Medium  
**Status:** Needs Implementation

**Current Issue:**
- Ambient sounds have hard breaks/loops that are noticeable
- Users can hear when tracks restart

**Solution:**
```
Option A: Find Longer Audio Files
- Search for 5-10 minute ambient loops instead of 30-second loops
- Use services like Freesound.org, BBC Sound Effects, or premium services
- Ensure seamless loop points

Option B: Crossfade Implementation
- Preload multiple instances of each sound
- Crossfade between them to hide loop points
- Code example:
  
  const [audio1, audio2] = useState(new Audio(src));
  const crossfadeDuration = 2000; // 2 seconds
  
  audio1.addEventListener('timeupdate', () => {
    if (audio1.duration - audio1.currentTime < crossfadeDuration/1000) {
      audio2.volume = (crossfadeDuration/1000 - (audio1.duration - audio1.currentTime)) / (crossfadeDuration/1000);
      audio2.play();
    }
  });

Option C: Professional Audio Loops
- Purchase professional seamless loops from AudioJungle, Epidemic Sound, etc.
- These are designed to loop perfectly without breaks
```

**Recommended Audio Sources:**
- Freesound.org (Free, Creative Commons)
- BBC Sound Effects Archive (Free for personal use)
- Epidemic Sound (Paid subscription)
- AudioJungle (One-time purchase)

---

### 2. **Import Custom Playlists**
**Priority:** HIGH  
**Complexity:** High  
**Status:** Requires Backend/API Integration

**User Story:**
Users want to import playlists from:
- YouTube Music
- Spotify
- Apple Music
- SoundCloud
- Custom URLs

**Implementation Requirements:**

```typescript
// Frontend Components Needed:
- PlaylistImporter component with URL input
- OAuth integration for streaming services
- Playlist parser/validator
- Import progress indicator

// Backend Requirements:
- API endpoints to handle playlist imports
- OAuth tokens storage (Spotify, YouTube, etc.)
- Playlist metadata extraction
- Stream URL conversion/proxying

// Example: Spotify Integration
interface ImportedPlaylist {
  id: string;
  name: string;
  source: 'spotify' | 'youtube' | 'soundcloud' | 'custom';
  tracks: {
    title: string;
    artist: string;
    streamUrl: string;
    duration: number;
    thumbnail?: string;
  }[];
}

// Spotify API Example
const importSpotifyPlaylist = async (playlistId: string) => {
  // 1. Authenticate with Spotify OAuth
  // 2. Fetch playlist metadata
  // 3. Extract track information
  // 4. Store in local state/database
  // 5. Create streaming URLs
};
```

**Legal Considerations:**
⚠️ **IMPORTANT:** 
- Spotify/YouTube don't allow direct streaming outside their apps
- Would need to use their official embed players
- Or use a backend service to handle streaming (may violate TOS)
- Consider using legal alternatives like Mixcloud API or Radio.co

**Recommended Approach:**
1. Start with **Custom URL** support (user provides direct MP3/stream links)
2. Add **YouTube embed** support (legal via YouTube IFrame API)
3. Consider **Mixcloud** integration (allows embedding)
4. For Spotify: Use their **Web Playback SDK** (requires Premium)

---

### 3. **Custom Scene Upload/Design**
**Priority:** MEDIUM  
**Complexity:** Very High  
**Status:** Requires Backend + Storage

**User Story:**
Users want to:
- Upload their own background images/videos
- Design custom scenes with filters/effects
- Share scenes with community
- Browse community-created scenes

**Implementation Requirements:**

```typescript
// Frontend Components:
interface CustomScene {
  id: string;
  userId: string;
  name: string;
  wallpaper: string; // URL to uploaded image
  wallpaperType: 'image' | 'video';
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
  };
  tags: string[];
  isPublic: boolean;
  likes: number;
  createdAt: Date;
}

// Components Needed:
- SceneDesigner (upload + edit interface)
- ImageUploader with preview
- FilterControls (brightness, contrast, etc.)
- SceneGallery (browse community scenes)
- SceneEditor (apply effects in real-time)

// Backend Requirements:
- Image/Video storage (AWS S3, Cloudflare R2, etc.)
- Image processing (resize, optimize, generate thumbnails)
- Database for scene metadata
- CDN for fast delivery
- Moderation system (prevent inappropriate content)
- User authentication
```

**Storage Costs:**
- Images: ~2-5MB each
- 1000 users × 5 scenes = ~25GB storage
- CDN bandwidth costs
- Recommend: Cloudflare R2 (no egress fees)

**Technical Stack Recommendation:**
```
Frontend: Current React app
Backend: Supabase (provides storage + auth + database)
Storage: Supabase Storage or Cloudflare R2
CDN: Cloudflare
Image Processing: Sharp.js or Cloudinary API
```

**MVP Implementation:**
1. **Phase 1:** Upload custom backgrounds (image only)
2. **Phase 2:** Add basic filters (brightness, blur)
3. **Phase 3:** Save to local storage
4. **Phase 4:** Add backend + sharing

---

### 4. **Share with Friends**
**Priority:** MEDIUM  
**Complexity:** Medium  
**Status:** Requires Backend

**User Story:**
Users want to share:
- Current scene + music combo
- Custom playlists
- Custom scenes
- Current ambient sound setup

**Implementation Options:**

```typescript
// Option A: Share via URL Parameters (No Backend)
// Example: vibecafe.app/?scene=2&ambient=rain,birds&volume=70

const generateShareUrl = (state: AppState) => {
  const params = new URLSearchParams({
    scene: state.activeScene.toString(),
    ambient: state.activeAmbient.join(','),
    musicVolume: state.musicVolume.toString(),
    // ... other state
  });
  return `${window.location.origin}?${params}`;
};

// On load, parse URL and restore state
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('scene')) {
    setActiveScene(parseInt(params.get('scene')));
  }
  // ... restore other state
}, []);

// Option B: Share via Short Links (Requires Backend)
interface SharedSession {
  id: string; // Short ID like "abc123"
  sceneId: number;
  activeAmbient: string[];
  volumes: {
    music: number;
    rain: number;
    // ...
  };
  customPlaylist?: string;
  createdAt: Date;
  expiresAt: Date;
}

// API endpoint to create share link
POST /api/share
{
  sceneId: 2,
  ambient: ["rain", "birds"],
  volumes: { music: 70, rain: 50, birds: 50 }
}

// Returns: https://vibecafe.app/s/abc123

// Option C: Social Media Integration
- Add OpenGraph meta tags for rich previews
- Generate scene preview images
- Pre-filled social media share buttons
```

**Share Options to Include:**
- 📋 Copy Link to Clipboard
- 🐦 Twitter/X
- 📘 Facebook
- 💬 WhatsApp
- 📧 Email
- 🔗 QR Code

**Implementation Plan:**
1. **Phase 1:** URL parameters (no backend needed)
2. **Phase 2:** Add copy-to-clipboard button
3. **Phase 3:** Social share buttons
4. **Phase 4:** Short link service (optional)
5. **Phase 5:** QR code generation

---

### 5. **Better Mobile Responsiveness**
**Priority:** HIGH  
**Complexity:** Medium  
**Status:** IN PROGRESS

**Current Issues:**
- ✅ Ambient icons look different on mobile vs desktop (FIXED)
- ✅ Settings button not visible on tablet (FIXED)
- Background images may be cropped awkwardly
- Some text might be too small
- Touch targets could be larger

**Improvements Made:**
```css
/* FloatingOrb - Responsive positioning */
- Changed from fixed left position to responsive right alignment
- Added touch-manipulation for better mobile interaction

/* AmbientButton - Transparent on mobile */
- Removed glassmorphic background on mobile
- Icons only (cleaner look)
- Enhanced touch targets

/* Background Images */
- Improved object-position for better mobile framing
- Using object-cover to prevent stretching
```

**Recommended Next Steps:**
1. Test on physical devices (iOS, Android)
2. Add viewport height fixes for mobile browsers
3. Consider portrait-specific layouts
4. Add swipe gestures for scene navigation
5. Optimize image sizes for mobile (WebP format)
6. Add loading states for slower connections

---

## 🚀 Implementation Priority

### Immediate (This Week)
- [x] Fix settings button on tablet
- [x] Fix ambient sound controls on mobile
- [x] Improve touch targets
- [ ] Better ambient sound loops (find longer files)

### Short-term (Next 2 Weeks)
- [ ] URL-based sharing (no backend needed)
- [ ] Custom URL playlist import
- [ ] Mobile responsive testing on real devices

### Medium-term (Next Month)
- [ ] Backend setup (Supabase)
- [ ] User authentication
- [ ] Short link sharing
- [ ] YouTube playlist import

### Long-term (2-3 Months)
- [ ] Custom scene upload
- [ ] Community scene gallery
- [ ] Spotify/Apple Music integration
- [ ] Video background support

---

## 💰 Cost Estimates

### Free Tier (Current)
- Hosting: Vercel/Netlify free tier
- Audio: CDN links (jsDelivr)
- **Total: $0/month**

### With Backend (User Features)
- Supabase: Free tier (up to 500MB storage)
- Cloudflare R2: $0.015/GB storage
- Domain: $10-15/year
- **Total: ~$5-10/month** (small scale)

### With Premium Features
- Supabase Pro: $25/month
- Cloudflare R2: ~$20/month (for 1000+ users)
- CDN bandwidth: $20-50/month
- Audio licensing: $15-30/month (Epidemic Sound)
- **Total: ~$80-125/month** (medium scale)

---

## 🎓 Learning Resources

### For Playlist Import:
- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Mixcloud API](https://www.mixcloud.com/developers/)

### For File Upload:
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [AWS S3 Tutorial](https://aws.amazon.com/s3/getting-started/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)

### For Sharing:
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [URL Parameters in React](https://reactrouter.com/en/main/hooks/use-search-params)

---

## ❓ Questions to Consider

1. **Playlist Import:** Which platforms are most important to users? (Spotify, YouTube, SoundCloud?)
2. **Custom Scenes:** Should there be upload limits? File size restrictions?
3. **Sharing:** Do users want private sharing or public gallery?
4. **Monetization:** Would users pay for premium features? (Ad-free, more storage, etc.)
5. **Community:** Do we want user accounts and social features?

---

## 📞 Next Steps

1. **Gather user feedback** on priority features
2. **Test current fixes** on real devices
3. **Find better ambient sound loops** (can do now, no code needed)
4. **Decide on backend platform** (Supabase recommended)
5. **Create MVP roadmap** for most-requested features
