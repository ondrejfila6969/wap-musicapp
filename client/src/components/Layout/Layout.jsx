import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Library from "../Library/Library";
import Player from "../Player/Player";

export default function Layout() {
  return (
    <div className="md:min-h-screen text-white p-4 grid h-screen">
      <Header />
      <div className="grid grid-rows md:grid-cols-[75%_1fr] gap-4 h-[calc(100vh-6rem)]">
        <div className="sonus-bg-linear-gradient rounded-3xl">
          <Outlet />
        </div>
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
