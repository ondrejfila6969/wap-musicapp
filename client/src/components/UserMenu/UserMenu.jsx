import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(`/signin`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full p-2 sonus-bg-linear-gradient cursor-pointer flex items-center justify-center"
      >
        <User />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] text-white rounded-md shadow-lg z-50">
          <ul className="py-2 text-sm" onClick={() => setIsOpen((prev) => !prev)}>
            <Link to={`/profile/${user._id}`} onClick={() => setIsOpen(false)}>
              <div className="px-4 py-2 hover:bg-gray-900 text-center cursor-pointer">
                Profile
              </div>
            </Link>
            <Link to={"/settings"} onClick={() => setIsOpen(false)}>
              <div className="px-4 py-2 hover:bg-gray-900 text-center cursor-pointer">
                Settings
              </div>
            </Link>
            <button
              className="px-4 py-2 hover:bg-red-800 w-full bg-red-900 text-center"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}
