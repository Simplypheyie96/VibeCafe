import React, { useState, useEffect, useRef } from "react";
import { scenes } from "./data/scenes";
import { SceneCarousel } from "./components/SceneCarousel";
import { GenreTags } from "./components/GenreTags";
import { FloatingOrb } from "./components/FloatingOrb";
import { NowPlayingCard } from "./components/NowPlayingCard";
import { SettingsModal } from "./components/SettingsModal";
import { MyPlaylistsModal } from "./components/MyPlaylistsModal";
import { AboutModal } from "./components/AboutModal";
import { TabNavigation } from "./components/TabNavigation";
import { RainAnimation } from "./components/RainAnimation";
import { SnowAnimation } from "./components/SnowAnimation";
import { FirefliesAnimation } from "./components/FirefliesAnimation";
import { LeavesAnimation } from "./components/LeavesAnimation";
import { StarsAnimation } from "./components/StarsAnimation";
import { Toast } from "./components/Toast";
import { PlaylistEmbed } from "./components/PlaylistEmbed";
import { PresetsModal } from "./components/PresetsModal";
import { AddPlaylistModal } from "./components/AddPlaylistModal";
import { AmbientButton } from "./components/AmbientButton";
import { LoadingScreen } from "./components/LoadingScreen";
import { ChangeSceneModal } from "./components/ChangeSceneModal";
import { CustomSceneDropdown } from "./components/CustomSceneDropdown";
import { CustomScene, CustomPlaylist, Preset } from "./types";
import {
  initAnalytics,
  trackSceneChange,
  trackMusicPlayback,
  trackAmbientToggle,
  trackPlaylistAction,
  trackCustomContent,
  trackEngagement,
} from "./utils/analytics";

// IMPORTANT: Replace with your actual Google Analytics 4 Measurement ID
// Get this from: https://analytics.google.com/
// Format: G-XXXXXXXXXX
const GA_MEASUREMENT_ID = 'G-NSEG2KSE8X'; // ✅ Your VibeCafe Analytics ID

