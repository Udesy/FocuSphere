import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const THEME_KEY = "selectedTheme";

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState<"Black" | "White">(
    "Black"
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as
      | "Black"
      | "White"
      | null;
    if (storedTheme) {
      setSelectedTheme(storedTheme);
      applyThemeClass(storedTheme);
    } else {
      applyThemeClass("White");
    }
  }, []);

  const applyThemeClass = (theme: "Black" | "White") => {
    const html = document.documentElement;
    if (theme === "Black") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const handleThemeChange = (theme: "Black" | "White") => {
    setSelectedTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
    applyThemeClass(theme);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="flex flex-col md:flex-row gap-8 cursor-pointer p-6 space-y-6 max-sm:items-center"
    >
      <div
        className="flex flex-col w-70 h-50  justify-center items-center"
        onClick={() => handleThemeChange("Black")}
      >
        <Image
          alt="Black theme"
          src="/Black.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            selectedTheme === "Black" && "border-2 border-background"
          }`}
        />
        <h1 className="mt-6 text-xl text-foreground">Minimalist Black</h1>
      </div>
      <div
        className="flex flex-col w-70 h-50 justify-center items-center"
        onClick={() => handleThemeChange("White")}
      >
        <Image
          alt="White theme"
          src="/White.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            selectedTheme === "White" && "border-2 border-background"
          }`}
        />
        <h1 className="mt-6 text-xl text-foreground">Minimalist White</h1>
      </div>
    </motion.div>
  );
};

export default Theme;
