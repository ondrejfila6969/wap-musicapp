import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import "./PlaylistView.css";
import { usePlayer } from "../../context/PlayerContext";
import SongDropdown from "../../components/SongDropdown.jsx/SongDropdown";

export default function PlaylistView({ playlistID }) {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentSong, setQueue } = usePlayer();

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

    fetchAlbumAndSongs();
  }, [id]);

  if (loading) {
    return <p className="text-white p-4">Načítání alba...</p>;
  }

  if (!album) {
    return <p className="text-red-500 p-4">Album nebylo nalezeno.</p>;
  }

  return (
    <div className="playlView-wrapper space-y-6 overflow-y-auto h-[calc(96vh-6rem)]">
      {/* Informace o albu */}
      <div className="flex items-center gap-6 p-15 bg-stone-900 rounded-t-3xl">
        <img
          src={album.cover}
          alt={album.name}
          className="w-50 h-50 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{album.name}</h1>
          <Link to={`/profile/${album.username}`} className="text-white/70">
            {album.username}
          </Link>
          <p className="text-sm text-white/50 mt-2">
            {songs.length} song{songs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Seznam písniček */}
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 w-5">{index + 1}</span>
              <div>
                <p className="font-semibold">{song.songName}</p>
                <p className="text-white/60 text-sm">
                  <span className="font-bold">{song.artistName}</span>{" "}
                  {song.collabArtists && "ft. " + song.collabArtists}
                </p>
              </div>
              <SongDropdown songId={song._id} />
            </div>
            <span className="text-white/60 text-sm">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
