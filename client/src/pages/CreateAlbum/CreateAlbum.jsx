import { useState } from "react";
import axios from "axios";
import api from "../../api"

export default function CreateAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [albumCover, setAlbumCover] = useState(null);
  const [songs, setSongs] = useState([]);
  const [songForm, setSongForm] = useState({
    songName: "",
    collabArtists: "",
    yearOfRelease: "",
    songFile: null,
  });


  const handleAlbumSubmit = async () => {
    const albumFormData = new FormData();
    albumFormData.append("albumName", albumName);
    albumFormData.append("albumSrc", albumCover);

    try {
      const res = await api.post(
        `http://localhost:3000/playlist/createAlbum`,
        albumFormData
      );
      const albumId = res.data._id;

      for (const song of songs) {
        const songFormData = new FormData();
        songFormData.append("songName", song.songName);
        songFormData.append("collabArtists", song.collabArtists);
        songFormData.append("yearOfRelease", song.yearOfRelease);
        songFormData.append("songSrc", song.songFile);
        songFormData.append("albumId", albumId);

        await api.post(`/song/create/1/${albumId}`, songFormData);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading album or songs");
    }
  };

  const handleInsertSong = () => {
    setSongs([...songs, songForm]);
    setSongForm({
      songName: "",
      collabArtists: "",
      yearOfRelease: "",
      songFile: null,
    });
  };

  return (
    <div>
      <div className="p-15 bg-stone-900 rounded-t-3xl">
        <div className="flex flex-row">
          <input
            type="file"
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
            <div className="text-xl mt-1">Artist_name</div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-3xl">Create Album</h2>
        <div>
          <h4>Queued Songs:</h4>
          <ul>
            {songs.map((s, i) => (
              <li className="bg-[#121212] rounded-xl h-min p-2 mt-1" key={i}>
                {s.songName} ({s.collabArtists}, {s.yearOfRelease})
              </li>
            ))}
          </ul>
        </div>

        <h3>Add Song</h3>
        <input
          type="text"
          placeholder="Song Name"
          value={songForm.songName}
          onChange={(e) =>
            setSongForm({ ...songForm, songName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Collab Artists"
          value={songForm.collabArtists}
          onChange={(e) =>
            setSongForm({ ...songForm, collabArtists: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Year of Release"
          value={songForm.yearOfRelease}
          onChange={(e) =>
            setSongForm({ ...songForm, yearOfRelease: e.target.value })
          }
        />
        <input
          className="text-red-500"
          type="file"
          accept=".mp3"
          onChange={(e) =>
            setSongForm({ ...songForm, songFile: e.target.files[0] })
          }
        />
        <button onClick={handleInsertSong}>Insert Song</button>

        <button
          onClick={handleAlbumSubmit}
          className="mt-5 bg-gradient-to-r from-gray-900 to-blue-900 rounded-full py-2 font-semibold text-white hover:opacity-90 transition cursor-pointer w-3xl"
        >
          Release album
        </button>
      </div>
    </div>
  );
}
