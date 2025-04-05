"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import MenuTab from "@/components/MenuSelection";
import Selector from "@/components/Selector";
import Timer from "@/components/Timer";
import { breakButton } from "@/constant";
import { useTimer } from "@/context/TimerContext";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const Home = () => {
  const { selectedTime, setSelectedTime } = useTimer();
  const [isRunning, setIsRunning] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [lastfocusTime, setLastfocusTime] = useState<number | null>(null);
  const [intialTime, setInitialTime] = useState<number | null>(null);
  const [timer, setTimer] = useState<"Home" | "Timer">("Home");
  const userName = "Uddeshya";

  useEffect(() => {
    if (isRunning && selectedTime !== null && selectedTime > 0) {
      const interval = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (selectedTime === 0) {
      window.alert("You have completed the focus session");
    }
  }, [isRunning, selectedTime]);

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
    console.log(lastfocusTime);
  };

  const resetTimer = () => {
    if (intialTime !== null) {
      setSelectedTime(intialTime);
      setIsRunning(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
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
            <div className=" mb-10">
              {userName && (
                <h1 className="text-4xl text-foreground/85">
                  {getGreeting()}, {userName}
                </h1>
              )}
            </div>
            <Timer timer={timer} />
          </motion.div>
        )}
      </motion.div>
      <MenuTab setTimer={setTimer} timer={timer} />
    </div>
  );
};

export default Home;
