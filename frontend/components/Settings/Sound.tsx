import React, { useEffect, useRef, useState } from "react";

type SoundOption = {
  id: string;
  label: string;
  icon: string;
  file: string;
};

const soundOptions: SoundOption[] = [
  { id: "sparkle", label: "Sparkle", icon: "✨", file: "/sounds/sparkle.mp3" },
  {
    id: "commuter",
    label: "Commuter Jingle",
    icon: "🚉",
    file: "/sounds/commuter.mp3",
  },
  { id: "chime", label: "Chime", icon: "🔔", file: "/sounds/chime.mp3" },
  { id: "success", label: "Success", icon: "🏆", file: "/sounds/success.mp3" },
  { id: "levelup", label: "Level Up", icon: "👾", file: "/sounds/levelup.mp3" },
  { id: "airport", label: "Airport", icon: "🛫", file: "/sounds/airport.mp3" },
  {
    id: "train",
    label: "Train Arrival",
    icon: "🚅",
    file: "/sounds/train.mp3",
  },
  {
    id: "gameshow",
    label: "Game Show",
    icon: "🎲",
    file: "/sounds/gameshow.mp3",
  },
  { id: "piano", label: "Piano", icon: "🎹", file: "/sounds/piano.mp3" },
  { id: "none", label: "No Alert", icon: "🔕", file: "" },
];

const LOCAL_STORAGE_SOUND_KEY = "selectedAlertSound";
const LOCAL_STORAGE_VOLUME_KEY = "notificationVolume";

const Sound: React.FC = () => {
  const [selectedSound, setSelectedSound] = useState<string>("");
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedSound = localStorage.getItem(LOCAL_STORAGE_SOUND_KEY);
    if (savedSound) setSelectedSound(savedSound);

    const savedVolume = localStorage.getItem(LOCAL_STORAGE_VOLUME_KEY);
    if (savedVolume) setVolume(parseFloat(savedVolume));
  }, []);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem(LOCAL_STORAGE_VOLUME_KEY, newVolume.toString());

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.play();
    }
  };

  const handleChange = (soundId: string, file: string) => {
    setSelectedSound(soundId);
    localStorage.setItem(LOCAL_STORAGE_SOUND_KEY, soundId);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (file) {
      const audio = new Audio(file);
      audio.volume = volume;
      audio.play();
      audioRef.current = audio;
    } else {
      audioRef.current = null;
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-white dark:text-black">
        🔔 Alert Sound
      </h1>

      {/* Volume Slider */}
      <div className="mb-6">
        <label htmlFor="volume" className="block mb-2 text-lg text-gray-700">
          Volume: {Math.round(volume * 100)}%
        </label>
        <input
          id="volume"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-[200px] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <p
        className="mb-2 text-lg
       text-gray-900"
      >
        Choose your sound:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {soundOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all duration-150 
              ${
                selectedSound === option.id
                  ? "border-purple-600 bg-purple-100"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            <input
              type="radio"
              name="alert-sound"
              value={option.id}
              checked={selectedSound === option.id}
              onChange={() => handleChange(option.id, option.file)}
              className="hidden"
            />
            <span className="text-2xl">{option.icon}</span>
            <span className="text-sm font-medium text-black">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sound;
