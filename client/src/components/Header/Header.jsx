import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <img className="h-12 ml-5" src="/logo.png"></img>
        <div className="flex gap-4 items-center">
          <Link to={"/"}>
            <House />
          </Link>
          <SearchBar />
          <UserMenu />
        </div>
      </div>
    </>
  );
}
