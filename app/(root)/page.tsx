"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import MenuTab from "@/components/MenuSelection";
import Selector from "@/components/Selector";
import Timer from "@/components/Timer";
import { breakButton } from "@/constant";
import { useTimer } from "@/context/TimerContext";
import React, { use, useEffect, useState } from "react";
import { motion } from "motion/react";

const Home = () => {
  const { selectedTime, setSelectedTime } = useTimer();
  const [isRunning, setIsRunning] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [lastfocusTime, setLastfocusTime] = useState<number | null>(null);
  const [initialTime, setInitialTime] = useState(0);
  const [timer, setTimer] = useState<"Home" | "Timer">("Home");
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");
  const [totalSession, setTotalSession] = useState(0);

  useEffect(() => {
    if (isRunning && selectedTime !== null && selectedTime > 0) {
      const interval = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    if (selectedTime == 0 && isRunning) {
      setIsRunning(false);
      if (sessionType === "focus") {
        updateLocalCount("focusSessionsToday");
        updateTotalCount();
        setHasSelected(false);
        setTotalSession((prev) => prev + Number(initialTime));
      }
      if (sessionType === "break") {
        updateLocalCount("breaksTakenToday");
      }
    }
  }, [isRunning, selectedTime]);

  const updateTotalCount = () => {
    console.log(totalSession);
    const today = new Date().toISOString().split("T")[0];

    const existingData = JSON.parse(
      localStorage.getItem("totalFocusTime") || "{}"
    );
    existingData[today] = totalSession;
    localStorage.setItem("totalFocusTime", JSON.stringify(existingData));
  };

  const updateLocalCount = (key: string) => {
    const today = new Date().toISOString().split("T")[0];
    const existingData = JSON.parse(localStorage.getItem(key) || "{}");

    existingData[today] = (existingData[today] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  const startTimer = () => {
    if (selectedTime !== null && selectedTime > 0) {
      setInitialTime(selectedTime);
      setIsRunning(true);
      setHasSelected(true);
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
    if (initialTime !== null) {
      setSelectedTime(initialTime);
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
                    className=" md:w-[10rem] md:text-[1.28rem] text-[0.9rem]"
                  />
                ))}
              </div>
            )}
            <div className="relative pointer-events-none">
              <Timer timer={timer} />
            </div>
            <div className="flex flex-col gap-5 items-center justify-center mt-5">
              <div>{hasSelected !== true && <Selector />}</div>
              <div className="flex flex-row md:gap-8 gap-2 ">
                <Button
                  text={isRunning === false ? "Start" : "Pause"}
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
            key={"home-timer"}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="pointer-events-none flex flex-col justify-center items-center md:mb-22"
          >
            <Timer timer={timer} />
          </motion.div>
        )}
      </motion.div>
      <MenuTab setTimer={setTimer} timer={timer} />
    </div>
  );
};

export default Home;
