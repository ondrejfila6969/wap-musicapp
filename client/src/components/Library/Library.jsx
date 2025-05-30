import React, { useEffect, useState } from "react";
import LibraryHeader from "../LibraryHeader/LibraryHeader";
import LibraryPlaylist from "../LibraryPlaylist/LibraryPlaylist";
import api from "../../api"; // nebo axios.create instance
import { useNavigate } from "react-router-dom";
import "./Library.css";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await api.get("/playlist");
        setPlaylists(res.data.payload); // přizpůsob, pokud je struktura jiná
      } catch (err) {
        console.error("Chyba při načítání playlistů:", err);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="flex-1 sonus-bg-linear-gradient p-6 rounded-3xl flex flex-col overflow-hidden min-w-0 max-w-full">
      <LibraryHeader />
      <div className="mt-5 overflow-y-auto flex-1 pr-2 library-wrapper min-w-0 max-w-full">
        <div className="grid gap-4 grid-cols-1 2xl:grid-cols-2 auto-rows-auto min-w-0 max-w-full">
          {playlists.map((playlist) => (
            <LibraryPlaylist
              key={playlist._id}
              imageUrl={playlist.cover}
              title={playlist.name}
              onClick={() => navigate(`/playlist/${playlist._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
