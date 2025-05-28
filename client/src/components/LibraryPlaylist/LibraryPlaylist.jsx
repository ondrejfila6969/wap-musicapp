import React from "react";

export default function LibraryPlaylist({ imageUrl, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative group w-25 h-25 rounded-xl overflow-hidden cursor-pointer shadow-md"
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm truncate">{title}</span>
      </div>
    </div>
  );
}
