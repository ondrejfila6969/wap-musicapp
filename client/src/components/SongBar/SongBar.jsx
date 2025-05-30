import React from "react";
import { Play } from "lucide-react";
import { Plus } from "lucide-react";

import { useState } from "react";

export default function SongBar({id, title, artist, duration}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
        <div
      className="flex items-center justify-between px-4 py-2 hover:bg-neutral-800 transition-colors text-white rounded-xl text-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 flex items-center justify-center text-white">
          {hovered ? <Play className="w-4 h-4 cursor-pointer" /> : <span>{id}</span>}
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-neutral-400 text-xs">{artist}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-neutral-400 text-xs ">
        {hovered && <Plus className="w-4 h-4 text-white cursor-pointer mr-2" />}
        <span>{duration}</span>
      </div>
    </div>

  );
}