import React, { useEffect, useState } from "react";
import api from "../../api";
import { useAuth } from "../../context/AuthProvider";

export default function SongDropdown({ songId }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Make sure user ID is accessible

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        console.log(user._id);
        const res = await api.get(`/playlist/user/${user._id}`); // Adjust route as needed
        setPlaylists(res.data.payload || []);
      } catch (err) {
        console.error("Error loading playlists:", err);
      } finally {
        setLoading(false);
      }
    };

    if (showDropdown) {
      fetchPlaylists();
    }
  }, [showDropdown, user]);

  const handleAddToPlaylist = async (playlistId) => {
    try {
      console.log("lol");
      await api.put(`/playlist/addSong/${playlistId}/${songId}`);
      alert("Song added to playlist!");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong while adding the song.";
      alert(message);
    }
  };

  const handleCreateNewPlaylist = async () => {
    const name = prompt("Enter new playlist name:");
    if (!name || !user?._id) return;
    try {
      const res = await api.post(`/playlist/createPlaylist/${user._id}`, {
        albumName: name,
      });
      setPlaylists((prev) => [...prev, res.data.payload]);
    } catch (err) {
      console.error("Failed to create playlist:", err);
      alert("Failed to create playlist");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        Add to Playlist
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {loading ? (
            <p className="p-4 text-gray-500">Loading playlists...</p>
          ) : (
            <>
              {playlists.slice(0, 50).map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => handleAddToPlaylist(playlist._id)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {playlist.name}
                </div>
              ))}
            </>
          )}
          <div className="border-t border-gray-200">
            <button
              onClick={handleCreateNewPlaylist}
              className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
            >
              + Create New Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}