import { useState } from "react";
import axios from "axios";
import api from "../../api";

export default function CreateAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [albumCover, setAlbumCover] = useState(null);
  const [songs, setSongs] = useState([]);

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    const albumFormData = new FormData();
    albumFormData.append("albumName", albumName);
    albumFormData.append("albumCoverFile", albumCover);

    try {
      console.log("before album");
      const res = await api.post(`/playlist/createAlbum/1`, albumFormData);
      console.log("after album");
      const albumId = res.data.payload._id;

      console.log("next are songs");

      for (const song of songs) {
        const songFormData = new FormData();
        songFormData.append("songName", song.songName);
        songFormData.append("collabArtists", song.collabArtists);
        songFormData.append("yearOfRelease", releaseYear);
        songFormData.append("songFile", song.songFile);
        songFormData.append("albumId", albumId);

        console.log("before upload");
        await api.post(`/song/create/1/${albumId}`, songFormData);
        console.log("after upload");
      }

      alert("Album and songs uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading album or songs");
    }
  };

  const addNewSongForm = () => {
    setSongs([
      ...songs,
      {
        songName: "",
        collabArtists: "",
        songFile: null,
      },
    ]);
  };

  const updateSongField = (index, field, value) => {
    const updatedSongs = [...songs];
    updatedSongs[index][field] = value;
    setSongs(updatedSongs);
  };

  const isFormValid =
    albumName.trim() !== "" &&
    songs.length > 0 &&
    songs.every(
      (song) => song.songName.trim() !== "" && song.songFile !== null
    );

  const removeSong = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    setSongs(updatedSongs);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;

    // Allow empty string for typing
    if (value === "") {
      setReleaseYear("");
      return;
    }

    const numValue = Number(value);

    // Accept values only from 0 to 2025
    if (numValue >= 0 && numValue <= 2025) {
      setReleaseYear(value);
    }
  };
  return (
    <div>
      <div className="p-15 bg-stone-900 rounded-t-3xl">
        <div className="flex flex-row">
          <input
            type="file"
            name="albumCoverFile"
            className="bg-red-500 h-50 w-50 rounded-xl"
            onChange={(e) => setAlbumCover(e.target.files[0])}
          />
          <div className="flex flex-col mt-auto ml-5">
            <div className="text-sm mb-1">album</div>
            <input
              type="text"
              className="text-5xl px-4 py-2 bg-[#121212] rounded-xl focus:outline-none text-white"
              placeholder="Album Name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Year of Release"
              value={releaseYear}
              onChange={handleYearChange}
              min="0"
              max="2025"
            />
            <div className="text-xl mt-1">Artist_name</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl">Create Album</h2>

        {songs.map((song, index) => (
          <div key={index} className="bg-[#121212] p-4 my-4 rounded-xl">
            <span className="mr-3">{index+1}</span>
            <input
              type="text"
              placeholder="Song Name"
              value={song.songName}
              onChange={(e) =>
                updateSongField(index, "songName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Collab Artists"
              value={song.collabArtists}
              onChange={(e) =>
                updateSongField(index, "collabArtists", e.target.value)
              }
            />
            <input
              type="file"
              id={`songFile-${index}`}
              accept=".mp3"
              style={{ display: "none" }}
              onChange={(e) =>
                updateSongField(index, "songFile", e.target.files[0])
              }
            />
            <label
              htmlFor={`songFile-${index}`}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 inline-block"
            >
              {song.songFile ? song.songFile.name : "Upload Song File"}
            </label>

            {/* Remove button */}
            <button
              onClick={() => removeSong(index)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
            >
              Remove Song
            </button>
          </div>
        ))}

        <button
          onClick={addNewSongForm}
          className="mb-4 bg-green-700 rounded-full px-4 py-2 text-white"
        >
          Add Song
        </button>

        <button
          onClick={handleAlbumSubmit}
          disabled={!isFormValid}
          className={`mt-5 rounded-full py-2 font-semibold text-white transition cursor-pointer w-3xl ${
            isFormValid
              ? "bg-gradient-to-r from-gray-900 to-blue-900 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Release album
        </button>
      </div>
    </div>
  );
}
