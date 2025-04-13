// context/SettingsContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ClockStyle = "24hr" | "12hr";
type GreetingStyle = "normal" | "emerge" | "none";

type SettingsContextType = {
  clockStyle: ClockStyle;
  setClockStyle: (style: ClockStyle) => void;
  greetingStyle: GreetingStyle;
  setGreetingStyle: (style: GreetingStyle) => void;
  selectedSound: string;
  setSelectedSound: (sound: string) => void;
  volume: number;
  setVolume: (vol: number) => void;
  profileName: string;
  setProfileName: (name: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [clockStyle, setClockStyle] = useState<"12hr" | "24hr">("24hr");
  const [greetingStyle, setGreetingStyle] = useState<GreetingStyle>("normal");
  const [selectedSound, setSelectedSound] = useState<string>("sparkle");
  const [volume, setVolume] = useState<number>(0.5);
  const [profileName, setProfileName] = useState<string>("Uddeshya");

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    if (savedName) setProfileName(savedName);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        clockStyle,
        setClockStyle,
        greetingStyle,
        setGreetingStyle,
        selectedSound,
        setSelectedSound,
        volume,
        setVolume,
        profileName,
        setProfileName,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};
