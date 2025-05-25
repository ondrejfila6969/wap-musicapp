import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";
import Library from "../Library/Library";
import Player from "../Player/Player";

export default function Layout() {
  return (
    <div className="text-white p-3 max-h-screen">
      <Header />
      <div className="grid grid-rows md:grid-cols-[75%_1fr] gap-4 max-h-[calc(screen-8rem)]">
        <MainContent />
        <div className="flex flex-col gap-4">
          <Library />
          <Player
            albumArtUrl={"albumCoverExample.png"}
            artist={"Jablotron"}
            title={"Dreams"}
          />
        </div>
      </div>
    </div>
  );
}
