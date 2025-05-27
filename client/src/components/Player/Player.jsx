import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import "./Player.css";

export default function Player({ albumArtUrl, title, artist, songLength }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [avgColor, setAvgColor] = useState("#000000");
  const soundRef = useRef(null);

  useEffect(() => {
    const fac = new FastAverageColor();
    fac.getColorAsync(albumArtUrl).then((color) => {
      setAvgColor(color.hex);
    });
  }, [albumArtUrl]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: ["http://localhost:3000/songs/1.mp3"],
      html5: true,
      onload: () => {
      },
    });

    soundRef.current = sound;

    return () => {
      sound.stop();
      sound.unload();
    };
  }, []);

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

  return (
    <div
      className="bg-gray-400 rounded-3xl items-center p-3 h-50 flex gap-4 font-body"
      style={{ background: `linear-gradient(to top, #080808, ${avgColor})` }}
    >
      <div
        className={`w-32 h-32 relative ${isPlaying ? "rotating" : "rotating paused"}`}
      >
        <img
          src={"/vinyl.png"}
          alt="Vinyl"
          className="absolute w-full h-full object-contain"
        />
        <img
          src={albumArtUrl}
          alt="Album"
          className="absolute top-1/2 left-1/2 w-18 h-18 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="flex flex-col flex-1 text-white font-doto">
        <div>
          <h2 className="text-2xl">{title}</h2>
          <p className="text-lm">{artist}</p>
        </div>

        <input
          type="range"
          step="1"
          max={songLength}
          className="w-full my-2 accent-gray-500 cursor-pointer"
        />

        <div className="flex justify-center gap-6 mt-1">
          <SkipBack cursor={"pointer"} />
          <button onClick={togglePlayback}>
            {isPlaying ? <Pause cursor={"pointer"} /> : <Play cursor={"pointer"} />}
          </button>
          <SkipForward cursor={"pointer"} />
        </div>
      </div>
    </div>
  );
}