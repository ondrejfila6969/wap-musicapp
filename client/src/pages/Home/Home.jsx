import React from "react";
import SongBar from "../../components/SongBar/SongBar";

export default function Home() {
  const songs = [
    { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { title: "Imagine", artist: "John Lennon", duration: "3:04" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
    { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { title: "Imagine", artist: "John Lennon", duration: "3:04" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
    { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { title: "Imagine", artist: "John Lennon", duration: "3:04" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
    { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { title: "Imagine", artist: "John Lennon", duration: "3:04" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" }
  ];

  return (
    <div className="text-white p-8">
      <div className="text-3xl h-full overflow-y-auto space-y-2 pr-2">
        {songs.map((song, index) => (
          <SongBar
            id={index + 1}
            key={index}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
          />
        ))}
      </div>
    </div>
  );
}
