import React, { useState, useEffect } from 'react';
import { ModalShell } from './ui/ModalShell';
import { ImagePlus, Link, Upload } from 'lucide-react';

interface ChangeSceneModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: {
    name: string;
    wallpaper: string;
    musicUrl?: string;
    playlist?: Array<{ title: string; artist: string }>;
  };
  onChangeScene: (scene: {
    imageUrl: string;
    musicUrl: string;
    artistName: string;
    trackTitle: string;
  }) => void;
}

// Compress uploaded images before saving
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const maxW = 1920;
      const maxH = 1080;

      let { width, height } = img;

      if (width > maxW || height > maxH) {
        const ratio = Math.min(maxW / width, maxH / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      const compressed = canvas.toDataURL('image/jpeg', 0.75);
      resolve(compressed);
    };

    img.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function ChangeSceneModal({ isOpen, onClose, currentScene, onChangeScene }: ChangeSceneModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [imageSource, setImageSource] = useState<'url' | 'upload'>('url');
  const [musicUrl, setMusicUrl] = useState('');
  const [artistName, setArtistName] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [hasUploadedNewImage, setHasUploadedNewImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form fields ONLY when modal first opens, not when currentScene changes
      setImageUrl(currentScene.wallpaper || '');
      setMusicUrl(currentScene.musicUrl || '');
      setTrackTitle(currentScene.playlist?.[0]?.title || '');
      setArtistName(currentScene.playlist?.[0]?.artist || '');
      setHasUploadedNewImage(false);
      setUploadError('');
    }
  }, [isOpen]); // ✅ FIXED: Only reset when modal opens, not when currentScene changes

  // File upload handler with compression + size limit
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hard file-size rule (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image too large. Max allowed size is 5MB.');
      return;
    }

    setUploadError('');

    try {
      const compressed = await compressImage(file);
      setImageUrl(compressed);
      setHasUploadedNewImage(true);
    } catch {
      setUploadError('Failed to process image. Try another file.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl.trim() || !musicUrl.trim()) return;

    onChangeScene({
      imageUrl: imageUrl.trim(),
      musicUrl: musicUrl.trim(),
      artistName: artistName.trim() || 'Unknown Artist',
      trackTitle: trackTitle.trim() || 'Lofi Beats',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalShell
      title={`Change Scene: ${currentScene.name}`}
      description="Upload or link an image to change the scene background"
      onClose={onClose}
    >
      <form id="change-scene-form" onSubmit={handleSubmit}>
        <div className="modal-gap-6">

          {/* Image Source */}
          <div className="modal-gap-3">
            <label className="font-['Space_Grotesk'] text-[13px] font-semibold text-white/70">
              Background Image
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setImageSource('url')}
                className={`flex-1 px-4 py-3 rounded-[12px] border transition-all ${
                  imageSource === 'url'
                    ? 'bg-white/15 border-white/30 text-white'
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Link className="size-4" strokeWidth={2} />
                  <span className="font-['Space_Grotesk'] text-[13px] font-medium">Image URL</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setImageSource('upload')}
                className={`flex-1 px-4 py-3 rounded-[12px] border transition-all ${
                  imageSource === 'upload'
                    ? 'bg-white/15 border-white/30 text-white'
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Upload className="size-4" strokeWidth={2} />
                  <span className="font-['Space_Grotesk'] text-[13px] font-medium">Upload File</span>
                </div>
              </button>
            </div>

            {/* URL Input */}
            {imageSource === 'url' && (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/scene.jpg"
                className="w-full px-4 py-3 rounded-[12px] bg-white/5 border border-white/20 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
              />
            )}

            {/* Upload Input */}
            {imageSource === 'upload' && (
              <label className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 rounded-[12px] px-4 py-3 cursor-pointer transition-all">
                <ImagePlus className="size-[18px] text-white/60" strokeWidth={2} />
                <span className="font-['Space_Grotesk'] text-[14px] text-white/60">
                  {hasUploadedNewImage ? 'Image uploaded ✓' : 'Choose a file (max 5MB)'}
                </span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}

            {uploadError && (
              <p className="font-['Space_Grotesk'] text-[12px] text-red-400">{uploadError}</p>
            )}
          </div>

          {/* Music Details Section */}
          <div className="modal-gap-3">
            <label className="font-['Space_Grotesk'] text-[13px] font-semibold text-white/70">
              Music Details
            </label>
            
            <div className="modal-gap-3">
              <div className="field-group">
                <label className="font-['Space_Grotesk'] text-[13px] text-white/70">
                  Music Stream URL *
                </label>
                <input
                  type="url"
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  placeholder="https://example.com/lofi-stream.mp3"
                  className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk'] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
                <p className="font-['Space_Grotesk'] text-[12px] text-white/50">
                  Direct link to audio stream (MP3, OGG, etc.)
                </p>
              </div>

              <div className="field-group">
                <label className="font-['Space_Grotesk'] text-[13px] text-white/70">
                  Track Title (Optional)
                </label>
                <input
                  type="text"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  placeholder="e.g., Summer Vibes"
                  className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk'] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  maxLength={50}
                />
              </div>

              <div className="field-group">
                <label className="font-['Space_Grotesk'] text-[13px] text-white/70">
                  Artist Name (Optional)
                </label>
                <input
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="e.g., Lofi Dreams"
                  className="w-full bg-white/5 border border-white/20 rounded-[12px] px-4 py-3 font-['Space_Grotesk'] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  maxLength={50}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="modal-gap-3">
              <label className="font-['Space_Grotesk'] text-[13px] font-semibold text-white/70">
                Preview
              </label>
              <div
                className="w-full h-32 rounded-[12px] bg-cover bg-center border border-white/20"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[999px] bg-white/6 hover:bg-white/10 px-4 py-3 font-['Space_Grotesk'] text-[14px] font-medium text-white border border-white/15 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!imageUrl.trim() || !musicUrl.trim()}
                className="flex-1 rounded-[999px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed px-4 py-3 font-['Space_Grotesk'] text-[14px] font-medium text-white transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}