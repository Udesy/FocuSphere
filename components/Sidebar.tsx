"use client";

import { JSX } from "react";
import {
  Sun,
  Clock,
  MessageCircle,
  Volume2,
  User,
  HelpCircle,
} from "lucide-react";

const Sidebar = ({
  setSelectedOption,
  selectedOption,
}: {
  setSelectedOption: (option: string) => void;
  selectedOption: string;
}) => {
  return (
    <div className="bg-foreground text-background p-6 shadow-lg w-fit md:w-50 h-full relative left-0 top-0">
      <ul className="mt-5 space-y-2">
        <SidebarItem
          icon={<Sun size={25} />}
          label="Theme"
          onClick={() => setSelectedOption("Theme")}
          selectedOption={selectedOption}
        />
        <SidebarItem
          icon={<Clock size={25} />}
          label="Clock"
          onClick={() => setSelectedOption("Clock")}
          selectedOption={selectedOption}
        />
        <SidebarItem
          icon={<MessageCircle size={25} />}
          label="Greeting"
          onClick={() => setSelectedOption("Greeting")}
          selectedOption={selectedOption}
        />
        <SidebarItem
          icon={<Volume2 size={25} />}
          label="Sound"
          onClick={() => setSelectedOption("Sound")}
          selectedOption={selectedOption}
        />
        <SidebarItem
          icon={<User size={25} />}
          label="Profile"
          onClick={() => setSelectedOption("Profile")}
          selectedOption={selectedOption}
        />
        <SidebarItem
          icon={<HelpCircle size={25} />}
          label="Support"
          onClick={() => setSelectedOption("Support")}
          selectedOption={selectedOption}
        />
      </ul>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  onClick,
  selectedOption,
}: {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  selectedOption: string;
}) => (
  <li
    className={`flex items-center gap-3 cursor-pointer transition-colors rounded-lg p-2.5 ${
      selectedOption === label
        ? "bg-background text-foreground"
        : "hover:bg-background hover:text-foreground"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="hidden sm:block">{label}</span>
  </li>
);

export default Sidebar;
