"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import MenuTab from "@/components/MenuSelection";
import Selector from "@/components/Selector";
import Timer from "@/components/Timer";
import { breakButton } from "@/constant";
import { useTimer } from "@/context/TimerContext";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Greetings from "@/components/Greetings";
import { useSettings } from "@/context/SettingContext";

const Home = () => {
  const { selectedTime, setSelectedTime } = useTimer();
  const [isRunning, setIsRunning] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [lastfocusTime, setLastfocusTime] = useState<number | null>(null);
  const [timer, setTimer] = useState<"Home" | "Timer">("Home");
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");
  const initialFocusTime = useRef<number | null>(null);
  const { data: session } = useSession();
  const { selectedSound, volume } = useSettings();

  useEffect(() => {
    if (isRunning && selectedTime !== null && selectedTime > 0) {
      const interval = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (selectedTime === 0 && isRunning) {
      setIsRunning(false);
      playSound(selectedSound, volume);

      if (sessionType === "focus") {
        updateLocalCount("focusSessionsToday");
        updateTotalFocusTime();
        setHasSelected(false);
      }

      if (sessionType === "break") {
        updateLocalCount("breaksTakenToday");

        // Restore focus session and auto-resume it
        if (lastfocusTime !== null) {
          setSelectedTime(lastfocusTime);
          setSessionType("focus");
          setIsRunning(true); // auto resume
          setHasSelected(true); // keep break buttons visible
        }
      }
    }
  }, [isRunning, selectedTime]);

  const playSound = (selectedSound: string, volume: number = 1) => {
    const audio = new Audio(`/sounds/${selectedSound}.mp3`);
    audio.volume = volume;
    audio.play().catch((e) => console.error("Failed to play sound:", e));
  };

  const resetData = () => {
    const today = new Date().toISOString().split("T")[0];
    const lastUpdated = localStorage.getItem("lastUpdated");

    if (lastUpdated !== today) {
      // Reset localStorage for a new day
      localStorage.setItem(
        "focusSessionsToday",
        JSON.stringify({ [today]: 0 })
      );
      localStorage.setItem("breaksTakenToday", JSON.stringify({ [today]: 0 }));

      const totalFocusTime = JSON.parse(
        localStorage.getItem("totalFocusTime") || "{}"
      );
      totalFocusTime[today] = 0;
      localStorage.setItem("totalFocusTime", JSON.stringify(totalFocusTime));

      localStorage.setItem("lastUpdated", today);
    }
  };

  const updateTotalFocusTime = async () => {
    resetData();
    const today = new Date().toISOString().split("T")[0];
    const sessionTime = initialFocusTime.current ?? 0;

    const existingData = JSON.parse(
      localStorage.getItem("totalFocusTime") || "{}"
    );

    const previousTime = Number(existingData[today]) || 0;
    existingData[today] = Number(previousTime) + Number(sessionTime);

    localStorage.setItem("totalFocusTime", JSON.stringify(existingData));

    if (!session) return;

    try {
      const res = await fetch("/api/focussession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: today, sessionTime }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to sync with backend");
      }
    } catch (err) {
      console.error("Sync with MongoDB failed:", err);
    }
  };

  const updateLocalCount = (key: string) => {
    resetData();
    const today = new Date().toISOString().split("T")[0];
    const existingData = JSON.parse(localStorage.getItem(key) || "{}");

    existingData[today] = Number(existingData[today] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  const startTimer = () => {
    if (selectedTime !== null && selectedTime > 0) {
      if (!hasSelected) {
        initialFocusTime.current = selectedTime;
        setHasSelected(true);
      }
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const breakTime = (breakDuration: number) => {
    setLastfocusTime(selectedTime);
    setSelectedTime(breakDuration);
    setIsRunning(true);
    setSessionType("break");
  };

  const resetTimer = () => {
    if (initialFocusTime.current !== null) {
      setSelectedTime(initialFocusTime.current);
      setIsRunning(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-screen bg-background">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="relative"
      >
        {timer === "Timer" ? (
          <motion.div
            key="focus-timer"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="relative flex flex-col items-center"
          >
            {hasSelected && (
              <div className="flex flex-row gap-11 max-md:gap-5 z-10 mb-4">
                {breakButton.map(({ id, text, value }) => (
                  <Button
                    key={id}
                    text={text}
                    handleClick={() => breakTime(value)}
                    className="md:w-[10rem] md:text-[1.28rem] text-[0.9rem]"
                  />
                ))}
              </div>
            )}
            <div className="relative pointer-events-none">
              <Timer timer={timer} />
            </div>
            <div className="flex flex-col gap-5 items-center justify-center mt-5">
              <div>{!hasSelected && <Selector />}</div>
              <div className="flex flex-row md:gap-8 gap-2">
                <Button
                  text={isRunning ? "Pause" : "Start"}
                  handleClick={isRunning ? pauseTimer : startTimer}
                  className="md:text-[1.5rem] lg:w-[12rem] md:w-[10rem] max-md:w-[7rem]"
                />
                {hasSelected && (
                  <Button
                    text="Reset"
                    handleClick={resetTimer}
                    className="md:text-[1.5rem] lg:w-[12rem] md:w-[10rem] max-md:w-[7rem]"
                  />
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="home-timer"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="pointer-events-none flex flex-col justify-center items-center md:mb-22"
          >
            <Greetings />
            <Timer timer={timer} />
          </motion.div>
        )}
      </motion.div>
      <MenuTab setTimer={setTimer} timer={timer} />
    </div>
  );
};

export default Home;
