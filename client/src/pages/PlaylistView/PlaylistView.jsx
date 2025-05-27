import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // nebo axios přímo

export default function PlaylistView({playlistID}) {
  const { id } = useParams(); // album ID z URL
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumAndSongs = async () => {
      try {
        setLoading(true);

        // Získání alba
        const albumRes = await api.get(`/playlist/${id}`);
        const albumData = albumRes.data.payload;
        setAlbum(albumData);

        // Získání všech písniček podle ID
        console.log(albumData)
        const songPromises = albumData.songs.map((songId) =>
          api.get(`/song/${songId}`)
        );
        console.log("after")
        const songResponses = await Promise.all(songPromises);
        console.log("Song responses:", songResponses);
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
    <div className="p-6 text-white space-y-6">
      {/* Informace o albu */}
      <div className="flex items-center gap-6">
        <img
          src={album.cover}
          alt={album.name}
          className="w-40 h-40 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{album.name}</h1>
          <p className="text-white/70">{album.artistName}</p>
          <p className="text-sm text-white/50 mt-2">
            {songs.length} song{songs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Seznam písniček */}
      <div className="space-y-2">
        {songs.map((song, index) => (
          <div
            key={song._id}
            className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 w-5">{index + 1}</span>
              <div>
                <p className="font-semibold">{song.songName}</p>
                <p className="text-white/60 text-sm">{song.artistName}</p>
              </div>
            </div>
            <span className="text-white/60 text-sm">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
