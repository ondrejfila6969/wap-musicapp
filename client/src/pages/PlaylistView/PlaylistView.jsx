import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./PlaylistView.css";
import { usePlayer } from "../../context/PlayerContext";
import { useAuth } from "../../context/AuthProvider";
import { Trash } from "lucide-react";

export default function PlaylistView({ playlistID }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser, loading: loadingUser, fetchUser } = useAuth();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentSong, setQueue } = usePlayer();
  const [newCover, setNewCover] = useState(null);

  const handleCoverUpload = async () => {
    if (!newCover) return;
    try {
      const formData = new FormData();
      formData.append("playlistCoverFile", newCover);
      await api.post(`/playlist/uploadPlaylistCover/${id}`, formData);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update album cover:", err);
    }
  };

  useEffect(() => {
    if (!loggedInUser && !loadingUser) {
      fetchUser();
    }
  }, [loggedInUser, loadingUser, fetchUser]);

  useEffect(() => {
    const fetchAlbumAndSongs = async () => {
      try {
        setLoading(true);
        const albumRes = await api.get(`/playlist/${id}`);
        const albumData = albumRes.data.payload;
        setAlbum(albumData);
        const songPromises = albumData.songs.map((songId) =>
          api.get(`/song/${songId}`)
        );
        const songResponses = await Promise.all(songPromises);
        const songData = songResponses.map((res) => res.data.payload);
        setSongs(songData);
      } catch (err) {
        console.error("Chyba při načítání alba nebo písní:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlbumAndSongs();
    }
  }, [id]);

  const handleDeleteSong = async (e, songId) => {
    e.stopPropagation();
    try {
      await api.delete(`/song/${songId}`);
      setSongs((prevSongs) => prevSongs.filter((s) => s._id !== songId));
    } catch (err) {
      console.error("Failed to delete song:", err);
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      await api.delete(`/playlist/${id}`);
      navigate("/profile/" + loggedInUser.username);
    } catch (err) {
      console.error("Failed to delete playlist:", err);
    }
  };

  if (loading || loadingUser || !loggedInUser) {
    return <p className="text-white p-4">Načítání alba...</p>;
  }

  if (!album) {
    return <p className="text-red-500 p-4">Album nebylo nalezeno.</p>;
  }

  return (
    <div className="playlView-wrapper space-y-6 overflow-y-auto h-[calc(96vh-6rem)]">
      <div className="flex items-center gap-6 p-15 bg-stone-900 rounded-t-3xl">
        <img
          src={album.cover}
          alt={album.name}
          className="w-50 h-50 object-cover rounded-lg shadow-lg"
        />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold mb-3">{album.name}</h1>
          </div>
          <Link to={`/profile/${album.username}`} className="text-white/70 hover:underline">
            {album.username}
          </Link>
          <p className="text-sm text-white/50 mt-2">
            {songs.length} song{songs.length !== 1 ? "s" : ""}
          </p>
          {album.userId === loggedInUser._id && (
            <div className="flex flex-col">
              <input
                type="file"
                accept="image/*"
                name="playlistCoverFile"
                onChange={(e) => setNewCover(e.target.files[0])}
                className="bg-black hover:bg-black/30 text-white px-4 py-2 rounded-xl mt-2 w-full sm:w-auto flex items-center justify-center gap-2"
              />
              <div className="flex gap-10 mt-4 flex-row">
                <button
                  onClick={handleCoverUpload}
                  className="bg-black hover:bg-black/30 text-white px-4 py-2 rounded-xl cursor-pointer"
                >
                  Upload New Cover
                </button>
                <button
                  onClick={handleDeletePlaylist}
                  className="bg-black hover:bg-black/30 text-white px-4 py-2 rounded-xl w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Trash size={18} />
                  Delete Album
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 p-4">
        {songs.map((song, index) => (
          <div
            key={song._id}
            className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition cursor-pointer"
            onClick={() => {
              const queueSlice = songs.slice(index + 1);

              setCurrentSong({
                url: song.songSrc,
                title: song.songName,
                artist: song.artistName,
                cover: song.cover || album.cover,
                duration: song.duration,
              });

              setQueue(
                queueSlice.map((s) => ({
                  url: s.songSrc,
                  title: s.songName,
                  artist: s.artistName,
                  cover: s.cover || album.cover,
                  duration: s.duration,
                }))
              );
            }}
          >
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/60 w-5">{index + 1}</span>
                <div>
                  <p className="font-semibold">{song.songName}</p>
                  <p className="text-white/60 text-sm">
                    <span className="font-bold">{song.artistName}</span>{" "}
                    {song.collabArtists && `ft. ${song.collabArtists}`}
                  </p>
                </div>
              </div>
              {album.userId === loggedInUser._id && (
                <button
                  onClick={(e) => handleDeleteSong(e, song._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
