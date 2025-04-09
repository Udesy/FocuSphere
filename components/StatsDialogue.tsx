import { CircleUserRound, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Heatmap from "./Heatmap";
import BarChart from "./BarChart";
import gsap from "gsap";
import { getUser, User } from "@/lib/user";

interface StatsDialogueProps {
  setOpenStats: (open: boolean) => void;
}

const StatsDialogue: React.FC<StatsDialogueProps> = ({ setOpenStats }) => {
  const statRef = useRef(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  useEffect(() => {
    gsap.set(statRef.current, {
      opacity: 0,
    });
    gsap.to(statRef.current, {
      opacity: 1,
      duration: 0.2,
    });
  }, []);

  console.log(user);

  return (
    <div
      className="fixed inset-0 h-full w-full flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
      onClick={() => setOpenStats(false)}
      ref={statRef}
    >
      <div
        className="relative bg-slate-300/50 border border-black w-[1000px] h-[680px] flex justify-between rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-4 top-2 bg-background hover:bg-background/80 rounded-xl p-1.5">
          <X onClick={() => setOpenStats(false)} />
        </div>
        <div className="flex flex-col w-full items-center gap-8 p-4 overflow-y-scroll scrollbar-track-bg-neutral-900 scrollbar-thumb-gray-800">
          <div className="flex flex-row items-center justify-between gap-[38px] w-full mt-9 text-[22px] bg-slate-300/50 rounded-xl px-4 py-7 ">
            <div className="flex flex-row items-center justify-center gap-4">
              <div>
                <CircleUserRound size={50} />
              </div>
              <div className="flex flex-col">
                {user?.name ? (
                  <div>
                    <h1 className="text-2xl text-nowrap">{user?.name}</h1>
                    <p className="text-[15px] text-gray-600">
                      Joined {user?.firstLogin.toString().split("T")[0]}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-lg text-wrap">User Not Logged In.</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-700 h-full w-1.5 rounded-full flex flex-row justify-evenly" />
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-center text-nowrap text-lg">Focus started</h1>
              <p className="text-3xl mt-3">00</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-center text-nowrap text-lg">Breaks Taken</h1>
              <p className="text-3xl mt-3">00</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-center text-nowrap text-lg">
                Total time Focused
              </h1>
              <p className="text-3xl mt-3">00</p>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="rounded-xl bg-slate-300/50">
              <BarChart />
            </div>
            <div className="w-[300px] h-[280px] rounded-xl flex flex-col items-center justify-evenly bg-slate-300/50">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl">Total Focus this Week</h1>
                <p className="mt-4 text-3xl">00</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl">Best Focus Time</h1>
                <p className="mt-4 text-3xl">00</p>
              </div>
            </div>
          </div>
          <div className=" bg-slate-300/50 rounded-xl w-full">
            <Heatmap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDialogue;
