import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import api from "../../api";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedData, setLoadedData] = useState({
    users: [],
    playlists: [],
    albums: [],
  });
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wrapperRef = useRef(null); // Ref na celý komponent

  // Vyhledávání
  useEffect(() => {
    const searching = setTimeout(async () => {
      if (searchTerm.trim()) {
        setLoading(true);
        try {
          const response = await api.get(`/search/mainSearch/${searchTerm}`);
          setLoadedData(response.data.payload);
          setIsDropdownOpen(true); // otevři při výsledcích
        } catch (err) {
          console.error(err || "Error while loading search results");
        } finally {
          setLoading(false);
        }
      } else {
        setLoadedData({ users: [], playlists: [], albums: [] });
        setIsDropdownOpen(false);
      }
    }, 300);

    return () => clearTimeout(searching);
  }, [searchTerm]);

  // Zavřít dropdown při kliknutí mimo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { users, playlists, albums, songs } = loadedData;

  return (
    <div
      ref={wrapperRef}
      className="relative p-2 h-10 rounded-full sonus-bg-linear-gradient flex items-center w-full max-w-xl"
    >
      <div className="w-full flex items-center px-2">
        <Search color="white" />
        <input
          type="text"
          placeholder="Invenire Sonus"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchTerm.trim()) setIsDropdownOpen(true);
          }}
          className="ml-2 bg-transparent outline-none text-sm text-white placeholder-white w-full"
        />
      </div>

      {/* Výsledky */}
      {!loading && searchTerm && isDropdownOpen && (
        <div className="absolute z-50 top-12 w-full bg-white/10 backdrop-blur-md rounded-xl text-white p-4 space-y-4 shadow-lg border border-white/20">
          {users.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Users</h3>
              {users.map((user) => (
                <Link to={`/${user.username}`} key={user._id}>
                  <div className="flex items-center gap-3 py-2 border-b border-white/10 hover:bg-white/10 rounded-md px-2 transition">
                    <div>{user.username}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

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
