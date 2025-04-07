import React from "react";
import { TimerProvider } from "@/context/TimerContext";
import { SettingsProvider } from "@/context/SettingContext";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-dayone">
      <SettingsProvider>
        <TimerProvider>{children}</TimerProvider>
      </SettingsProvider>
    </main>
  );
}
