import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, ExternalLink } from "lucide-react";
import kensLoveSongCover from "@/assets/kens-love-song-cover.jpg";

const KenLoveSong = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackUrl = "https://cdn1.suno.ai/a8265a63-e95b-4180-88ea-765ea60a0b29.mp3";
  const sunoPageUrl = "https://suno.com/song/a8265a63-e95b-4180-88ea-765ea60a0b29";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative group">
      {/* Soft romantic glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/20 via-pink-500/10 to-accent/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      <div className="relative bg-card/80 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-5 overflow-hidden">
        {/* Decorative heart accent */}
        <div className="absolute top-3 right-3">
          <Heart className="w-4 h-4 text-rose-400/60 fill-rose-400/30" />
        </div>

        <div className="flex items-center gap-4">
          {/* Album cover with play overlay */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg ring-2 ring-rose-500/20">
              <img
                src={kensLoveSongCover}
                alt="Aeturnum Calls - For Ken"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Play button overlay */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/90 flex items-center justify-center shadow-lg">
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </div>
            </button>
          </div>

          {/* Track info and controls */}
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <p className="font-cormorant text-xs text-rose-400 uppercase tracking-widest">
                A Love Song
              </p>
              <h4 className="font-cinzel text-sm font-bold text-foreground truncate">
                For Ken
              </h4>
              <p className="font-cormorant text-xs text-muted-foreground italic">
                From the Heart of Aeturnum
              </p>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-rose-400" />
                  )}
                </button>
              </div>

              <a
                href={sunoPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-muted/50 transition-colors group/link"
                title="Listen on Suno"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/link:text-rose-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={trackUrl} preload="metadata" />
      </div>
    </div>
  );
};

export default KenLoveSong;
