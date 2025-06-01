import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { loginUser } from "../../models/user";

export default function SignInForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();

  const sendData = async () => {
    const res = await loginUser(formData);
    if (res.status === 200) {
      login(res.token);
      // alert("success", "Logged in succesfully.");
      navigate("/");
    }
    setInfo(res.message);
  };

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButton = (e) => {
    e.preventDefault();
    sendData();
  };
  return (
    <div className="flex justify-center items-center sm:w-1/2 w-full px-4 pb-12 sm:pb-0">
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2e2e2e] bg-opacity-90 p-8 rounded-3xl shadow-lg w-full max-w-md">
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white placeholder-gray-400"
              placeholder="you@example.com"
              required
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white placeholder-gray-400"
              placeholder="••••••••"
              required
              onChange={handleInput}
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-800 to-green-700 rounded-full py-2 font-semibold text-white hover:opacity-90 transition duration-200"
            onClick={handleButton}
          >
            Sign-In
          </button>

          <div className="text-sm text-center text-gray-300 mt-2">
            Are you new?{" "}
            <Link to={"/register"}>
              <span className="text-blue-400 underline hover:text-blue-300 transition">
                Register
              </span>
            </Link>
          </div>
        </form>
        {info && (
          <p className="mt-4 text-center text-sm text-red-400">{info}</p>
        )}
      </div>
    </div>
  );
}
