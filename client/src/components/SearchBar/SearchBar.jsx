import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import api from "../../api";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedData, setLoadedData] = useState({
    users: [],
    playlists: [],
    albums: [],
    songs: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searching = setTimeout(async () => {
      if (searchTerm.trim()) {
        setLoading(true);
        try {
          const response = await api.get(`/search/mainSearch/${searchTerm}`);
          setLoadedData(response.data.payload);
        } catch (err) {
          console.error(err || "Error while loading search results");
        } finally {
          setLoading(false);
        }
      } else {
        setLoadedData({ users: [], playlists: [], albums: [], songs: [] });
      }
    }, 300);

    return () => clearTimeout(searching);
  }, [searchTerm]);

  const { users, playlists, albums, songs } = loadedData;

  return (
    <div className="w-xl p-2 h-10 rounded-full sonus-bg-linear-gradient flex items-center">
      <div className="w-full max-w-xl p-2 h-10 rounded-full sonus-bg-linear-gradient flex items-center">
        <Search color="white" />
        <input
          type="text"
          placeholder="Invenire Sonus"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-2 bg-transparent outline-none text-sm text-white placeholder-white w-full"
        />
      </div>

      {/* Results */}
      {!loading && searchTerm && (
        <div className="absolute z-50 top-12 w-full max-w-xl bg-white/10 backdrop-blur-md rounded-xl text-white p-4 space-y-4 shadow-lg border border-white/20">
          {/* USERS */}
          {users.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Users</h3>
              {users.map((user) => (
                <Link to={`/${user.userName}`} key={user._id}>
                  <div className="flex items-center gap-3 py-2 border-b border-white/10 hover:bg-white/10 rounded-md px-2 transition">
                    <img
                      src={user.pfpSrc}
                      alt={`${user.displayName}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{user.displayName}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* PLAYLISTS */}
          {playlists.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Playlists</h3>
              {playlists.map((pl) => (
                <Link to={`/playlist/${pl._id}`} key={pl._id}>
                  <div className="py-2 px-2 border-b border-white/10 hover:bg-white/10 rounded-md transition">
                    {pl.name}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ALBUMS */}
          {albums.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">💿 Albums</h3>
              {albums.map((pl) => (
                <Link to={`/playlist/${pl._id}`} key={pl._id}>
                  <div className="py-2 px-2 border-b border-white/10 hover:bg-white/10 rounded-md transition">
                    {pl.name}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* SONGS */}
          {songs.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">🎶 Songs</h3>
              {songs.map((song) => (
                <Link to={`/song/${song._id}`} key={song._id}>
                  <div className="py-2 px-2 border-b border-white/10 hover:bg-white/10 rounded-md transition">
                    {song.songName} by {song.artistName}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {users.length === 0 &&
            playlists.length === 0 &&
            albums.length === 0 &&
            songs.length === 0 && (
              <p className="text-white/70 text-sm">No results found.</p>
            )}
        </div>
      )}
    </div>
  );
}
