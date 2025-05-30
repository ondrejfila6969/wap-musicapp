import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Library from "../Library/Library";
import Player from "../Player/Player";
import { PlayerProvider } from "../../context/PlayerContext";

export default function Layout() {
  return (
    <PlayerProvider>
      <div className="text-white p-4 min-h-screen grid grid-rows-[auto_1fr] gap-4 overflow-hidden">
        <Header />
        <div className="grid grid-rows-[auto_auto] md:grid-rows-1 md:grid-cols-[60%_40%] gap-4 h-full overflow-hidden min-w-0 max-w-full">
          <div className="sonus-bg-linear-gradient rounded-3xl overflow-auto min-w-0 max-w-full h-[400px] md:h-auto">
            <Outlet />
          </div>
          <div className="flex flex-col gap-4 min-w-0 max-w-full h-[600px] md:h-auto overflow-hidden">
            <Library className="flex-grow min-w-0 max-w-full overflow-hidden rounded-3xl sonus-bg-linear-gradient p-6 flex flex-col" />
            <Player
              albumArtUrl={"/albumCoverExample.png"}
              artist={"Jablotron"}
              title={"Dreams"}
              songLength={100}
              className="mt-4 flex-shrink-0 min-w-0 max-w-full"
            />
          </div>
        </div>
      </div>
    </PlayerProvider>
  );
}
