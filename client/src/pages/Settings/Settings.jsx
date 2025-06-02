import { useSettings } from "../../context/SettingsContext";

export default function Settings() {
  const { settings, setSettings } = useSettings();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-stone-600">Settings</h2>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Speed: </label>
        <select
          value={settings.playbackRate}
          onChange={(e) =>
            setSettings({ ...settings, playbackRate: parseFloat(e.target.value) })
          }
          className="w-full p-2 rounded bg-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="0.5">0.5×</option>
          <option value="1">1× (normal)</option>
          <option value="1.5">1.5×</option>
          <option value="2">2×</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Volume: {(settings.volume * 100).toFixed(0)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.volume}
          onChange={(e) =>
            setSettings({ ...settings, volume: parseFloat(e.target.value) })
          }
          className="w-full accent-purple-500"
        />
      </div>
    </div>
  );
}
