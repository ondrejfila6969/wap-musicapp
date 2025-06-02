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
    <div className="p-6 sm:p-10 bg-stone-900 max-w-screen-xl rounded-t-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-cover"
          src={user.pfpSrc}
          alt="Profile"
        />

        <div className="flex flex-col w-full">
          <div className="text-white text-sm mb-2">
            {user.isArtist && "Artist"}
          </div>

          {isOwnProfile ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-grow">
                <input
                  type="file"
                  name="pfpFile"
                  onChange={handleFileChange}
                  className="text-white mb-2"
                />
                <input
                  className="text-3xl sm:text-5xl text-white bg-black rounded-xl px-4 py-2 w-full"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 sm:items-start">
                <button
                  onClick={handleUsernameChange}
                  className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                  Save Username
                </button>
                <button
                  onClick={handleUpload}
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Save Profile Picture
                </button>
              </div>
            </div>
          ) : (
            <div className="text-3xl sm:text-5xl text-white mt-2 sm:mt-0 break-words">
              {user.username}
            </div>
          )}
        </div>
      </div>

      {playlists.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl sm:text-3xl text-white mb-4">
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
                        className="mx-auto rounded mb-2 max-h-40 object-cover w-full"
                      />
                      <h3 className="mt-2 font-bold text-lg truncate">
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
