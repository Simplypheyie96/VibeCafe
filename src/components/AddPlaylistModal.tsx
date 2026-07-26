import React, { useState } from 'react';
import { ModalShell } from './ui/ModalShell';
import { Music2 } from 'lucide-react';
import { Scene } from '../types';

interface AddPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlaylist: (playlist: {
    name: string;
    service: 'spotify' | 'apple-music' | 'youtube' | 'soundcloud';
    url: string;
    embedId: string;
    sceneId: number | null;
  }) => void;
  scenes: Scene[];
  customScenes?: Array<{ id: number; name: string }>;
}

export function AddPlaylistModal({ isOpen, onClose, onAddPlaylist, scenes, customScenes = [] }: AddPlaylistModalProps) {
  const [name, setName] = useState('');
  const [service, setService] = useState<'spotify' | 'apple-music' | 'youtube' | 'soundcloud'>('youtube');
  const [url, setUrl] = useState('');
  const [sceneId, setSceneId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const extractEmbedId = (url: string, service: 'spotify' | 'apple-music' | 'youtube' | 'soundcloud'): string | null => {
    try {
      if (service === 'spotify') {
        // Remove whitespace and decode URI components
        let cleanUrl = url.trim();
        
        // Try to decode if it's URI encoded
        try {
          cleanUrl = decodeURIComponent(cleanUrl);
        } catch {
          // If decode fails, use original
        }
        
        // Handle Spotify URI format: spotify:playlist:xxxxx
        const uriMatch = cleanUrl.match(/spotify:playlist:([a-zA-Z0-9]+)/);
        if (uriMatch) {
          console.log('Extracted from URI:', uriMatch[1]);
          return uriMatch[1];
        }
        
        // Handle standard and shortened URLs with any domain
        // Matches playlist ID regardless of domain (open.spotify.com, spotify.link, etc.)
        const playlistMatch = cleanUrl.match(/(?:playlist[\/:]|spotify\.link\/)([a-zA-Z0-9]+)/);
        if (playlistMatch) {
          console.log('Extracted from URL:', playlistMatch[1]);
          return playlistMatch[1];
        }
        
        // Handle query parameter format: ?id=xxxxx
        const queryMatch = cleanUrl.match(/[?&](?:id|playlist)=([a-zA-Z0-9]+)/);
        if (queryMatch) {
          console.log('Extracted from query:', queryMatch[1]);
          return queryMatch[1];
        }
        
        console.log('Could not extract ID from:', cleanUrl);
        return null;
      } else if (service === 'apple-music') {
        const match = url.match(/playlist\/[^/]+\/(pl\.[a-zA-Z0-9-]+)/);
        return match ? match[1] : null;
      } else if (service === 'youtube') {
        // Handle various YouTube URL formats
        // Playlist: https://www.youtube.com/playlist?list=xxxxx
        const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
        if (playlistMatch) return playlistMatch[1];
        
        // Video: https://www.youtube.com/watch?v=xxxxx or https://youtu.be/xxxxx
        const videoMatch = url.match(/(?:watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (videoMatch) return videoMatch[1];
        
        return null;
      } else if (service === 'soundcloud') {
        // SoundCloud URLs: https://soundcloud.com/artist/track-name
        // We need the full path after soundcloud.com for the embed
        const match = url.match(/soundcloud\.com\/(.+?)(?:\?|$)/);
        if (match) return match[1];
        
        return null;
      }
      return null;
    } catch (error) {
      console.error('Extraction error:', error);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter a playlist name');
      return;
    }
    
    if (!url.trim()) {
      setError('Please enter a playlist URL');
      return;
    }

    const embedId = extractEmbedId(url.trim(), service);
    
    if (!embedId) {
      setError(`Invalid ${service === 'spotify' ? 'Spotify' : service === 'apple-music' ? 'Apple Music' : service === 'youtube' ? 'YouTube' : 'SoundCloud'} playlist URL`);
      return;
    }

    onAddPlaylist({
      name: name.trim(),
      service,
      url: url.trim(),
      embedId,
      sceneId,
    });

    setName('');
    setUrl('');
    setSceneId(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalShell
      title="Import Playlist"
      description="Add your favorite Spotify, Apple Music, YouTube, or SoundCloud playlists"
      onClose={onClose}
    >
      <form id="add-playlist-form" onSubmit={handleSubmit}>
        <div className="modal-gap-6">
          {/* Info Banner Section */}
          <div className="modal-gap-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-[12px] p-6">
              <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-blue-300/90 leading-relaxed">
                <strong>💡 Best for VibeCafe:</strong> YouTube & SoundCloud work instantly and are recommended! Spotify works great with Premium (embed playback) or Free (plays in Spotify app alongside VibeCafe). Apple Music subscribers can log in to play within the embed.
              </p>
            </div>
          </div>

          {/* Playlist Name Section */}
          <div className="field-group">
            <label className="font-['Space_Grotesk',sans-serif] text-[13px] font-semibold text-white/70">
              Playlist Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Lofi Vibes"
              className="w-full glass-inset-interactive rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white placeholder:text-white/40 "
              maxLength={40}
            />
          </div>

          {/* Scene Selection Section */}
          <div className="field-group">
            <label className="font-['Space_Grotesk',sans-serif] text-[13px] font-semibold text-white/70">
              Attach to Scene (Optional)
            </label>
            <select
              value={sceneId === null ? '' : sceneId}
              onChange={(e) => setSceneId(e.target.value ? Number(e.target.value) : null)}
              className="w-full glass-inset-interactive rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white  cursor-pointer"
            >
              <option value="">No scene (general playlist)</option>
              <optgroup label="Default Scenes">
                {scenes.map((scene, index) => (
                  <option key={scene.id} value={scene.id}>
                    Scene {index + 1}
                  </option>
                ))}
              </optgroup>
              {customScenes.length > 0 && (
                <optgroup label="Custom Scenes">
                  {customScenes.map((scene, index) => (
                    <option key={-scene.id} value={-scene.id}>
                      Custom Scene {index + 1}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/50">
              Link this playlist to a specific scene or leave unassigned
            </p>
          </div>

          {/* Service Selection Section */}
          <div className="modal-gap-3">
            <label className="font-['Space_Grotesk',sans-serif] text-[13px] font-semibold text-white/70">
              Music Service
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setService('spotify')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border transition-all ${
                  service === 'spotify'
                    ? 'bg-green-500/20 border-green-500/40 text-white'
                    : 'glass-inset-interactive text-white/60'
                }`}
              >
                <div className={`size-[18px] rounded-full ${service === 'spotify' ? 'bg-green-500' : 'bg-white/20'}`} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium">Spotify</span>
              </button>
              <button
                type="button"
                onClick={() => setService('apple-music')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border transition-all ${
                  service === 'apple-music'
                    ? 'bg-pink-500/20 border-pink-500/40 text-white'
                    : 'glass-inset-interactive text-white/60'
                }`}
              >
                <div className={`size-[18px] rounded-full ${service === 'apple-music' ? 'bg-pink-500' : 'bg-white/20'}`} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium">Apple Music</span>
              </button>
              <button
                type="button"
                onClick={() => setService('youtube')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border transition-all ${
                  service === 'youtube'
                    ? 'bg-red-500/20 border-red-500/40 text-white'
                    : 'glass-inset-interactive text-white/60'
                }`}
              >
                <div className={`size-[18px] rounded-full ${service === 'youtube' ? 'bg-red-500' : 'bg-white/20'}`} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium">YouTube</span>
              </button>
              <button
                type="button"
                onClick={() => setService('soundcloud')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border transition-all ${
                  service === 'soundcloud'
                    ? 'bg-orange-500/20 border-orange-500/40 text-white'
                    : 'glass-inset-interactive text-white/60'
                }`}
              >
                <div className={`size-[18px] rounded-full ${service === 'soundcloud' ? 'bg-orange-500' : 'bg-white/20'}`} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium">SoundCloud</span>
              </button>
            </div>
          </div>

          {/* Playlist URL Section */}
          <div className="field-group">
            <label className="font-['Space_Grotesk',sans-serif] text-[13px] font-semibold text-white/70">
              Playlist URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                service === 'spotify'
                  ? 'https://open.spotify.com/playlist/...'
                  : service === 'apple-music'
                    ? 'https://music.apple.com/us/playlist/...'
                    : service === 'youtube'
                      ? 'https://www.youtube.com/watch?v=...'
                      : 'https://soundcloud.com/tracks/...'
              }
              className="w-full glass-inset-interactive rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white placeholder:text-white/40 "
            />
            <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/50">
              Copy the share link from {service === 'spotify' ? 'Spotify' : service === 'apple-music' ? 'Apple Music' : service === 'youtube' ? 'YouTube' : 'SoundCloud'}
            </p>
          </div>

          {/* Error Message Section */}
          {error && (
            <div className="modal-gap-3">
              <div className="bg-red-500/10 border border-red-500/20 rounded-[12px] p-6">
                <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-red-300">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* How to Find URL Section */}
          <div className="modal-gap-3">
            <details className="glass-inset rounded-[12px] p-6">
              <summary className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/70 cursor-pointer hover:text-white/90 transition-colors">
                How to get the playlist URL?
              </summary>
              <div className="mt-3 space-y-1 font-['Space_Grotesk',sans-serif] text-[12px] text-white/60">
                {service === 'spotify' ? (
                  <>
                    <p><strong className="text-white/80">From Spotify App:</strong></p>
                    <p>1. Open Spotify and find your playlist</p>
                    <p>2. Tap the three dots (•••) or Share button</p>
                    <p>3. Tap "Copy link to playlist"</p>
                    <p>4. Paste the link above - any format works!</p>
                    <p className="mt-2 text-white/50">✓ Works with app links, web links, and URIs</p>
                  </>
                ) : service === 'apple-music' ? (
                  <>
                    <p>1. Open Apple Music and find your playlist</p>
                    <p>2. Click the three dots (...) menu</p>
                    <p>3. Click "Share Playlist" → "Copy Link"</p>
                    <p>4. Paste the link above</p>
                  </>
                ) : service === 'youtube' ? (
                  <>
                    <p>1. Open YouTube and find your playlist</p>
                    <p>2. Click the three dots (...) menu</p>
                    <p>3. Click "Open in YouTube Music" → "Share" → "Copy Link"</p>
                    <p>4. Paste the link above</p>
                  </>
                ) : (
                  <>
                    <p>1. Open SoundCloud and find your playlist</p>
                    <p>2. Click the three dots (...) menu</p>
                    <p>3. Click "Share" → "Copy Link"</p>
                    <p>4. Paste the link above</p>
                  </>
                )}
              </div>
            </details>
          </div>

          {/* Action Buttons */}
          <div className="modal-gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[999px] glass-inset-interactive px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] font-medium text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim() || !url.trim()}
                className="flex-1 rounded-[999px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] font-medium text-white transition-all"
              >
                Import Playlist
              </button>
            </div>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}