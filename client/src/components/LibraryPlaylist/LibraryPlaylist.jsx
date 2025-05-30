import React from "react";

export default function LibraryPlaylist({ imageUrl, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-full max-w-[180px] aspect-square group rounded-xl mx-auto overflow-hidden cursor-pointer shadow-md
             sm:max-w-[220px] md:max-w-[180px] lg:max-w-[200px]"
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black flex items-center justify-center text-white text-center px-2 opacity-0 group-hover:opacity-90 transition-opacity duration-300">
        <span className="text-sm truncate">{title}</span>
      </div>
    </div>
  );
}
