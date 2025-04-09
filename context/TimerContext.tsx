"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface TimerContextType {
  selectedTime: number | null;
  setSelectedTime: (time: number) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTime, setSelectedTime] = useState<number | 0>(1800);

  return (
    <TimerContext.Provider value={{ selectedTime, setSelectedTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

export default TimerContext;
