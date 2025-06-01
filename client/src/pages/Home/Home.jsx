import React from "react";
import SongBar from "../../components/SongBar/SongBar";
import PlaylistHeader from "../../components/PlaylistHeader/PlaylistHeader";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/5 p-10 rounded-3xl max-w-2xl text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sonus</h1>
        <p className="text-lg leading-relaxed text-gray-300">
          Sonus is your ultimate destination for music exploration. Create
          albums, build your own playlists, discover new sounds, and enjoy a
          seamless listening experience. Whether you're an artist or a listener,
          Sonus gives you the tools to connect with music in a beautiful,
          personal way.
        </p>
        <div className="mt-6">
          <p className="text-sm text-gray-400">
            Start by exploring your library or searching for something new.
          </p>
        </div>
      </div>
    </div>
  );
}
