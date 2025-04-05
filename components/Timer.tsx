"use client";

import { useTimer } from "@/context/TimerContext";
import React, { useEffect, useState } from "react";

const Timer = ({ timer }: { timer: string }) => {
  const { selectedTime } = useTimer();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = () => {
    const hours = Math.floor(selectedTime / 3600);
    const minutes = Math.floor((selectedTime % 3600) / 60);
    const seconds = selectedTime % 60;

    return (
      (hours > 0 ? `${hours}:` : "") +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`
    );
  };

  const formatClock = () => {
    return currentTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div>
      <div className="relative flex justify-center items-center">
        <h1 className="relative md:text-[235px] text-[180px] whitespace-nowrap font-dayone font-bold text-foreground/85 justify-center items-center inline-flex md:h-[200px] h-[120px]">
          {timer === "Timer" ? formatCountdown() : formatClock()}
        </h1>
      </div>
    </div>
  );
};

export default Timer;
