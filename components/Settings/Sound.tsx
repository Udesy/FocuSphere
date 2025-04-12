import React, { useRef } from "react";
import { useSettings } from "@/context/SettingContext";
import { motion } from "motion/react";

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

const Sound: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { selectedSound, setSelectedSound, volume, setVolume } = useSettings();

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.play();
    }
  };

  const handleChange = (soundId: string, file: string) => {
    setSelectedSound(soundId);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="p-6 max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <label htmlFor="volume" className="block mb-2 text-2xl text-foreground">
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
          className="w-[200px] h-2 bg-background/40 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <p className="mb-2 text-lg text-foreground">Choose your sound:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {soundOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all duration-150 
              ${
                selectedSound === option.id
                  ? "border-purple-600 bg-purple-100"
                  : "border-gray-500/80 hover:bg-background/25"
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
            <span className="text-[15px] font-medium text-black">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

export default Sound;
