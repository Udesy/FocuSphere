import {
  ChartBar,
  ChartColumnBig,
  Github,
  Settings,
  Share,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SettingDialogue from "./Settingdialogue";
import StatsDialogue from "./StatsDialogue";

const MenuTab = ({
  setTimer,
  timer,
}: {
  timer: "Home" | "Timer";
  setTimer: (value: "Home" | "Timer") => void;
}) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [openStats, setOpenStats] = useState<boolean>(false);

  return (
    <div className="relative flex flex-row justify-between items-center mb-[20px] px-6 ">
      <div className=" relative right-0 flex  justify-end gap-4">
        <div className="bg-background border border-foreground p-2 rounded-xl cursor-pointer">
          <Link
            href={"https://github.com/Udesy/FocuSphere.git"}
            target="_blank"
          >
            <Github size={28} />
          </Link>
        </div>
        <div className="bg-background border border-foreground p-2 rounded-xl cursor-pointer">
          <Share size={28} />
        </div>
      </div>
      <div className="relative h-15 w-54 flex flex-row items-center justify-center bg-background border border-foreground rounded-xl gap-10 px-5">
        <div className="flex flex-row justify-center items-center cursor-pointer">
          <div
            onClick={() => setTimer("Home")}
            className={`px-4 py-2 cursor-pointer rounded-lg transition-colors ${
              timer === "Home"
                ? "bg-foreground text-background"
                : "bg-background text-foreground"
            }`}
          >
            <p>Home</p>
          </div>
          <div
            onClick={() => setTimer("Timer")}
            className={`px-4 py-2 cursor-pointer rounded-lg transition-colors ${
              timer === "Timer"
                ? "bg-foreground text-background"
                : "bg-background text-foreground"
            }`}
          >
            <p>Focus</p>
          </div>
        </div>
      </div>
      <div className=" relative right-0 flex  justify-end gap-4">
        <div
          className="bg-background border border-foreground p-2 rounded-xl cursor-pointer"
          onClick={() => setOpenSetting(true)}
        >
          <Settings size={28} />
        </div>
        {openSetting && <SettingDialogue setOpenSetting={setOpenSetting} />}
        <div
          className="bg-background border border-foreground p-2 rounded-xl cursor-pointer"
          onClick={() => setOpenStats(true)}
        >
          <ChartColumnBig size={28} />
        </div>
        {openStats && <StatsDialogue setOpenStats={setOpenStats} />}
      </div>
    </div>
  );
};

export default MenuTab;
