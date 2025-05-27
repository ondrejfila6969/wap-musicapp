// context/PlayerContext.jsx
import { createContext, useContext, useState, useRef } from "react";

export const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null); // song: { url, title, artist, cover, duration }
  const soundRef = useRef(null);

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, soundRef }}>
      {children}
    </PlayerContext.Provider>
  );
}
