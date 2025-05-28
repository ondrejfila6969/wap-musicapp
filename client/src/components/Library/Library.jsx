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
    <div className="flex-1 bg-gray-400 rounded-3xl sonus-bg-linear-gradient p-8 flex flex-col">
      <LibraryHeader />

      <div className="mt-5 overflow-y-scroll overflow-x-hidden flex-1 pr-2 library-wrapper">
        <div className="grid h-[200px] md:grid-cols-2 grid-cols-1 gap-4">
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
