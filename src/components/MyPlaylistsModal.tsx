import React, { useState } from 'react';
import { ExternalLink, Music, Edit2, Trash2, Link2 } from 'lucide-react';
import { ModalShell } from './ui/ModalShell';
import { CustomPlaylist, Scene } from '../types';

interface MyPlaylistsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddPlaylist?: () => void;
  customPlaylists: CustomPlaylist[];
  scenes: Scene[];
  customScenes?: Array<{ id: number; name: string }>;
  onEditPlaylist?: (id: number, updates: Partial<CustomPlaylist>) => void;
  onDeletePlaylist?: (id: number) => void;
  onPlayPlaylist?: (id: number) => void;
}

const authorPlaylists = [
  {
    platform: 'Spotify',
    name: 'My Spotify Playlists',
    url: 'https://open.spotify.com/user/dxfxgedku8ipye2ah5diwvxm1?si=cNkgn94PSQ2NT7ivt77roA&nd=1&dlsi=2ae7398948814bb1',
    icon: '🎵',
    description: 'Explore my curated Spotify collections'
  },
  {
    platform: 'Apple Music',
    name: 'Echoes in Motion',
    url: 'https://music.apple.com/ng/playlist/echoes-in-motion/pl.u-NpXm6NaILRkqaBK',
    icon: '🎧',
    description: 'A journey through sounds and emotions'
  }
];

