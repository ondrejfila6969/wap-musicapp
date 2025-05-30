import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 w-full gap-4 flex-nowrap">
        <img className="h-10 flex-shrink-0" src="/logo.png" alt="Logo" />
        <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
          <Link to={"/"} className="flex-shrink-0">
            <House />
          </Link>
          <div className="flex-1 min-w-[100px] max-w-[400px]">
            <SearchBar />
          </div>
          <div className="flex-shrink-0">
            <UserMenu />
          </div>
        </div>
      </div>
    </>
  );
}
