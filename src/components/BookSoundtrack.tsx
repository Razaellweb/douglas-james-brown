import { useState, useRef, useEffect } from "react";
import { Music, Play, Pause, Volume2, VolumeX, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookSoundtrackProps {
  trackTitle: string;
  trackUrl: string;
  coverImage?: string;
  bookTitle: string;
}

const BookSoundtrack = ({ trackTitle, trackUrl, coverImage, bookTitle }: BookSoundtrackProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number | null>(null);

  // Audio URL from Suno CDN (direct MP3)
  const getAudioSrc = () => {
    // Extract the song ID from the Suno URL
    if (trackUrl.includes('/song/')) {
      const songId = trackUrl.split('/song/')[1];
      return `https://cdn1.suno.ai/${songId}.mp3`;
    }
    if (trackUrl.includes('/s/')) {
      // For short URLs, we'll use the provided alternative
      return trackUrl;
    }
    return trackUrl;
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (!audioRef.current) {
      setIsLoading(true);
      const audio = new Audio(getAudioSrc());
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        setIsLoading(false);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      });

      audio.addEventListener('error', () => {
        setIsLoading(false);
        console.error('Failed to load audio');
      });
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    } else {
      try {
        await audio.play();
        progressInterval.current = window.setInterval(() => {
          if (audio) {
            setProgress((audio.currentTime / audio.duration) * 100);
          }
        }, 100);
      } catch (error) {
        console.error('Playback failed:', error);
      }
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Collapsed State - Floating Button */}
      <button
        onClick={() => setIsExpanded(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 group",
          "w-14 h-14 rounded-full",
          "bg-gradient-to-br from-accent via-primary to-accent",
          "shadow-lg hover:shadow-glow",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110",
          "border border-accent/50",
          isExpanded && "hidden"
        )}
        aria-label="Open soundtrack player"
      >
        <Music className="w-6 h-6 text-primary-foreground" />
        
        {/* Pulse animation when playing */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-accent/30 animate-pulse" />
          </>
        )}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-cormorant text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          🎵 Listen to {trackTitle}
        </span>
      </button>

      {/* Expanded Player */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-80 rounded-2xl overflow-hidden",
          "bg-card/95 backdrop-blur-xl border border-accent/30",
          "shadow-deep transition-all duration-300",
          !isExpanded && "opacity-0 pointer-events-none translate-y-4"
        )}
      >
        {/* Header */}
        <div className="relative h-24 overflow-hidden">
          {coverImage && (
            <img 
              src={coverImage} 
              alt={trackTitle}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
          
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-card/80 hover:bg-card transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <p className="font-cormorant text-xs text-accent uppercase tracking-wider">
              Official Soundtrack
            </p>
            <h4 className="font-cinzel text-lg font-bold text-foreground truncate">
              {trackTitle}
            </h4>
          </div>
        </div>

        {/* Player Controls */}
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-peacock rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-cormorant text-muted-foreground">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Volume2 className="w-5 h-5 text-accent" />
              )}
            </button>

            <Button
              onClick={handlePlayPause}
              disabled={isLoading}
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-peacock hover:shadow-glow p-0"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 text-primary-foreground" />
              ) : (
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              )}
            </Button>

            <a
              href={trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted/50 transition-colors group"
              title="Listen on Suno"
            >
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>

          {/* Attribution */}
          <p className="text-center font-cormorant text-xs text-muted-foreground">
            From "{bookTitle}" • Annals of Aeturnum
          </p>
        </div>
      </div>
    </>
  );
};

export default BookSoundtrack;
