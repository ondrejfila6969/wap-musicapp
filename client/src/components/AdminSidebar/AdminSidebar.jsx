import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
      <aside className="min-h-220 rounded-3xl w-64 m-4 sonus-bg-linear-gradient p-8 flex flex-col justify-between">
        <div>
          <img className="h-12 mb-1" src="/logo.png"></img>
          <p className="text-sm text-gray-400 mb-6">Admin</p>
          <hr className="border-gray-700 mb-4" />

          <nav className="flex flex-col gap-2 text-lg text-gray-300">

            <Link to={"/admin/manageUsers"}>
              <div className="hover:text-white">Manage Users</div>
            </Link>
            <Link to={"#"}>
              <div className="hover:text-white">Manage Artists</div>
            </Link>
            <Link to={"#"}>
              <div className="hover:text-white">Manage Content</div>
            </Link>
            <Link to={"#"}>
              <div className="hover:text-white">Manage Admins</div>
            </Link>

          </nav>
        </div>

        <button className="w-full bg-gradient-to-r from-gray-700 to-red-900 text-white py-2 rounded-full hover:opacity-80 cursor-pointer">
          Log Out
        </button>
      </aside>
  );
}
