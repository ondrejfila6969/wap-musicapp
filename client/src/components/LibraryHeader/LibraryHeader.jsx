import React from "react";
import { ListPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Library } from "lucide-react";

export default function LibraryHeader() {
  return (
    <div className="flex justify-between">
      <div className="w-30 h-10 flex row text-xl items-center justify-center">
        <Library />
        <p className="ml-2">Library</p>
      </div>
      <div className="w-10 h-10 cursor-pointer flex items-center justify-center">
        <Link to={"/createPlaylist"}>
          <ListPlus />
        </Link>
      </div>
    </div>
  );
}
