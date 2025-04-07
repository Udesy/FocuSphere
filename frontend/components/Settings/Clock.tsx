import { useSettings } from "@/context/SettingContext";
import React from "react";

const Clock = () => {
  const { clockStyle, setClockStyle } = useSettings();

  return (
    <div className="flex flex-row gap-8 cursor-pointer">
      <div
        className="flex flex-col w-70 h-50  justify-center items-center"
        onClick={() => setClockStyle("12hr")}
      >
        <img
          src="/12-Hour.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            clockStyle === "12hr" ? "border-2 border-white" : ""
          }`}
        />
        <h1 className="mt-6 text-xl text-foreground">12-Hour Clock</h1>
      </div>
      <div
        className="flex flex-col w-70 h-50 justify-center items-center"
        onClick={() => setClockStyle("24hr")}
      >
        <img
          src="/24-Hour.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            clockStyle === "24hr" ? "border-2 border-white" : ""
          }`}
        />
        <h1 className="mt-6 text-xl text-foreground">24-Hour Clock</h1>
      </div>
    </div>
  );
};

export default Clock;
