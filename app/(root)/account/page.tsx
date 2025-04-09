"use client";

import { useEffect, useState } from "react";
import { getUser, User } from "@/lib/user";
import { useSession } from "next-auth/react";

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading user data...</p>;
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">Welcome back, {user.name}!</h1>
        <p>First login: {new Date(user.firstLogin).toLocaleDateString()}</p>
        <p>Focus sessions completed: {user.focusSessions}</p>
        <p>Total focus time: {user.totalFocusTime} minutes</p>
      </div>
    </div>
  );
};

export default page;
