// context/SettingsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const defaultSettings = {
  playbackRate: 1.0,
  volume: 1.0,
  autoplay: true,
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem("settings");
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
