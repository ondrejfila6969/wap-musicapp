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
    <div className="flex justify-center items-center w-full px-4 pb-12 sm:pb-0">
      <div className="sonus-bg-linear-gradient bg-opacity-50 p-8 rounded-3xl shadow-md w-full max-w-md flex flex-col gap-4">
        <form className="flex flex-col gap-4 w-full">
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

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-900 to-green-900 rounded-full py-2 font-semibold text-white hover:opacity-90 transition cursor-pointer"
            onClick={handleButton}
          >
            Sign-In
          </button>

          <div className="text-sm text-center text-gray-300 mt-2">
            Are you new?{" "}
            <Link to={"/register"}>
              <div className="text-blue-400 underline">Register</div>
            </Link>
          </div>
        </form>
        <p className="text-center text-sm text-white break-words">{info}</p>
      </div>
    </div>
  );
}
