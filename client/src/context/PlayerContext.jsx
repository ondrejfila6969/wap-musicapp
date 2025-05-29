import { createContext, useContext, useState, useRef } from "react";

export const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]); // fronta nadcházejících písní
  const [history, setHistory] = useState([]); // historie přehrávaných písní
  const soundRef = useRef(null);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        queue,
        setQueue,
        history,
        setHistory,
        soundRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
