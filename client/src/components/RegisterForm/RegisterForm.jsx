import React from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <div className="flex justify-left items-center sm:w-1/2 w-full px-4 pb-12 sm:pb-0">
      <div className="sonus-bg-linear-gradient bg-opacity-50 p-8 rounded-3xl shadow-md w-full max-w-md">
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              id="id"
              type="email"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password Again
            </label>
            <input
              id="passwordVer"
              type="password"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-900 to-green-900 rounded-full py-2 font-semibold text-white hover:opacity-90 transition cursor-pointer"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-300 mt-2">
            Do you already have an account?{" "}
            <Link to={"/signin"}>
              <div className="text-blue-400 underline">Sign In</div>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
