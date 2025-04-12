import React, { useState } from "react";
import { useSettings } from "@/context/SettingContext";
import { motion } from "motion/react";

const Greetings = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [showEmerge, setShowEmerge] = useState(false);
  const { setGreetingStyle } = useSettings();

  const handleGreetingToggle = () => {
    const newValue = !showGreeting;
    setShowGreeting(newValue); // <-- this line was missing

    if (!newValue) {
      setGreetingStyle("none");
    } else {
      setGreetingStyle(showEmerge ? "emerge" : "normal");
    }
  };

  const handleEmergeToggle = () => {
    const newValue = !showEmerge;
    setShowEmerge(newValue);
    if (showGreeting) {
      setGreetingStyle(newValue ? "emerge" : "normal");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="space-y-8 p-6"
    >
      <div className="flex flex-row space-x-3">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showGreeting}
            onChange={handleGreetingToggle}
          />
          <div className="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-400 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:bg-purple-400 dark:peer-checked:bg-purple-400 dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-purple-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-purple-600"></div>
        </label>
        <div className="justify-start">
          <h1 className=" text-2xl font-medium text-gray-900 dark:text-gray-200">
            Show Greetings
          </h1>
          <p className="dark:text-neutral-800 text-neutral-700">
            Turn off to hide dashboard greetings.
          </p>
        </div>
      </div>
      <div className="flex flex-row space-x-3">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showEmerge}
            onChange={handleEmergeToggle}
            disabled={!showGreeting}
          />
          <div className="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-400 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:bg-purple-400 dark:peer-checked:bg-purple-400 dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-purple-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-purple-600"></div>
        </label>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-200">
            Show Emergefull Greeting
          </h1>
          <p className="dark:text-neutral-800 text-neutral-700">
            Turn off for generic and emergefull greetings.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Greetings;
