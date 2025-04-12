import { useSettings } from "@/context/SettingContext";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const Clock = () => {
  const { clockStyle, setClockStyle } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="flex flex-col md:flex-row gap-8 cursor-pointer p-6 space-y-6 max-sm:items-center"
    >
      <div
        className="flex flex-col w-70 h-50  justify-center items-center"
        onClick={() => setClockStyle("12hr")}
      >
        <Image
          alt="12Hr"
          src="/12-Hour.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            clockStyle === "12hr" ? "border-2 border-white" : ""
          }`}
        />
        <h1 className="mt-6 text-xl dark:text-gray-100 text-foreground">
          12-Hour Clock
        </h1>
      </div>
      <div
        className="flex flex-col w-70 h-50 justify-center items-center"
        onClick={() => setClockStyle("24hr")}
      >
        <Image
          alt="24Hr"
          src="/24-Hour.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            clockStyle === "24hr" ? "border-2 border-white" : ""
          }`}
        />
        <h1 className="mt-6 text-xl dark:text-gray-100 text-foreground">
          24-Hour Clock
        </h1>
      </div>
    </motion.div>
  );
};

export default Clock;
