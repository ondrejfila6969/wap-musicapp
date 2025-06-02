import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { registerUser } from "../../models/user";

export default function RegisterForm() {
  const [formData, setFormData] = useState({});
  const [info, setInfo] = useState();
  const [isArtist, setIsArtist] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const sendData = async () => {
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (!emailRegex.test(formData.email)) {
      return setInfo("Invalid email format");
    }

    if (formData.password !== formData.confirmPassword) {
      return setInfo("Passwords do not match");
    }

    const res = await registerUser({ ...formData, isArtist });
    if (res.status === 201) {
      login(res.token);
      return navigate("/");
    }
    setInfo(res.message);
  };

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckbox = (e) => {
    setIsArtist(e.target.checked);
  };

  const handleButton = (e) => {
    e.preventDefault();
    sendData();
  };

  return (
    <div className="flex justify-left items-center sm:w-1/2 w-full px-4 pb-12 sm:pb-0">
      <div className="sonus-bg-linear-gradient bg-opacity-50 p-8 rounded-3xl shadow-md w-full max-w-md">
        <form className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              onChange={handleInput}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              onChange={handleInput}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              onChange={handleInput}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              onChange={handleInput}
            />
          </div>

          {/* Artist Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isArtist"
              name="isArtist"
              onChange={handleCheckbox}
            />
            <label htmlFor="isArtist" className="text-sm text-white">
              Artist
            </label>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-900 to-green-900 rounded-full py-2 font-semibold text-white hover:opacity-90 transition cursor-pointer"
            onClick={handleButton}
          >
            Register
          </button>

          <div className="text-sm text-center text-gray-300 mt-2">
            Do you already have an account? {" "}
            <Link to={"/signin"}>
              <div className="text-blue-400 underline">Sign In</div>
            </Link>
          </div>
        </form>
        <p>{info}</p>
      </div>
    </div>
  );
}