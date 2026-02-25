import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Download, Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import aeturnumCallsCover from "@/assets/aeturnum-calls-cover.jpg";

const MusicSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackUrl = "https://cdn1.suno.ai/274d9c1c-5e69-42f6-8864-4244bcfeb58a.mp3";
  const sunoPageUrl = "https://suno.com/song/274d9c1c-5e69-42f6-8864-4244bcfeb58a";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * audio.duration;
    
    audio.currentTime = newTime;
    setProgress(newProgress);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDownload = () => {
    window.open(sunoPageUrl, "_blank");
  };

  return (
    <section id="music" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Music className="w-6 h-6 text-accent" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground">
            Original <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Soundtrack</span>
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the world of Aeturnum with original music inspired by the epic saga
          </p>
        </div>

        {/* Music player card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Album cover */}
                <div className="relative md:w-80 flex-shrink-0">
                  <div className="aspect-square md:aspect-auto md:h-full relative overflow-hidden">
                    <img
                      src={aeturnumCallsCover}
                      alt="Aeturnum Calls - We Rise Again"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 md:opacity-0 md:bg-gradient-to-r" />
                    
                    {/* Play button overlay on mobile */}
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center md:hidden"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-glow transition-transform duration-300 hover:scale-110 active:scale-95">
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-primary-foreground" />
                        ) : (
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Player controls */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center space-y-6">
                  {/* Track info */}
                  <div className="space-y-2">
                    <p className="font-cormorant text-sm text-accent uppercase tracking-widest">
                      Music of the Annals of Aeturnum Series
                    </p>
                    <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-foreground">
                      When Aeturnum Calls
                    </h3>
                    <p className="font-cormorant text-lg text-muted-foreground italic">
                      We Rise Again
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div
                      className="h-2 bg-muted/50 rounded-full cursor-pointer group/progress overflow-hidden"
                      onClick={handleProgressClick}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-gold opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground font-cormorant">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-primary-foreground" />
                        ) : (
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        )}
                      </button>

                      {/* Volume */}
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="font-cinzel text-xs gap-2 border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                      <Button
                        onClick={() => window.open(sunoPageUrl, "_blank")}
                        variant="ghost"
                        size="sm"
                        className="font-cinzel text-xs gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Suno</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={trackUrl} preload="metadata" />
      </div>
    </section>
  );
};

export default MusicSection;
