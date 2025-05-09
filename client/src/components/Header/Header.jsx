import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <img className="h-12 ml-5" src="logo.png"></img>
        <div class="flex gap-4 items-center">
          <SearchBar />
          <UserMenu />
        </div>
      </div>
    </>
  );
}
