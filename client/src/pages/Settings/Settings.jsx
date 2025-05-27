import { useSettings } from "../../context/SettingsContext";

export default function Settings() {
  const { settings, setSettings } = useSettings();

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Nastavení přehrávače</h2>

      <label className="block mb-2">
        Rychlost přehrávání:
        <select
          value={settings.playbackRate}
          onChange={(e) =>
            setSettings({ ...settings, playbackRate: parseFloat(e.target.value) })
          }
          className="ml-2 bg-stone-900 text-white"
        >
          <option value="0.5">0.5×</option>
          <option value="1">1× (normální)</option>
          <option value="1.5">1.5×</option>
          <option value="2">2×</option>
        </select>
      </label>

      <label className="block mb-2">
        Hlasitost:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.volume}
          onChange={(e) =>
            setSettings({ ...settings, volume: parseFloat(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
