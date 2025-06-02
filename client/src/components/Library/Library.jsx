import React, { useEffect, useState } from "react";
import LibraryHeader from "../LibraryHeader/LibraryHeader";
import LibraryPlaylist from "../LibraryPlaylist/LibraryPlaylist";
import api from "../../api"; // nebo axios.create instance
import { useNavigate } from "react-router-dom";
import "./Library.css";
import { useAuth } from "../../context/AuthProvider";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

    useEffect(() => {
      const fetchPlaylists = async () => {
        try {
          const res = await api.get(`/playlist/user/${user._id}`);
          setPlaylists(res.data.payload);
        } catch (err) {
          console.error("Chyba při načítání playlistů:", err);
        }
      };

      if (!isLoading && user) {
        fetchPlaylists();
        console.log(user._id)
      }
    
    }, [user, isLoading]);

  return (
    <div className="flex-1 bg-gray-400 rounded-3xl sonus-bg-linear-gradient p-8 flex flex-col">
      <LibraryHeader />

      <div className="mt-5 overflow-y-scroll overflow-x-auto flex-1 pr-2 library-wrapper">
        <div className="grid h-[200px] 2xl:grid-cols-2 md:grid-cols-1 auto-rows-auto gap-4">
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
