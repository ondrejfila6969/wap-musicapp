import React from "react";
import SongBar from "../../components/SongBar/SongBar";
import PlaylistHeader from "../../components/PlaylistHeader/PlaylistHeader";

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
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
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
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
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
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
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
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
  ];
   const playlist = { name: "sumerplaylist", creator:"standa "}
    
  

  return (
    <div className="text-white p-8">
      <div className="text-3xl overflow-y-auto space-y-2 h-[calc(96vh-6rem)]">
        <PlaylistHeader 
        name={playlist.name}
        creator={playlist.creator}
           />
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
