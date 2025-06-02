import React from "react";
import { ListPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Library } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

export default function LibraryHeader() {
  const { user } = useAuth();
  
  return (
    <div className="flex justify-between">
      <div className="w-30 h-10 flex row text-xl items-center justify-center">
        <Library />
        <p className="ml-2">{user && user.isArtist ? "Albums" : "Playlists"}</p>
      </div>

      {user && user.isArtist && (
        <div className="w-10 h-10 cursor-pointer flex items-center justify-center">
          <Link to="/createAlbum">
            <ListPlus />
          </Link>
        </div>
      )}



    </div>
  );
}
