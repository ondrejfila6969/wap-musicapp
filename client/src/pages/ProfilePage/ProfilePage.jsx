// Frontend: ProfilePage.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAuth } from "../../context/AuthProvider";

export default function ProfilePage() {
  const { id } = useParams();
  const { user: loggedInUser, fetchUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resUserData = await api.get(`/user/${id}`);
        setUser(resUserData.data.payload);
        setNewUsername(resUserData.data.payload.username);
        const resPlaylists = await api.get(
          `/playlist/user/${resUserData.data.payload._id}`
        );
        setPlaylists(resPlaylists.data.payload);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUsernameChange = async () => {
    try {
      await api.put(`/user/${user._id}`, { username: newUsername });
      setUser({ ...user, username: newUsername });
      await fetchUser();
    } catch (err) {
      console.error("Failed to update username:", err);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pfpFile", selectedFile);
    try {
      const res = await api.put(`/user/${user._id}/pfp`, formData);
      setUser({ ...user, pfpSrc: res.data.payload });
      await fetchUser();
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  if (isLoading) return <p>Loading user...</p>;
  if (!user) return <p>User not found.</p>;

  const isOwnProfile = loggedInUser?.username === user.username;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="p-15 bg-stone-900 max-w-screen-xl rounded-t-3xl">
      <div className="flex flex-row">
        <img
          className="h-50 rounded-xl row mr-5"
          src={user.pfpSrc}
          alt="Profile"
        />
        <div className="flex flex-col mt-auto">
          <div>{user.isArtist && "artist"}</div>
          {isOwnProfile ? (
            <div className="flex flex-row">
              <div className="flex flex-col">
                <input
                  type="file"
                  name="pfpFile"
                  onChange={handleFileChange}
                  className="mt-2 text-white"
                />
                <input
                  className="text-5xl w-[60%] text-white bg-black"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleUsernameChange}
                  className="text-white mt-2"
                >
                  Save Username
                </button>
                <button onClick={handleUpload} className="text-white mt-1">
                  Save Profile Picture
                </button>
              </div>
            </div>
          ) : (
            <div className="text-5xl text-white">{user.username}</div>
          )}
        </div>
      </div>

      {playlists.length > 0 && (
        <div className="mt-10">
          <h2 className="text-3xl text-white mb-4">
            {user.isArtist ? "Albums" : "Playlists"}
          </h2>
          <Slider {...sliderSettings}>
            {playlists.map((playlist) => {
              if (playlist.type === "playlist" && user.isArtist) return null;
              return (
                <div key={playlist._id} className="px-2">
                  <Link to={`/playlist/${playlist._id}`}>
                    <div className="bg-gray-800 rounded-xl text-center p-4 text-white h-full min-h-[200px]">
                      <img
                        src={playlist.cover}
                        alt={playlist.name}
                        className="mx-auto rounded mb-2 max-h-40 object-cover"
                      />
                      <h3 className="mt-2 font-bold text-lg">
                        {playlist.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}
