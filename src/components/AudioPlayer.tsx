import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface AudioPlayerProps {
  petalsActive: boolean;
  onTogglePetals: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ petalsActive, onTogglePetals }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.35);

  const togglePlayback = () => {
    const newState = romanticAudio.toggleMusic((playing) => setIsPlaying(playing));
    setIsPlaying(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  useEffect(() => {
    return () => {
      romanticAudio.stopMusic();
    };
  }, []);

  return (
    <aside 
      aria-label="Background music and petal controls" 
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2"
    >
      {/* Rose Petals Toggle */}
      <button
        onClick={onTogglePetals}
        title={petalsActive ? 'Disable falling petals' : 'Enable falling rose petals'}
        aria-label={petalsActive ? 'Disable falling petals' : 'Enable falling rose petals'}
        className={`min-w-[44px] min-h-[44px] p-2.5 rounded-full transition-all duration-300 shadow-md backdrop-blur-md flex items-center justify-center cursor-pointer ${
          petalsActive
            ? 'bg-[#FAD2C0]/90 text-[#8C4A3A] border border-[#F8B1A5]'
            : 'bg-white/80 text-[#8C827A] border border-[#E8E2D8] hover:text-[#383431]'
        }`}
      >
        <Sparkles className={`w-4 h-4 ${petalsActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
      </button>

      {/* Floating Music Widget */}
      <div
        className="relative flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-[#E8E2D8] p-1.5 transition-all"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause music' : 'Play Dolce Vita melody'}
          className={`min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full text-xs tracking-wider uppercase transition-all font-outfit font-semibold cursor-pointer ${
            isPlaying
              ? 'bg-[#B9DEEF] text-[#1B365D] shadow-sm'
              : 'bg-[#FAF7F2] text-[#6E665E] hover:bg-[#F2ECE1]'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-[#1B365D]' : ''}`} />
          <span className="hidden sm:inline">
            {isPlaying ? 'Music: Playing' : 'Play Music'}
          </span>
          {isPlaying && (
            <div className="flex items-center gap-0.5 ml-1">
              <span className="w-1 h-3 bg-[#1B365D] rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-[#1B365D] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-[#1B365D] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </button>

        {/* Volume slider on hover or active */}
        {showVolume && isPlaying && (
          <div className="flex items-center px-2 py-1 gap-2 animate-fadeIn">
            {volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-[#8C827A]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#1B365D]" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-[#4A90B8] cursor-pointer"
              aria-label="Volume slider"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
