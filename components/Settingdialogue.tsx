import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Theme from "./Settings/Theme";
import Clock from "./Settings/Clock";
import Greetings from "./Settings/Greetings";
import Sound from "./Settings/Sound";
import Profile from "./Settings/Profile";
import SupportandFeedback from "./Settings/SupportandFeedback";
import gsap from "gsap";

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
        className="relative bg-slate-300/50 border border-black w-[1000px] h-[680px] flex rounded-xl overflow-hidden"
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
        <main className="flex-1 p-10">
          {selectedOption === "Theme" && <Theme />}
          {selectedOption === "Clock" && <Clock />}
          {selectedOption === "Greeting" && <Greetings />}
          {selectedOption === "Sound" && <Sound />}
          {selectedOption === "Profile" && <Profile />}
          {selectedOption === "Support" && <SupportandFeedback />}
        </main>
      </div>
    </div>
  );
};

export default SettingDialogue;
