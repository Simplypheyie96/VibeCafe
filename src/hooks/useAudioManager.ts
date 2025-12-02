import { useEffect, useRef, useState } from 'react';

export function useAudioManager() {
  const musicRef = useRef<HTMLIFrameElement | null>(null);
  const ambientRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [isReady, setIsReady] = useState(false);

  // Initialize ambient audio elements
  useEffect(() => {
    return () => {
      // Cleanup all audio on unmount
      ambientRefs.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      ambientRefs.current.clear();
    };
  }, []);

  const playAmbient = (id: string, url: string, volume: number) => {
    let audio = ambientRefs.current.get(id);
    
    if (!audio) {
      audio = new Audio();
      audio.loop = true;
      audio.volume = volume / 100;
      audio.crossOrigin = 'anonymous';
      
      // Add error handling before setting src
      audio.addEventListener('error', (e) => {
        console.warn(`Audio load failed for ${id}, this is expected for preview URLs. In production, host your own audio files.`);
      });
      
      // Set audio source
      audio.src = url;
      audio.load();
      
      ambientRefs.current.set(id, audio);
    }

    audio.volume = volume / 100;
    
    if (audio.paused) {
      // Use a promise with better error handling
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Only log if it's not an abort error (which happens during rapid changes)
          if (error.name !== 'AbortError') {
            console.warn(`Ambient sound "${id}" cannot play. This may be due to browser autoplay policy or missing audio file. Try interacting with the page first.`);
          }
        });
      }
    }
  };

  const stopAmbient = (id: string, fadeOut = true) => {
    const audio = ambientRefs.current.get(id);
    if (!audio) return;

    if (fadeOut) {
      // Fade out over 500ms
      const startVolume = audio.volume;
      const fadeStep = startVolume / 20;
      const fadeInterval = setInterval(() => {
        if (audio.volume > fadeStep) {
          audio.volume -= fadeStep;
        } else {
          audio.pause();
          audio.volume = startVolume;
          clearInterval(fadeInterval);
        }
      }, 25);
    } else {
      audio.pause();
    }
  };

  const updateAmbientVolume = (id: string, volume: number) => {
    const audio = ambientRefs.current.get(id);
    if (audio) {
      audio.volume = volume / 100;
    }
  };

  const loadMusic = (url: string) => {
    // For YouTube embeds, we'll use iframe API
    setIsReady(true);
  };

  const setMusicVolume = (volume: number) => {
    // This would control the YouTube player volume via iframe API
    // For now, it's handled by the parent component
  };

  return {
    playAmbient,
    stopAmbient,
    updateAmbientVolume,
    loadMusic,
    setMusicVolume,
    musicRef,
    isReady
  };
}
