import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Library from "../Library/Library";
import Player from "../Player/Player";
import { PlayerProvider } from "../../context/PlayerContext";

export default function Layout() {
  return (
    <PlayerProvider>
      <div className="text-white p-4 grid h-screen">
        <Header />
        <div className="grid grid-rows md:grid-cols-[70%_1fr] gap-4">
          <div className="sonus-bg-linear-gradient rounded-3xl h-[calc(100vh-6rem)]">
            <Outlet />
          </div>
          <div className="flex flex-col gap-4 ">
            <Library />
            <Player
              albumArtUrl={"/albumCoverExample.png"}
              artist={"Jablotron"}
              title={"Dreams"}
              songLength={100}
            />
          </div>
        </div>
      </div>
    </PlayerProvider>
  );
}
