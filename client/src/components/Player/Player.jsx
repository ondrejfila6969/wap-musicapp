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
      className="bg-gray-400 rounded-3xl items-center p-3 h-50 flex flex-wrap gap-4 font-body min-w-0"
      style={{ background: `linear-gradient(to top, #080808, ${avgColor})` }}
    >
      <div
        className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32"
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
          className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-18 sm:h-18 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="flex flex-col flex-1 text-white min-w-0">
        <div>
          <h2 className="text-xl sm:text-2xl truncate">{currentSong.title}</h2>
          <p className="text-sm sm:text-lm truncate">{currentSong.artist}</p>
        </div>

        <div className="flex items-center justify-between w-full text-xs sm:text-sm text-white px-1">
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
          className="w-full my-1 accent-gray-500 cursor-pointer"
        />

        <div className="flex justify-center gap-4 sm:gap-6 mt-1 flex-wrap">
          <SkipBack cursor={"pointer"} onClick={handleSkipBack} />
          <button onClick={togglePlayback} className="flex-shrink-0">
            {isPlaying ? (
              <Pause cursor={"pointer"} />
            ) : (
              <Play cursor={"pointer"} />
            )}
          </button>
          <SkipForward cursor={"pointer"} onClick={handleSkipForward} />
        </div>
      </div>
    </div>
  );
}
