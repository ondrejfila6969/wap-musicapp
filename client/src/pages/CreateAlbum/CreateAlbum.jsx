import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";
import "./CreateAlbum.css";
import { useAuth } from "../../context/AuthProvider";

export default function CreateAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [albumCover, setAlbumCover] = useState(null);
  const [songs, setSongs] = useState([]);
  const [previewCoverUrl, setPreviewCoverUrl] = useState(null);

  const { user, isLoading } = useAuth();

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
        await api.post(`/song/create/${user._id}/${albumId}`, songFormData);
        console.log("after upload");
      }

      alert("Album and songs uploaded successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error uploading album or songs");
    }
  };

  useEffect(() => {
    if (albumCover) {
      const objectUrl = URL.createObjectURL(albumCover);
      setPreviewCoverUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // clean up
    }
  }, [albumCover]);

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
    releaseYear != 0 &&
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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
        <div className="overflow-y-auto crtAlb-wrapper h-[calc(96vh-6rem)]">
      <div className="p-6 bg-stone-900 rounded-t-3xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* ALBUM COVER PREVIEW */}
          <div className="w-[200px] h-[200px] rounded-xl bg-stone-800 flex-shrink-0 mx-auto lg:mx-0">
            {previewCoverUrl ? (
              <img
                src={previewCoverUrl}
                alt="Album Cover Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-sm rounded-xl">
                Album cover
              </div>
            )}
          </div>

          {/* ALBUM NAME AND YEAR */}
          <div className="flex flex-col flex-grow space-y-3 mt-4 lg:mt-0">
            {/* INPUT FOR COVER */}
            <input
              type="file"
              name="albumCoverFile"
              className="cursor-pointer bg-gradient-to-r from-gray-900 to-gray-800 hover:to-gray-700 p-2 rounded-xl w-max"
              accept="image/*"
              onChange={(e) => setAlbumCover(e.target.files[0])}
            />

            <input
              type="text"
              className="text-3xl md:text-5xl px-4 py-2 bg-[#121212] rounded-xl focus:outline-none text-white w-full max-w-lg"
              placeholder="Album Name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />

            <input
              type="number"
              className="text-md px-4 py-2 bg-[#121212] rounded-xl focus:outline-none text-white max-w-xs"
              placeholder="Year of Release"
              value={releaseYear}
              onChange={handleYearChange}
              min="0"
              max="2025"
            />

            <div className="text-xl mt-1">{user.username}</div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-3xl mb-6">Create Album</h2>

        {songs.map((song, index) => (
          <div
            key={index}
            className="bg-[#121212] p-4 my-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <span className="md:mr-4">{index + 1}</span>
            <input
              type="text"
              placeholder="Song Name"
              value={song.songName}
              onChange={(e) =>
                updateSongField(index, "songName", e.target.value)
              }
              className="flex-grow md:flex-auto px-3 py-2 rounded-md bg-[#222] text-white focus:outline-none"
            />
            <input
              type="text"
              placeholder="Collab Artists"
              value={song.collabArtists}
              onChange={(e) =>
                updateSongField(index, "collabArtists", e.target.value)
              }
              className="flex-grow md:flex-auto px-3 py-2 rounded-md bg-[#222] text-white focus:outline-none"
            />

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
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
                className="cursor-pointer bg-gradient-to-r from-gray-900 to-blue-900 hover:to-blue-600 text-white px-4 py-2 rounded-xl inline-block whitespace-nowrap"
              >
                {song.songFile ? song.songFile.name : "Upload Song File"}
              </label>

              <button
                onClick={() => removeSong(index)}
                className="bg-gradient-to-r from-gray-900 to-yellow-900 hover:to-yellow-600 text-white px-4 py-2 rounded-xl whitespace-nowrap"
              >
                Remove Song
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={addNewSongForm}
            className="bg-gradient-to-r from-gray-900 to-green-900 hover:to-green-600 px-4 py-2 text-white rounded-xl w-full sm:w-auto"
          >
            Add Song
          </button>

          <button
            onClick={handleAlbumSubmit}
            disabled={!isFormValid}
            className={`rounded-xl font-semibold text-white transition cursor-pointer py-2 w-full sm:w-48 ${
              isFormValid
                ? "bg-gradient-to-r from-gray-900 to-blue-900 hover:opacity-90"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Release album
          </button>
        </div>
      </div>
    </div>
  );
}
