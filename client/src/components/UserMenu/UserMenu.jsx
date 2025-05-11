import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] text-white rounded-md shadow-lg">
          <ul className="py-2" onClick={() => setIsOpen((prev) => !prev)}>
            <Link to={"/profile"}>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer">
                Profile
              </li>
            </Link>

            <Link to={"/settings"}>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer">
                Settings
              </li>
            </Link>

            <Link to={"/"}>
              <li className="px-4 py-2 hover:bg-red-800 cursor-pointer bg-red-900">
                Log Out
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}
