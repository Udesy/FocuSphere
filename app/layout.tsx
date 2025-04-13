import type { Metadata } from "next";
import { Geist, Geist_Mono, Days_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dayone = Days_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dayone",
});

export const metadata: Metadata = {
  title: "Focus Sphere",
  description: "Stay focused, achieve more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dayone.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
