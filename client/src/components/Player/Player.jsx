import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import { usePlayer } from "../../context/PlayerContext";
import { useSettings } from "../../context/SettingsContext";

export default function Player() {
  const {
    currentSong,
    setCurrentSong,
    soundRef,
    queue,
    setQueue,
    history,
    setHistory,
  } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [avgColor, setAvgColor] = useState("#000000");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rotation, setRotation] = useState(0);
  const { settings } = useSettings();

  function loadLastPlayedSong() {
    const saved = localStorage.getItem("lastPlayedSong");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentSong(parsed);
    }
  }

  useEffect(() => {
    if (!currentSong?.cover) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(currentSong.cover).then((color) => {
      setAvgColor(color.hex);
    });
  }, [currentSong?.cover]);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("lastPlayedSong", JSON.stringify(currentSong));
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong) {
      loadLastPlayedSong();
    }
  }, []);

  useEffect(() => {
    if (!currentSong?.url) return;

    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [currentSong.url],
      html5: true,
      volume: settings.volume,
      rate: settings.playbackRate,
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);

        if (queue.length > 0) {
          const next = queue[0];
          setHistory((prev) => [...prev, currentSong]);
          setCurrentSong(next);
          setQueue(queue.slice(1));
        }
      },
    });

    sound.once("load", () => {
      setDuration(sound.duration());
    });

    soundRef.current = sound;
    sound.play();
    setIsPlaying(true);

    const interval = setInterval(() => {
      if (sound.playing()) {
        const current = sound.seek();
        setCurrentTime(current);
        setRotation(current * 20); // rychlost otáčení
      }
    }, 500);

    return () => {
      clearInterval(interval);
      sound.stop();
      sound.unload();
    };
  }, [currentSong, settings]);

  const handleSkipForward = () => {
    if (queue.length > 0) {
      setHistory((prev) => [...prev, currentSong]);
      setCurrentSong(queue[0]);
      setQueue(queue.slice(1));
    }
  };

  const handleSkipBack = () => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setQueue((prev) => [currentSong, ...prev]);
      setCurrentSong(previous);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const togglePlayback = () => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    soundRef.current.seek(seekTime);
    setCurrentTime(seekTime);
    setRotation(seekTime * 20);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!currentSong) return null;

  return (
    <div
      className="bg-gray-800 rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg"
      style={{ background: `linear-gradient(to top, #080808, ${avgColor})` }}
    >
      <div
        className="w-32 h-32 relative flex-shrink-0"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isPlaying ? "transform 0.5s linear" : "none",
        }}
      >
        <img
          src="/vinyl.png"
          alt="Vinyl"
          className="absolute w-full h-full object-contain"
        />
        <img
          src={currentSong.cover}
          alt="Album"
          className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="flex flex-col flex-1 text-white w-full">
        <div className="mb-1">
          <h2 className="text-xl font-semibold">{currentSong.title}</h2>
          <p className="text-sm text-gray-300">{currentSong.artist}</p>
        </div>

        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          step="0.1"
          className="w-full accent-gray-500 cursor-pointer"
        />

        <div className="flex justify-center gap-6 mt-2">
          <SkipBack className="cursor-pointer" onClick={handleSkipBack} />
          <button onClick={togglePlayback}>
            {isPlaying ? (
              <Pause className="cursor-pointer" />
            ) : (
              <Play className="cursor-pointer" />
            )}
          </button>
          <SkipForward className="cursor-pointer" onClick={handleSkipForward} />
        </div>
      </div>
    </div>
  );
}
