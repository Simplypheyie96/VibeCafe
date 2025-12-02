import React, { useState } from 'react';
import { ModalShell } from './ui/ModalShell';
import { Music2 } from 'lucide-react';
import { Scene } from '../types';

interface AddPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlaylist: (playlist: {
    name: string;
    service: 'spotify' | 'apple-music';
    url: string;
    embedId: string;
    sceneId: number | null;
  }) => void;
  scenes: Scene[];
  customScenes?: Array<{ id: number; name: string }>;
}

export function AddPlaylistModal({ isOpen, onClose, onAddPlaylist, scenes, customScenes = [] }: AddPlaylistModalProps) {
  const [name, setName] = useState('');
  const [service, setService] = useState<'spotify' | 'apple-music'>('spotify');
  const [url, setUrl] = useState('');
  const [sceneId, setSceneId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const extractEmbedId = (url: string, service: 'spotify' | 'apple-music'): string | null => {
    try {
      if (service === 'spotify') {
        const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
      } else {
        const match = url.match(/playlist\/[^/]+\/(pl\.[a-zA-Z0-9-]+)/);
        return match ? match[1] : null;
      }
    } catch {
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
      setError(`Invalid ${service === 'spotify' ? 'Spotify' : 'Apple Music'} playlist URL`);
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
      description="Add your favorite Spotify or Apple Music playlists"
      onClose={onClose}
    >
      <form id="add-playlist-form" onSubmit={handleSubmit}>
        <div className="modal-gap-6">
          {/* Info Banner Section */}
          <div className="modal-gap-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-[12px] p-6">
              <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-blue-300/90 leading-relaxed">
                Import your favorite lofi playlists from Spotify or Apple Music. We'll embed them so you can play them directly in VibeCafe!
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
              className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
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
              className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all cursor-pointer"
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
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
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
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                }`}
              >
                <div className={`size-[18px] rounded-full ${service === 'apple-music' ? 'bg-pink-500' : 'bg-white/20'}`} />
                <span className="font-['Space_Grotesk',sans-serif] text-[14px] font-medium">Apple Music</span>
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
                  : 'https://music.apple.com/us/playlist/...'
              }
              className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
            />
            <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/50">
              Copy the share link from {service === 'spotify' ? 'Spotify' : 'Apple Music'}
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
            <details className="bg-white/5 border border-white/10 rounded-[12px] p-6">
              <summary className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white/70 cursor-pointer hover:text-white/90 transition-colors">
                How to get the playlist URL?
              </summary>
              <div className="mt-3 space-y-1 font-['Space_Grotesk',sans-serif] text-[12px] text-white/60">
                {service === 'spotify' ? (
                  <>
                    <p>1. Open Spotify and find your playlist</p>
                    <p>2. Click the three dots (...) menu</p>
                    <p>3. Hover over "Share" and click "Copy link to playlist"</p>
                    <p>4. Paste the link above</p>
                  </>
                ) : (
                  <>
                    <p>1. Open Apple Music and find your playlist</p>
                    <p>2. Click the three dots (...) menu</p>
                    <p>3. Click "Share Playlist" → "Copy Link"</p>
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
                className="flex-1 rounded-[999px] bg-white/6 hover:bg-white/10 px-4 py-3 font-['Space_Grotesk',sans-serif] text-[14px] font-medium text-white border border-white/15 transition-colors"
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