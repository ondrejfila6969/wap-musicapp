import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Library from "../Library/Library";
import Player from "../Player/Player";

export default function Layout() {
  useEffect(() => {
    console.log("Layout mounted");
    return () => console.log("Layout UNMOUNTED");
  }, []);

  return (
    <div className="text-white p-3 max-h-screen">
      <Header />
      <div className="grid grid-rows md:grid-cols-[75%_1fr] gap-4 max-h-[calc(screen-8rem)]">
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
