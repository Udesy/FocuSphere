"use client";

import { options } from "@/constant";
import { useTimer } from "@/context/TimerContext";
import React from "react";

const Selector = () => {
  const { selectedTime, setSelectedTime } = useTimer();
  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(Number(e.target.value));
  };

  return (
    <div className="flex flex-row items-center text-2xl text-foreground">
      <div>
        <p>Start Focus for</p>
      </div>
      <div className="relative ml-4">
        <select
          value={selectedTime ? selectedTime : ""}
          onChange={handleClick}
          className="w-[140px] p-2 bg-white/20 backdrop-blur-md rounded-full text-foreground border border-neutral-700 dark:border-white/30 cursor-pointer ml-1.5"
        >
          <option
            value={5}
            className="bg-background selection:bg-white selection:text-black backdrop-blur-md  text-foreground w-[100px] text-xl"
          >
            30 Min
          </option>
          {options.map(({ id, text, value }) => (
            <option
              key={id}
              value={value}
              className="bg-background selection:bg-white selection:text-black backdrop-blur-md text-foregorund text-xl"
            >
              {text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selector;
