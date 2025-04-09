import React, { useEffect, useState } from "react";

const THEME_KEY = "selectedTheme";

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState<"Black" | "White">(
    "White"
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
    <div className="flex flex-row gap-8 cursor-pointer">
      <div
        className="flex flex-col w-70 h-50  justify-center items-center"
        onClick={() => handleThemeChange("Black")}
      >
        <img
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
        <img
          src="/White.jpg"
          className={`w-full h-full object-cover rounded-xl ${
            selectedTheme === "White" && "border-2 border-background"
          }`}
        />
        <h1 className="mt-6 text-xl text-foreground">Minimalist White</h1>
      </div>
    </div>
  );
};

export default Theme;
