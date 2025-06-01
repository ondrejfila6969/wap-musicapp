import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Library from "../Library/Library";
import Player from "../Player/Player";
import { PlayerProvider } from "../../context/PlayerContext";

export default function Layout() {
  return (
    <PlayerProvider>
      <div className="text-white p-4 min-h-screen flex flex-col gap-4 bg-black">
        <Header />

        <div className="grid gap-4 md:grid-cols-[2fr_1fr] flex-1">
          <div className="sonus-bg-linear-gradient rounded-3xl h-full overflow-hidden">
            <Outlet />
          </div>

          <div className="flex flex-col gap-4 min-h-0">
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