export function MyPlaylistsModal({ 
  isOpen, 
  onClose, 
  onOpenAddPlaylist,
  customPlaylists,
  scenes,
  customScenes = [],
  onEditPlaylist,
  onDeletePlaylist,
  onPlayPlaylist
}: MyPlaylistsModalProps) {
  const [editingPlaylistId, setEditingPlaylistId] = useState<number | null>(null);
  const [editSceneId, setEditSceneId] = useState<number | null>(null);

  const getSceneName = (sceneId: number | null) => {
    if (sceneId === null) return 'Not assigned';
    if (sceneId < 0) {
      const customScene = customScenes.find(s => -s.id === sceneId);
      return customScene ? customScene.name : 'Unknown Scene';
    }
    const scene = scenes.find(s => s.id === sceneId);
    return scene ? scene.name : 'Unknown Scene';
  };

  const handleSaveSceneAssignment = (playlistId: number) => {
    if (onEditPlaylist) {
      onEditPlaylist(playlistId, { sceneId: editSceneId });
    }
    setEditingPlaylistId(null);
    setEditSceneId(null);
  };

  if (!isOpen) return null;

  return (
    <ModalShell
      title="My Playlists"
      description="Import playlists or explore featured collections"
      onClose={onClose}
    >
      <div className="modal-gap-6">
        {/* Import Playlist Button Section */}
        <div className="modal-gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAddPlaylist?.();
            }}
            className="bg-gradient-to-r from-[#ad46ff] to-[#f6339a] hover:from-[#9d36ef] hover:to-[#e6238a] border border-[rgba(194,122,255,0.3)] rounded-[16px] p-6 transition-all duration-200 group w-full"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="bg-white/20 rounded-[12px] size-10 flex items-center justify-center">
                  <Music className="size-5 text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white mb-1">
                    Import Playlist
                  </p>
                  <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/70">
                    Add from Spotify or Apple Music
                  </p>
                </div>
              </div>
              <ExternalLink className="size-5 text-white/60 group-hover:text-white/90 transition-colors" strokeWidth={2} />
            </div>
          </button>
        </div>

        {/* Imported Playlists Section */}
        {customPlaylists.length > 0 && (
          <div className="modal-gap-3">
            <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white">
              Imported Playlists ({customPlaylists.length})
            </h3>
            <div className="modal-gap-3">
              {customPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-white/5 border border-white/20 rounded-[16px] p-6 transition-all duration-200"
                >
                  <div className="modal-gap-4">
                    {/* Playlist Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start flex-1 gap-3.5">
                        <div className={`p-2 rounded-[10px] shrink-0 ${
                          playlist.service === 'spotify' 
                            ? 'bg-green-500/20' 
                            : 'bg-pink-500/20'
                        }`}>
                          <Music className={`size-4 ${
                            playlist.service === 'spotify' 
                              ? 'text-green-300' 
                              : 'text-pink-300'
                          }`} strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-['Space_Grotesk',sans-serif] font-semibold text-[14px] text-white truncate mb-1.5">
                            {playlist.name}
                          </p>
                          <p className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/50">
                            {playlist.service === 'spotify' ? 'Spotify' : 'Apple Music'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onPlayPlaylist?.(playlist.id)}
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                          title="Play playlist"
                        >
                          <Music className="size-4 text-white/60 hover:text-white" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPlaylistId(playlist.id);
                            setEditSceneId(playlist.sceneId);
                          }}
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit scene assignment"
                        >
                          <Edit2 className="size-4 text-white/60 hover:text-white" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${playlist.name}"?`)) {
                              onDeletePlaylist?.(playlist.id);
                            }
                          }}
                          className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete playlist"
                        >
                          <Trash2 className="size-4 text-white/60 hover:text-red-400" strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    {/* Scene Assignment */}
                    {editingPlaylistId === playlist.id ? (
                      <div className="bg-white/5 border border-white/20 rounded-[10px] p-4 card-section">
                        <label className="block font-['Space_Grotesk',sans-serif] text-[12px] text-white/70 font-medium">
                          Attach to Scene
                        </label>
                        <select
                          value={editSceneId === null ? '' : editSceneId}
                          onChange={(e) => setEditSceneId(e.target.value ? Number(e.target.value) : null)}
                          className="w-full bg-white/5 border border-white/20 rounded-[8px] px-3 py-2 font-['Space_Grotesk',sans-serif] text-[13px] text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer"
                        >
                          <option value="">No scene</option>
                          <optgroup label="Default Scenes">
                            {scenes.map((scene) => (
                              <option key={scene.id} value={scene.id}>
                                {scene.name}
                              </option>
                            ))}
                          </optgroup>
                          {customScenes.length > 0 && (
                            <optgroup label="Custom Scenes">
                              {customScenes.map((scene) => (
                                <option key={-scene.id} value={-scene.id}>
                                  {scene.name}
                                </option>
                              ))}
                            </optgroup>
                          )}
                        </select>
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => {
                              setEditingPlaylistId(null);
                              setEditSceneId(null);
                            }}
                            className="flex-1 bg-white/10 hover:bg-white/15 rounded-[8px] px-3 py-2 transition-all"
                          >
                            <span className="font-['Space_Grotesk',sans-serif] text-[13px] text-white font-medium">
                              Cancel
                            </span>
                          </button>
                          <button
                            onClick={() => handleSaveSceneAssignment(playlist.id)}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-[8px] px-3 py-2 transition-all"
                          >
                            <span className="font-['Space_Grotesk',sans-serif] text-[13px] font-medium text-white">
                              Save
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link2 className="size-3.5 text-white/40" strokeWidth={2} />
                        <span className="font-['Space_Grotesk',sans-serif] text-[12px] text-white/60">
                          {getSceneName(playlist.sceneId)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Playlists Section */}
        <div className="modal-gap-3">
          <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white">
            Featured Playlists
          </h3>
          <div className="modal-gap-3">
            {authorPlaylists.map((playlist, index) => (
              <a
                key={index}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-[16px] p-6 transition-all duration-200 group block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start flex-1 gap-3.5">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-[12px] size-10 flex items-center justify-center text-[18px] leading-none shrink-0">
                      {playlist.icon}
                    </div>
                    
                    <div className="flex flex-col flex-1 space-y-2.5">
                      <p className="font-['Space_Grotesk',sans-serif] font-semibold text-[15px] text-white">
                        {playlist.name}
                      </p>
                      <p className="font-['Space_Grotesk',sans-serif] text-[13px] text-white/60 leading-relaxed">
                        {playlist.description}
                      </p>
                      
                      <div className="flex items-center pt-1">
                        <div className="bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
                          <span className="font-['Space_Grotesk',sans-serif] font-medium text-[10px] text-white/70 uppercase tracking-wider">
                            {playlist.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ExternalLink className="size-4 text-white/40 group-hover:text-white/70 transition-colors duration-200 shrink-0" strokeWidth={2} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}