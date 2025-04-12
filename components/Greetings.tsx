import React, { useMemo } from "react";
import { useSettings } from "@/context/SettingContext";
import { useSession } from "next-auth/react";

const Greetings: React.FC = () => {
  const { greetingStyle } = useSettings();
  const { data: session } = useSession();
  const Name = session?.user?.name || "";
  const profileName = Name.split(" ")[0];

  const emergeGreetings = {
    morning: [
      "Rise and shine, {name}!",
      "Top of the morning, {name}!",
      "Ready to win the day, {name}?",
      "Wishing you a productive morning, {name}!",
    ],
    afternoon: [
      "Keep pushing, {name}!",
      "Hope your day is going well, {name}.",
      "Stay focused and strong, {name}!",
      "Power through the afternoon, {name}!",
    ],
    evening: [
      "You did great today, {name}!",
      "Hope you're winding down well, {name}.",
      "Time to relax, {name}.",
      "Well done today, {name}!",
    ],
  };

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (greetingStyle === "emerge") {
      const timeOfDay: "morning" | "afternoon" | "evening" =
        hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

      const greetings = emergeGreetings[timeOfDay];
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      return greeting.replace("{name}", profileName || "");
    }

    if (greetingStyle === "normal") {
      if (hour >= 5 && hour < 12) {
        return `Good morning, ${profileName}!`;
      } else if (hour >= 12 && hour < 17) {
        return `Good afternoon, ${profileName}!`;
      } else if (hour >= 17 && hour < 21) {
        return `Good evening, ${profileName}!`;
      } else {
        return `Good night, ${profileName}!`;
      }
    }

    return "";
  }, [greetingStyle, profileName]);

  if (!greeting) return null;

  if (session?.user?.name) {
    return (
      <div className="mb-10 text-3xl text-center">
        <h1>{greeting}</h1>
      </div>
    );
  }
};

export default Greetings;
