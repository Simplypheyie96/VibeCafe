import React, { useState, useEffect, useMemo, useRef, startTransition } from "react";
import { scenes } from "./data/scenes";
import { SceneCarousel } from "./components/SceneCarousel";
import { GenreTags } from "./components/GenreTags";
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
import { AmbientDock, AmbientKey } from "./components/AmbientDock";
import { AudioGate } from "./components/AudioGate";
import { InstallPrompt } from "./components/InstallPrompt";
import { LoadingScreen } from "./components/LoadingScreen";
import { ChangeSceneModal } from "./components/ChangeSceneModal";
import { CustomSceneDropdown } from "./components/CustomSceneDropdown";
import { MetaTags } from "./components/MetaTags";
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import { tracksForScene } from "./data/musicCatalog";
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

// Analytics ID — set VITE_GA_ID in your .env.local or Vercel environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID ?? '';

function App() {
  // All state declarations first
  const [isLoading, setIsLoading] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [prevScene, setPrevScene] = useState(0);
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
  const [musicVolume, setMusicVolume] = useState(70);
  const [rainVolume, setRainVolume] = useState(50);
  const [cityVolume, setCityVolume] = useState(50);
  const [fireVolume, setFireVolume] = useState(50);
  const [birdsVolume, setBirdsVolume] = useState(50);
  const [cafeVolume, setCafeVolume] = useState(50);

  // Set once the user has made the gesture every browser requires before audio
  // may start. Until then the gate is up and nothing tries to play.
  const [audioUnlocked, setAudioUnlocked] = useState(false);

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

  // The queue for this scene: a mood bucket from the Creative Commons catalog for
  // built-in scenes, or the single user-supplied URL for a custom one.
  const sceneTracks = useMemo(
    () => tracksForScene(currentScene),
    [currentScene.id, currentScene.mood, currentScene.musicUrl],
  );

  const player = useMusicPlayer({
    tracks: sceneTracks,
    volume: musicVolume,
    unlocked: audioUnlocked,
    // An embedded playlist takes over the audio; the scene player steps aside.
    suspended: activePlaylistId !== null,
  });

  const currentTrack = player.track ?? currentScene.playlist[0];

  // Set page title
  useEffect(() => {
    document.title = "VibeCafe - Lofi Music & Ambient Sounds";
  }, []);

  // Viewport height fix — uses visualViewport so iOS Safari URL-bar show/hide is tracked
  useEffect(() => {
    function updateHeight() {
      // visualViewport.height correctly shrinks/grows as the iOS Safari URL bar appears/hides.
      // window.innerHeight does NOT reliably update for URL bar transitions on iOS.
      const h = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${h}px`);
    }
    updateHeight();
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
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

  // Music playback now lives in useMusicPlayer: a real queue with auto-advance,
  // stall recovery, and per-track skipping, rather than one <audio loop> pointed
  // at a live stream that could only ever stop.

  // Handle ambient audio volumes
  useEffect(() => applyVolume(rainAudioRef, rainVolume), [rainVolume]);
  useEffect(() => applyVolume(cityAudioRef, cityVolume), [cityVolume]);
  useEffect(() => applyVolume(fireAudioRef, fireVolume), [fireVolume]);
  useEffect(() => applyVolume(birdsAudioRef, birdsVolume), [birdsVolume]);
  useEffect(() => applyVolume(cafeAudioRef, cafeVolume), [cafeVolume]);

  // Handle scene change with smooth transition
  const handleSceneChange = (sceneId: number) => {
    if (sceneId === activeScene) return;

    startTransition(() => {
      setPrevScene(activeScene);
      setSceneTransitioning(true);
      // Swapped in immediately: it renders underneath the outgoing scene, which
      // is what the dissolve above uncovers. Delaying it left a frame of nothing.
      setActiveScene(sceneId);

      const scene = getScene(sceneId);
      trackSceneChange(scene.name, sceneId, scene.isCustom || false);

      // Matches the 900ms `scene-dissolve` duration in globals.css.
      setTimeout(() => setSceneTransitioning(false), 900);
    });
  };

  // Auto-load playlist linked to the current scene
  useEffect(() => {
    // Find playlist linked to current scene
    const linkedPlaylist = customPlaylists.find(p => p.sceneId === activeScene);

    if (linkedPlaylist) {
      // Auto-open the linked playlist
      setActivePlaylistId(linkedPlaylist.id);
    } else {
      // Only close if the currently active playlist is scene-linked (not a general/unlinked playlist)
      setActivePlaylistId(prev => {
        if (prev === null) return null;
        const currentPlaylist = customPlaylists.find(p => p.id === prev);
        // Keep unlinked playlists (sceneId === null) open across scene changes
        if (currentPlaylist && currentPlaylist.sceneId === null) return prev;
        return null;
      });
    }
  }, [activeScene, customPlaylists]);

  // Suspension and scene-change continuity are both handled inside useMusicPlayer:
  // swapping the queue keeps playing when the user already had music running.

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
    // A press here is itself the gesture the browser wants, so it can double as
    // the unlock if the user dismissed the gate without starting anything.
    if (!audioUnlocked) setAudioUnlocked(true);
    player.toggle();
    trackMusicPlayback(
      player.isPlaying ? 'pause' : 'play',
      currentTrack.title,
      currentTrack.artist,
    );
  };

  const handleEnterFromGate = () => {
    setAudioUnlocked(true);
    player.play();
    trackMusicPlayback('play', currentTrack.title, currentTrack.artist);
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
    service: 'spotify' | 'apple-music' | 'youtube' | 'soundcloud';
    url: string;
    embedId: string;
    sceneId: number | null;
  }) => {
    const newPlaylist = {
      id: Date.now(),
      ...playlist,
    };
    setCustomPlaylists((prev) => [...prev, newPlaylist]);
    // Open the embed immediately so the user sees it right after import
    setActivePlaylistId(newPlaylist.id);
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

  // Flattened view of the nine controls, for the dock.
  const ambientActive: Record<AmbientKey, boolean> = {
    rain: isRainActive,
    city: isCityActive,
    fire: isFireActive,
    birds: isBirdsActive,
    cafe: isCafeActive,
    snow: isSnowActive,
    fireflies: isFirefliesActive,
    leaves: isLeavesActive,
    stars: isStarsActive,
  };

  const ambientToggles: Record<AmbientKey, () => void> = {
    rain: handleRainToggle,
    city: handleCityToggle,
    fire: handleFireToggle,
    birds: handleBirdsToggle,
    cafe: handleCafeToggle,
    snow: handleSnowToggle,
    fireflies: handleFirefliesToggle,
    leaves: handleLeavesToggle,
    stars: handleStarsToggle,
  };

  const handleAmbientToggle = (key: AmbientKey) => ambientToggles[key]();

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
        imagesToPreload={scenes.map(s => s.wallpaper)}
      />
    );
  }

  return (
    <main
      className="relative w-screen overflow-hidden flex items-center justify-center bg-black"
      style={{
        height: "var(--app-height)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        backgroundColor: "black"
      }}
    >
      {/* The app is a single full-bleed canvas with no visible page title, but a
          screen reader still needs somewhere to land and a document heading. */}
      <h1 className="sr-only">VibeCafe — lofi music and ambient sounds</h1>

      {/* Meta tags for social sharing */}
      <MetaTags />

      {/* Every browser requires a gesture before audio; this makes it the front door
          rather than a silent failure the user has to work out for themselves. */}
      <AudioGate
        open={!audioUnlocked}
        sceneName={currentScene.name}
        onEnter={handleEnterFromGate}
      />

      {/* Install affordance: native prompt on Chromium, Share sheet walkthrough on iOS. */}
      <InstallPrompt />

      {/* Background wallpaper - crossfade transition between scenes */}
      {/* On mobile the background extends 72px below the container so the scene
          image stays visible as the iOS URL bar collapses and reveals extra space. */}
      <div
        className="absolute pointer-events-none overflow-hidden bg-extend-mobile"
        style={{
          top: "calc(env(safe-area-inset-top) * -1)",
          bottom: "calc(env(safe-area-inset-bottom) * -1)",
          left: 0,
          right: 0
        }}
      >
        {/* Current scene. Held at full opacity throughout the change and layered
            underneath, so the transition dissolves the old scene away to reveal
            this one. Fading this one up instead meant both images were partly
            transparent at once and the page background showed through -- every
            scene change dipped to near-black in the middle. */}
        <img
          key={`curr-${currentScene.id}`}
          src={
            currentScene.wallpaper?.startsWith("blob:")
              ? `${currentScene.wallpaper}?v=${currentScene.id}`
              : currentScene.wallpaper
          }
          alt={currentScene.name}
          className="absolute inset-0 w-full h-full object-cover object-center animate-scene-motion"
          style={{
            objectPosition: "center center",
            /* Offset each scene's ken-burns loop so arriving somewhere doesn't
               always snap to the same starting zoom. */
            animationDelay: `-${(currentScene.id % 9) * 6.5}s`,
          }}
        />

        {/* Outgoing scene, above and dissolving. Unmounts when the animation
            finishes, which is what `sceneTransitioning` is timed against. */}
        {sceneTransitioning && (
          <div
            key={`prev-${previousScene.id}`}
            className="scene-outgoing absolute inset-0 z-10"
            aria-hidden="true"
          >
            <img
              src={
                previousScene.wallpaper?.startsWith("blob:")
                  ? `${previousScene.wallpaper}?v=${previousScene.id}`
                  : previousScene.wallpaper
              }
              alt=""
              className="w-full h-full object-cover object-center animate-scene-motion"
              style={{
                objectPosition: "center center",
                animationDelay: `-${(previousScene.id % 9) * 6.5}s`,
              }}
            />
          </div>
        )}
      </div>

      {/* Visual Animations */}
      <RainAnimation isActive={isRainActive} />
      <SnowAnimation isActive={isSnowActive} />
      <FirefliesAnimation isActive={isFirefliesActive} />
      <LeavesAnimation isActive={isLeavesActive} />
      <StarsAnimation isActive={isStarsActive} />

      {/* The music element is owned by useMusicPlayer, not the DOM. */}

      {/* Hidden Audio Elements for Ambient Sounds.
          All five are preload="none": with preload="auto" the browser pulled
          every clip on first paint -- over 3 MB of audio before anyone had
          toggled a single sound on. They now fetch when first played, which is
          what the setup effect above already assumed. */}
      <div className="fixed -left-[9999px] -top-[9999px] w-0 h-0 pointer-events-none">
        {/* Rain - Soft natural rainfall ambience */}
        <audio
          ref={rainAudioRef}
          loop
          playsInline
          preload="none"
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
          preload="none"
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
          preload="none"
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
          preload="none"
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
          preload="none"
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
        {/* Tab Navigation - Centered with Change Scene & Settings icons */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onChangeScene={() => setIsChangeSceneModalOpen(true)}
          onOpenSettings={handleSettingsOpen}
        />

        {/* Genre Tags - Exact Figma position */}
        <GenreTags
          tags={currentScene.tags}
          activeTag={currentScene.tags[0]}
        />

        {/* Now Playing Card - Exact Figma position and style */}
        <NowPlayingCard
          trackTitle={currentTrack.title}
          artist={currentTrack.artist}
          license={currentTrack.license}
          sourceUrl={currentTrack.sourceUrl}
          state={player.state}
          onPlayPause={handlePlayPause}
        />

        {/* Ambient sounds and visual effects. One set of nine controls; CSS decides
            whether they scatter across the scene (desktop) or sit in a grid (mobile),
            so the artwork stays uncluttered without duplicating the DOM. */}
        <AmbientDock active={ambientActive} onToggle={handleAmbientToggle} />

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
        onPlayPlaylist={(id) => {
          setActivePlaylistId(id);
          handlePlaylistsModalClose();
        }}
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
    </main>
  );
}

export default App;