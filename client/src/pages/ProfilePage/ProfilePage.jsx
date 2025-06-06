import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAuth } from "../../context/AuthProvider";
import { Trash } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const { user: loggedInUser, fetchUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    setPlaylists([]);

    const fetchUserData = async () => {
      try {
        const resUserData = await api.get(`/user/${id}`);
        const fetchedUser = resUserData.data.payload;
        setUser(fetchedUser);
        setNewUsername(fetchedUser.username);

        const resPlaylists = await api.get(`/playlist/user/${fetchedUser._id}`);
        setPlaylists(resPlaylists.data.payload);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
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

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      await api.delete(`/user/${user._id}`);
      logout();
      window.location.href = "/";
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (isLoading) return <p>Loading user...</p>;
  if (!user) return <p>User not found.</p>;

  const isOwnProfile = loggedInUser?.username === user.username;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <div className="p-4 sm:p-10 lg:p-15 bg-stone-900 max-w-screen-xl mx-auto rounded-t-3xl">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-xl"
            src={user.pfpSrc}
            alt="Profile"
          />

          <div className="flex flex-col flex-1 w-full">
            <div className="text-sm text-gray-400">
              {user.isArtist && "artist"}
            </div>

            {isOwnProfile ? (
              <div className="flex flex-col gap-4 w-full mt-4">
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    name="pfpFile"
                    onChange={handleFileChange}
                    className="w-[20rem] bg-black hover:bg-black/30 text-white px-4 py-2 rounded-xl cursor-pointer"
                  />
                  <input
                    className="text-2xl md:text-3xl lg:text-4xl bg-black text-white px-4 py-2 rounded-xl w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleUsernameChange}
                    className="bg-black hover:bg-black/20 text-white cursor-pointer px-4 py-2 rounded-xl w-full sm:w-auto"
                  >
                    Save Username
                  </button>
                  <button
                    onClick={handleUpload}
                    className="bg-black hover:bg-black/20 text-white cursor-pointer px-4 py-2 rounded-xl w-full sm:w-auto"
                  >
                    Save Profile Picture
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="bg-black hover:bg-black/20 text-white cursor-pointer px-4 py-2 rounded-xl w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <Trash size={18} />
                    Delete Account
                  </button>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl md:text-5xl mt-2 md:mt-0 break-words text-white">
                {user.username}
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="pl-">
        {playlists.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl md:text-3xl text-white mb-4">
              {user.isArtist ? "Albums" : "Playlists"}
            </h2>
            <Slider {...sliderSettings}>
              {playlists.map((playlist) => {
                if (playlist.type === "playlist" && user.isArtist) return null;
                return (
                  <div key={playlist._id} className="px-2">
                    <Link to={`/playlist/${playlist._id}`}>
                      <div className="aspect-square bg-stone-800 rounded-xl text-center p-4 text-white h-full min-h-[200px]">
                        <img
                          src={playlist.cover}
                          alt={playlist.name}
                          className="mx-auto rounded mb-2 object-cover size-5/6"
                        />
                        <h3 className="mt-2 font-bold text-lg break-words">
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
    </div>
  );
}