function App() {
  // All state declarations first
  const [isLoading, setIsLoading] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [prevScene, setPrevScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRainActive, setIsRainActive] = useState(false);
  const [isCityActive, setIsCityActive] = useState(false);
  const [isFireActive, setIsFireActive] = useState(false);
  const [isBirdsActive, setIsBirdsActive] = useState(false);
  const [isCafeActive, setIsCafeActive] = useState(false);
  const [isSnowActive, setIsSnowActive] = useState(false);
  const [isFirefliesActive, setIsFirefliesActive] = useState(false);
  const [isLeavesActive, setIsLeavesActive] = useState(false);
  const [isStarsActive, setIsStarsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "scenes" | "playlists" | "about"
  >("scenes");
  const [isPlaylistsModalOpen, setIsPlaylistsModalOpen] =
    useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] =
    useState(false);
  const [isChangeSceneModalOpen, setIsChangeSceneModalOpen] = useState(false);
  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = useState(false);
  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(null);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  
  // Custom content state
  const [customScenes, setCustomScenes] = useState<CustomScene[]>([]);
  const [customPlaylists, setCustomPlaylists] = useState<CustomPlaylist[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [sceneTransitioning, setSceneTransitioning] =
    useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [musicVolume, setMusicVolume] = useState(70);
  const [rainVolume, setRainVolume] = useState(50);
  const [cityVolume, setCityVolume] = useState(50);
  const [fireVolume, setFireVolume] = useState(50);
  const [birdsVolume, setBirdsVolume] = useState(50);
  const [cafeVolume, setCafeVolume] = useState(50);

  // iOS audio unlock state
  const [iOSReady, setIOSReady] = useState(false);
  
  // Detect iOS device
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const musicAudioRef = useRef<HTMLAudioElement>(null);
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const cityAudioRef = useRef<HTMLAudioElement>(null);
  const fireAudioRef = useRef<HTMLAudioElement>(null);
  const birdsAudioRef = useRef<HTMLAudioElement>(null);
  const cafeAudioRef = useRef<HTMLAudioElement>(null);
  
  // Ref to store pending custom scene before it's added to state
  const pendingCustomSceneRef = useRef<CustomScene | null>(null);
  
  // Helper to get scene (either default or custom)
  const getScene = (sceneId: number) => {
    // Check if it's a custom scene (larger than 999 indicates timestamp-based ID)
    if (sceneId > 999) {
      // First check if this is the pending scene (not yet in state)
      if (pendingCustomSceneRef.current && pendingCustomSceneRef.current.id === sceneId) {
        const customScene = pendingCustomSceneRef.current;
        return {
          id: sceneId,
          name: customScene.name,
          thumbnail: customScene.imageUrl,
          wallpaper: customScene.imageUrl,
          genre: 'Custom',
          tags: [customScene.mood, 'Custom'],
          playlist: [{
            id: '1',
            title: customScene.trackTitle || 'Lofi Beats',
            artist: customScene.artistName || 'Unknown Artist',
            duration: '0:00'
          }],
          musicUrl: customScene.musicUrl,
          isCustom: true,
        };
      }
      
      // Then check in the customScenes state
      const customScene = customScenes.find((s) => s.id === sceneId);
      if (customScene) {
        return {
          id: sceneId,
          name: customScene.name,
          thumbnail: customScene.imageUrl,
          wallpaper: customScene.imageUrl,
          genre: 'Custom',
          tags: [customScene.mood, 'Custom'],
          playlist: [{
            id: '1',
            title: customScene.trackTitle || 'Lofi Beats',
            artist: customScene.artistName || 'Unknown Artist',
            duration: '0:00'
          }],
          musicUrl: customScene.musicUrl,
          isCustom: true,
        };
      }
    }
    return scenes.find((s) => s.id === sceneId) || scenes[0];
  };

  const currentScene = getScene(activeScene);
  const previousScene = getScene(prevScene);
  const currentTrack = currentScene.playlist[0];

  // Stable key that only updates when the scene changes
  const wallpaperKey = `wallpaper-${currentScene.id}`;

  // Debug: Log wallpaper URL on scene change
  useEffect(() => {
    console.log('=== SCENE CHANGE DEBUG ===');
    console.log('Active Scene ID:', activeScene);
    console.log('Scene Name:', currentScene.name);
    console.log('Wallpaper URL:', currentScene.wallpaper);
    console.log('========================');
  }, [activeScene, currentScene.name, currentScene.wallpaper]);

  // Set page title
  useEffect(() => {
    document.title = "VibeCafe - Lofi Music & Ambient Sounds";
  }, []);

  // Mobile viewport height fix
  useEffect(() => {
    function updateHeight() {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      initAnalytics(GA_MEASUREMENT_ID);
    }
  }, []);

  // Parse URL parameters to restore shared state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Restore scene
    const sceneParam = params.get('scene');
    if (sceneParam) {
      const sceneId = parseInt(sceneParam);
      if (!isNaN(sceneId) && sceneId >= 0 && sceneId < scenes.length) {
        setActiveScene(sceneId);
      }
    }
    
    // Restore ambient sounds
    const ambientParam = params.get('ambient');
    if (ambientParam) {
      const activeAmbient = ambientParam.split(',');
      setIsRainActive(activeAmbient.includes('rain'));
      setIsBirdsActive(activeAmbient.includes('birds'));
      setIsFireActive(activeAmbient.includes('fire'));
      setIsCityActive(activeAmbient.includes('city'));
      setIsCafeActive(activeAmbient.includes('cafe'));
    }
    
    // Restore volumes
    const mvParam = params.get('mv');
    if (mvParam) setMusicVolume(parseInt(mvParam));
    
    const rvParam = params.get('rv');
    if (rvParam) setRainVolume(parseInt(rvParam));
    
    const bvParam = params.get('bv');
    if (bvParam) setBirdsVolume(parseInt(bvParam));
    
    const fvParam = params.get('fv');
    if (fvParam) setFireVolume(parseInt(fvParam));
    
    const cvParam = params.get('cv');
    if (cvParam) setCityVolume(parseInt(cvParam));
    
    const cfvParam = params.get('cfv');
    if (cfvParam) setCafeVolume(parseInt(cfvParam));
  }, []);

  // Load custom scenes, playlists, and presets from localStorage
  useEffect(() => {
    const savedScenes = localStorage.getItem('vibecafe_custom_scenes');
    const savedPlaylists = localStorage.getItem('vibecafe_custom_playlists');
    const savedPresets = localStorage.getItem('vibecafe_presets');
    
    if (savedScenes) {
      try {
        const parsed = JSON.parse(savedScenes);
        // Filter out any scenes with broken blob URLs
        const validScenes = parsed.filter((scene: CustomScene) => 
          !scene.imageUrl?.startsWith('blob:')
        );
        
        // If we filtered out any scenes, show a warning
        if (validScenes.length < parsed.length) {
          console.warn(`Removed ${parsed.length - validScenes.length} custom scene(s) with invalid blob URLs`);
        }
        
        setCustomScenes(validScenes);
      } catch (e) {
        console.error('Failed to parse custom scenes');
      }
    }
    
    if (savedPlaylists) {
      try {
        setCustomPlaylists(JSON.parse(savedPlaylists));
      } catch (e) {
        console.error('Failed to parse custom playlists');
      }
    }

    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.error('Failed to parse presets');
      }
    }
  }, []);

  // Save custom scenes to localStorage
  useEffect(() => {
    localStorage.setItem('vibecafe_custom_scenes', JSON.stringify(customScenes));
  }, [customScenes]);

  // Save custom playlists to localStorage
  useEffect(() => {
    localStorage.setItem('vibecafe_custom_playlists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // Save presets to localStorage
  useEffect(() => {
    localStorage.setItem('vibecafe_presets', JSON.stringify(presets));
  }, [presets]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Cmd/Ctrl + P to open presets
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsPresetsModalOpen(true);
      }
      
      // Cmd/Ctrl + E to export data
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        handleExportData();
      }
      
      // Arrow keys to navigate scenes
      if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const allSceneIds = [...scenes.map(s => s.id), ...customScenes.map(s => -s.id)];
        const currentIndex = allSceneIds.indexOf(activeScene);
        if (currentIndex > 0) {
          handleSceneChange(allSceneIds[currentIndex - 1]);
        }
      }
      
      if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const allSceneIds = [...scenes.map(s => s.id), ...customScenes.map(s => -s.id)];
        const currentIndex = allSceneIds.indexOf(activeScene);
        if (currentIndex < allSceneIds.length - 1) {
          handleSceneChange(allSceneIds[currentIndex + 1]);
        }
      }
      
      // Spacebar to play/pause
      if (e.key === ' ' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        handlePlayPause();
      }
      
      // Number keys (1-9) to quick-load first 9 presets
      if (e.key >= '1' && e.key <= '9' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const index = parseInt(e.key) - 1;
        if (presets[index]) {
          handleLoadPreset(presets[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [presets, activeScene, customScenes]);

  // Initialize audio elements with proper setup
  useEffect(() => {
    // Only initialize error handlers, don't preload ambient audio
    const audioRefs = [
      { ref: rainAudioRef, name: "rain" },
      { ref: cityAudioRef, name: "city" },
      { ref: fireAudioRef, name: "fire" },
      { ref: birdsAudioRef, name: "birds" },
      { ref: cafeAudioRef, name: "cafe" },
    ];

    audioRefs.forEach(({ ref, name }) => {
      if (ref.current) {
        ref.current.addEventListener("error", (e) => {
          const audio = e.target as HTMLAudioElement;
          console.error(
            `${name} audio failed to load:`,
            audio.error?.code,
            audio.error?.message,
          );
        });
        // Don't load() here - let it load only when user activates it
      }
    });

    return () => {
      audioRefs.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, []);

  // Initialize HTML5 audio player - only after loading is complete
  useEffect(() => {
    if (!isLoading && musicAudioRef.current) {
      musicAudioRef.current.volume = musicVolume / 100;

      const handleCanPlay = () => {
        setPlayerReady(true);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleError = (e: Event) => {
        const audio = e.target as HTMLAudioElement;
        const error = audio.error;
        if (error) {
          console.warn(
            "Music audio error:",
            error.code,
            error.message,
          );
        }
      };

      musicAudioRef.current.addEventListener(
        "canplay",
        handleCanPlay,
      );
      musicAudioRef.current.addEventListener(
        "play",
        handlePlay,
      );
      musicAudioRef.current.addEventListener(
        "pause",
        handlePause,
      );
      musicAudioRef.current.addEventListener(
        "error",
        handleError,
      );

      // Set initial music source
      musicAudioRef.current.src = currentScene.musicUrl;
      musicAudioRef.current.load();

      // Auto-play after loading screen is done (skip on iOS until user taps)
      setTimeout(() => {
        if (musicAudioRef.current && !isLoading && (!isIOS || iOSReady)) {
          musicAudioRef.current.play().catch(() => {
            // Autoplay prevented - user interaction required
          });
        }
      }, 500);

      return () => {
        if (musicAudioRef.current) {
          musicAudioRef.current.removeEventListener(
            "canplay",
            handleCanPlay,
          );
          musicAudioRef.current.removeEventListener(
            "play",
            handlePlay,
          );
          musicAudioRef.current.removeEventListener(
            "pause",
            handlePause,
          );
          musicAudioRef.current.removeEventListener(
            "error",
            handleError,
          );
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Update music volume
  useEffect(() => applyVolume(musicAudioRef, musicVolume), [musicVolume]);

  // Handle ambient audio volumes
  useEffect(() => applyVolume(rainAudioRef, rainVolume), [rainVolume]);
  useEffect(() => applyVolume(cityAudioRef, cityVolume), [cityVolume]);
  useEffect(() => applyVolume(fireAudioRef, fireVolume), [fireVolume]);
  useEffect(() => applyVolume(birdsAudioRef, birdsVolume), [birdsVolume]);
  useEffect(() => applyVolume(cafeAudioRef, cafeVolume), [cafeVolume]);

  // Handle scene change with smooth transition
  const handleSceneChange = (sceneId: number) => {
    if (sceneId === activeScene) return;

    setPrevScene(activeScene);
    setSceneTransitioning(true);

    setTimeout(() => {
      setActiveScene(sceneId);
      
      // Track scene change in analytics
      const scene = getScene(sceneId);
      trackSceneChange(scene.name, sceneId, scene.isCustom || false);
      
      setTimeout(() => {
        setSceneTransitioning(false);
      }, 700);
    }, 50);
  };

  // Auto-load playlist linked to the current scene
  useEffect(() => {
    // Find playlist linked to current scene
    const linkedPlaylist = customPlaylists.find(p => p.sceneId === activeScene);
    
    if (linkedPlaylist) {
      // Auto-open the linked playlist
      setActivePlaylistId(linkedPlaylist.id);
    } else {
      // Close playlist if switching to a scene without a linked playlist
      setActivePlaylistId(null);
    }
  }, [activeScene, customPlaylists]);

  // Pause/Resume default music based on playlist state
  useEffect(() => {
    if (!musicAudioRef.current || !playerReady || isLoading) {
      return;
    }

    if (activePlaylistId !== null) {
      // Pause default music when playlist is active
      if (!musicAudioRef.current.paused) {
        musicAudioRef.current.pause();
      }
    }
    // Don't auto-resume when playlist closes - let user control playback
  }, [activePlaylistId, playerReady, isLoading]);

  // Handle scene change - load new audio and continue playing if music was playing
  useEffect(() => {
    if (musicAudioRef.current && playerReady && !isLoading) {
      // Don't change music if a playlist is active
      if (activePlaylistId !== null) {
        return;
      }

      const wasPlaying = !musicAudioRef.current.paused;
      const newMusicUrl = currentScene.musicUrl;

      // Only change if the URL is actually different
      if (musicAudioRef.current.src !== newMusicUrl) {
        // Pause current playback first
        musicAudioRef.current.pause();

        // Load new music source
        musicAudioRef.current.src = newMusicUrl;
        musicAudioRef.current.load();

        // Continue playing if music was already playing
        if (wasPlaying) {
          // Wait for the audio to be ready before playing
          const handleCanPlayThrough = () => {
            if (musicAudioRef.current) {
              musicAudioRef.current.play().catch((error) => {
                if (error.name !== "AbortError") {
                  console.error(
                    "Error playing music:",
                    error.name,
                  );
                }
              });
              musicAudioRef.current.removeEventListener(
                "canplaythrough",
                handleCanPlayThrough,
              );
            }
          };

          musicAudioRef.current.addEventListener(
            "canplaythrough",
            handleCanPlayThrough,
          );
        }
      }
    }
  }, [
    activeScene,
    playerReady,
    currentScene.musicUrl,
    isLoading,
    activePlaylistId,
  ]);

  // Handle tab change - ensure only one modal is open at a time
  useEffect(() => {
    // Close all modals first
    setIsSettingsOpen(false);
    setIsPlaylistsModalOpen(false);
    setIsAboutModalOpen(false);

    // Open the appropriate modal based on active tab
    if (activeTab === "playlists") {
      setIsPlaylistsModalOpen(true);
    } else if (activeTab === "about") {
      setIsAboutModalOpen(true);
    }
  }, [activeTab]);

  const handlePlayPause = () => {
    if (!playerReady || !musicAudioRef.current) {
      return;
    }

    try {
      if (musicAudioRef.current.paused) {
        musicAudioRef.current.play();
      } else {
        musicAudioRef.current.pause();
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const handlePlaylistsModalClose = () => {
    setIsPlaylistsModalOpen(false);
    setActiveTab("scenes");
  };

  const handleAboutModalClose = () => {
    setIsAboutModalOpen(false);
    setActiveTab("scenes");
  };

  const handleSettingsOpen = () => {
    // Close other modals before opening settings
    setIsPlaylistsModalOpen(false);
    setIsAboutModalOpen(false);
    setActiveTab("scenes");
    setIsSettingsOpen(true);
  };

  // Robust volume application for mobile - ensures volume applies even when paused and after playback
  const applyVolume = (ref: React.RefObject<HTMLAudioElement>, value: number) => {
    const audio = ref.current;
    if (!audio) return;

    // Ensure volume applies even when paused (mobile fix)
    audio.volume = value / 100;

    // Ensure volume applies after playback (mobile fix)
    audio.onplay = () => {
      audio.volume = value / 100;
    };
  };

  // Audio toggle function with promise handling
  const handleAudioToggle = async (
    audio: HTMLAudioElement | null,
    type: "rain" | "city" | "fire" | "birds" | "cafe",
    isActive: boolean,
    setActive: (value: boolean) => void,
  ) => {
    if (!audio || isLoading) return;

    const getVolume = () => {
      switch (type) {
        case "rain": return rainVolume / 100;
        case "city": return cityVolume / 100;
        case "fire": return fireVolume / 100;
        case "birds": return birdsVolume / 100;
        case "cafe": return cafeVolume / 100;
        default: return 0.5;
      }
    };

    const volume = getVolume();
    const newState = !isActive;

    if (newState) {
      setActive(true);

      audio.volume = volume;

      const tryPlay = async () => {
        try {
          audio.volume = volume;
          await audio.play();
        } catch {}
      };

      if (audio.readyState >= 2) {
        await tryPlay();
      } else {
        audio.load();
        audio.volume = volume;

        await new Promise<void>((resolve) => {
          const handler = () => {
            audio.removeEventListener("canplay", handler);
            resolve();
          };
          audio.addEventListener("canplay", handler);
          setTimeout(resolve, 1500);
        });

        await tryPlay();
      }
    } else {
      try {
        audio.pause();
        setTimeout(() => {
          if (audio.paused) audio.currentTime = 0;
        }, 150);
        setActive(false);
      } catch {}
    }
  };

  // Custom scene and playlist handlers
  const handleChangeScene = (updates: {
    imageUrl: string;
    musicUrl: string;
    artistName: string;
    trackTitle: string;
  }) => {
    // For default scenes, we can't actually modify them, 
    // so we create a custom scene copy with the modifications
    const sceneName = currentScene.name;
    
    const modifiedScene: CustomScene = {
      id: Date.now(),
      name: `${sceneName} (Modified)`,
      imageUrl: updates.imageUrl,
      mood: currentScene.tags[0] || 'chill',
      musicUrl: updates.musicUrl,
      artistName: updates.artistName,
      trackTitle: updates.trackTitle,
    };
    
    // Store in ref so getScene can find it immediately
    pendingCustomSceneRef.current = modifiedScene;
    
    // Add to customScenes state
    setCustomScenes((prev) => [...prev, modifiedScene]);
    
    // Show toast
    showToast(`Scene \"${sceneName}\" modified!`);
    
    // Switch to the new scene immediately
    setPrevScene(activeScene);
    setSceneTransitioning(true);
    
    setTimeout(() => {
      setActiveScene(modifiedScene.id);
      setTimeout(() => {
        setSceneTransitioning(false);
        // Clear the pending ref after transition completes
        setTimeout(() => {
          pendingCustomSceneRef.current = null;
        }, 100);
      }, 700);
    }, 50);
  };

  const handleAddPlaylist = (playlist: {
    name: string;
    service: 'spotify' | 'apple-music';
    url: string;
    embedId: string;
    sceneId: number | null;
  }) => {
    const newPlaylist = {
      id: Date.now(),
      ...playlist,
    };
    setCustomPlaylists((prev) => [...prev, newPlaylist]);
    const sceneName = playlist.sceneId !== null ? getScene(playlist.sceneId).name : 'general';
    showToast(`Playlist "${playlist.name}" imported${playlist.sceneId !== null ? ` for ${sceneName}` : ''}!`);
  };

  const handleEditPlaylist = (id: number, updates: Partial<CustomPlaylist>) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Playlist updated!');
  };

  const handleDeletePlaylist = (id: number) => {
    const playlist = customPlaylists.find(p => p.id === id);
    setCustomPlaylists((prev) => prev.filter((p) => p.id !== id));
    if (playlist) {
      showToast(`Playlist "${playlist.name}" removed`);
    }
    // Close the embed modal if this playlist was open
    if (activePlaylistId === id) {
      setActivePlaylistId(null);
    }
  };

  const handleDeleteScene = (id: number) => {
    const scene = customScenes.find(s => s.id === id);
    setCustomScenes((prev) => prev.filter((s) => s.id !== id));
    
    // Switch to default scene if the deleted scene was active
    const customSceneId = -id;
    if (activeScene === customSceneId) {
      handleSceneChange(0);
    }
    
    // Also remove any presets that reference this custom scene
    const affectedPresets = presets.filter(p => p.sceneId === customSceneId);
    if (affectedPresets.length > 0) {
      setPresets((prev) => prev.filter((p) => p.sceneId !== customSceneId));
      showToast(`Scene "${scene?.name}" and ${affectedPresets.length} linked preset(s) removed`);
    } else if (scene) {
      showToast(`Scene "${scene.name}" removed`);
    }
  };

  // Ambient sound toggle handlers
  const handleRainToggle = () => {
    handleAudioToggle(
      rainAudioRef.current,
      "rain",
      isRainActive,
      setIsRainActive,
    );
  };

  const handleCityToggle = () => {
    handleAudioToggle(
      cityAudioRef.current,
      "city",
      isCityActive,
      setIsCityActive,
    );
  };

  const handleFireToggle = () => {
    handleAudioToggle(
      fireAudioRef.current,
      "fire",
      isFireActive,
      setIsFireActive,
    );
  };

  const handleBirdsToggle = () => {
    handleAudioToggle(
      birdsAudioRef.current,
      "birds",
      isBirdsActive,
      setIsBirdsActive,
    );
  };

  const handleCafeToggle = () => {
    handleAudioToggle(
      cafeAudioRef.current,
      "cafe",
      isCafeActive,
      setIsCafeActive,
    );
  };

  // Visual effect toggles (no audio)
  const handleSnowToggle = () => {
    setIsSnowActive(!isSnowActive);
  };

  const handleFirefliesToggle = () => {
    setIsFirefliesActive(!isFirefliesActive);
  };

  const handleLeavesToggle = () => {
    setIsLeavesActive(!isLeavesActive);
  };

  const handleStarsToggle = () => {
    setIsStarsActive(!isStarsActive);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  // Preset handlers
  const handleSavePreset = (name: string) => {
    const newPreset: Preset = {
      id: Date.now(),
      name,
      sceneId: activeScene,
      isCustomScene: activeScene < 0,
      ambient: {
        rain: isRainActive,
        birds: isBirdsActive,
        fire: isFireActive,
        city: isCityActive,
        cafe: isCafeActive,
      },
      volumes: {
        music: musicVolume,
        rain: rainVolume,
        birds: birdsVolume,
        fire: fireVolume,
        city: cityVolume,
        cafe: cafeVolume,
      },
    };
    setPresets((prev) => [...prev, newPreset]);
    showToast(`Preset "${name}" saved successfully!`);
  };

  const handleLoadPreset = (preset: Preset) => {
    // Check if the scene exists
    if (preset.isCustomScene) {
      const customSceneExists = customScenes.some(s => -s.id === preset.sceneId);
      if (!customSceneExists) {
        showToast(`Cannot load preset: Custom scene no longer exists`);
        return;
      }
    } else {
      const defaultSceneExists = scenes.some(s => s.id === preset.sceneId);
      if (!defaultSceneExists) {
        showToast(`Cannot load preset: Scene not found`);
        return;
      }
    }
    
    // Switch to the scene
    handleSceneChange(preset.sceneId);
    
    // Set ambient states - use setTimeout to ensure state updates properly
    setTimeout(() => {
      if (preset.ambient.rain !== isRainActive) handleRainToggle();
      if (preset.ambient.birds !== isBirdsActive) handleBirdsToggle();
      if (preset.ambient.fire !== isFireActive) handleFireToggle();
      if (preset.ambient.city !== isCityActive) handleCityToggle();
      if (preset.ambient.cafe !== isCafeActive) handleCafeToggle();
      
      // Set volumes
      setMusicVolume(preset.volumes.music);
      setRainVolume(preset.volumes.rain);
      setBirdsVolume(preset.volumes.birds);
      setFireVolume(preset.volumes.fire);
      setCityVolume(preset.volumes.city);
      setCafeVolume(preset.volumes.cafe);
    }, 100);
    
    setIsPresetsModalOpen(false);
    showToast(`Preset "${preset.name}" loaded!`);
  };

  const handleDeletePreset = (id: number) => {
    setPresets((prev) => prev.filter((p) => p.id !== id));
    showToast('Preset deleted');
  };

  // Export/Import handlers
  const handleExportData = () => {
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      customScenes,
      customPlaylists,
      presets,
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibecafe-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importData = JSON.parse(event.target?.result as string);
            
            if (importData.customScenes) {
              setCustomScenes(importData.customScenes);
            }
            if (importData.customPlaylists) {
              setCustomPlaylists(importData.customPlaylists);
            }
            if (importData.presets) {
              setPresets(importData.presets);
            }
            
            showToast('Import successful!');
          } catch (error) {
            showToast('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Show loading screen
  if (isLoading) {
    return (
      <LoadingScreen
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div 
      className="relative w-screen overflow-hidden flex items-center justify-center bg-black" 
      style={{ 
        height: "var(--app-height)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        backgroundColor: "black"
      }}
    >
      {/* iOS Tap-to-Start Overlay */}
      {isIOS && !iOSReady && (
        <div
          onClick={() => {
            setIOSReady(true);
            if (musicAudioRef.current) {
              musicAudioRef.current.play().catch(() => {});
            }
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[99999] cursor-pointer"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="size-16 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <svg className="size-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="font-['Space_Grotesk',sans-serif] text-white text-lg">
              Tap to start
            </p>
          </div>
        </div>
      )}
      
      {/* Background wallpaper - crossfade transition between scenes */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: "calc(env(safe-area-inset-top) * -1)",
          bottom: "calc(env(safe-area-inset-bottom) * -1)",
          left: 0,
          right: 0
        }}
      >
        {/* Previous Scene */}
        {sceneTransitioning && (
          <img
            key={`prev-${previousScene.id}`}
            src={
              previousScene.wallpaper?.startsWith("blob:")
                ? `${previousScene.wallpaper}?v=${previousScene.id}`
                : previousScene.wallpaper
            }
            alt={previousScene.name}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-opacity duration-700"
            style={{ objectPosition: "center center" }}
          />
        )}

        {/* Current Scene */}
        <img
          key={`curr-${currentScene.id}`}
          src={
            currentScene.wallpaper?.startsWith("blob:")
              ? `${currentScene.wallpaper}?v=${currentScene.id}`
              : currentScene.wallpaper
          }
          alt={currentScene.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            sceneTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectPosition: "center center" }}
        />
      </div>

      {/* Visual Animations */}
      <RainAnimation isActive={isRainActive} />
      <SnowAnimation isActive={isSnowActive} />
      <FirefliesAnimation isActive={isFirefliesActive} />
      <LeavesAnimation isActive={isLeavesActive} />
      <StarsAnimation isActive={isStarsActive} />

      {/* Hidden Music Player - src is managed by useEffect */}
      <audio
        ref={musicAudioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
        playsInline
        onCanPlay={() => {
          if (musicAudioRef.current) {
            musicAudioRef.current.volume = musicVolume / 100;
          }
        }}
      />

      {/* Hidden Audio Elements for Ambient Sounds */}
      <div className="fixed -left-[9999px] -top-[9999px] w-0 h-0 pointer-events-none">
        {/* Rain - Soft natural rainfall ambience */}
        <audio
          ref={rainAudioRef}
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={() => {
            if (rainAudioRef.current) {
              rainAudioRef.current.volume = rainVolume / 100;
            }
          }}
        >
          <source
            src="https://assets.mixkit.co/active_storage/sfx/2393/2393.wav"
            type="audio/wav"
          />
          <source
            src="https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3"
            type="audio/mpeg"
          />
        </audio>
        {/* Birds - Morning forest birds chirping */}
        <audio
          ref={birdsAudioRef}
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={() => {
            if (birdsAudioRef.current) {
              birdsAudioRef.current.volume = birdsVolume / 100;
            }
          }}
        >
          <source
            src="https://assets.mixkit.co/active_storage/sfx/2466/2466.wav"
            type="audio/wav"
          />
          <source
            src="https://assets.mixkit.co/active_storage/sfx/2466/2466-preview.mp3"
            type="audio/mpeg"
          />
        </audio>
        {/* City - Urban ambience with traffic */}
        <audio
          ref={cityAudioRef}
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={() => {
            if (cityAudioRef.current) {
              cityAudioRef.current.volume = cityVolume / 100;
            }
          }}
        >
          <source
            src="https://cdn.jsdelivr.net/gh/Simplypheyie96/ambient-sound@main/traffic-in-city-309236.mp3?refresh=2024"
            type="audio/mpeg"
          />
          <source
            src="https://rawcdn.githack.com/Simplypheyie96/ambient-sound/main/traffic-in-city-309236.mp3?refresh=2024"
            type="audio/mpeg"
          />
        </audio>
        {/* Fire - Natural fire crackling */}
        <audio
          ref={fireAudioRef}
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={() => {
            if (fireAudioRef.current) {
              fireAudioRef.current.volume = fireVolume / 100;
            }
          }}
        >
          <source
            src="https://cdn.jsdelivr.net/gh/Simplypheyie96/ambient-sound@main/fire-crackling-sounds-427410.mp3?refresh=2024"
            type="audio/mpeg"
          />
          <source
            src="https://rawcdn.githack.com/Simplypheyie96/ambient-sound/main/fire-crackling-sounds-427410.mp3?refresh=2024"
            type="audio/mpeg"
          />
        </audio>
        {/* Cafe - Coffee shop background chatter */}
        <audio
          ref={cafeAudioRef}
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={() => {
            if (cafeAudioRef.current) {
              cafeAudioRef.current.volume = cafeVolume / 100;
            }
          }}
        >
          <source
            src="https://cdn.jsdelivr.net/gh/Simplypheyie96/ambient-sound@main/cafe-noise-32940.mp3?refresh=2024"
            type="audio/mpeg"
          />
          <source
            src="https://rawcdn.githack.com/Simplypheyie96/ambient-sound/main/cafe-noise-32940.mp3?refresh=2024"
            type="audio/mpeg"
          />
        </audio>
      </div>

      {/* Main content container */}
      <div className="relative size-full">
        {/* Tab Navigation - Centered */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Add Content Buttons - Positioned below Settings button */}
        {activeTab === 'scenes' && (
          <div className="absolute right-4 top-[170px]
            sm:right-6 sm:top-[180px]
            md:right-6 md:top-[190px]
            lg:right-8 lg:top-[200px]
            z-50">
            <button
              onClick={() => setIsChangeSceneModalOpen(true)}
              className="relative size-[48px]
                sm:size-[52px]
                md:size-[56px]
                lg:size-[64px]
                bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105"
              aria-label="Change scene"
            >
              <svg 
                className="size-5 sm:size-6 md:size-7 lg:size-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        )}
        
        {activeTab === 'playlists' && !isPlaylistsModalOpen && (
          <div
            style={{
              position: "fixed",
              right: "20px",
              top: "200px",
              zIndex: 9999,
              touchAction: "none",
            }}
            onPointerDown={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              const startX = e.clientX;
              const startY = e.clientY;
              const startLeft = el.offsetLeft;
              const startTop = el.offsetTop;

              const move = (ev: PointerEvent) => {
                el.style.left = startLeft + (ev.clientX - startX) + "px";
                el.style.top = startTop + (ev.clientY - startY) + "px";
                el.style.right = "auto";
              };

              const stop = () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerup", stop);
              };

              window.addEventListener("pointermove", move);
              window.addEventListener("pointerup", stop);
            }}
          >
            <button
              onClick={() => setIsAddPlaylistModalOpen(true)}
              className="relative size-[48px]
                sm:size-[52px]
                md:size-[56px]
                lg:size-[64px]
                bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105 cursor-move"
              aria-label="Import playlist"
            >
              <span className="text-white text-[20px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-medium">+</span>
              {customPlaylists.length > 0 && (
                <span className="absolute -top-1 -right-1 size-5 sm:size-6 bg-pink-500 border-2 border-black rounded-full flex items-center justify-center">
                  <span className="font-['Space_Grotesk',sans-serif] text-[10px] sm:text-[11px] font-bold text-white">
                    {customPlaylists.length}
                  </span>
                </span>
              )}
            </button>
          </div>
        )}

        {/* Genre Tags - Exact Figma position */}
        <GenreTags
          tags={currentScene.tags}
          activeTag={currentScene.tags[0]}
        />

        {/* FloatingOrb - Exact Figma position */}
        <FloatingOrb onClick={handleSettingsOpen} badgeCount={presets.length} />

        {/* Now Playing Card - Exact Figma position and style */}
        <NowPlayingCard
          trackTitle={currentTrack.title}
          artist={currentTrack.artist}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />

        {/* Ambient Sound Buttons - Floating with safe padding from edges */}
        <div className="hidden md:block">
          <AmbientButton
            type="rain"
            isActive={isRainActive}
            onClick={handleRainToggle}
            style={{
              position: "absolute",
              left: "12%",
              top: "28%",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="birds"
            isActive={isBirdsActive}
            onClick={handleBirdsToggle}
            style={{
              position: "absolute",
              left: "65%",
              top: "32%",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="fire"
            isActive={isFireActive}
            onClick={handleFireToggle}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="city"
            isActive={isCityActive}
            onClick={handleCityToggle}
            style={{
              position: "absolute",
              right: "18%",
              bottom: "28%",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="cafe"
            isActive={isCafeActive}
            onClick={handleCafeToggle}
            style={{
              position: "absolute",
              left: "35%",
              top: "22%",
            }}
          />
        </div>

        {/* Visual Effects - Desktop */}
        <div className="hidden md:block">
          <AmbientButton
            type="snow"
            isActive={isSnowActive}
            onClick={handleSnowToggle}
            style={{
              position: "absolute",
              left: "20%",
              top: "65%",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="fireflies"
            isActive={isFirefliesActive}
            onClick={handleFirefliesToggle}
            style={{
              position: "absolute",
              right: "25%",
              top: "60%",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="leaves"
            isActive={isLeavesActive}
            onClick={handleLeavesToggle}
            style={{
              position: "absolute",
              left: "72%",
              top: "18%",
            }}
          />
        </div>

        <div className="hidden md:block">
          <AmbientButton
            type="stars"
            isActive={isStarsActive}
            onClick={handleStarsToggle}
            style={{
              position: "absolute",
              left: "15%",
              top: "15%",
            }}
          />
        </div>

        {/* Mobile/Tablet Ambient Buttons - Positioned with safe padding */}
        <div className="md:hidden">
          <AmbientButton
            type="rain"
            isActive={isRainActive}
            onClick={handleRainToggle}
            style={{
              position: "absolute",
              left: "10%",
              top: "28%",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="birds"
            isActive={isBirdsActive}
            onClick={handleBirdsToggle}
            style={{
              position: "absolute",
              left: "62%",
              top: "35%",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="fire"
            isActive={isFireActive}
            onClick={handleFireToggle}
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="city"
            isActive={isCityActive}
            onClick={handleCityToggle}
            style={{
              position: "absolute",
              left: "12%",
              top: "55%",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="cafe"
            isActive={isCafeActive}
            onClick={handleCafeToggle}
            style={{
              position: "absolute",
              right: "12%",
              top: "55%",
            }}
          />
        </div>

        {/* Visual Effects - Mobile */}
        <div className="md:hidden">
          <AmbientButton
            type="snow"
            isActive={isSnowActive}
            onClick={handleSnowToggle}
            style={{
              position: "absolute",
              left: "15%",
              top: "20%",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="fireflies"
            isActive={isFirefliesActive}
            onClick={handleFirefliesToggle}
            style={{
              position: "absolute",
              right: "15%",
              top: "25%",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="leaves"
            isActive={isLeavesActive}
            onClick={handleLeavesToggle}
            style={{
              position: "absolute",
              left: "60%",
              top: "20%",
            }}
          />
        </div>

        <div className="md:hidden">
          <AmbientButton
            type="stars"
            isActive={isStarsActive}
            onClick={handleStarsToggle}
            style={{
              position: "absolute",
              left: "35%",
              top: "65%",
            }}
          />
        </div>

        {/* Scene Carousel */}
        <SceneCarousel
          activeScene={activeScene}
          onSceneChange={handleSceneChange}
        />

        {/* Custom Scene Dropdown - only show on scenes tab */}
        {activeTab === 'scenes' && (
          <CustomSceneDropdown
            customScenes={customScenes}
            scenes={scenes}
            activeScene={activeScene}
            onSceneChange={handleSceneChange}
            onDeleteScene={handleDeleteScene}
          />
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        musicVolume={musicVolume}
        onMusicVolumeChange={setMusicVolume}
        rainVolume={rainVolume}
        onRainVolumeChange={setRainVolume}
        cityVolume={cityVolume}
        onCityVolumeChange={setCityVolume}
        fireVolume={fireVolume}
        onFireVolumeChange={setFireVolume}
        birdsVolume={birdsVolume}
        onBirdsVolumeChange={setBirdsVolume}
        cafeVolume={cafeVolume}
        onCafeVolumeChange={setCafeVolume}
        sceneId={activeScene}
        activeAmbient={{
          rain: isRainActive,
          birds: isBirdsActive,
          fire: isFireActive,
          city: isCityActive,
          cafe: isCafeActive,
        }}
        onOpenPresets={() => {
          setIsSettingsOpen(false);
          setIsPresetsModalOpen(true);
        }}
      />

      {/* My Playlists Modal */}
      <MyPlaylistsModal
        isOpen={isPlaylistsModalOpen}
        onClose={handlePlaylistsModalClose}
        onOpenAddPlaylist={() => setIsAddPlaylistModalOpen(true)}
        customPlaylists={customPlaylists}
        scenes={scenes}
        customScenes={customScenes}
        onEditPlaylist={handleEditPlaylist}
        onDeletePlaylist={handleDeletePlaylist}
        onPlayPlaylist={setActivePlaylistId}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={handleAboutModalClose}
      />

      {/* Add Scene Modal */}
      <ChangeSceneModal
        isOpen={isChangeSceneModalOpen}
        onClose={() => setIsChangeSceneModalOpen(false)}
        currentScene={currentScene}
        onChangeScene={handleChangeScene}
      />

      {/* Add Playlist Modal */}
      <AddPlaylistModal
        isOpen={isAddPlaylistModalOpen}
        onClose={() => setIsAddPlaylistModalOpen(false)}
        onAddPlaylist={handleAddPlaylist}
        scenes={scenes}
        customScenes={customScenes}
      />

      {/* Playlist Embed - Fixed position, scene remains visible */}
      {activePlaylistId !== null && (() => {
        const playlist = customPlaylists.find(p => p.id === activePlaylistId);
        if (!playlist) return null;
        
        return (
          <PlaylistEmbed
            name={playlist.name}
            service={playlist.service}
            embedId={playlist.embedId}
            onClose={() => setActivePlaylistId(null)}
          />
        );
      })()}

      {/* Presets Modal */}
      <PresetsModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        presets={presets}
        onSavePreset={handleSavePreset}
        onLoadPreset={handleLoadPreset}
        onDeletePreset={handleDeletePreset}
      />

      {/* Toast Notifications */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default App;