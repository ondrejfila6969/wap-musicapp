import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
     navigate(`/signin`);
  }

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
        <div className="absolute right-0 z-90 mt-2 w-40 bg-[#1a1a1a] text-white rounded-md shadow-lg">
          <ul className="py-2" onClick={() => setIsOpen((prev) => !prev)}>
            <Link to={"/profile"}>
              <div className="px-4 py-2 hover:bg-gray-900 text-center cursor-pointer">
                Profile
              </div>
            </Link>

            <Link to={"/settings"}>
              <div className="px-4 py-2 text-center hover:bg-gray-900 cursor-pointer">
                Settings
              </div>
            </Link>

              <button className="px-4 py-2 hover:bg-red-800 w-full cursor-pointer bg-red-900" onClick={handleLogout}>
                Log Out
              </button>
          </ul>
        </div>
      )}
    </div>
  );
}
