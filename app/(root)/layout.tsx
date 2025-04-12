"use client";

import React from "react";
import { TimerProvider } from "@/context/TimerContext";
import { SettingsProvider } from "@/context/SettingContext";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-dayone">
      <SessionProvider>
        <SettingsProvider>
          <TimerProvider>{children}</TimerProvider>
        </SettingsProvider>
      </SessionProvider>
    </main>
  );
}
