import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import "./Player.css"

export default function MusicPlayer({ albumArtUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [avgColor, setAvgColor] = useState("#000000");

  useEffect(() => {
    const fac = new FastAverageColor();
    fac.getColorAsync(albumArtUrl).then(color => {
      setAvgColor(color.hex);
    });
  }, [albumArtUrl]);

  return (
    <div
      className="flex mt-10 items-center gap-4 p-6 rounded-2xl w-xl"
      style={{ background: `linear-gradient(to top, ${avgColor}, #111)` }}
    >
      <div
        className={`w-32 h-32 relative ${isPlaying ? "rotating" : "rotating paused"}`}
      >
        <img
          src={"vinyl.png"}
          alt="Vinyl"
          className="absolute w-full h-full object-contain"
        />

        <img
          src={albumArtUrl}
          alt="Album"
          className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="flex flex-col flex-1 text-white">
        <div>
          <h2 className="text-xl font-semibold">Jablotron</h2>
          <p className="text-sm opacity-80">Dreams</p>
        </div>

        <input type="range" className="w-full my-2" />

        <div className="flex justify-center gap-6 mt-1">
          <SkipBack />
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SkipForward />
        </div>
      </div>
    </div>
  );
}
