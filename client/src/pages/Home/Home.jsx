import React from "react";
import SongBar from "../../components/SongBar/SongBar";


export default function Home() {
  return (
    <div className="text-white p-8">
      <div className="text-3xl">
        <SongBar />
        <SongBar />
        <SongBar />
        <SongBar />
        <SongBar />
        <SongBar />
      </div>
    </div>
  );
}