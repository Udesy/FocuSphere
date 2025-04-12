import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Theme from "./Settings/Theme";
import Clock from "./Settings/Clock";
import Greetings from "./Settings/Greetings";
import Sound from "./Settings/Sound";
import Profile from "./Settings/Profile";
import gsap from "gsap";
import Support from "./Settings/Support";

interface SettingDialogueProps {
  setOpenSetting: (open: boolean) => void;
}

const SettingDialogue: React.FC<SettingDialogueProps> = ({
  setOpenSetting,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("Theme");
  useEffect(() => {
    gsap.set("#setting", {
      opacity: 0,
    });
    gsap.to("#setting", {
      opacity: 1,
      duration: 0.2,
    });
  }, []);
  return (
    <div
      className="fixed inset-0 h-full w-full flex items-center justify-center bg-black/50 backdrop-blur-md z-50 "
      onClick={() => setOpenSetting(false)}
      id="setting"
    >
      <div
        className="relative bg-white/40 border border-black w-[1000px] h-[680px] flex rounded-xl overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-2 bg-background hover:bg-background/80 rounded-xl p-1.5"
          onClick={() => setOpenSetting(false)}
        >
          <X size={24} />
        </button>

        <Sidebar
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <main className="flex-1 p-10 overflow-y-auto">
          {selectedOption === "Theme" && <Theme />}
          {selectedOption === "Clock" && <Clock />}
          {selectedOption === "Greeting" && <Greetings />}
          {selectedOption === "Sound" && <Sound />}
          {selectedOption === "Profile" && <Profile />}
          {selectedOption === "Support" && <Support />}
        </main>
      </div>
    </div>
  );
};

export default SettingDialogue;
