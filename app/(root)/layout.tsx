"use client";

import React from "react";
import { TimerProvider } from "@/context/TimerContext";
import { SettingsProvider } from "@/context/SettingContext";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: any }>) {
  return (
    <main className="font-dayone">
      <SessionProvider session={session}>
        <SettingsProvider>
          <TimerProvider>{children}</TimerProvider>
        </SettingsProvider>
      </SessionProvider>
    </main>
  );
}
